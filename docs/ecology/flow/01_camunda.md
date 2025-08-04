# Camunda

> Camunda 是一个开源的工作流和业务流程管理平台，它帮助企业自动化其业务流程。无论是简单的手动任务还是复杂的、长期运行的业务流程，Camunda 都能够提供支持。

## 集成与部署

- 创建一个 Springboot 应用空壳
- 添加 camunda 相关依赖
- 为 camunda 添加配置信息
- 部署和启动 camunda
- 数据库表结构会在初次启动过程中自动创建。若数据库无权限创建，请在有权限的库启动后，手动转移数据库结构


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

cas:
  sdk:
    # 流程回调应用的 app-id [请参照 auth]
    app-id: your_app_id
    # 流程回调应用的 app-secret [请参照 auth]
    app-secret: your_app_secret

flow:
  # 流程 task 回调应用地址
  server-url: http://localhost:8080
  process:
    # 流程 task 回调应用 URI
    callback-uri: /flow/callback

```


### 部署信息

- 此项目使用 docker 打包，再推送到 kubernetes 中进行部署。但部署在此处不作为重点，不再展开



### Service Task

> 由于 camunda 没有直接镶嵌在应用系统中，故流程的 Service Task 调用无法到达应用系统。此处定义了逻辑，用于转发 Service Task 的调用。

#### 方案

- 过程
  - shrimp-camunda 注册 bean: `commonDelegateService`
  - camunda 在操作 Service Task 时，调用 `commonDelegateService`
  - commonDelegateService 将请求封装，调用接口：`callback-uri`
  - 应用系统实现 `callback-uri`, 接收参数，对流程进行分发，最后返回 Response
  - `commonDelegateService` 接收 Response，将信息返回给 camunda

- callback-uri 调用鉴权
  - 使用了 cas 的 access token 方案
  - 应用系统逻辑分发：待定义


