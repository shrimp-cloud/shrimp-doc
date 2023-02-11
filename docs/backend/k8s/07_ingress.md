# 安装 Ingress



## 安装

安装文档：https://kubernetes.github.io/ingress-nginx/deploy/
安装过程镜像无法拉取，请看 [k8s 其他内容](99_others.md) 的 镜像同步方案

下载官方 yaml:
```shell
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml
```

修改内容
1. 修改 nginx-ingress-controller 镜像地址为：registry.cn-hangzhou.aliyuncs.com/google_containers/nginx-ingress-controller:v1.5.1
2. 修改 kube-webhook-certgen (2处) 镜像地址为：registry.cn-hangzhou.aliyuncs.com/google_containers/kube-webhook-certgen:v1.5.1
3. 修改 nginx-ingress-controller 的网络模式为 hostNetwork
- 在 nginx-ingress-controller image 的containers上方配置：`hostNetwork: true`
- 在 nginx-ingress-controller image 的containers上方配置：`dnsPolicy: ClusterFirstWithHostNet`

```shell
# 安装
kubectl apply -f deploy.yaml
# 查看状态
kubectl get pods --namespace=ingress-nginx
```



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
| 注解标签                                           | 注解值                                                            |
|------------------------------------------------|----------------------------------------------------------------|
| nginx.ingress.kubernetes.io/configuration-snippet        | if ($schema = http ) { return 301 https://$host/$request_uri;} |

