# 模块接入

> 若项目集成部署，无需此接入过程。若为微服务部署，各部署的模块，需要与 cas 交互，才需要按此文档集成

## 依赖
```xml
<dependency>
    <groupId>com.wkclz.auth</groupId>
    <artifactId>auth-sdk</artifactId>
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

