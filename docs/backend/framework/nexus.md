# 依赖仓库

> 为方便依赖包的发布，需要维护一个私有仓库。


## Nexus

### 选型

- Nexus
  - 可使用 Nexus 搭建私有仓库
  - 资金成本相对较大: 消耗一定的服务器资源
  - 维护成本相对较大: 需要较多时间管理
  - 管理灵活: 可灵活划分仓库，可管理权限
  - 速度: 若在局域网内搭建，访问速度非常快
- 阿里云 maven 仓库
  - 免维护: 只管使用，无需管搭建过程
  - 资源丰富: 无需配置，自动继承了公网各大maven仓库
  - 不灵活: 权限不方便更细致的划分，无法做细节上的配置
  - 速度: 访问速度相对于本地搭建的 Nexus 仓库要慢
- 建议
  - aliyun: 个人开发者, 或游击小团队
  - Nexus: 有架构师的团队，有局域网服务器的团队/创业

### 使用

- aliyun
  - 文档: https://packages.aliyun.com/maven
- Nexus
  - 官网地址:
  - 搭建过程较为简单，先略过



## Maven


> Maven项目对象模型(Project Object Model, POM)，可以通过一小段描述信息来管理项目的构建，报告和文档的项目管理工具软件。



### 安装

#### Idea 插件

- 在 Idea 中，maven 插件是自带的，无需安装

#### 独立安装

> 场景：打包环境，需要独立安装

- 官网：https://maven.apache.org/, 下载最新版本二进制包，并解压到规划的目录下
- 设置环境变量，MAVEN_HOME，和 PATH, 使得在命令行中能识别 mvn 命令
- 验证：`mvn -v`


## 配置

- 默认配置路径: `${user.home}/.m2/settings.xml`
- 配置项：后续补充


## pom.xml

### 基本结构示例


```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <!-- 用于继承一个父项目，实现配置复用（常用于多模块项目） -->
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.5.4</version>
  </parent>

  <!-- 项目基本信息 -->
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>

  <packaging>jar</packaging>
  <name>My Application</name>
  <description>A sample Maven project</description>

  <!-- 定义可重用的变量，便于统一管理版本或配置 -->
  <properties>
    <java.version>21</java.version>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <!-- 用于聚合多个子模块。 -->
  <modules>
    <module>module-common</module>
    <module>module-web</module>
  </modules>

  <!-- 定义项目所依赖的外部库 -->
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <!-- 依赖管理：集中管理依赖版本，不引入实际依赖，子模块可继承版本号而无需指定 version -->
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.21</version>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <!-- 定义 Maven 下载依赖和插件的远程仓库 -->
  <repositories>
    <repository>
      <id>aliyun-maven</id>
      <url>https://maven.aliyun.com/repository/public</url>
    </repository>
  </repositories>

  <!-- 构建配置 -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>21</source>
          <target>21</target>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>

```


### packing

- 以下列举了常见的 packing 类型

| Packaging 类型 | 说明                                                                      | 典型使用场景                                  |
|--------------|-------------------------------------------------------------------------|-----------------------------------------|
| jar          | Java Archive，标准的 Java 库打包格式，包含编译后的 class 文件和资源。                         | 普通 Java 项目、工具类库、Spring Boot 应用等。        |
| pom          | 不包含实际代码，仅用于项目聚合或作为父 POM 管理依赖和插件。                                        | 多模块项目的父工程、依赖管理（BOM）项目。                  |
| maven-plugin | 用于打包自定义的 Maven 插件。                                                      | 开发 Maven 插件项目。                          |


### scope

- 以下列举了常见的 scope 类型

| Scope 值    | 说明                                               | 编译时可见 | 测试时可见 | 运行时可见 | 是否参与传递 | 典型使用场景                             |
|------------|--------------------------------------------------|-------|-------|-------|--------|------------------------------------|
| `compile`  | 默认范围，依赖在所有阶段都可用。                                 | ✅     | ✅     | ✅     | ✅      | 核心业务代码依赖，如 Spring、Guava 等。         |
| `provided` | 编译和测试需要，但运行时由 JDK 或容器（如 Tomcat）提供，不打包进最终产物。      | ✅     | ✅     | ❌     | ✅      | Servlet API、JSP API 等容器提供的库。       |
| `runtime`  | 编译不需要，但测试和运行时需要。                                 | ❌     | ✅     | ✅     | ✅      | JDBC 驱动、实现接口的库（如 logback-classic）。 |
| `test`     | 仅用于测试编译和执行，不打包也不在主代码中使用。                         | ❌     | ✅     | ❌     | ❌      | JUnit、Mockito、TestNG 等测试框架。        |
| `system`   | 类似 `provided`，但依赖不在 Maven 仓库中，需手动指定本地路径（不推荐使用）。  | ✅     | ✅     | ❌     | ✅      | 使用私有 JAR 包（如某些厂商 SDK），需谨慎管理。       |
| `import`   | 仅用于 `<dependencyManagement>` 中，导入其他 POM 的依赖管理配置。 | ❌     | ❌     | ❌     | ❌      | 统一管理依赖版本（常用于 Spring Boot、BOM 文件）。  |


### optional

- `optional` 属性用于控制依赖是否被传递。

| 属性值     | 描述                  |
|---------|---------------------|
| `true`  | 表示依赖不会传递给依赖它的项目。    |
| `false` | 默认值，表示依赖会传递给依赖它的项目。 |



### java 版本

> 为指定 java 的版本，可在 pom 中的多个地方，多个位置指定. 购买以下清单


| 位置                    | 配置内容                           | 含义                            | 备注                                             |
|-----------------------|--------------------------------|-------------------------------|------------------------------------------------|
| `<properties\>`       | `java.version`                 | 自行指定的变量                       | 若不被引用，将不产生作用                                   |
| `<properties\>`       | `maven.compiler.source`        | 指定 java 的源代码版本                | 可被 maven-compiler-plugin 自动识别                  |
| `<properties\>`       | `maven.compiler.target`        | 确定 java 的目标版本                 | 可被 maven-compiler-plugin 自动识别                  |
| `<properties\>`       | `maven.compiler.release`       | 确定 java 的版本                   | Java 9 开始，推荐使用 <release\> 参数代替 source 和 target |
| maven-compiler-plugin | `configuration\>source/target` | 同 properties 中的 source/target | 优先级高于 properties 中的 source/target              |
| maven-compiler-plugin | `configuration\>release`       | 同 properties 中的 release       | 优先级高于 properties 中的 release                    |





