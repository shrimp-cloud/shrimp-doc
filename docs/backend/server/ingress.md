# Ingress

> Ingress 相关知识点

## 跨域问题解决

注解标签 | 注解值 
---|---
nginx.ingress.kubernetes.io/enable-cors | true
nginx.ingress.kubernetes.io/cors-allow-origin | *
nginx.ingress.kubernetes.io/cors-allow-methods | GET, POST, PUT, DELETE, OPTIONS
nginx.ingress.kubernetes.io/cors-allow-headers | DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,token

说明
- 此处的配置，与 nginx 或代码内的配置，不完全一致。具体特性需要在实际使用过程中补充
- cors-allow-origin 需要确认，是否支持cookie?
