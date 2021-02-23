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
        - config
        - dao
          - mapper
            - DemoMapper.xml
          - DemoMapper.java
          - DemoMapper.xml
        - helper
        - pojo
          - dto
          - entity
        - rest
          - core
          - custom
        - service
          - core
          - custom
        - util
        - Application
    - resources
      - bin
        - deploy.sh
        - service.sh
      - config
        - application.yml
        - application-dev.yml
        - bootstrap.yml
      - banner-txt
      - logback-spring.xml
- .editorconfig
- .gitignore
- pom.xml