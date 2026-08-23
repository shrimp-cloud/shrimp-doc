# 服务器初始化

> 当前章节记录为 k8s 准备服务器的初始化过程，不包含 k8s 相关组件
> 本章为 Linux 基础操作，关键步骤会说明原因；与 k8s 关系不大的步骤只放命令

## 要求
- 系统：Rocky Linux 9
- CPU: 2C+
- 内存: 4G+

## 重装
- 云服务器重装太简单了，虚拟机重装自行处理

## 免密 ssh
> 目的：让本机能免密登录服务器，后续执行操作更方便（强烈建议配置）

方式一：一键复制公钥（推荐）
```shell
ssh-copy-id root@服务器IP
```

方式二：手动放置公钥
```shell
# 1. 本地查看公钥内容（若无公钥，先执行 ssh-keygen 一路回车生成）
cat ~/.ssh/id_rsa.pub
# 2. 将上面输出的公钥内容，追加到服务器的 ~/.ssh/authorized_keys 文件末尾
vim ~/.ssh/authorized_keys
```
> 配置完成后，`ssh root@服务器IP` 不再需要输入密码即表示成功

## 修改主机名
- 建议按一定的规范设置主机名
```shell
hostnamectl set-hostname master01
hostnamectl set-hostname node01
hostnamectl set-hostname node02
```

## 更新系统
- 更新系统，是每个新系统都建议做的事
```shell
dnf update -y
```

## 关闭 selinux
> 原因：k8s 相关组件与 SELinux 兼容性不佳，常导致权限类报错，安装前一般将其关闭
```shell
# 修改配置文件，永久关闭（重启后依然生效）
# vim /etc/selinux/config
SELINUX=disabled
# 立即生效（临时，无需重启）
setenforce 0
# 验证状态，输出 Disabled 即成功
getenforce
```

## 关闭 swap
> 原因：kubeadm 初始化默认会检查 swap，未关闭会直接报错；开启 swap 也会干扰 pod 的内存统计
```shell
# 注释掉 /etc/fstab 中 swap 相关的行（永久生效，重启后不再挂载）
vim /etc/fstab
# 立即关闭当前 swap（临时）
swapoff -a
# 验证：输出为空表示已关闭
free -h
```

## 关闭 firewalld
> 说明：本地 firewalld 可能拦截 k8s 组件间通信；云服务器一般通过"安全组"管理端口，因此这里直接关闭
> 若不想关闭，可按下方"按需开放防火墙"仅放行必要端口
```shell
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 按需开放防火墙

# 定义变量（需与 kubeadm 配置的网段保持一致，见 04_kubelet.md 的 podSubnet）
POD_CIDR="10.12.0.0/16"          # Pod 网段
SERVICE_CIDR="10.96.0.0/12"      # Service 网段（kubeadm 默认值）
NODE_TCP_PORTS="6443,2379,2380,10250,30000-32767"

# 添加 INPUT 链规则
firewall-cmd --permanent --add-port=6443/tcp          # Kubernetes API Server
firewall-cmd --permanent --add-port=2379-2380/tcp     # etcd
firewall-cmd --permanent --add-port=10250/tcp         # Kubelet API
firewall-cmd --permanent --add-port=10257/tcp         # kube-controller-manager
firewall-cmd --permanent --add-port=10259/tcp         # kube-scheduler
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



## 设置静态IP
- 内容忽略，使用云服务器，默认静态 IP



## 基础依赖安装
> 安装常用工具，其中 `numactl`、`gcc`、`cmake` 等为部分中间件/组件编译或运行所需
```shell
dnf -y install epel-release vim net-tools numactl fontconfig lrzsz zip unzip wget htop telnet gcc automake autoconf libtool make cmake curl curl-devel
```

## 时间同步
> 原因：k8s 证书、日志、分布式组件协调都依赖准确的时钟，节点间时间偏差会导致证书校验失败等异常

- 设置时区: `timedatectl set-timezone Asia/Shanghai`

- RHEL 7

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

- Rocky Linux 9

```shell
# 安装chrony
dnf install chrony
# 自动启动
systemctl enable chronyd
# 启动
systemctl start chronyd
# 进行一次时间同步
chronyc makestep
# 查看时间同步状态
chronyc sources -v
```



## 修改内核参数
> 原因：k8s 集群网络（如 Calico/Flannel）依赖 Linux 内核的转发与桥接过滤能力，需开启以下参数

关键参数
```shell
# vim /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward=1                # 开启 IP 转发，允许宿主机转发 pod 之间的流量
net.bridge.bridge-nf-call-iptables=1 # 让 iptables 能过滤网桥流量（k8s 网络组件必需）
net.bridge.bridge-nf-call-ip6tables=1
# 加载网桥过滤内核模块（bridge-nf 参数依赖它）
modprobe br_netfilter
# 使配置生效
sysctl -p /etc/sysctl.d/k8s.conf
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


## 配置免密访问
> 节点间的免密并非 k8s 必需，主要为了方便管理员在各节点间操作，配置方法与"免密 ssh"小节一致

## 配置 hosts
> 原因：让集群内各节点能用主机名互相访问；不配置时 kubeadm 初始化会收到相关警告（不影响功能）
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

## 外部防火墙
| 端口   | 用途         |
|------|------------|
| 22   | ssh 远程     |
| 80   | http 访问    |
| 443  | https 访问   |
| 6443 | kubectl 访问 |
