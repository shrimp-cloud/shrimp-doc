# 安装 kubelet

> kubelet kubeadm kubectl 安装


### 基础依赖
```shell
yum install -y nfs-utils gcc-c++ libxml2-devel openssl-devel libaio-devel ncurses-devel zlib-devel python-devel epel-release openssh-server socat ipvsadm conntrack ipvsadm
```

### 配置 repo
```shell
# vim /etc/yum.repos.d/k8s.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
```


### 安装初始化 k8s

安装 kubelet kubeadm kubectl
```shell
yum install -y kubelet kubeadm kubectl
```
Tips:
- Kubeadm: 初始化集群的工具包
- kubelet: 安装在集群节点上，用于启动 Pod
- kubectl: 命令行工具

### master 配置初始化参数

配置
```shell
# 设置容器运行时
crictl config runtime-endpoint /run/containerd/containerd.sock
# 使用 kubeadm 初始化 k8s 集群
kubeadm config print init-defaults > kubeadm.yaml
```

修改 kubeadm.yaml 配置
1. 修改控制节点的IP: advertiseAddress 为 master 地址
2. 指定 containerd 容器运行时: criSocket: unix:///run/containerd/containerd.sock
3. 修改 name: node 为自己的名字，示例: `k8s-master`
3. 修改镜像仓库地址为阿里云：imageRepository:  registry.cn-hangzhou.aliyuncs.com/google_containers
4. 指定Pod网段（在dnsDomain下方添加）: podSubnet: 10.12.0.0/16
5. 配置 proxy为ipvs，指定cgroupDriver 为systemd（在末尾添加，整数上 ---）:
```shell
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: ipvs
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
cgroupDriver: systemd
```

### master 初始化k8s
```shell
systemctl enable kubelet --now
systemctl restart containerd
kubeadm init --config=kubeadm.yaml --ignore-preflight-errors=SystemVerification
```

Tips:
1. 初始化报 containerd 运行时错，可以重启一下 containerd
2.
3. ，可以提前拉取镜像

初始化成功，按照提示，执行
```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

初始化完成，得到提示，之后可使用此命令将其他 k8s 加入到此集群中
```shell
kubeadm join xxx.xxx.xxx.xxx:6443 --token abcdef.0123456789abcdef \
--discovery-token-ca-cert-hash sha256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

可以在node上执行，将 node 加入集群了


### 加速
若 k8s 集群初始化时间太长，可先导入镜像
```shell
# 导入镜像：
ctr -n=k8s.io images import k8s_1.25.0.tar.gz
# 查看镜像
crictl images
```


### 证书更新
SSL 证书有效期一年，若 apiserver 无法通信，需要更新证书
```shell
# 查询证书过期时间：
kubeadm certs check-expiration

# 更新证书：
kubeadm certs renew all

# 使用新读书：
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

# 证书还可能用在 cd 流水线，或服务治理平台中，需要同步更新
```


Tips: 镜像包的获取，后面有需求再补充

