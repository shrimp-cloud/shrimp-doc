# CI/CD
> CI/CD 是一种通过在应用开发阶段引入自动化来频繁向客户交付应用的方法。CI/CD 的核心概念是持续集成、持续交付和持续部署。

***


# CI/CD-aliyun flow


## 概述
> 阿里云的 CI/CD 流水线已经非常完善，并且在一定程度上开放使用。可以满足个体，小公司的需求。大公司花钱或者自研，再说
- 网址：https://flow.aliyun.com/
- 功能引导已经非常完善，不再添加更多的文档




***

# CI/CD-Jenkins


## 概述
> Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。【如果你用过，我不要解释。你没用过，我也简单解释不清楚：所以直接从百度百科拿过来了，详细的自己去学习】


## Jenkins 配置
- 插件安装【此处为重要插件，其他辅助插件自己考虑】
  - Git Parameter
  - Publish Over SSH
- 系统管理-系统设置
  - 主目录-高级
    - 工作空间根目录：vim catalina.sh  then add:  export CATALINA_OPTS="-DJENKINS_HOME=/opt/jenkins-project/"
  - 执行者数量：1 【根据服务器承受能力设定】
  - Publish over SSH 设置【依赖于前面的插件】
    - Path to key：/home/apps/.ssh/id_rsa
    - SSH Servers-Name：prod1
    - SSH Servers-Hostname：127.0.0.1
    - SSH Servers-Hostname：apps
    - SSH Servers-Remote Directory：/otp/dist
- 系统管理-全局工具配置【按具体项目需求进行配置，一些工具可以在系统安装了，只配置路径】
  - jdk1.8
  - git
  - maven【自行配置仓库】
- Credentials
  - 找到添加 Credentials 的位置
  - Username：git 账号
  - Private Key：From a file on Jenkins master：/home/apps/.ssh/id_rsa

## 后端项目配置
> 新建项目和复制项目类似，如果是新建，则选择 《构建一个自由风格的软件项目》

- 项目名称:prod-lz-sys【自定义即可】
- 丢弃旧的构建-保持构建的最大个数：8
- 参数化构建过程
  - Name：select
  - Parameter Type：Branch or Tag
- 源码管理
  - Git：Repositories：Repository URL：项目 ssh 地址
  - Git：Repositories：Credentials：前面设置的Credentials
  - Git：Branches to build：Branch Specifier (blank for 'any')：${select}
- 构建：Invoke top-level Maven targets
  - Maven Version：Maven
  - Goals【此处为具体的构建命令，按需修改】：clean -Dmaven.test.skip=true package
- 构建后操作
  - Send build artifacts over SSH
    - SSH Publishers
      - SSH Server
        - Name:自己的服务器
        - Transfers->Transfer Set：【代码传送】
          - Source files：target/lz-sys-0.0.1.jar
          - Remove prefix：target/
          - Remote directory：lz-sys
        - Transfers->Transfer Set：【代码传送自行按环境处理】
          - Source files：target/classes/bin/service.sh
          - Remove prefix：target/classes/bin/
          - Remote directory：lz-sys
          - Exec command： sh /otp/dist/lz-sys/service.sh restart
  
- 以上以包含主要配置，更详细的配置请自己动手，遇到问题可交流。