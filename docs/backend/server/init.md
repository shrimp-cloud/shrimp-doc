# 服务器初始化

## 系统安装
- CentOS 7.x

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
hostnamectl set-hostname lzser
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
ntpdate -u time.nist.gov
# 重启时间相关组件
systemctl restart rsyslog
systemctl restart crond
```

## selinux
```shell script
vim /etc/selinux/config
SELINUX=disabled
```
- 仅改配置，重启后生效
- 当前生效：setenforce 0 【不是配置生效，是临时关闭 SELINUX】

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