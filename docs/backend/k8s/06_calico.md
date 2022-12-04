# 安装 Calico

> k8s 有多个网络组件可选择，这里使用 Calico


### 安装k8s网络组件-Calico
```shell
# master:
wget https://docs.projectcalico.org/manifests/calico.yaml
kubectl apply -f calico.yaml
# 在等待片刻后，可查看 nodes 状态，STATUS 将由 NotReady 变更为 Ready
kubectl get nodes
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
