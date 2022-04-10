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
# 删除MariaDB工具：
yum remove mariadb-libs -y
# 安装工具： 
yum install -y epel-release yum-utils
yum install -y vim net-tools numactl lrzsz zip unzip wget htop git telnet fontconfig
yum install -y gcc automake autoconf libtool make

```

## selinux
```shell script
vim /etc/selinux/config
SELINUX=disabled
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


## 其他工具
```shell script
jdk, maven 自行下载
```

## mysql
```shell script
yum install libaio.x86_64 -y

mysql-community 8.0:
rpm -ivh mysql-community-common-8.0.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-plugins-8.0.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-8.0.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-8.0.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-icu-data-files-8.0.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-8.0.28-1.el7.x86_64.rpm

systemctl start mysqld
systemctl enable mysqld
初始密码在 /var/log/mysqld.log 里面
初始化：mysql_secure_installation

CREATE USER 'lz'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON lz_dev.* TO 'lz'@'%'  WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

## redis
```shell script
yum install -y redis
vim /etc/redis.conf
daemonize yes  # 进程守护
# bind 127.0.0.1	# 需要注释掉
requirepass redispassword # 需要密码
systemctl start redis
systemctl enable redis

```

## 开机执行指定脚本
```shell script
# vim   /etc/rc.d/rc.local 
# 以 apps 执行 /opt/tomcat-jenkins-9012/bin/startup.sh

su - apps -c '/bin/sh /opt/tomcat-jenkins-9012/bin/startup.sh'

:wq

chmod +x /etc/rc.d/rc.local
```