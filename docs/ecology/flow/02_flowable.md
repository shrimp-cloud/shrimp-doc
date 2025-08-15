# Flowable

> Flowable 是一个基于 Java 的轻量级业务流程管理（BPM）和业务流程自动化解决方案。它提供了强大的工作流引擎，支持 BPMN 2.0（Business Process Model and Notation）、DMN（Decision Model and Notation）以及 CMMN（Case Management Model and Notation）标准，使得用户能够设计、部署和执行复杂的业务流程。




## 集成

- 集成flowable
-
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.5</version>
        <relativePath/>
    </parent>

    <groupId>com.wkclz.flowable</groupId>
    <artifactId>shrimp-flowable</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>shrimp-flowable</name>
    <description>shrimp-flowable</description>

    <properties>
        <java.version>21</java.version>
        <druid.version>1.2.23</druid.version>
        <flowable.version>7.1.0</flowable.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Flowable Spring Boot Starter (核心) -->
        <dependency>
            <groupId>org.flowable</groupId>
            <artifactId>flowable-spring-boot-starter</artifactId>
            <version>${flowable.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>org.flowable</groupId>
                    <artifactId>flowable-spring-security</artifactId>
                </exclusion>
            </exclusions>
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
</project>

```

## 配置独立数据源


### 配置信息


数据源配置没有使用默认的配置空间，目的是让 flowable 使用自己的数据源，而不是使用 springboot 默认的数据源，与业务数据做区分

####  数据源配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/flowable_db?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai&nullCatalogMeansCurrent=true
    username: username
    password: password
```


## 初始化

- 启动应用，若数据库内没包含相关的表，将会自动创建
  - 坑：数据源配置需要加参数：`nullCatalogMeansCurrent=true`, 否则会导致表创建失败


## 设计器

1. 在线设计器：https://designer.bpmport.com/designer/
2. 新版本已默认移除设计器，6.x (6.8.1) 中的flowable-ui 可自行部署来使用
3. Idea 插件：Flowable BPMN visualizer


