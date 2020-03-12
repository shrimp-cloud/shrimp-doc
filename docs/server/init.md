# N服务器初始化

## 系统安装
- CentOS 7.x


## 添加用户/组
```bash
groupadd apps
useradd apps -g apps
passwd apps
```


## 系统升级，依赖安装
```bash
# 更新：
yum update -y
# 修改主机名：
hostnamectl set-hostname lzser
# 删除MariaDB工具：
yum remove mariadb-libs -y
# 安装工具： 
yum install -y epel-release vim net-tools numactl lrzsz zip unzip wget htop  git 

```
