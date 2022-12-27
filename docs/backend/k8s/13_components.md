# 组件  plugins


## Ingress

### 安装

安装文档：https://kubernetes.github.io/ingress-nginx/deploy/
安装过程镜像无法拉取，请看 [k8s 其他内容](99_others.md) 的 镜像同步方案
```shell
# 官方安装（网络不通）：
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml

# 下载 yaml
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml
# 查找镜像
docker search controller:v1.5.1 --no-trunc
# 更换镜像
vim deploy.yaml # controller, kube-webhook-certgen(两处) 需要替换镜像地址
# 安装
kubectl apply -f deploy.yaml
# 查看状态
kubectl get pods --namespace=ingress-nginx
```

Ingress 安装镜像替换：
- controller: docker.io/anjia0532/google-containers.ingress-nginx.controller:v1.5.1
- kube-webhook-certgen: docker.io/anjia0532/google-containers.ingress-nginx.kube-webhook-certgen:v20220916-gd32f8c343



### 跨域问题解决

| 注解标签                                           | 注解值                             |
|------------------------------------------------|---------------------------------|
| nginx.ingress.kubernetes.io/enable-cors        | true                            |
| nginx.ingress.kubernetes.io/cors-allow-origin  | *                               |
| nginx.ingress.kubernetes.io/cors-allow-methods | GET, POST, PUT, DELETE, OPTIONS |
| nginx.ingress.kubernetes.io/cors-allow-headers | Content-Type,token              |

说明
- 此处的配置，与 nginx 或代码内的配置，不完全一致。具体特性需要在实际使用过程中补充
- cors-allow-origin 需要确认，是否支持cookie?

### https 配置

默认情况下，若启用了 https， 那么 http 请求会自动跳转到 https, 可通过注解关闭跳转
```
nginx.ingress.kubernetes.io/ssl-redirect=false
```

### 自定义 location逻辑
| 注解标签                                           | 注解值                                                            |
|------------------------------------------------|----------------------------------------------------------------|
| nginx.ingress.kubernetes.io/configuration-snippet        | if ($schema = http ) { return 301 https://$host/$request_uri;} |