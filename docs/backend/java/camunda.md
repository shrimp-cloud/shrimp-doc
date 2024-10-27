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

- 再加个个 main 函数，启动即可

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


