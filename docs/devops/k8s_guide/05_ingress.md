# Ingress 使用


## 跨域问题解决

| 注解标签                                           | 注解值                             |
|------------------------------------------------|---------------------------------|
| nginx.ingress.kubernetes.io/enable-cors        | true                            |
| nginx.ingress.kubernetes.io/cors-allow-origin  | *                               |
| nginx.ingress.kubernetes.io/cors-allow-methods | GET, POST, PUT, DELETE, OPTIONS |
| nginx.ingress.kubernetes.io/cors-allow-headers | Content-Type,token              |

说明
- 此处的配置，与 nginx 或代码内的配置，不完全一致。具体特性需要在实际使用过程中补充
- cors-allow-origin 需要确认，是否支持cookie?

## https 配置

默认情况下，若启用了 https， 那么 http 请求会自动跳转到 https, 可通过注解关闭跳转
```
nginx.ingress.kubernetes.io/ssl-redirect=false
```

## 自定义 location逻辑
| 注解标签                                              | 注解值                |
|---------------------------------------------------|--------------------|
| nginx.ingress.kubernetes.io/server-snippet        | 用于插入 server 块代码段   |
| nginx.ingress.kubernetes.io/configuration-snippet | 用于插入 location 块代码段 |

示例：
```
nginx.ingress.kubernetes.io/configuration-snippet: if ($scheme = http ) { return 301 https://$host/$request_uri;}
```

## 开启 tcp/udp转发

ingress-nginx-controller 配置
```yaml
spec:
  containers:
    - args:
        - '--tcp-services-configmap=$(POD_NAMESPACE)/tcp-services'
        - '--udp-services-configmap=$(POD_NAMESPACE)/udp-services'
```

ConfigMap 配置：
```shell
apiVersion: v1
kind: ConfigMap
metadata:
  name: tcp-services
  namespace: ingress-nginx
data:
  # 将 9000 映射至 default/example-go:8080
  9000: "default/example-go:8080"
```
