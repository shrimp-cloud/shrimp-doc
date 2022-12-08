# node 加入集群

> 在初始化 k8s 集群前的所有步骤，在node 上都在执行，仅在初始化 master 时，只在 master 执行。以下步骤为将 node 添加到 master 的步骤

### 查看所有 nodes
```shell
# master 查看集群节点
kubectl get nodes
```

### 在master获取加入到集群的命令
```shell
# master 上获取加入获取集群的命令
kubeadm token create --print-join-command
```

### node 加入集群
```shell
# node 加入集群
kubeadm master_ip:master_port --token xx.xxx --discovery-token-ca-cert-hash sha256:xxxx
```


### 给节点打标签
```shell
kubectl label nodes [name] node-role.kubernetes.io/work=work
kubectl get nodes
```


### 将 master 作为 node 使用

查看污点
```shell
kubectl describe node [node_name] |grep Taints
# Taints:             node-role.kubernetes.io/control-plane:NoSchedule
```

删除污点
```shell
kubectl taint nodes [node_name] node-role.kubernetes.io/master-
kubectl taint nodes --all node-role.kubernetes.io/master-
# 【污点叫 node-role.kubernetes.io/control-plane】
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```

标识为 node
```shell
kubectl label nodes [node_name] node-role.kubernetes.io/work=work
```

设置污点
```shell
# kubectl taint node [node_name] node-role.kubernetes.io/master=:PreferNoSchedule
node/master01 tainted
```
- NoSchedule: 一定不能被调度
- PreferNoSchedule: 尽量不要调度
- NoExecute: 不仅不会调度, 还会驱逐Node上已有的Pod
