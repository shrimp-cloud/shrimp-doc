# NACOS

## NACOS安装

### 下载
- 下载地址：https://github.com/alibaba/nacos/releases
- 解压： tar -zxvf nacos-server*
- 也可以下载源码自行编译

### 准备
- JDK安装，见JDK章节：[JDK](docs/devops/componentjdk.md)
- MySQL安装，见MySQL章节：[MySQL](docs/devops/componentmysql.md)

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
1. 依赖
```xml
<!-- 启动配置管理 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    <version>${latest.version}</version>
</dependency>
<!-- 启动服务发现 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <version>${latest.version}</version>
</dependency>
```
2. 配置
```yaml
spring:
  application:
    name: applicationName
  profiles:
    active: dev
  cloud:
    nacos:
      config:
        # 配置
        server-addr: http://ip:port
      discovery:
        # 发现
        server-addr: http://ip:port

```

3. 开启注册发现
- main 函数加上：@EnableDiscoveryClient

4. 获取配置
```java
package com.your.pkg.path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;

@RefreshScope // 实现配置自动更新
public class TourConfig {

    @Value("${lz.config.deno:}")
    private String configDemo;

}
```

5. 服务消费
```java
package com.your.pkg.path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Component
public class DemoRest {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @RestController
    public class TestController {

        @Autowired
        private RestTemplate restTemplate;

        @GetMapping( "/echo/str")
        public String echo() {
            // 使用 Ribbon 的 LoadBalanced 消费 service-provider 的服务
            return restTemplate.getForObject("http://service-provider/echo/data", String.class);
        }
    }
}
```

### 比eureka的优势
0. 自带配置中心
1. 自带基于RBAC的权限
2. 自带订阅者查询
3. 支持命名空间
4. 控制台自带集群管理
5. 为什么还用 Eureka 呢