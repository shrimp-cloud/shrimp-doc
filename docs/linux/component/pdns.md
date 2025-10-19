# PowerDNS


## 前置步骤

- 以 RockyLinux 9 为例，需提前安装 RockyLinux 9
- 更新系统，安装源: `dnf update -y && dnf install epel-release -y`
- 准备数据库 mysql (其他可选: MySQL/MariaDB/PostgreSQL/SQLite3)
- 创建 pdns 库，并导入 DDL: https://github.com/PowerDNS/pdns/blob/master/modules/gmysqlbackend/schema.mysql.sql



## 安装 PowerDNS

### 安装

```shell
# 安装 pdns 和 pdns-backend-mysql
dnf install -y pdns pdns-backend-mysql
```

### 配置

```shell
# 启用守护进程模式
daemon=yes

# 监听所有 IP 地址
local-address=0.0.0.0
local-port=53

# 设置后端为 gmysql (Generic MySQL) (注意移除  launch=bind)
launch=gmysql

# MySQL 连接参数
gmysql-host=localhost
gmysql-user=powerdns
gmysql-password=your_strong_password_here
gmysql-dbname=powerdns
gmysql-port=3306

# 可选：设置查询缓存大小
cache-ttl=20
negquery-cache-ttl=60

# 日志级别（调试时可设为 7，生产环境建议 4 或更低）
loglevel=4

# 启用 Web 服务器（API 依赖它）
webserver=yes
# Web 服务器监听地址（建议绑定到内网或 localhost）
webserver-address=127.0.0.1
# Web 服务器端口（默认 8081）
webserver-port=8081
# 启用 REST API
api=yes
# 设置 API 密钥（必须设置，使用强密码）
api-key=your_very_secure_api_key_here
# （可选）允许的 API 访问来源（CIDR 格式）
# webserver-allow-from=127.0.0.1,192.168.1.0/24

```


### 启动

```shell
systemctl start pdns
systemctl enable pdns
systemctl status pdns
```

### 防火墙

```shell
firewall-cmd --add-service=dns --permanent
firewall-cmd --reload
```



## 安装 PowerDNS Admin



```shell
docker run -d \
  --name powerdns-admin \
  -p 9191:80 \
  -e SQLALCHEMY_DATABASE_URI="mysql+pymysql://root:1qaz2$WSX@host.docker.internal/pdns" \
  -e SECRET_KEY=8a9dbc8e4b059ed1f3711177212934747083e4df989f4614df720f5b57485134 \
  -e PDNS_API_URL=http://host.docker.internal:8081 \
  -e PDNS_API_KEY=your_very_secure_api_key_here \
  --add-host=host.docker.internal:host-gateway \
  -v pda-data:/data \
  --restart=always \
  powerdnsadmin/pda-legacy:latest
```

- 注册  admin 账号

- 以上无法使用 mysql, 移除后自动使用 sqlite3
- 缺少 pymysql 驱动。。

