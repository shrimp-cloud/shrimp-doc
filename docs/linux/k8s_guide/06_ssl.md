# SSL


> 本章节介绍如何使用 ingress 验证 ssl 证书申请的文件验证。包含使用 ingress 配合后端进行验证


## 坑

- DNS 验证，域名不在自己手上，或获取域名控制台权限非常困难
- 没有实体服务器，很难将验证文件放到对应目录下
- Ingress 居然不支持 snippet，后续确认如何开启 snippet 支持 (所以才有了 后端服务验证)
- 若没有旧证书，无法使用 https 方式验证， http 不能有重定向


## configuration-snippet

- 推荐，有效

```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet:
      if ($uri = "/.well-known/pki-validation/fileauth.txt") {
        add_header Content-Type text/plain;
        return 200 "1234567890abcdef......";
      }
```


## server-snippet

- 可用，但有时有效

```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/server-snippet: |
      location = /.well-known/pki-validation/fileauth.txt  {
        add_header Content-Type text/plain;
        return 200 "1234567890abcdef......";
      }
```


### 后端服务验证

前提

- DNS 验证太麻烦
- ingress 不支持 snippet (配置成功了，但生成的 nginx 配置信息没有 return 验证信息)


- 关闭 http 重定向 https:

```yaml

metadata:
  annotations:
    nginx.ingress.kubernetes.io/enable-cors: 'true'
```


- 配置 .well-known 转发到后端

```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      - backend:
          service:
            name: shrimp-demo-svc
            port:
              number: 8080
        path: /(.well-known)/(.*)
        pathType: Prefix
```


- 后端响应 文件验证

```java
package com.example.rest;


@RestController
public class FileAuthRest {

    // 若 ingress 移除了前缀
    @GetMapping("/pki-validation/fileauth.txt")
    public String fileauthText1() {
        return "1234567890abcdef......";
    }

    // 若 ingress 未移动前缀
    @GetMapping("/.well-known/pki-validation/fileauth.txt")
    public String fileauthText2() {
      return "1234567890abcdef......";
    }

}

```

- 放行上述接口的权限验证

- 至此，通过文件验证
