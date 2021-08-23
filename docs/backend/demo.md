# 后端服务脚手架

> 后端服务脚手架是规定了后端服务的目录结构，技术栈等基础内容，留下业务部分作为具体业务的实现。努力让业务实现最丰富简便快捷。


## 脚手架组成
- 后端服务脚手架分为两个部分
1. 已经完成的，包含springcloud 定义的父类，core 包，代码生成器，插件等一系列的外围支撑内容
2. 将要进行业务代码编写的程序的基础部分，包含目录结构，基础配置，main 函数等
- 一个优秀的脚手架，应当以最少的工作，最短的时间内，让业务开发进入正轨，能最顺畅的完成业务开发并上线。让业务开发人员能醉心于业务逻辑而不去关心业务逻辑之外的内容。

## 目录结构

- src
  - main
    - java
      - com.wkcl.demo
        - config 项目配置
        - dao DB接口及xml【xml定义在 resource更适合，但为了更快找到xml,还是将期放到了java中】
          - mapper 生成的 xml目录
            - DemoMapper.xml 自动生成的 xml
          - DemoMapper.java 扩展的dao接口，继承了基础dao接口
          - DemoMapper.xml 扩展的 xml sql
        - helper 系统辅助类
        - pojo 实例类
          - dto 数据库实例扩展类
          - entity 数据库实例
        - rest 接口类
          - core 生成的接口代码示例，仅为示例，不对外服务
          - custom 自定义的业务接口
        - service 服务
          - core 生成的服务扩展类，默认继承了系统默认的基本服务类
          - custom 完全自定义的服务类
        - util 扩展静态工具
        - Application 应用主函数
    - resources 服务的资源文件
      - bin 服务相关脚本
        - deploy.sh 服务部署脚本
        - service.sh 服务启停脚本
      - config 服务配置
        - application.yml 项目配置，滞后于bootstrap加载，属性可被覆盖，一般为通用配置
        - application-dev.yml 项目环境配置，只对具体环境生效。只配置环境差异部分
        - bootstrap.yml 项目配置，优先于application加载，属性不能被覆盖
      - banner.txt springboot启动图案
      - logback-spring.xml logback日志配置
- .editorconfig 定义一些编码风格
- .gitignore git忽略不提交的内容定义
- pom.xml 项目是基于maven的，pom为依赖maven配置