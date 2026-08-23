# 集群 node

> 前几章的初始化步骤需要在**每一台**节点（master 和 node）上都执行；只有"初始化集群"这一步是在 master 上单独完成的（见 04_kubelet.md）
> 本章说明如何将 node 节点加入已初始化好的集群，以及节点的标签、污点管理

## 查看所有 nodes
```shell
# 在 master 上查看集群节点，node 加入成功后 STATUS 会变为 Ready
kubectl get nodes
```

## 在 master 获取加入集群的命令
```shell
# 在 master 上生成一条"加入集群"命令，复制给 node 使用
kubeadm token create --print-join-command
```

## node 加入集群
> 在需要加入的 node 节点上执行上一步生成的命令
```shell
kubeadm join master_ip:master_port --token xx.xxx --discovery-token-ca-cert-hash sha256:xxxx
```

## 给节点打标签
> 标签（Label）用于标识节点特性，例如区分工作节点，配合调度让业务 pod 只调度到指定节点
```shell
kubectl label nodes [name] node-role.kubernetes.io/work=work
kubectl get nodes
```


## 将 master 作为 node 使用

> k8s 默认给 master 打上了"控制平面污点"，业务 pod 不会被调度到 master 上
> 若机器资源有限（如单节点集群），可删除该污点，让 master 也运行业务 pod

查看污点
```shell
kubectl describe node [node_name] | grep Taints
# Taints:             node-role.kubernetes.io/control-plane:NoSchedule
kubectl describe node | grep -E "Name:|Taints:"
```

删除污点
> 污点名后缀加 `-` 表示删除该污点
```shell
kubectl taint nodes [node_name] node-role.kubernetes.io/master-
kubectl taint nodes --all node-role.kubernetes.io/master-
# 【新版本污点名为 node-role.kubernetes.io/control-plane】
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```

标识为 node
```shell
kubectl label nodes [node_name] node-role.kubernetes.io/work=work
```

设置污点
> 污点（Taint）用于让节点"拒绝"某些 pod 调度，需结合 toleration 使用
```shell
kubectl taint node [node_name] node-role.kubernetes.io/master=:PreferNoSchedule
```
- NoSchedule: 一定不能被调度
- PreferNoSchedule: 尽量不要调度
- NoExecute: 不仅不会调度，还会驱逐 Node 上已有的 Pod
