# CentOS7 服务器初始化

## 系统安装
- CentOS 7.x


## 登录安全

```shell
# 提前开放防火墙
firewall-cmd --permanent --zone=public --add-port=22222/tcp
firewall-cmd --reload

# 修改端口
vim /etc/ssh/sshd_config
# 将 Port 22 修改为 Port 22222

# 禁用密码认证
PasswordAuthentication no
# 确保公钥认证已启用
PubkeyAuthentication yes


# 重启 sshd 让新端口生效
systemctl restart sshd

# 请到云服务端开放 22222 端口

# 使用新端口登录
ssh -p 22222 root@example.com
```


## 添加用户/组
```shell scrip
groupadd apps
useradd apps -g apps
passwd apps
```


## 系统升级，依赖安装
```shell scrip
# 更换 yum 源 (官方已经停止维护了)
sed -i s/mirror.centos.org/vault.centos.org/g /etc/yum.repos.d/*.repo && \
    sed -i s/^#.*baseurl=http/baseurl=https/g /etc/yum.repos.d/*.repo && \
    sed -i s/^mirrorlist=http/#mirrorlist=https/g /etc/yum.repos.d/*.repo && \
    yum makecache

# 更新：
yum update -y
# 修改主机名：
hostnamectl set-hostname shrimp
# 立即生效
bash
# 安装工具：
yum install -y epel-release yum-utils
yum install -y vim net-tools numactl fontconfig lrzsz zip unzip wget htop git telnet
yum install -y gcc automake autoconf libtool make
```

## 时间同步
```shell
# 安装时间同步工具
yum install -y ntp
# 设置及启动时间同步工具
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
systemctl start ntpd
systemctl enable ntpd
# 进行一次时间同步
ntpdate -u cn.pool.ntp.org
# 重启时间相关组件
systemctl restart rsyslog
systemctl restart crond
```

```shell
# crontab -e
0-59/10 * * * * /usr/sbin/ntpdate cn.pool.ntp.org | logger -t NTP
# systemctl restart crond
```

## selinux
关闭原因：非常容易出错且难以定位。可以不使用【有其他的安全策略保证系统安全】
```shell script
vim /etc/selinux/config
SELINUX=disabled
```
- 仅改配置，重启后生效
- 当前生效：setenforce 0 【不是配置生效，是临时关闭 SELINUX】



## 关闭 swap
swap 交换分区，在内存不足时，可以将部分内存数据交换到磁盘内，缓解内存不足问题。磁盘的读写效率比内存小太多，故使用了 swap 后，如果产生内存交换，整个系统将受到影响。

关闭 swap:
```shell
# vim /etc/fstab
注释掉 swap
```

Tips:
1. swapoff -a && swapon -a  # 可以执行命令刷新一次SWAP（将SWAP里的数据转储回内存，并清空SWAP里的数据）
2. sysctl -p  #  (执行这个使其生效，不用重启)

安装 k8s 时，如果仍然想使用 swap, 可配置【不建议】：
```shell
vim /etc/sysconfig/kubelet
KUBELET_EXTRA_ARGS="--fail-swap-on=false"
```

## 网络
位置：
```shell
cd /etc/sysconfig/network-scripts/
```

### DHCP
```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="dhcp"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
# 名称可能不一样
NAME="enp0s3"
# UUID 在每台电脑都不一样
UUID="5a84509d-72b5-464b-970a-70adf9d533e0"
DEVICE="enp0s3"
ONBOOT="yes"
```

### 固定 IP
```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
# 名称可能不一样
NAME="enp0s3"
DEVICE="enp0s3"
ONBOOT="yes"

GATEWAY=172.12.12.1
IPADDR=172.12.12.101
NETMASK=172.12.12.0
DNS1=172.12.12.1
DNS2=114.114.115.115

```


### 生效
```shell
systemctl restart network
```


## 修改dns
```shell
# vim /etc/resolv.conf
nameserver 172.12.12.1
nameserver 114.114.114.114
```


## 生成公钥
```shell script
ssh-keygen -t rsa -C "dev01@wkclz.com"
```

## 配置公钥
```shell script
mkdir .ssh
chmod 700 .ssh/
cd .ssh
vim authorized_keys
chmod 600 authorized_keys
```

## firewalld
```shell script
systemctl start firewalld
systemctl enable firewalld

firewall-cmd --permanent --zone=public --add-port=80/tcp
firewall-cmd --permanent --zone=public --add-port=443/tcp
firewall-cmd --permanent --zone=public --add-port=3306/tcp
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --reload
firewall-cmd --list-ports
firewall-cmd --list-all
```

## iptables-services
安装
```shell
yum install -y iptables-services
```
操作
```shell
systemctl start iptables
systemctl enable iptables
```


## 开机启动
```shell
# vim /etc/rc.d/rc.local
# 添加需要开机运行的脚本
# 再给 rc.local +x
```



## 其他工具
```shell script
maven 自行下载
```


## 开机执行指定脚本
```shell script
# vim   /etc/rc.d/rc.local
# 以 apps 执行 /opt/tomcat-jenkins-9012/bin/startup.sh

su - apps -c '/bin/sh /opt/tomcat-jenkins-9012/bin/startup.sh'

:wq

chmod +x /etc/rc.d/rc.local
```


## 命令别名
命令别名可以简化常用的复杂命令，提高效率
方法适用于 Linux, Mac 等类Unix

```shell
# vim ~/.bash_profile
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```
```shell
source .bash_profile
```
