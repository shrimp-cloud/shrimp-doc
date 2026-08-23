# 其他 k8s 内容

> 本章节放置一些相关度不大，不方便归类，或未完成的工作

## 网段规划
- node 网段：192.168.0.0/16
- pod 网段：10.12.0.0/16


## 镜像同步方案
热心网友的镜像同步方案：
- https://github.com/anjia0532/gcr.io_mirror
  示例：ingress-nginx.controller
1. 发 issue 等待同步，同步后 issue 自动回复新镜像地址
2. 将镜像拉回本地：`crictl pull anjia0532/google-containers.ingress-nginx.controller:v1.5.1`
3. 查看镜像：`crictl images`
4. 使用镜像：`docker.io/anjia0532/google-containers.ingress-nginx.controller:v1.5.1`

## 使用代理同步镜像

- https://github.com/cmliu/CF-Workers-docker.io : 用户数量多，但好像不太安全(本人未测试)

## 创建 namespace 可能的异常及处理

- 创建 namespace:
  - `kubectl create namespace uat`
- 异常: `Error from server (InternalError): Internal error occurred: failed calling webhook "rancher.cattle.io.namespaces.create-non-kubesystem": failed to call webhook: Post "https://rancher-webhook.cattle-system.svc:443/v1/webhook/validation/namespaces?timeout=10s": service "rancher-webhook" not found`
  - 原因: 原来安装了 rancher 的 agent, 遗留 webhook, 创建 namespace 会触发 webhook, 只需要把相关 webhook 删除即可
  - 查看： `kubectl get MutatingWebhookConfiguration` 删除: `kubectl delete MutatingWebhookConfiguration rancher.cattle.io`
  - 查看： `kubectl get ValidatingWebhookConfiguration` 删除: `kubectl delete ValidatingWebhookConfiguration rancher.cattle.io`

## 更换证书
- kubectl delete secrets my-secret -n xxx
- kubectl create secret tls my-secret --cert=ca.pem --key=ca.key --namespace=xxx


## 创建 Ingress 可能的异常及处理

- 导入 Ingress
  - `kubectl apply -f xxx-ingress.yaml`
- 异常: `Error from server (InternalError): error when creating "auth.yaml": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": failed to call webhook: Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": tls: failed to verify certificate: x509: certificate signed by unknown authority`
  - 原因: ValidatingWebhookConfiguration 里面有一个针对证书的验证器，删除就好
  - 查看： `kubectl get ValidatingWebhookConfiguration` 删除: `kubectl delete ValidatingWebhookConfiguration ingress-nginx-admission`

## Ipvsadm

> NodePort 模式开放的端口，可以通过 ipvsadm 查看

```shell
ipvsadm -Ln
```
