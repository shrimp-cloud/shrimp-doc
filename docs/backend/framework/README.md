# 后端架构

***

后端架构包含后端服务的所有内容（不包含业务功能模块）。阅读完后端架构相关文档，您需要能够完成本地环境搭建，运行并熟悉demo项目，可以将项目里面的使用方式㻒到具体的业务开发中。同时还需要完成服务器部署等整套 CI/CD 过程。

# LZ-cloud SpringCloud 微服务开发框架

> 一套[完整]的SpringCloud微服务框架. 文档完成进度：基本完成《基础》部分

## 地址
* [GitHub: https://github.com/lz-cloud/](https://github.com/lz-cloud/)
* [Gitee: http://gitee.com/lz-cloud/](http://gitee.com/lz-cloud/)
* [文档: http://doc.wkclz.com/](http://doc.wkclz.com/)
* github 为主要仓库，再同步到 gitee 做国内的访问加速

## 项目由来
当前项目，从自己接触的第一个项目开始，慢慢累积的成果。其中，有技术选型的不合理而不再回头，也有感觉成功而不断完善。从开始认识java到现在，已经1500多个日夜。 \
将这些东西整理出来，可以让大家一起使用，更希望可以让大家提一些意见，让系统更完善，一起学习一起进步。

## 一点点设想
- 将每个项目都重复事情提前做好
- 将每个项目都必做的事情规范好
- 将每个项目遇到的问题都统计好
- 于是，整理了父工程，核心包，包装了 SpringCloud, 定制了代码生成器，搭建了一系列辅助工具，规范了一系列标准，有了现在的行动
- 整个应用以简单SAAS商城作为参考，以完成简单SAAS商城作为目标，完善整个系统。


## 后端组件
- 基础工程
  - parent 父工程
  - core 核心工程
  - starter 启动器
  - gen 代码生成
  - Jenkins CICD
- Springcloud 工程
  - eureka
  - config
  - admin
  - gateway
- 中间件
  - Redis
  - Nginx
  - sonar
  - apidoc
  - oss
- 技术选型
  - Spring cloud
  - Spring boot
  - MyBatis
  - MySQL
  - maven
  - git
  - ES
  - RocketMQ
  - ...


> shrimp 虾米，自个的网名，现在用于项目名


### properties
- 版本号：框架级别的依赖，必需在 bom 中的 properties 定义
- 命名规范：<artifactId.version>版本号</artifactId.version>
- 排序：Spring 相关依赖；Shrimp 模块相关依赖; 三方静态工具依赖

## shrimp-cloud-common
> 静态资源：
1. 注解
2. 枚举
3. 实体
4. 异常
5. 工具

## shrimp-cloud-redis
> redis 的封装
1. 序列化方法纠正
2. ID生成器
3. 分布式锁

## shrimp-cloud-spring
> 提供spring 耦合，大量与 Spring 相关的工具类，方法
