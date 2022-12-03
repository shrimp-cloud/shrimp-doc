# 服务器初始化

> 当前章节记录为 k8s 准备的服务器的初始化过程，不包含 k8s 相关组件.
> 当前章节为 Linux 基础知识，只记录操作命令，若与 k8s 不紧密，将不讲解操作原因，而是只放命令

### 要求
- 系统：Centos7.x
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
hostname k8s-master
hostname k8s-node01
hostname k8s-node02
```

### 更新系统
- 更新系统，是每个新系统都建议做的事
```shell
yum update -y
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
systemctl stop firewalld
systemctl disable firewalld
```

### 设置静态IP
- 内容忽略，使用云服务器，默认静态 IP

### 时钟同步

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


### 基础依赖安装
```shell
yum install -y yum-utils epel-release vim net-tools numactl fontconfig lrzsz zip unzip wget htop telnet gcc automake autoconf libtool make
```


### 配置免密访问
> 存在疑问，是否只是为了方便？后面若真遇到问题再回来补充操作

### 配置 hosts
- 原因：可使得主机名直接互通
> 存在疑问，是否只是为了方便？后面若真遇到问题再回来补充操作