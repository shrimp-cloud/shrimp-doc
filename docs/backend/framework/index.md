# 后端框架介绍

> 用于构建服务器端（后端）应用程序的一套工具、库和规范的集合。它们旨在简化开发过程，提高开发效率，增强代码的可维护性和可扩展性。


## 地址

- [GitHub: https://github.com/shrimp-cloud/](https://github.com/shrimp-cloud/)
- [Gitee: https://gitee.com/shrimp-cloud/](https://gitee.com/shrimp-cloud/)
- [文档: https://doc.wkclz.com/](https://doc.wkclz.com/)
- github 为主要仓库，再同步到 gitee 做国内的访问加速

## 项目由来
当前项目，从自己接触的第一个项目开始，慢慢累积的成果。其中，有技术选型的不合理而不再回头，也有感觉成功而不断完善。从开始认识java到现在，已经3600多个日夜。 \
将这些东西整理出来，可以让大家一起使用，更希望可以让大家提一些意见，让系统更完善，一起学习一起进步。

## 一点点设想
- 将每个项目都重复事情提前做好
- 将每个项目都必做的事情规范好
- 将每个项目遇到的问题都统计好
- 于是，整理了父工程，核心包，包装了 SpringBoot, 定制了代码生成器，搭建了一系列辅助工具，规范了一系列标准，有了现在的行动
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

