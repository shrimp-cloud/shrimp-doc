# Kubenetes

> 使用 kubeadm 安装  k8s

---


### 网段规划
- node 网段：192.168.0.0/16
- pod 网段：172.16.0.0/16


安装基础软件包
```shell
yum install -y nfs-utils gcc-c++ libxml2-devel openssl-devel libaio-devel ncurses-devel zlib-devel python-devel epel-release openssh-server socat ipvsadm conntrack ipvsadm
```


配置 k8s repo
```shell
# vim /etc/yum.repos.d/k8s.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
```


### 安装初始化 k8s
```shell
yum install -y kubelet kubeadm kubectl
systemctl enable kubelet
crictl config runtime-endpoint /run/containerd/containerd.sock
kubeadm config print init-defaults > kubeadm.yaml
vim kubeadm.yaml
# 暂时省略 kubeadm.yaml 要修改的内容
# 导入镜像：
ctr -n=k8s.io images import k8s_1.25.0.tar.gz
# 查看镜像
crictl images
# 初始化集群【仅 master】
kubeadm init --config=kubeadm.yaml --ignore-preflight-errors=SystemVerification
```


### 加入集群
```shell
# master 上获取加入获取集群的命令
kubeadm token create --print-join-command
# node 加入集群
kubeadm master_ip:master_port --token xx.xxx --discovery-token-ca-cert-hash sha256:xxxx
# master 查看集群节点
kubectl get nodes
# 给节点打标签
kubectl label nodes ecs1 node-role.kubernetes.io/work=work
kubectl get nodes
```

### 安装k8s网络组件-Calico
```shell
ctr -n=k8s.io images import calico.tar.gz
# master:
kubectl apply -f calico.yaml
kubectl get node
```
