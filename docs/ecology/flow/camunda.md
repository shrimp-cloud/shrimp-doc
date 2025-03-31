# Camunda

> amunda 是一个开源的工作流和业务流程管理平台，它帮助企业自动化其业务流程。无论是简单的手动任务还是复杂的、长期运行的业务流程，Camunda 都能够提供支持。

## 集成与部署

- 创建一个 Springboot 应用空壳
- 添加 camunda 相关依赖
- 为 camunda 添加配置信息
- 部署和启动 camunda


### 依赖信息

以下只包含核心信息。其他信息请自行补全

- 依赖信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <properties>
        <java.version>21</java.version>
        <camunda.version>7.21.0</camunda.version>
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
    </dependencies>
</project>
```

### 配置信息

```yaml
server:
  port: 8080

spring:
  config:
    activate:
      on-profile: dev
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://mysql.example.com:3306/camunda_demo
    username: db_username
    password: db_password
camunda:
  bpm:
    auto-deployment-enabled: true
    auto-deployment-locations: classpath*:bpmn/

    admin-user:
      # 用户名
      id: ${your_username}
      # 密码
      password: ${your_password}
      firstName: ${your_firstName}
    filter:
      create: All tasks
```


### 部署信息

- 此项目使用 docker 打包，再推送到 kubernetes 中进行部署。但部署在此处不作为重点，不再展开
