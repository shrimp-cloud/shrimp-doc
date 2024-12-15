# MySQL

## 安装

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
# 创建并授权用户
GRANT ALL PRIVILEGES ON database_name.* TO 'user_name'@'%' IDENTIFIED BY 'user_password' WITH GRANT OPTION;
# 刷新权限
FLUSH PRIVILEGES;
```


### 自定义配置
```shell
# vim /etc/my.cnf
[mysqld]
port = 13307 # 自定义端口
character-set-server = utf8mb4 # 设置 MySQL 服务器的默认字符集
collation-server = utf8mb4_unicode_ci # 设置 MySQL 服务器的默认排序规则

[client]
default-character-set=utf8mb4 # 设置 MySQL 客户端的默认字符集

[mysql]
default-character-set=utf8mb4 # 设置 mysql 命令行客户端的默认字符集

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


### 编译安装
```shell
# 安装依赖
yum install gcc gcc‐c++ make cmake ncurses‐devel  autoconf
# 新建MySQL用户
groupadd mysql
useradd ‐r ‐g mysql ‐s /bin/false mysql
# 安装
tar ‐xf mysql‐5.6.26.tar.gz
cd mysql‐5.6.26
cmake . ‐DENABLED_LOCAL_INFILE=1 ‐DCMAKE_INSTALL_PREFIX=/usr/local/mysql && make && make install
# 目录规划
数据目录:$lvm分区/$项目名称/data
日志目录:$lvm分区/$项目名称/log
tmp目录:$lvm分区/$项目名称/tmp
```


## 运维

### 常用命令

- 查询是否锁表: show OPEN TABLES where In_use > 0;
- 查询进程:show processlist
- kill 进程: kill    id
- 查看进行中的事务: SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
- 查看正在锁的事务: SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;
- 查看等待锁的事务: SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;
- 当前运行的所有事务: information_schema.innodb_trx
- 当前出现的锁: information_schema.innodb_locks
- 锁等待的对应关系: information_schema.innodb_lock_waits

### 慢查询记录
```shell
[mysqld]
slow_query_log = ON
slow_query_log_file = /var/lib/mysql/test-slow.log
long_query_time = 1
# 测试
select sleep(2);
```

## 配置

### 修改密码
```shell
ALTER USER `root`@`%` IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### 强制修改密码
```shell
# vim /etc/my.cnf
[mysqld]
skip-grant-tables

# 登录并修改密码
# MySQL 5.6 及以下
UPDATE user SET Password = password ( ‘new-password’ ) WHERE User = ‘root’ ;

# MySQL:5.7
UPDATE mysql.user set authentication_string=password('123qwe') where user='root' and Host = 'localhost';

flush privileges;
```

### only_full_group_by
> 建议更严格的模式
```shell
[mysqld]
sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

### 安装 Mariadb
```shell
yum install mariadb-server -y
systemctl enable/start/stop/restart mariadb
mysql_secure_installation # 初始化
```

### 大小写敏感
```shell
[mysqld]
lower_case_table_names=1 # 【1不敏感，0敏感】
```

### 导入导出

####  导出
```shell
# 按 schema 维度导出
mysqldump -P 3306 -uroot -p [schema_name] > /path/to/backup_date.sql
zip -r /path/to/backup_date.zip /path/to/backup_date.sql

# 导入
mysql -P 3306 -uroot -p [schema_name] < /path/to/backup_date.sql
```

#### 导入



## 使用

### 生成随机数

sql 生成
```sql
SELECT
	(@i :=@i + 1) i,
	table_name.*
FROM
    table_name,
	(SELECT @i := 0) AS it
```

存储过程生成
```sql
CREATE DEFINER= CURRENT_USER FUNCTION `rand_string`(n INT) RETURNS varchar(255) CHARSET utf8
    COMMENT '获取随机数'
BEGIN

    DECLARE chars_str varchar(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    DECLARE return_str varchar(255) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    WHILE i < n DO
        SET return_str = concat(return_str,substring(chars_str , FLOOR(1 + RAND()*62 ),1));
        SET i = i +1;
    END WHILE;
    RETURN return_str;
END
```

### 生成时间 序列
```sql
WITH recursive time_sequence(year_time) AS (
    SELECT CAST('2020-01-01 00:00:00' as datetime)
    UNION ALL
    SELECT year_time + INTERVAL 1 YEAR FROM time_sequence WHERE year_time < NOW()
)
SELECT * FROM sequence;
```
