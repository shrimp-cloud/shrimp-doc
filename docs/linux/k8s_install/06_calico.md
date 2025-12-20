# 安装 calico

> k8s 有多个网络组件可选择，这里使用 Calico


### 安装k8s网络组件-Calico
```shell
# master:
wget https://raw.githubusercontent.com/projectcalico/calico/v3.32.2/manifests/calico.yaml
kubectl apply -f calico.yaml
# 在等待片刻后，可查看 nodes 状态，STATUS 将由 NotReady 变更为 Ready
kubectl get nodes
```

### 无法拉取镜像

- 查看镜像: `kubectl describe pod calico-node-xxxx -n kube-system`
- 得到镜像: `quay.io/calico/cni:v3.32.2`, `quay.io/calico/node:v3.32.2`, 均需要同步
- 找到一个 x86 又可拉取镜像的服务器: `docker pull docker.io/calico/node:v3.32.2`
- 导出镜像: `docker save -o node.v3.32.2.tar docker.io/calico/node:v3.32.2`
- 将镜像 scp 到目标服务器: `scp node.v3.32.2.tar root@k8s_host:/root`
- 导入镜像: `ctr -n=k8s.io images import node.v3.32.2.tar`


- 报错处理
  - `Back-off restarting failed container upgrade-ipam in pod calico-node-xxxx`: 从 `calico.yaml` 中移除 upgrade-ipam 相关内容
  - `Back-off restarting failed container install-cni in pod calico-node-xxxx`: 从 `calico.yaml` 中移除 upgrade-ipam 相关内容


- 若开启了 firewalld, 可能会拦截 pod 到主机的流程，需要放行

```shell
# 信任 cali+ 接口（通配符）
firewall-cmd --permanent --zone=trusted --add-interface='cali+'
# 信任 tunl0（如果使用 IPIP）
firewall-cmd --permanent --zone=trusted --add-interface=tunl0
# 信任 vxlan.calico（如果使用 VXLAN）
firewall-cmd --permanent --zone=trusted --add-interface=vxlan.calico
# 重载 firewall
firewall-cmd --reload
# 验证配置
firewall-cmd --zone=trusted --list-interfaces
```




### 加速
若 Calico 初始化时间太长，可先导入镜像
```shell
# 导入镜像：
ctr -n=k8s.io images import calico.tar.gz
# 查看镜像
crictl images
```

Tips: 镜像包的获取，后面有需求再补充

