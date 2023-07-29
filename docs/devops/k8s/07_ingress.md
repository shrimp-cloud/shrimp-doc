# 安装 Ingress



## 安装

安装文档：https://kubernetes.github.io/ingress-nginx/deploy/
安装过程镜像无法拉取，请看 [k8s 其他内容](docs/devops/k8s/99_others.md) 的 镜像同步方案

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
4. 设置默认IngressClass： 在 `kind: IngressClass` 添加：`metadata.annotations.ingressclass.kubernetes.io/is-default-class: 'true'`
5. 异常：`Error: Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": Post https://ingress-nginx-controller-admission.kube-system.svc:443/networking/v1beta1/ingresses?timeout=10s: context deadline exceeded`
  - 解决方法：删除 `validatingwebhookconfigurations`【可在 yaml 中删除后再 apply，也可以在 apply 后使用命令删除】
```shell
# 原因分析：问题是使用的是Kubernetes版本1.18，但是当前ingress-Nginx中的ValidatingWebhookConfiguration使用了最早的API。这个webhook是ingress-nginx-0.44新加的，主要是防止用户错误配置ingress把pod搞挂了，不用的话，可以删掉
$ kubectl get validatingwebhookconfigurations
# 输出：ingress-nginx-admission
$ kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

安装  ingress
```shell
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
| 注解标签                                              | 注解值                |
|---------------------------------------------------|--------------------|
| nginx.ingress.kubernetes.io/server-snippet        | 用于插入 server 块代码段   |
| nginx.ingress.kubernetes.io/configuration-snippet | 用于插入 location 块代码段 |

示例：
```
nginx.ingress.kubernetes.io/configuration-snippet: if ($schema = http ) { return 301 https://$host/$request_uri;}
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