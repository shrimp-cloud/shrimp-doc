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


### 加密演示


#### 加密解密

```java

public class SignDemo {
    public static void main(String[] args) {

        String appId = "token_abcdefgh";
        String appSecret = "qwertyuiopasdfghjklzxcvbnm";
        long timestamp = System.currentTimeMillis();
        // 可自由任意拼接 noce, 尽可能保证每次请求都不一样
        String nonce = SecretUtil.md5("xxxx" + timestamp);

        // 业务数据
        App app = new App();
        app.setAppCode("appCode");
        app.setAppName("appName");
        String bizData = JSONObject.toJSONString(app);

        System.out.println("bizData: " + bizData);
        // 业务数据签名
        String sign = getSHA256Str(bizData);
        System.out.println("sign: " + sign);

        // 生成签名
        Map<String, String> data = new HashMap<>();
        data.put("appId", appId);
        data.put("nonce", nonce);
        data.put("sign", sign);
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
        sb.append("appSecret=").append(appSecret);
        System.out.println("拼接后的参数：" + sb);

        // 使用 MD5 简单签名
        String appSign = SecretUtil.md5(sb.toString());
        /* 更安全的，使用sha256withRSA的方式对header中的内容加签
        String privateKey = appKeyPair.get(appId).get("privateKey");
        String appSign = sha256withRSASignature(privateKey, sb.toString());
        System.out.println("appSign：" + appSign);
        */

        // 请求接口时，需要将以下信息放到请求头
        /**
         * appId
         * nonce
         * sign
         * timestamp
         * appSign
         */

        // 验证 timestamp 是否已经超过5分钟，已经超过的，直接拒绝
        // 验证 nonce 是否已经接收过 【接收过， redis 记录 5 分钟】，若接收过，拒绝请求

        // 使用 MD5 验证 【省略】
        boolean verifyed = true;
        
        /* 按照同样的方式生成 appSign，然后使用公钥进行验签
        String publicKey = appKeyPair.get(appId).get("publicKey");
        verifyed = rsaVerifySignature(sb.toString(), publicKey, appSign);
        */
        System.out.println(verifyed ? "验证通过": "验证失败");

    }
}

```


#### 最后放几个使用到的函数
```java

public class SignDemo {
    // 给数据签名
    public static String getSHA256Str(String str) {
        MessageDigest messageDigest;
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] hash = messageDigest.digest(str.getBytes(StandardCharsets.UTF_8));
        return Hex.encodeHexString(hash);
    }

    // 私钥签名
    public static String sha256withRSASignature(String privateKeyStr, String dataStr) {
        try {
            byte[] key = Base64.getDecoder().decode(privateKeyStr);
            byte[] data = dataStr.getBytes();
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(key);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
            Signature signature = Signature.getInstance("SHA256withRSA");
            signature.initSign(privateKey);
            signature.update(data);
            return new String(Base64.getEncoder().encode(signature.sign()));
        } catch (Exception e) {
            throw new RuntimeException("签名计算出现异常", e);
        }
    }

    // 公钥验签
    public static boolean rsaVerifySignature(String dataStr, String publicKeyStr, String signStr) {
        try {
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(Base64.getDecoder().decode(publicKeyStr));
            PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
            Signature signature = Signature.getInstance("SHA256withRSA");
            signature.initVerify(publicKey);
            signature.update(dataStr.getBytes());
            return signature.verify(Base64.getDecoder().decode(signStr));
        } catch (Exception e) {
            throw new RuntimeException("验签计算出现异常", e);
        }
    }

    // 生成 RSA 密钥对
    public static void initKeyPair(String appId) {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            KeyPair keyPair = keyPairGenerator.generateKeyPair();
            RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
            RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
            Map<String, String> keyMap = new HashMap<>();
            keyMap.put("publicKey", new String(Base64.getEncoder().encode(publicKey.getEncoded())));
            keyMap.put("privateKey", new String(Base64.getEncoder().encode(privateKey.getEncoded())));
            appKeyPair.put(appId, keyMap);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
```