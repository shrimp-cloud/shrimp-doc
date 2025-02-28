# 安装 calico

> k8s 有多个网络组件可选择，这里使用 Calico


### 安装k8s网络组件-Calico
```shell
# master:
wget https://raw.githubusercontent.com/projectcalico/calico/v3.29.2/manifests/calico.yaml
kubectl apply -f calico.yaml
# 在等待片刻后，可查看 nodes 状态，STATUS 将由 NotReady 变更为 Ready
kubectl get nodes
```

### 无法拉取镜像

- 查看镜像: `kubectl describe pod calico-node-xxxx -n kube-system`
- 得到镜像: `docker.io/calico/cni:v3.29.2`
- 找到一个 x86 又可拉取镜像的服务器: `docker pull docker.io/calico/node:v3.29.2`
- 导出镜像: `docker save -o node.v3.29.2.tar docker.io/calico/node:v3.29.2`
- 将镜像 scp 到目标服务器: `scp node.v3.29.2.tar root@k8s_host:/root`
- 导入镜像: `ctr -n=k8s.io images import node.v3.29.2.tar`


### 加速
若 Calico 初始化时间太长，可先导入镜像
```shell
# 导入镜像：
ctr -n=k8s.io images import calico.tar.gz
# 查看镜像
crictl images
```

Tips: 镜像包的获取，后面有需求再补充
