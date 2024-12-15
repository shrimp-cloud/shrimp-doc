# 其他 k8s内容

> 本章节放置一些相关度不大，不方便类归，或未完成的工作

### 网段规划
- node 网段：192.168.0.0/16
- pod 网段：10.12.0.0/16


### 安装 helm

helm 是kubernetes 包管理器。帮助您管理 Kubernetes 应用
- 官网：https://helm.sh/zh/docs/intro/install/
- 安装
```shell
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```



### 镜像同步方案
热心网友的镜像同步方案：
- https://github.com/anjia0532/gcr.io_mirror
  示例：ingress-nginx.controller
1. 发 issue 等待同步，同步后 issue 自动回复新镜像地址
2. 将镜像拉回本地：`crictl pull anjia0532/google-containers.ingress-nginx.controller:v1.5.1`
3. 查看镜像：`crictl images`
4. 使用镜像：`docker.io/anjia0532/google-containers.ingress-nginx.controller:v1.5.1`


### 创建 namespace 可能的异常及处理

- 创建  namespacce:
  - `kubectl create namespace uat`
- 异常: `Error from server (InternalError): Internal error occurred: failed calling webhook "rancher.cattle.io.namespaces.create-non-kubesystem": failed to call webhook: Post "https://rancher-webhook.cattle-system.svc:443/v1/webhook/validation/namespaces?timeout=10s": service "rancher-webhook" not found`
  - 原因: 原来安装了 rancher的 agent, 遗留 webhook, 创建 命名空间会触发  webhook, 只需要把相关 webhook 删除即可
  - 查看： `kubectl get MutatingWebhookConfiguration` 删除: `kubectl delete MutatingWebhookConfiguration rancher.cattle.io`
  - 查看： `kubectl get ValidatingWebhookConfiguration` 删除: `kubectl delete ValidatingWebhookConfiguration rancher.cattle.io`

### 更换证书
- kubectl delete secrets my-secret -n xxx
- kubectl create secret tls my-secret --cert=ca.pem --key=ca.key --namespace=xxx


### 创建Ingress 可能的异常及处理

- 导入  Ingress
  - `kubectl apply -f xxx-ingress.yaml`
- 异常: `Error from server (InternalError): error when creating "auth.yaml": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": failed to call webhook: Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": tls: failed to verify certificate: x509: certificate signed by unknown authority`
  - 原因: ValidatingWebhookConfiguration 里面有一个针对证书的验证器，删除就好
  - 查看： `kubectl get ValidatingWebhookConfiguration` 删除: `kubectl delete ValidatingWebhookConfiguration ingress-nginx-admission`

### Ipvsadm

> NodePort 模式开放的端口，可以通过 ipvsadm 查看

```shell
ipvsadm -Ln
```
