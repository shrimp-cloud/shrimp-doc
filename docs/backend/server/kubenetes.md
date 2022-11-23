# Kubenetes

> 使用 kubeadm 安装  k8s

---

## 系统基本参数/规划

### 基本配置
- 静态IP 【自行配置】
- 关闭 selinux 【参照 服务器初始化】
- 设置主机名 【自行设置】
- 设置 hosts 保证使用主机名可互通
- 配置免密访问
- 关闭 swap
- 关闭 firewalld
- 时间同步

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






## 以下未整理



### 升级内核
- 见：【kernel内核】章节


---


## kubeadm


### 安装
```shell
yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes
```

### 开机启动
```shell
systemctl enable kubelet
```

## 初始化master

### 默认配置
```shell
kubeadm config print init-defaults > kubeadm-init.yaml
```
### 修改配置：
将advertiseAddress: 1.2.3.4修改为本机IP地址
将imageRepository: k8s.gcr.io修改为imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers , 这里是修改成阿里云的仓库。
修改节点名称，如果不修改就是默认的’node'
修改podSubnet，如果采用calico作为网络插件，需要改为192.168.0.0/16

```
advertiseAddress: 192.168.1.12
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
kubernetesVersion: v1.23.5
# 在 networking.dnsDomain 同一级下添加
podSubnet: 172.12.0.0/16

# 否需要改呢？疑问
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
featureGates:
  SupportIPVSProxyMode: true
mode: ipvs
```

### 初始化
```shell
kubeadm init --config kubeadm-init.yaml
```
异常汇总：
- [ERROR NumCPU]: the number of available CPUs 1 is less than the required 2 【穷逼】
- [ERROR Mem]: the system RAM (983 MB) is less than the minimum 1700 MB【穷逼】
- Get "http://localhost:10248/healthz": dial tcp 127.0.0.1:10248: connect: connection refused. 【删除配置重试就成功了。。】
- Container runtime network not ready 【删除配置重试就成功了。。】
警告汇总：
- [WARNING Firewalld]: firewalld is active, please ensure ports [6443 10250] are open or your cluster may not function correctly
- [WARNING Swap]: swap is enabled; production deployments should disable swap unless testing the NodeSwap feature gate of the kubelet
- [WARNING Hostname]: hostname "master01" could not be reached
- [WARNING Hostname]: hostname "master01": lookup master01 on 192.168.2.1:53: no such host

异常日志查看：
- systemctl status kubelet
- journalctl -xeu kubelet

### node状态
```shell
kubectl get node
```

### 网络插件
> 未完待续


### master完成
```shell
kubeadm join 192.168.2.253:6443 --token abcdef.0123456789abcdef \
	--discovery-token-ca-cert-hash sha256:51acfbe0edf776d312de133722f8372de6590a0209ec65ee9535c61d2b09133f
```

## node初始化
> 未完待续