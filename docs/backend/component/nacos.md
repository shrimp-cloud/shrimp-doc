# NACOS

## NACOS安装

### 下载
- 下载地址：https://github.com/alibaba/nacos/releases
- 解压： tar -zxvf nacos-server*
- 也可以下载源码自行编译

### 准备
- JDK安装，见JDK章节：[JDK](docs/backend/component/jdk.md)
- MySQL安装，见MySQL章节：[MySQL](docs/backend/component/mysql.md)

### 安装
1. 导入数据库： nacos/conf/nacos-mysql.sql

2. 修改数据库配置： vim nacos/conf/application.properties
```shell
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=root_password
```

3. 调整jvm:
- 可自行编辑  startup.sh 进行修改


4. 单实实例启动
```shell
sh startup.sh -m standalone
```

5. 防火墙
```shell script
# 检查防火墙是否包含 3306端口
firewall-cmd --list-ports
# 防火墙开放3306
firewall-cmd --permanent --zone=public --add-port=8848/tcp
# reload防火墙
firewall-cmd --reload
```

### 集群
- 至少三个节点
```shell
cp cluster.conf.example cluster.conf
# 只需要维护 it is ip 的集群清单即可
```
- 在第四个节点上，执行启动
```shell
sh startup.sh
```

- 在nacos上层配置nginx的upstream完成nacos的负载均衡。


### 控制台
- 地址：http://ip:8848/nacos/index.html
- 默认用户名密码：nacos/nacos


### 异常处理
- Caused by: java.net.UnknownHostException: jmenv.tbsite.net
> 是因为nacos-server-2.X.X的conf目录下的cluster.conf.example导致，需要手动改为cluster.conf

- Nacos Server did not start because dumpservice bean construction failure : No DataSource set】
> 数据库连接失败导致。需要确认数据库连接失败的原因

- 密码带#号导致识别错误
> 在配置文件里面被当成注释符了。建议不要使用带#号的密码，否则需要进行转译

## NACOS 使用

### Springcloud集成

未完成
