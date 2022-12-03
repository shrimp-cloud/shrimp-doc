# Kubenetes

> 使用 kubeadm 安装  k8s

---

## 系统基本参数/规划


### 网段规划
- node 网段：192.168.0.0/16
- pod 网段：172.16.0.0/16


### 修改机器内核参数
```shell
modprobe br_netfilter
```

```shell
# vim /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward=1 # 其值为0,说明禁止进行IP转发；如果是1,则说明IP转发功能已经打开。
net.bridge.bridge-nf-call-iptables=1 # 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤，这样有时会出现L3层的iptables rules去过滤L2的帧的问题
net.bridge.bridge-nf-call-ip6tables=1 # 是否在ip6tables链中过滤IPv6包
vm.swappiness=0 # 禁止使用 swap 空间，只有当系统 OOM 时才允许使用它
vm.overcommit_memory=1 # 不检查物理内存是否够用
vm.panic_on_oom=0 # 开启 OOM
fs.inotify.max_user_instances=8192 # 表示每一个real user ID可创建的inotify instatnces的数量上限，默认128.
fs.inotify.max_user_watches=524288 # 同一用户同时可以添加的watch数目，默认8192。
fs.file-max=52706963 # 文件描述符的最大值
fs.nr_open=52706963 #设置最大微博号打开数
net.ipv6.conf.all.disable_ipv6=1 #禁用IPv6，修为0为启用IPv6
net.netfilter.nf_conntrack_max=2310720 #连接跟踪表的大小，建议根据内存计算该值CONNTRACK_MAX = RAMSIZE (in bytes) / 16384 / (x / 32)，并满足nf_conntrack_max=4*nf_conntrack_buckets，默认262144
```
```shell
# sysctl -p  : (执行这个使其生效，不用重启)
sysctl -p /etc/sysctl.d/k8s.conf
```


### 配置 yum 源

安装 docker repo
```shell
yum install -y yum-utils
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
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

安装基础软件包
```shell
yum install -y device-mapper-persistent-data lvm2 wget net-tools nfs-utils lrzsz gcc gcc-c++ make cmake libxml2-devel openssl-devel curl curl-devel unzip sudo ntp libaio-devel wget vim ncurses-devel autoconf automake zlib-devel python-devel epel-release openssh-server socat ipvsadm conntrack telnet ipvsadm
```

### 安装 containerd 服务

配置文件
```shell
yum install -y containerd.io
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml
```

修改配置
```shell
# vim /etc/containerd/config.toml
SystemdCgroup = true
sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.7"
# systemctl enable containerd --now
```

修改配置
```shell
# vim /etc/crictl.yaml
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
timeout: 10
debug: false
# systemctl restart containerd
```


### 安装 docker
为了能执行 dockerfile 打包

```shell
yum install -y docker-ce
systemctl enable docker --now
```


### 配置 containerd 镜像加速
```shell
# vim /etc/containerd/config.toml
config_path = "/etc/containerd/certs.d"
# mkdir -p /etc/containerd/certs.d/docker.io/
# vim /etc/containerd/certs.d/docker.io/hosts.toml
[host."https://xxxx.mirror.aliyuncs.com",host."https://registry.docker-cn.com"]
 capabilities = ["pull"]
# systemctl restart containerd
```

### 配置 docker 镜像加速器

```shell
# vim /etc/docker/daemon.json
{
  "registry-mirrors": ["https://xxxx.mirror.aliyuncs.com"]
}
# systemctl restart docker
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
