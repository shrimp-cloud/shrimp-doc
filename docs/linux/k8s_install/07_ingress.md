# 安装 Ingress

> 安装文档：https://kubernetes.github.io/ingress-nginx/deploy/
> 安装过程镜像无法拉取，请看 [k8s 其他内容](99_others.md) 的镜像同步方案

## 安装

### 下载 yaml

```shell
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.15.1/deploy/static/provider/cloud/deploy.yaml
```

### 修改内容

1. 修改 nginx-ingress-controller 镜像地址为：registry.aliyuncs.com/google_containers/nginx-ingress-controller:v1.15.1
2. 修改 kube-webhook-certgen (2处) 镜像地址为：registry.aliyuncs.com/google_containers/kube-webhook-certgen:v1.6.9
3. 修改 nginx-ingress-controller 的网络模式为 hostNetwork
   - 在 nginx-ingress-controller 的 containers 上方配置：`hostNetwork: true`
   - 在 nginx-ingress-controller 的 containers 上方配置：`dnsPolicy: ClusterFirstWithHostNet`
4. 设置默认 IngressClass：在 `kind: IngressClass` 添加：`metadata:annotations:ingressclass.kubernetes.io/is-default-class: 'true'`
5. 异常：`Error: Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": Post https://ingress-nginx-controller-admission.kube-system.svc:443/networking/v1/ingresses?timeout=10s: context deadline exceeded`
   - 原因：admission webhook 校验失败（controller 未就绪或证书校验失败均可能触发），若不需要该校验可删除
   - 解决方法：删除 `validatingwebhookconfigurations`【可在 yaml 中删除后再 apply，也可以在 apply 后使用命令删除】

```shell
$ kubectl get validatingwebhookconfigurations
# 输出：ingress-nginx-admission
$ kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

### 安装

```shell
kubectl apply -f deploy.yaml
# 查看状态
kubectl get pods --namespace=ingress-nginx
```


## 使用

- 见 [使用文档](../k8s_guide/05_ingress)
