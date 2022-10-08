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
  - 启动 启动Broker+Proxy：`nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &`

### 控制台 console
- 源码文档有使用方式
- 下载编译
  - 源码：https://github.com/apache/rocketmq-dashboard
  - 编译前：pom.xml 只保留 compiler 和 spring-boot 插件。其他插件会让人痛不欲生
  - 编译：mvn clean package -Dmaven.test.skip=true 【必需 jsk1.8, 已经测试 11,17不支持】
- 配置和启动
  - 创建 `users.properties` 用于配置用户名密码信息。可热更新【见源码中的使用文档】
  - 启动命令: namesrv 地址，开启登录，指定用户信息配置文件
```shell
nohup java -server -Drocketmq.namesrv.addr=127.0.0.1:9876 -jar rocketmq-dashboard-1.0.1-SNAPSHOT.jar --rocketmq.config.loginRequired=true --rocketmq.config.dataPath=/home/apps/rocketmq-dashboard &
```

