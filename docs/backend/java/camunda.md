# Camunda

## 部署

- 依赖信息
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/>
    </parent>

    <groupId>com.wkclz.camunda</groupId>
    <artifactId>shrimp-camunda</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>shrimp-camunda</name>
    <description>shrimp-camunda</description>

    <properties>
        <java.version>21</java.version>

        <druid.version>1.2.23</druid.version>
        <camunda.version>7.22.0</camunda.version>
    </properties>

    <dependencies>

        <!-- 流程引擎 -->
        <dependency>
            <groupId>org.camunda.bpm.springboot</groupId>
            <artifactId>camunda-bpm-spring-boot-starter</artifactId>
            <version>${camunda.version}</version>
        </dependency>
        <!-- Web管理平台 -->
        <dependency>
            <groupId>org.camunda.bpm.springboot</groupId>
            <artifactId>camunda-bpm-spring-boot-starter-rest</artifactId>
            <version>${camunda.version}</version>
        </dependency>
        <!-- 提供rest api操作接口包 -->
        <dependency>
            <groupId>org.camunda.bpm.springboot</groupId>
            <artifactId>camunda-bpm-spring-boot-starter-webapp</artifactId>
            <version>${camunda.version}</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-3-starter</artifactId>
            <version>${druid.version}</version>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>

    </dependencies>

    <build>
        <finalName>${project.name}</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <excludes>
                    <!-- 打包时排除不需要的配置 -->
                    <exclude>**/application-*.yml</exclude>
                </excludes>
            </resource>
        </resources>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

- 配置信息
```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/db_camunda?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai
    username: db_username
    password: db_password
camunda:
  bpm:
    auto-deployment-enabled: true
    auto-deployment-locations: classpath*:bpmn/
    admin-user:
      # 用户名
      id: camunda_username
      # 密码
      password: camunda_password
      firstName: camunda_firstName
    filter:
      create: All tasks
```

- 再加个 main 函数，启动即可

## 管理面板
- 登录地址：http://localhost:8080 (部署在服务器上请自行转换)
- 功能：
  - Admin: 用户，组，租户，授权，系统配置
  - Cockpit: 驾驶舱：流程实例，事件，任务
  - Tasklist: 任务列表，正在运行的任务
- 流程示例
  - 部署流程：UI 居然没有部署流程的地方。。需要使用项目，或接口来部署 【可以使用设计器来部署流程】
  - 启动流程：Tasklist -> Start Process -> 选择流程，填写变量，启动 -> 流程审批 -> 结束


## 设计器

- camunda-modeler: https://camunda.com/download/modeler/
- 包含本地客户端，web 设计器。正常情况下本地客户端即可，后续再扩展研究其他设计器形态

## 客户端

- 集成
```xml
<dependency>
    <groupId>org.camunda.community.rest</groupId>
    <artifactId>camunda-platform-7-rest-client-spring-boot-starter</artifactId>
    <version>7.22.0</version>
</dependency>
```

- 配置
```yaml
feign:
  client:
    config:
      default:
        url: http://localhost:8080/engine-rest
```

- 坑
  - org/camunda/community/rest/client/FeignClientConfiguration.java 内有 jackson 序列化相关bean 注册，覆盖了自定义的逻辑。可使用覆盖类的方式移除
  - rest 客户端一些高级操作，都被标注为 `TODO("not implemented")`, 需要自行使用 http client 工具实现
  - 无法获取流程图



