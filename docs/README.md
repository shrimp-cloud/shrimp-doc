# LZ-cloud SpringCloud 微服务开发框架

> 一套[完整]的SpringCloud微服务框架. 文档完成进度：基本完成《基础》部分


## 地址
* [GitHub: https://github.com/lz-cloud/](https://github.com/lz-cloud/)
* [Gitee: http://gitee.com/lz-cloud/](http://gitee.com/lz-cloud/)
* [文档: http://lz-cloud.wkclz.com/](http://lz-cloud.wkclz.com/)
* [文档(备用): http://lz-cloud.wkclz.com/](http://lz-cloud.wkclz.com/)
* github 为主要仓库，再同步到 gitee 做国内的访问加速。【文档】是静态化的文档，有利于 seo，【文档(备用)】是原始文档，直接读git 仓库。


## 项目由来
当前项目，从自己接触的第一个项目开始，慢慢累积的成果。其中，有技术选型的不合理而不再回头，也有感觉成功而不断完善。从开始认识 java到现在，已经1500多个日夜。 \
将这些东西整理出来，可以让大家一起使用，更希望可以让大家提一些意见，让系统更完善，一起学习一起进步。


## 一点点设想
- 将每个项目都重复事情提前做好
- 将每个项目都必做的事情规范好
- 将每个项目遇到的问题都统计好
- 于是，整理了父工程，核心包，包装了 SpringCloud, 定制了代码生成器，搭建了一系列辅助工具，规范了一系列标准，有了现在的行动

## 组件
- 基础工程
  - parent 父工程
  - core 核心工程
  - gen 代码生成
  - Jenkins
- Springcloud 工程
  - eureka
  - config
  - admin
  - zuul
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

## 仓库
- lz-doc (当前文档)
- lz-parent 父工程
- lz-core 核心工程
- lz-sdk SDK
- lz-spring-boot-starter 启动器
- config-repo 配置仓库
- lz-soa 服务治理
  - lz-eureka 注册中心
  - lz-config 配置中心
  - lz-admin 监控
  - lz-zuul 网关
- lz-sys 系统服务
- lz-cas 用户及权限服务
- lz-gov 服务管理
- lz-pay 支付


## 起步
- 请转向 脚手架