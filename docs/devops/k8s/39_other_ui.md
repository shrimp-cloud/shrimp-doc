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
- [安装Docker](./02_docker.md)
- 版本选择：Rancher v2.7.1 才支持 k8s 1.26, 若使用新版本k8s, 请使用新版本 rancher!
- 版本问题：版本匹配非常混乱，也没找到官方宣称的支持清单。
- rancher 版本: https://ranchermanager.docs.rancher.com/zh/versions

#### 安装

```shell
# v2.7.8
docker run --privileged -d \
  --restart=unless-stopped  \
  -p 7080:80 -p 7443:443 \
  rancher/rancher:v2.7.8

# with ssl
docker run -d \
  --restart=unless-stopped \
  -p 7080:80 -p 7443:443 \
  -v /opt/rancher/ssl/cert.pem:/etc/rancher/ssl/cert.pem \
  -v /opt/rancher/ssl/key.pem:/etc/rancher/ssl/key.pem \
  --privileged \
  rancher/rancher:v2.7.8 \
  --no-cacerts

# 找密码
docker ps # 获取 container-id
docker logs [container-id] 2>&1 | grep "Bootstrap Password:"

# 新用户名 admin
# 新密码 即时设置
```

#### 更换自定义证书
1. 操作前请备份数据，[查看官方文档](https://ranchermanager.docs.rancher.com/zh/v2.6/getting-started/installation-and-upgrade/other-installation-methods/rancher-on-a-single-node-with-docker/upgrade-docker-installed-rancher)
2. 准备证书
2. 修改启动命令 【rancher-data 是1中导出的数据】
```shell
docker run -d --volumes-from rancher-data \
  --restart=unless-stopped \
  -p 7080:80 -p 7443:443 \
  -v /opt/rancher/ssl/cert.pem:/etc/rancher/ssl/cert.pem \
  -v /opt/rancher/ssl/key.pem:/etc/rancher/ssl/key.pem \
  --privileged \
  rancher/rancher:v2.7.8 \
  --no-cacerts
```


#### 导入集群
- 集群管理，导入集群，导入已有集群
- 到目标集群所在机器，下载 yaml: wget --no-check-certificate https://rancher.expmple.com/v3/import/xxxx.yaml
- 【k8s 版本问题】修改 ymal: `beta.kubernetes.io/os` -> `kubernetes.io/os`
- 导入：`kubectl apply -f xxxx.yaml`
- 异常处理
  - 查看 pod 日志：`kubectl logs -n cattle-system cattle-cluster-agent-xxxx-xx`
  - 异常：looking up cattle-system/cattle ca/token: no secret exists for service account cattle-system/cattle
    - Rancher2.6.x 不支持 k8s 1.26, 升级到 rancher 2.7.1 解决



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

