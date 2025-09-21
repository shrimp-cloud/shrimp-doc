# BOM

## 概述

> BOM stands for Bill Of Materials. A BOM is a special kind of POM that is used to control the versions of a project’s dependencies and provide a central place to define and update those versions. BOM provides the flexibility to add a dependency to our module without worrying about the version that we should depend on.

> BOM 代表物料清单。BOM是一种特殊的POM，用于控制项目依赖项的版本，并提供定义和更新这些版本的中心位置。BOM提供了向我们的模块添加依赖项的灵活性，而不用担心我们应该依赖的版本。


## 坐标

```xml
<dependency>
    <groupId>com.wkclz.bom</groupId>
    <artifactId>shrimp-cloud-bom</artifactId>
    <version>${shrimp-bom.version}</version>
</dependency>
```


## 管理

- BOM 仅定义三方依赖。若为二方依赖，应当在 parent 中定义
- properties: 三方依赖的版本变量
- dependencyManagement: 定义三方依赖,并引用properties 中的变量

## 使用
- 在 shrimp-cloud-parent 中，添加此依赖管理
```
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.wkclz.bom</groupId>
            <artifactId>shrimp-cloud-bom</artifactId>
            <version>${shrimp.cloud.bom.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
</dependencyManagement>

```
