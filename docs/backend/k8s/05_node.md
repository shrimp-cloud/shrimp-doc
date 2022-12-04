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

