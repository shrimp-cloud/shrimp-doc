# Access Token

## Access Token
> API 通信的token校验机制

参考：https://blog.csdn.net/CSDN_WYL2016/article/details/124872582


## 安全措施

### timestamp
> timestamp 请求方的时间戳，在服务端，校验此时间戳，超过5分钟的请求，可以直接德育。可以用来防止同一个请求参数被无限期的使用

### nonce

> nonce值是一个由接口请求方生成的随机数，在有需要的场景中，可以用它来实现请求一次性有效，也就是说同样的请求参数只能使用一次，这样可以避免接口重放攻击

> 接口请求方每次请求都会随机生成一个不重复的nonce值，接口提供方可以使用一个存储容器（redis），每次先在容器中看看是否存在接口请求方发来的nonce值，
> 如果不存在则表明是第一次请求，则放行，并且把当前nonce值保存到容器中，> 这样，如果下次再使用同样的nonce来请求则容器中一定存在，那么就可以判定是无效请求了。
> timestamp 已经保证了请求有效期，此处缓存可以配置成 timestamp 有效期一致


### 其他安全机制

- 白名单
- 黑名单
- 限流、熔断、降级


## 功能设计

- 管理后台维护 access_token 信息，包含 app_id, app_secret 和附属相关信息
- app_id, app_secret 信息缓存至 app 中，在 GW, 或 Interceptor 中, 客户端请求过来，提取 access_token, 完成各种校验，最后放行
- 客户端，在请求服务端时，计算，并附加 access_token 信息

### access token 管理

- 生成 access token
- 分发 access token 到可能作为服务端的应用中，以便在拦截器中获取 token 信息
- 缓存机制：另新文章介绍


### 加密演示


#### 客户端配置
- 配置信息从服务提供方获取

```yaml
cas:
  sdk:
      app-id: appId
      app-secret: appSecret
```


#### 加密解密

```java

public class SignDemo {

    /**
     * 获取签名
     */
    public String getSign() {
        String appId = casSdkConfig.getAppId();
        String appSecret = casSdkConfig.getAppSecret();
        long timestamp = System.currentTimeMillis();
        String nonce = SecretUtil.md5(UUID.randomUUID().toString() + timestamp);

        // 生成签名
        Map<String, String> data = new HashMap<>();
        data.put("appId", appId);
        data.put("nonce", nonce);
        data.put("timestamp", timestamp + "");
        Set<String> keySet = data.keySet();
        String[] keyArray = keySet.toArray(new String[keySet.size()]);
        // 排序
        Arrays.sort(keyArray);
        StringBuilder sb = new StringBuilder();
        for (String k : keyArray) {
            // 参数值为空，则不参与签名
            if (data.get(k).trim().length() > 0) {
                sb.append(k).append("=").append(data.get(k).trim()).append("&");
            }
        }
        return encrypt(appSecret, sb.substring(0, sb.length() - 1));
    }


    /**
     * 解析并校验签名
     */
    public boolean deSign(String appId, String sign) {
        if (StringUtils.isBlank(appId) || StringUtils.isBlank(sign)) {
            return false;
        }

        AppInfo appInfo = appInfoCache.get(casSdkConfig.getAppCode());
        Map<String, AccessToken> accessTokens = appInfo.getAccessTokens();
        AccessToken accessToken = accessTokens.get(appId);
        if (accessToken == null) {
            logger.error("appId: {} 不存在, 无法解密", appId);
            return false;
        }

        // 签名验证
        String decrypt;
        try {
            decrypt = decrypt(accessToken.getAppPublicKey(), sign);
        } catch (Exception e) {
            logger.error("appId: {} 解密失败", appId);
            return false;
        }

        // 获取信息进行详情验证
        String[] split = decrypt.split("&");
        Map<String, String> data = new HashMap<>();
        for (String s : split) {
            String[] t = s.split("=");
            if (t.length == 2) {
                data.put(t[0], t[1]);
            }
        }

        String appId2 = data.get("appId");
        String timestamp = data.get("timestamp");
        String nonce = data.get("nonce");

        // 验证 appId1 是否被偷换
        if (appId2 == null) {
            logger.error("签名中缺少 appId: {}! ", appId);
            return false;
        }
        if (!appId2.equals(appId)) {
            logger.error("请求appId: {}, 验证appId: {} 不匹配，验证失败! ", appId, appId2);
            return false;
        }

        // 验证 timestamp 是否已过期
        if (timestamp == null) {
            logger.error("签名中缺少 timestamp: {}! ", appId);
            return false;
        }
        long l = Long.parseLong(timestamp);
        if (System.currentTimeMillis() - l > 5 * 60 * 1000) {
            logger.error("请求已过期，appId: {}, : timestamp: {}! ", appId, timestamp);
            return false;
        }

        // 验证 nonce 是否重复请求
        if (nonce == null) {
            logger.error("签名中缺少 nonce: {}! ", appId);
            return false;
        }
        String key = "cas:access:" + nonce;
        boolean lock = redisLockHelper.lock(key, 5 * 60);
        if (!lock) {
            logger.error("重复的请求 appId: {}, nonce: {} ", appId, nonce);
            return false;
        }

        return true;
    }

}

```


#### 最后放几个使用到的函数

```java

public class SignDemo {

    private static String encrypt(String privateKeyStr, String plainText) {
        try {
            byte[] keyBytes = SecretUtil.base64Decode(privateKeyStr);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
            KeyFactory factory = KeyFactory.getInstance("RSA", "SunRsaSign");
            PrivateKey privateKey = factory.generatePrivate(spec);
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            try {
                cipher.init(Cipher.ENCRYPT_MODE, privateKey);
            } catch (InvalidKeyException e) {
                //For IBM JDK, 原因请看解密方法中的说明
                RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) privateKey;
                RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(rsaPrivateKey.getModulus(), rsaPrivateKey.getPrivateExponent());
                Key fakePublicKey = KeyFactory.getInstance("RSA").generatePublic(publicKeySpec);
                cipher = Cipher.getInstance("RSA");
                cipher.init(Cipher.ENCRYPT_MODE, fakePublicKey);
            }

            byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
            String encryptedString = SecretUtil.base64Encode(encryptedBytes);
            return encryptedString;
        } catch (Exception e) {
            throw new RuntimeException("加密计算出现异常", e);
        }
    }

    private static String decrypt(String publicKeyStr, String cipherText) {
        try {
            PublicKey publicKey = getPublicKey(publicKeyStr);
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            try {
                cipher.init(Cipher.DECRYPT_MODE, publicKey);
            } catch (InvalidKeyException e) {
                // 因为 IBM JDK 不支持私钥加密, 公钥解密, 所以要反转公私钥
                // 也就是说对于解密, 可以通过公钥的参数伪造一个私钥对象欺骗 IBM JDK
                RSAPublicKey rsaPublicKey = (RSAPublicKey) publicKey;
                RSAPrivateKeySpec spec = new RSAPrivateKeySpec(rsaPublicKey.getModulus(), rsaPublicKey.getPublicExponent());
                Key fakePrivateKey = KeyFactory.getInstance("RSA").generatePrivate(spec);
                cipher = Cipher.getInstance("RSA");
                cipher.init(Cipher.DECRYPT_MODE, fakePrivateKey);
            }

            if (cipherText == null || cipherText.length() == 0) {
                return cipherText;
            }

            byte[] cipherBytes = SecretUtil.base64Decode(cipherText);
            byte[] plainBytes = cipher.doFinal(cipherBytes);

            return new String(plainBytes);
        } catch (Exception e) {
            throw new RuntimeException("解密计算出现异常", e);
        }
    }

    private static PublicKey getPublicKey(String publicKeyStr) {
        try {
            byte[] publicKeyBytes = SecretUtil.base64Decode(publicKeyStr);
            X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(publicKeyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA", "SunRsaSign");
            return keyFactory.generatePublic(x509KeySpec);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to get public key", e);
        }
    }

}
```