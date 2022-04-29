# MySQL

### 环境准备

移除mariadb的影响
```shell
yum remove mariadb-libs -y
```

安装 mysql依赖包
```shell
yum install libaio.x86_64 -y
```

### 安装包下载

- 官网下载地址：https://dev.mysql.com/downloads/mysql/
- 选择RHEL7, x86_64版本 RPM Bundle包


### mysql安装
```shell
# 解压
tar -xvf mysql-*
# 安装
rpm -ivh mysql-community-common-8.0.29-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-plugins-8.0.29-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-8.0.29-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-8.0.29-1.el7.x86_64.rpm
rpm -ivh mysql-community-icu-data-files-8.0.29-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-8.0.29-1.el7.x86_64.rpm
# 启动和自启动
systemctl start mysqld
systemctl enable mysqld
# 初始密码，初始化
初始密码在 /var/log/mysqld.log 里面
初始化：mysql_secure_installation
# 创建用户
CREATE USER 'user_name'@'%' IDENTIFIED BY 'password';
# 给用户授权
GRANT ALL PRIVILEGES ON database_name.* TO 'user_name'@'%'  WITH GRANT OPTION;
# 刷新权限
FLUSH PRIVILEGES;
```

### 防火墙

```shell script
# 检查防火墙是否包含 3306端口
firewall-cmd --list-ports
# 防火墙开放3306
firewall-cmd --permanent --zone=public --add-port=3306/tcp
# reload防火墙
firewall-cmd --reload
```

