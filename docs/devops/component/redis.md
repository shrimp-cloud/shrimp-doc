# Redis

## 主机安装单机版

```shell script
yum install -y redis
vim /etc/redis.conf
daemonize yes  # 进程守护
# bind 127.0.0.1	# 需要注释掉
port 16380
requirepass redispassword # 需要密码
systemctl start redis
systemctl enable redis
```


## Docker安装单机版

### 目录准备
- 以/opt/redis为例
```shell
mkdir -p /opt/docker/redis
mkdir -p /opt/docker/redis/data
touch /opt/docker/redis/redis.conf
touch /opt/docker/redis/redis.sh
```

### 配置文件准备
```shell
# vim /opt/docker/redis/redis.conf
# Redis默认不是以守护进程的方式运行，可以通过该配置项修改，使用yes启用守护进程
daemonize no
# 指定Redis监听端口，默认端口为6379
port 6379
# 绑定的主机地址，不要绑定容器的本地127.0.0.1地址，因为这样就无法在容器外部访问
bind 0.0.0.0
#需要密码则打开
requirepass your_redis_password
# 持久化
appendonly yes
```

```shell
# vim /opt/docker/redis/redis.sh

# 命令
docker run --name redis -p 6379:6379 -v /opt/docker/redis/redis.conf:/etc/redis/redis.conf -v /opt/docker/redis/data:/data -d redis:latest redis-server /etc/redis/redis.conf

# 参数解释
docker run redis # 从redis镜像运行容器
--name redis # 设置容器名称为redis，方便以后使用docker ps进行管理
-p 6379:6379 # 映射本地6379端口到容器6379端口，前为本地端口
-v /opt/docker/redis/redis.conf:/etc/redis/redis.conf # 关联本地/docker/redis/redis.conf文件到容器中/etc/redis/redis.conf，同样，前为本地
-v /opt/docker/redis/data:/data # 关联本地/docker/redis/data到容器内/data目录，此为存放redis数据的目录，为方便以后升级redis，而数据可以留存
-d # 后台启动，使用此方式启动，则redis.conf中daemonize必须设置为no，否则会无法启动
redis:latest # 启动的镜像
redis-server /etc/redis/redis.conf # 在容器内启动redis-server的命令，主要是为了加载配置
```

### 启动
```shell
sh /opt/docker/redis/redis.sh
# 查看是否已启动
docker ps
# 如果无法启动或者docker ps中无对应内容，将bash中命令复制出来，删除-d参数启动，查看报错信息
# 使用redis-cli或者rdm访问 localhost:6379
# 如需访问容器，可使用
docker exec -it redis bash
# 或直接使用redis-cli访问容器内redis
docker exec -it redis redis-cli [-a your_redis_password]
```


### redis 使用

redis-cli 连接
```shell
# 直接在连接时附加密码
redis-cli -h 127.0.0.1 -p 6379 -a 12345
# 连接后附加密码
redis-cli -h 127.0.0.1 -p 6379
auth 12345
```

telnet 连接
```shell
telnet 127.0.0.1 6379
auth 12345
```