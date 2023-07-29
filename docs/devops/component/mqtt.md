# MQTT

## 安装EMQX

> 官网：https://www.emqx.com/zh
> 安装包：https://www.emqx.io/zh/downloads
> 官方文档： https://www.emqx.io/docs/zh/v4.4/

### zip 解压方式安装
在这里选中了 ZIP 包解压使用的方式
```shell
wget https://www.emqx.com/zh/downloads/broker/4.4.1/emqx-4.4.1-otp24.1.5-3-el7-amd64.zip
unzip emqx-4.4.1-otp24.1.5-3-el7-amd64.zip
cd emqx
./bin/emqx start/stop/restart
# 修改控制台密码
./bin/emqx_ctl admins passwd admin adminPassword #(自行修改密码，重要！)
# 查看 emqx 启动的端口：
netstat -ntlp | grep emqx
```
- 本地连接使用 11883
- 非本地连接使用 1883

### 控制台
> http://127.0.0.1:18083 (用户名密码在安装之后使用 emqx_ctl设定) 
> 配置 nginx 转发以开放控制台

### 认证
- MySQL 认证：https://www.emqx.io/docs/zh/v4.4/advanced/auth-mysql.html#mysql-连接信息

- Http 认证【新版本没成功】

认证接口
```java
public class MqttLoginRest {
    @PostMapping(Routes.MQTT_LOGIN)
    public Map<String, Object> mqttLogin(@RequestBody LoginRequest loginRequest, HttpServerRequest request) {
        Map<String, Object> result = new HashMap<>();
        result.put("result", "deny");
        result.put("is_superuser", false);

        String emqx = request.getHeader("X-Request-Source");
        if (!"EMQX".equals(emqx)) {
            log.warn("err header with mqtt login");
            return result;
        }

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        if (StringUtils.isBlank(username)) {
            log.warn("no username with mqtt login");
            return result;
        }
        if (StringUtils.isBlank(password)) {
            log.warn("no password with mqtt login");
            return result;
        }

        // TODO 用户名密码，有效性检测
        boolean usernameAndPasswordIsRight = true;
        if (!usernameAndPasswordIsRight) {
            log.warn("err password with mqtt login");
            return result;
        }
        
        result.put("result", "allow");
        return result;
    }

}
```
