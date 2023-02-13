# 界面 UI



### Dashboard UI
- [官方安装文档](https://kubernetes.io/zh-cn/docs/tasks/access-application-cluster/web-ui-dashboard/)
```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml
```




### kuboard
> Kuboard, 快速在 Kubernetes 落地微服务,官网 https://kuboard.cn/

#### 安装 kuboard
```shell
kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
```

#### 卸载 kuboard
```shell
kubectl delete -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
```





### rancher:docker

#### 前提
- 安装 iptables, 若在 docker 之后安装，要重启docker
- [安装Docker](docs/backend/k8s/docker.md)

#### 安装

```shell
# 稳定版
docker run --privileged -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:stable

# 找密码
docker ps # 获取 container-id
docker logs [container-id] 2>&1 | grep "Bootstrap Password:"

# 新用户名 admin
# 新密码 即时设置

```






### rancher: k8s

> 官方文档： https://docs.ranchermanager.rancher.io/zh/

1. 安装 Helm: https://helm.sh/zh/docs/intro/install/
2. 安装 [Rancher](https://docs.ranchermanager.rancher.io/zh/getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/install-rancher-ha)
```shell
# 添加包含安装 Rancher 的 Chart 的 Helm Chart 仓库
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
# 获取最新的 Rancher Chart
helm fetch rancher-latest/rancher
# 添加 cert-manager 仓库到Helm
helm repo add jetstack https://charts.jetstack.io
helm repo update
# 获取 cert-manager Chart
helm fetch jetstack/cert-manager --version v1.10.1
# 为 cert-manager 下载所需的 CRD 文件
mkdir cert-manager
curl -L -o cert-manager/cert-manager-crd.yaml https://github.com/cert-manager/cert-manager/releases/download/v1.10.1/cert-manager.crds.yaml

# 安装 Cert-Manager
# 为 cert-manager 创建命名空间
kubectl create namespace cert-manager
# 创建 cert-manager CustomResourceDefinition (CRD)。
kubectl apply -f cert-manager/cert-manager-crd.yaml
# 安装 cert-manager。
helm install cert-manager ./cert-manager-v1.10.1.tgz \
    --namespace cert-manager \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller \
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook \
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector \
    --set startupapicheck.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-ctl
```

报错了
Error: INSTALLATION FAILED: failed post-install: timed out waiting for the condition
```shell
# kubectl get pod --all-namespaces
cert-manager   cert-manager-79fb85c9bb-lp7vc              0/1     InvalidImageName   0          130m
cert-manager   cert-manager-cainjector-64bf594857-6qqpd   0/1     InvalidImageName   0          130m
cert-manager   cert-manager-startupapicheck-6c8bx         0/1     InvalidImageName   0          130m
cert-manager   cert-manager-webhook-bfc8b9886-npt52       0/1     InvalidImageName   0          130m
```

```
# 安装  Rancher
kubectl create namespace cattle-system
helm install rancher ./rancher-<VERSION>.tgz \
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set certmanager.version=<CERTMANAGER_VERSION> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # 设置在 Rancher 中使用的默认私有镜像仓库
    --set useBundledSystemChart=true # 使用打包的 Rancher System Chart
```

