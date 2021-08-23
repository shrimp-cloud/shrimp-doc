# 启动器

# 概述
> SpringBoot的一大优势就是Starter，由于SpringBoot有很多开箱即用的Starter依赖，使得我们开发变得简单，我们不需要过多的关注框架的配置。

# 原理
- 自己实现一个 Starter。更深入的原理请自行百度


# 使用
1. parent 中已经使用 dependencyManagement 管理版本 ，只需要继承 parent 项的情况下，加入以下依赖：
    ```xml
    <dependency>
        <groupId>com.wkclz.starter</groupId>
        <artifactId>lz-spring-boot-starter</artifactId>
    </dependency>
    ```
2. 若服务不是使用微服务方式，不能依赖此 starter, 而是手动依赖具体的依赖项。
