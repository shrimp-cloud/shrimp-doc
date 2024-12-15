# RocketMQ

## 部署

### 单节点部署
- 环境变量
  - 见：后端 -> 组件 -> JDK -> 环境变量

- 下载
  - 主目录： mkdir /home/apps && cd /home/apps
  - 下载RocketMQ: wget https://dlcdn.apache.org/rocketmq/5.0.0/rocketmq-all-5.0.0-bin-release.zip
  - 解压：unzip rocketmq-all-5.0.0-bin-release.zip
  - 改名 mv rocketmq-all-5.0.0-bin-release rocketmq
  - cd rocketmq
- 启动
  - 启动 NameServer：`nohup sh bin/mqnamesrv &`
  - 启动 Broker+Proxy：`nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &`
  - 代理端口：8081 【没有找到改端口的地方】

### 控制台 console
- 源码文档有使用方式
- 下载编译
  - 源码：https://github.com/apache/rocketmq-dashboard
  - 编译前：pom.xml 只保留 compiler 和 spring-boot 插件。其他插件会让人痛不欲生
  - 编译：mvn clean package -Dmaven.test.skip=true 【必需 jsk1.8, 已经测试 11,17不支持】
- 配置和启动
  - 创建 `users.properties` 用于配置用户名密码信息。可热更新【见源码中的使用文档】
  - 启动命令: namesrv 地址，开启登录，指定用户信息配置文件
  - 端口：8080
```shell
nohup java -server -Drocketmq.namesrv.addr=127.0.0.1:9876 -jar rocketmq-dashboard-1.0.1-SNAPSHOT.jar --rocketmq.config.loginRequired=true --rocketmq.config.dataPath=/home/apps/rocketmq-dashboard &
```

### 防火墙
```shell
# 开启
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --permanent --zone=public --add-port=8081/tcp
firewall-cmd --permanent --zone=public --add-port=9876/tcp
firewall-cmd --permanent --zone=public --add-port=10909/tcp
firewall-cmd --permanent --zone=public --add-port=10911/tcp
firewall-cmd --permanent --zone=public --add-port=10912/tcp
firewall-cmd --reload
firewall-cmd --list-ports
# 移除
firewall-cmd --permanent --zone=public --remove-port=8080/tcp
firewall-cmd --permanent --zone=public --remove-port=8081/tcp
firewall-cmd --permanent --zone=public --remove-port=9876/tcp
firewall-cmd --permanent --zone=public --remove-port=10909/tcp
firewall-cmd --permanent --zone=public --remove-port=10911/tcp
firewall-cmd --permanent --zone=public --remove-port=10912/tcp
firewall-cmd --reload
firewall-cmd --list-ports
```

## 5.0特性
1. 5.0 开始，计算和存储开始分离，使用了 proxy （可独立节点，可同进程，也可边车）进行代理。可代理 NameServer 和 broker

### 使用
rocketmq5.0
1. proxy 为 8081,代理了 NameServer 和 broker 的访问
2. 若使用反向代理，需要使用 TCP，不能使用HTTP
3. proxy 的 endpoint 默认为 8081 从 NameServer 获得的 broker，仍然是 proxy, 会返回内网的 proxy 8081
4. 若网络有nat转换，需要配置 broker 的IP为可访问的 IP：brokerIP1 = 公网IP