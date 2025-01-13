# 初始化

> 虽然说是离线安装，但基础的初始化工作，还是在联网的基础下进行的，后续尽量将这些过程也离线化

## 初始化系统


### 设置ssh

> 略

### 更新系统

```shell
# 清理和更新软件仓库缓存
dnf clean all
dnf update -y
```

### 配置系统

```shell
# 关闭 selinux
# vim /etc/selinux/config
SELINUX=disabled
# 立即生效
setenforce 0

# 禁用 swap
# vim /etc/fstab
# 注释掉 swap

# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 修改内核参数
# vim /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward=1
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
# modprobe br_netfilter
# sysctl -p /etc/sysctl.d/k8s.conf

# 修改主机名
hostnamectl set-hostname k8s-master01

# 以后补充时间同步
# 若是低版本内核，需要考虑升级
```



### 安装常用工具

```shell
dnf install -y tar vim net-tools numactl fontconfig zip unzip wget git telnet
```

