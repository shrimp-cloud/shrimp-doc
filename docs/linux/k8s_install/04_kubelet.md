# 安装 kubelet

> 本章安装 k8s 的三个核心命令行工具：
> - **kubeadm**：初始化集群、将节点加入集群的工具
> - **kubelet**：每个节点上都运行的系统服务，负责真正启动 pod 中的容器（跟随 systemd 开机自启）
> - **kubectl**：管理集群的命令行客户端（查看/创建/删除集群资源）


## 基础依赖
> 用途说明：`socat`、`conntrack`、`ipvsadm` 是 kube-proxy 与 kubeadm 运行所需的；`nfs-utils` 用于挂载 NFS 存储卷；其余为常见编译/开发库
```shell
dnf -y install nfs-utils gcc-c++ libxml2-devel openssl-devel libaio-devel ncurses-devel zlib-devel python-devel epel-release openssh-server socat ipvsadm conntrack
```

## 配置 repo
```shell
# vim /etc/yum.repos.d/k8s.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.36/rpm/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.36/rpm/repodata/repomd.xml.key
```


## 安装初始化 k8s

安装 kubelet kubeadm kubectl
```shell
dnf -y install kubelet kubeadm kubectl
```
> 新仓库中 kubeadm 不再声明对 cri-tools 的依赖，crictl 不会随安装自动带上，需单独安装：
```shell
dnf -y install cri-tools
```
Tips:
- Kubeadm: 初始化集群的工具包
- kubelet: 安装在集群节点上，用于启动 Pod
- kubectl: 命令行工具

## master 配置初始化参数

配置
```shell
# 设置容器运行时
crictl config runtime-endpoint /run/containerd/containerd.sock
# 使用 kubeadm 初始化 k8s 集群
kubeadm config print init-defaults > kubeadm.yaml
```

修改 kubeadm.yaml 配置
1. 修改控制节点的 IP: `advertiseAddress` 为 master 地址（kubeadm 默认取内网 IP，多网卡时需显式指定）
2. 指定容器运行时为 containerd: `criSocket: unix:///run/containerd/containerd.sock`（默认值指向 docker 的 socket，必须改）
3. 修改 `name` 为自己的节点名，示例: `k8s-master`
4. 修改镜像仓库地址为阿里云：`imageRepository: registry.aliyuncs.com/google_containers`（若能直接获取官方镜像，则不需要）
5. 注意 `kubernetesVersion` 的版本，需要与 `kubeadm config images list` 返回的镜像版本一致，否则无法使用手动导入的镜像
6. 指定 Pod 网段（在 dnsDomain 下方添加）: `podSubnet: 10.12.0.0/16`（需与 01_init.md 防火墙 FORWARD 规则中的 POD_CIDR 保持一致）
7. 配置 proxy 为 ipvs，指定 cgroupDriver 为 systemd（在文件末尾追加，用 `---` 分隔）:
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

## master 初始化 k8s
```shell
systemctl enable kubelet --now
systemctl restart containerd
# 查看初期需要获取的镜像
kubeadm config images list --config=kubeadm.yaml
# 提前拉取镜像
kubeadm config images pull --config=kubeadm.yaml
# 初始化集群
kubeadm init --config=kubeadm.yaml --ignore-preflight-errors=SystemVerification
# 初始化出现意外，可重置 kubeadm, 方便再次初始化
kubeadm reset --force
```

Tips:
1. 初始化报 containerd 运行时错，可以重启一下 containerd
2. kubeadm config images list, 可以查看需要拉取的镜像
3. kubeadm config images pull, 可以提前拉取镜像

初始化成功，按照提示，执行
```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

初始化完成，得到提示，之后可使用此命令将其他 k8s 加入到此集群中
```shell
# kubeadm token create --print-join-command
kubeadm join xxx.xxx.xxx.xxx:6443 --token abcdef.0123456789abcdef \
--discovery-token-ca-cert-hash sha256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

可以在node上执行，将 node 加入集群了


## 加速
若 k8s 集群初始化时间太长，可先在外网机器上把镜像打包并导入（镜像包获取方式见 98_pull_images.md 或 99_others.md 的镜像同步方案）
```shell
# 导入镜像（k8s_<版本>.tar.gz 替换为实际的镜像包文件名）
ctr -n=k8s.io images import k8s_<版本>.tar.gz
# 查看镜像
crictl images
```


## 证书更新
SSL 证书有效期一年，若 apiserver 无法通信，需要更新证书
```shell
# 查询证书过期时间：
kubeadm certs check-expiration

# 更新证书：
kubeadm certs renew all

# 使用新证书：
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

# 证书还可能用在 cd 流水线，或服务治理平台中，需要同步更新

#集群仍然缓存着旧证书：

# 备份 manifests 目录
mv /etc/kubernetes/manifests /etc/kubernetes/manifests.bak
# 创建一个新的空目录
mkdir /etc/kubernetes/manifests
# 检查 Pod 是否已经消失 (或重启)
crictl ps | grep -E "apiserver|controller|scheduler"
# 停止 Kubelet 以确保环境干净（可选，但推荐）
systemctl stop kubelet
# 将备份的文件移回
mv /etc/kubernetes/manifests.bak/* /etc/kubernetes/manifests/
# 启动 Kubelet
systemctl start kubelet
# 查看 Pod 状态
kubectl get pods -n kube-system | grep -E "kube-apiserver|kube-controller|kube-scheduler|etcd"
# 查看节点状态
kubectl get nodes
```


Tips: 镜像包的获取，后面有需求再补充

