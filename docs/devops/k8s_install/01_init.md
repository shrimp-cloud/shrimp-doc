# 服务器初始化

> 当前章节记录为 k8s 准备的服务器的初始化过程，不包含 k8s 相关组件.
> 当前章节为 Linux 基础知识，只记录操作命令，若与 k8s 不紧密，将不讲解操作原因，而是只放命令

### 要求
- 系统：Rocky Linux 9
- CPU: 2C+
- 内存: 4G+

### 重装
- 云服务器重装太简单了，虚拟机重装自行处理

### 免密 ssh
本地获取公钥：
```shell
cat .ssh/id_rsa.pub
```
将本地公钥放到远程服务器中：
```shell
vim .ssh/authorized_keys
```

### 修改主机名
- 建议按一定的规范设置主机名
```shell
hostnamectl set-hostname master01
hostnamectl set-hostname node01
hostnamectl set-hostname node02
```

### 更新系统
- 更新系统，是每个新系统都建议做的事
```shell
dnf update -y
```

### 关闭 selinux
```shell
# vim /etc/selinux/config
SELINUX=disabled
# setenforce 0
```

### 关闭 swap
```shell
vim /etc/fstab
# 注释掉 swap
swapoff -a && swapon -a
sysctl -p
```

### 关闭 firewalld
```shell
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 按需开放防火墙

# 定义变量
POD_CIDR="10.42.0.0/16"          # Pod 网段
SERVICE_CIDR="10.43.0.0/16"      # Service 网段
NODE_TCP_PORTS="6443,2379,2380,10250,30000-32767"

# 添加 INPUT 链规则
firewall-cmd --permanent --add-port=6443/tcp          # Kubernetes API Server
firewall-cmd --permanent --add-port=2379-2380/tcp     # etcd
firewall-cmd --permanent --add-port=10250/tcp         # Kubelet API
firewall-cmd --permanent --add-port=30000-32767/tcp   # NodePort 服务范围
firewall-cmd --permanent --add-port=179/tcp           # Calico BGP
firewall-cmd --permanent --add-port=4789/udp          # Flannel VXLAN
firewall-cmd --permanent --add-port=53/udp            # DNS
firewall-cmd --permanent --add-port=53/tcp            # DNS

# 添加 FORWARD 链规则
firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -s $POD_CIDR -j ACCEPT
firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -s $SERVICE_CIDR -j ACCEPT

# 重启防火墙以应用更改
firewall-cmd --reload
```



### 设置静态IP
- 内容忽略，使用云服务器，默认静态 IP



### 基础依赖安装
```shell
dnf -y install epel-release vim net-tools numactl fontconfig lrzsz zip unzip wget htop telnet gcc automake autoconf libtool make cmake curl curl-devel sudo ntp
```

### 时间同步
```shell
yum install -y ntp
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
systemctl start ntpd
systemctl enable ntpd
ntpdate -u cn.pool.ntp.org
crontab -e
# 0-59/10 * * * * /usr/sbin/ntpdate cn.pool.ntp.org | logger -t NTP

# 重启时间相关组件
systemctl restart rsyslog
systemctl restart crond
```


### 修改内核参数
关键参数
```shell
# vim /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward=1
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
# modprobe br_netfilter
# sysctl -p /etc/sysctl.d/k8s.conf
```

所有可能需要修改的参数
> 其他参数在特定的情况下才需要配置
```shell
# modprobe br_netfilter
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
fs.nr_open=52706963 #设置最大进程号打开数
net.ipv6.conf.all.disable_ipv6=1 #禁用IPv6，修为0为启用IPv6
net.netfilter.nf_conntrack_max=2310720 #连接跟踪表的大小，建议根据内存计算该值CONNTRACK_MAX = RAMSIZE (in bytes) / 16384 / (x / 32)，并满足nf_conntrack_max=4*nf_conntrack_buckets，默认262144
```
```shell
# sysctl -p  : (执行这个使其生效，不用重启)
sysctl -p /etc/sysctl.d/k8s.conf
```


### 配置免密访问
> 存在疑问，是否只是为了方便？后面若真遇到问题再回来补充操作

### 配置 hosts
- 原因：若不添加 hosts， 在初始化 kubelet 时会收到警告，但不影响
```shell
vim /etc/hosts
```

添加如下内容
```shell
192.168.0.101 master01
192.168.0.102 master02
192.168.0.103 master03

192.168.0.111 node01
192.168.0.112 node02
192.168.0.113 node03
# 其他更多 node
```

### 外部防火墙
| 端口   | 用途         |
|------|------------|
| 22   | ssh 远程     |
| 80   | http 访问    |
| 443  | https 访问   |
| 6443 | kubectl 访问 |
