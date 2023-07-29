# cas-starter

> cas 单点登录-权限验证-用户信息获取

## 依赖
```xml
<dependency>
    <groupId>com.wkclz.cas</groupId>
    <artifactId>shrimp-cloud-cas-starter</artifactId>
</dependency>
```

## 配置
```
cas:
  login:
    public-key: 登录时密码加密公钥【配合前端页面使用】
    private-key: 登录时密码解密私钥
  sdk:
    user-default-roles: 用户默认角色【用于赋予默认权限】

```


