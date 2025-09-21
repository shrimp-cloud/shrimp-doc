# 父工程

> 父工程是模拟  spring-boot-starter-parent 建立起来的一个工程，其本身也依赖于 spring-boot-starter-parent。

# 坐标

```xml
<dependency>
    <groupId>com.wkclz.parent</groupId>
    <artifactId>shrimp-cloud-parent</artifactId>
    <version>${shrimp-parent.version}</version>
</dependency>
```



## 管理

- parent 定义二方依赖
- properties: Spring 和 二方依赖的版本变量
- dependencies: 定义任意项目均需要依赖的公共依赖
- dependencyManagement 定义二方依赖,并引用properties 中的变量
- build > plugins: 定义任意项目均需要依赖的公共 maven 插件
- build > pluginManagement> plugins: 定义项目中可能用到的 maven 插件，并配置默认参数


## 使用
- 在shrimp-cloud 的各子模块中，使用此父项目来替代 springboot 的父项目
```
<parent>
    <groupId>com.wkclz.parent</groupId>
    <artifactId>shrimp-parent</artifactId>
    <version>4.0.0-SNAPSHOT</version>
    <relativePath/>
</parent>
```
