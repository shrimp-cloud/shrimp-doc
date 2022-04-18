# Kubenetes

---

## 系统基本参数

### swap
swap 交换分区，在内存不足时，可以将部分内存数据交换到磁盘内，缓解内存不足问题。磁盘的读写效率比内存小太多，故使用了 swap 后，如果产生内存交换，整个系统将受到影响。

关闭 swap:
```shell
# vim /etc/fstab
注释掉 swap
```

Tips:
1. swapoff -a && swapon -a  # 可以执行命令刷新一次SWAP（将SWAP里的数据转储回内存，并清空SWAP里的数据）
2. sysctl -p  #  (执行这个使其生效，不用重启)


如果仍然想使用 swap, 可配置【不建议】：
```shell
vim /etc/sysconfig/kubelet
KUBELET_EXTRA_ARGS="--fail-swap-on=false"
```


### selinux
关闭原因：非常容易出错且难以定位。可以不使用【有其他的安全策略保证系统安全】

关闭方法：
```shell
vim /etc/selinux/config
SELINUX=disabled
```
- 仅改配置，重启后生效
- 当前生效：setenforce 0 【不是配置生效，是临时关闭 SELINUX】


### 升级内核
- 见：【kernel内核】章节


### Linux内核参数

```shell
# vim /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-iptables=1 # 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤，这样有时会出现L3层的iptables rules去过滤L2的帧的问题
net.bridge.bridge-nf-call-ip6tables=1 # 是否在ip6tables链中过滤IPv6包
net.ipv4.ip_forward=1 # 其值为0,说明禁止进行IP转发；如果是1,则说明IP转发功能已经打开。
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
- sysctl -p  : (执行这个使其生效，不用重启)

---

### 修改hosts
> 自行修改



## kubeadm

### yum源

```shell
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

### 安装
```shell
yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes
```

### 开机启动
```shell
systemctl enable kubelet
```

### 初始化
