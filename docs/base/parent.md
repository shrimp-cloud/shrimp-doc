# 父工程

# 概述
> 父工程是模拟  spring-boot-starter-parent 建立起来的一个工程，其本身也依赖于 spring-boot-starter-parent。

# 管理
- 包自动依赖
- 包版本决策
- 管理项目基本信息

# 使用
- 在lz-cloud 的各子模块中，使用此父项目来替代 springboot 的父项目
```
    <parent>
        <groupId>com.wkclz.parent</groupId>
        <artifactId>lz-parent</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath/>
    </parent>
```