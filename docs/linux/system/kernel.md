# kernel内核

> 此处指Linux内核。内核起到完成IO驱动设备管理,TCP/IP,以及任务调度。正常情况下，操作系统的内核参数都有初始值，我们无需修改它们，但在特定情况下，我们需要对内核参数进行修改，甚至是升级。


## 修改内核参数

配置修改
```shell
# 方法1：直接修改 sysctl.conf 配置文件：
vim /etc/sysctl.conf
# 使得配置立即生效：
sysctl -p /etc/sysctl.conf

# 方法2：按特定需求，在 sysctl.d 下创建 xx.conf 文件并添加配置参数，如为安装 k8s 而修改的配置参数：
vim /etc/sysctl.d/k8s.conf
# 使得配置立即生效：
sysctl -p /etc/sysctl.d/k8s.conf

# 以上省略了参数配置及保存的过程
```

常用配置及含义
```shell
net.ipv4.tcp_keepalive_time=600 #此参数表示TCP发送keepalive探测消息的间隔时间(秒)
net.ipv4.tcp_keepalive_intvl=30 #tcp检查间隔时间（keepalive探测包的发送间隔）
net.ipv4.tcp_keepalive_probes=10  #tcp检查次数（如果对方不予应答，探测包的发送次数）
net.ipv6.conf.all.disable_ipv6=1 #禁用IPv6，修为0为启用IPv6
net.ipv6.conf.default.disable_ipv6=1 #禁用IPv6，修为0为启用IPv6
net.ipv6.conf.lo.disable_ipv6=1 #禁用IPv6，修为0为启用IPv6
net.ipv4.neigh.default.gc_stale_time=120 #ARP缓存条目超时
net.ipv4.conf.all.rp_filter=0  #默认为1，系统会严格校验数据包的反向路径，可能导致丢包
net.ipv4.conf.default.rp_filter=0 #不开启源地址校验
net.ipv4.conf.default.arp_announce=2 #始终使用与目的IP地址对应的最佳本地IP地址作为ARP请求的源IP地址
net.ipv4.conf.lo.arp_announce=2 #始终使用与目的IP地址对应的最佳本地IP地址作为ARP请求的源IP地址
net.ipv4.conf.all.arp_announce=2 #始终使用与目的IP地址对应的最佳本地IP地址作为ARP请求的源IP地址
net.ipv4.ip_local_port_range= 45001 65000 # 定义网络连接可用作其源（本地）端口的最小和最大端口的限制，同时适用于TCP和UDP连接。
net.ipv4.ip_forward=1 # 其值为0,说明禁止进行IP转发；如果是1,则说明IP转发功能已经打开。
net.ipv4.tcp_max_tw_buckets=6000 #配置服务器 TIME_WAIT 数量
net.ipv4.tcp_syncookies=1 #此参数应该设置为1，防止SYN Flood
net.ipv4.tcp_synack_retries=2 #表示回应第二个握手包（SYN+ACK包）给客户端IP后，如果收不到第三次握手包（ACK包），进行重试的次数（默认为5）
net.bridge.bridge-nf-call-ip6tables=1 # 是否在ip6tables链中过滤IPv6包
net.bridge.bridge-nf-call-iptables=1 # 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤，这样有时会出现L3层的iptables rules去过滤L2的帧的问题
net.netfilter.nf_conntrack_max=2310720 #连接跟踪表的大小，建议根据内存计算该值CONNTRACK_MAX = RAMSIZE (in bytes) / 16384 / (x / 32)，并满足nf_conntrack_max=4*nf_conntrack_buckets，默认262144

net.ipv6.neigh.default.gc_thresh1=8192
net.ipv6.neigh.default.gc_thresh2=32768
net.ipv6.neigh.default.gc_thresh3=65536

# gc_thresh3 是表大小的绝对限制
# gc_thresh2 设置为等于系统的最大预期邻居条目数的值，在这种情况下，gc_thresh3 应该设置为一个比 gc_thresh2 值高的值，例如，比 gc_thresh2 高 25%-50%，将其视为浪涌容量。
# gc_thresh1 提高到较大的值；此设置的作用是，如果表包含的条目少于 gc_thresh1，内核将永远不会删除（超时）过时的条目。

net.core.netdev_max_backlog=16384 # 每CPU网络设备积压队列长度
net.core.rmem_max = 16777216 # 所有协议类型读写的缓存区大小
net.core.wmem_max = 16777216 # 最大的TCP数据发送窗口大小
net.ipv4.tcp_max_syn_backlog = 8096 # 第一个积压队列长度
net.core.somaxconn = 32768 # 第二个积压队列长度
fs.inotify.max_user_instances=8192 # 表示每一个real user ID可创建的inotify instatnces的数量上限，默认128.
fs.inotify.max_user_watches=524288 # 同一用户同时可以添加的watch数目，默认8192。
fs.file-max=52706963 # 文件描述符的最大值
fs.nr_open=52706963 #设置最大微博号打开数
kernel.pid_max = 4194303 #最大进程数
net.bridge.bridge-nf-call-arptables=1 #是否在arptables的FORWARD中过滤网桥的ARP包
vm.swappiness=0 # 禁止使用 swap 空间，只有当系统 OOM 时才允许使用它
vm.overcommit_memory=1 # 不检查物理内存是否够用
vm.panic_on_oom=0 # 开启 OOM
vm.max_map_count = 262144
```



## 关注内核？
在某些场景下，你必需关注内核：
1. CentOS 7.x 系统自带的3.10.x内核存在一些Bugs.导致运行的Docker.Kubernetes不稳定。
2. 多内核存在，会占用较大的 /boot 空间，若空间不足，需要考虑清理


## 查看内核版本
```shell
uname -a
# output: Linux localhost 3.10.0-1160.62.1.el7.x86_64 #1 SMP Tue Apr 5 16:57:59 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
```
内核为：3.10.0-1160.62.1.el7.x86_64

## 升级内核

### 安装 ELRepo 最新版本

载入公钥
```shell
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
```
安装 ELRepo 最新版本
```shell
yum install -y https://www.elrepo.org/elrepo-release-7.el7.elrepo.noarch.rpm
```

### 升级

列出可以使用的 kernel 包版本
```shell
yum list available --disablerepo=* --enablerepo=elrepo-kernel
```
Tips:
- lt：长期维护版
- ml：最新稳定版

安装指定内核版本
```shell
yum install -y kernel-lt-5.4.189-1.el7.elrepo --enablerepo=elrepo-kernel
```

查看系统可用内核
```shell
# grub引导
cat /boot/grub2/grub.cfg | grep menuentry
# efi引导
cat /etc/grub2-efi.cfg | grep menuentry
```

设置开机从新内核启动
```shell
grub2-set-default "CentOS Linux (5.4.189-1.el7.elrepo.x86_64) 7 (Core)"
```

查看内核启动项
```shell
grub2-editenv list
# output: saved_entry=CentOS Linux (5.4.189-1.el7.elrepo.x86_64) 7 (Core)
```

重启系统使内核生效
```shell
init 6
```

## 删除旧内核

列表现有内核
```shell
rpm -q kernel
```

删除内核
```shell
yum remove kernel-3.10.0-1160.el7.x86_64
```

