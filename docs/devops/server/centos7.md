# CentOS7 服务器初始化

## 系统安装
- CentOS 7.x


## 修改登录端口

```shell
# 提前开放防火墙
firewall-cmd --permanent --zone=public --add-port=22222/tcp
firewall-cmd --reload

# 修改端口
vim /etc/ssh/sshd_config
# 将 Port 22 修改为 Port 22222

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


## 运维

### VirtualBox虚拟机磁盘扩容
- 问题：扩容CentOS7磁盘规划太小，又不想重装，可以使用扩容方式扩大磁盘空间
- 其他讨论：此处仅为一个实践场景，还可以有其他方式扩充空间

#### 扩充 vdi 虚拟磁盘空间
1. Windows 下，vdi 虚拟磁盘扩容到40G
在虚拟机关闭的场景下，执行如下命令
```shell
VBoxManage.exe modifyhd "/path/to/vdi" --resize 40960
```
执行命令之后，vdi 会在磁盘后方产生一块空白区域

2. CentOS 下,将分区初始化
- fdisk /dev/sda # 对sda 进行分区管理
  - n # 新建分区
  - p # 新建主分区
  - Enter,Enter #  两次回车，将会自动选择开始和结束扇区，创建 sda3
  - t # 修改分区类型
  - 3 # 选择要修改的分区
  - 8e # 将分区类型修改为 Linux LVM
  - w # 写入和退出
  - init 6#  重启后才能识别  sda3 (为什么需要重启才能识别 sda3呢)

3. 将sda3 扩容到根节点
  - pvcreate /dev/sda3 #  初始化 sda3为物理卷
  - vgextend centos /dev/sda3 # 在 VG 内增加额外的 PV
  - lvextend -l 100%VG /dev/mapper/centos-root # 扩容/
  - xfs_growfs /dev/mapper/centos-root # 自动扩展文件系统到最大的可用大小

#### 其他命令
- pvs 查看逻辑卷
- vgs 查看卷组

#### 感谢
- 感谢何老板的指导，扩充了对磁盘卷的认知，也搞明白了不换磁盘也能扩充磁盘空间的原理


### 命令别名
命令别名可以简化常用的复杂命令，提高效率
方法适用于 Linux, Mac 等类Unix
# vim ~/.bash_profile
```shell
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```
```shell
source .bash_profile
```
