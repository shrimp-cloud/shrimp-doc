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

## 安装
- 官网：https://www.jenkins.io/download/
- War 包安装：Tomcat + Jenkins war 包即可
- docker 安装：有需要再写


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

- 项目名称:prod-shrimp-demo【自定义即可】
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
          - Source files：target/shrimp-demo-0.0.1.jar
          - Remove prefix：target/
          - Remote directory：shrimp-demo
        - Transfers->Transfer Set：【代码传送自行按环境处理】
          - Source files：target/classes/bin/service.sh
          - Remove prefix：target/classes/bin/
          - Remote directory：shrimp-demo
          - Exec command： sh /otp/dist/shrimp-demo/service.sh restart

- 以上以包含主要配置，更详细的配置请自己动手，遇到问题可交流。

## 项目脚本
> service.sh 一个简单的启动脚本

```shell
#!/bin/bash

# params
JAVA_HOME=/home/apps/jdk17
APP_NAME=your_app_jar_name.jar
APP_GROUP=app_group
ENV=uat
BAK_NUM=12

# scription path
APP_HOME=$(cd `dirname $0`; pwd)

psid=0
# check if app is running
checkpid() {
   ps=`ps -ef | grep $APP_NAME | grep -v grep`
   if [ -n "$ps" ]; then
      psid=`echo $ps | awk '{print $2}'`
   else
      psid=0
   fi
}

# start your app
start() {
   checkpid
   if [ $psid -ne 0 ]; then
      echo "================================"
      echo "warn: $APP_NAME already started! (pid=$psid)"
      echo "================================"
   else
      echo -n "Starting $APP_NAME ..."
      cd $APP_HOME
      nohup $JAVA_HOME/bin/java -server -Xms256m -Xmx256m -Xmn100m -Djava.security.egd=file:/dev/./urandom -jar $APP_HOME/$APP_NAME --spring.profiles.active=$ENV --spring.application.group=$APP_GROUP >/dev/null 2>&1 &

      sleep 2s
      checkpid
      if [ $psid -ne 0 ]; then
         echo "(pid=$psid) [OK]"
         bakfile
      else
         echo "[Failed]"
      fi
   fi
}

# back up your app after start success
bakfile() {
   echo "----------------------------------backup----------------------------------"
   # startup and backup
   if [ ! -d 'bak' ]; then
      mkdir bak
   fi

   FILE_NUM=$(cd `dirname $0`;cd $APP_HOME/bak;ls -l *.tar.gz | grep ^- | wc -l)
   echo "$FILE_NUM backup jars in ./bak"
   echo "$BAK_NUM backup jars will be keep in ./bak"
   while(($FILE_NUM > $BAK_NUM))
   do
      OLD_FILE=$(cd `dirname $0`;cd ./bak;ls -rt *.tar.gz | head -1)
      echo "Remove old backup jars:"$APP_HOME'/bak/'$OLD_FILE
      rm -f $APP_HOME'/bak/'$OLD_FILE
      let "FILE_NUM--"
   done

   echo -n "Backuping $APP_NAME to ./bak/$APP_NAME.`date +%Y%m%d%H%M%S`.tar.gz ..."
   tar -zcf ./bak/$APP_NAME.`date +%Y%m%d%H%M%S`.tar.gz $APP_NAME
   echo "[OK]"
   echo "----------------------------------backup----------------------------------"
}

# stop your app
stop() {
   checkpid
   if [ $psid -ne 0 ]; then
      echo -n "Stopping $APP_NAME ...(pid=$psid) "
      kill -9 $psid
      if [ $? -eq 0 ]; then
         echo "[OK]"
      else
         echo "[Failed]"
      fi

      checkpid
      if [ $psid -ne 0 ]; then
         stop
      fi
   else
      echo "================================"
   fi
}

# command param
case "$1" in
   'start')
      start
      ;;
   'stop')
     stop
     ;;
   'restart')
     stop
     start
     ;;
   'status')
     status
     ;;
   'info')
     info
     ;;
  *)
     echo "Usage: $0 {start|stop|restart}"
     exit 1
esac
exit 0
```

## 编译脚本

```shell
#!/bin/sh

# 参数
DIST_PATH=/opt/dist
APP=shrimp-app

echo "开始..."

# 临时目录
TEMP_PATH=/data/deploy_temp
mkdir -p $TEMP_PATH
cd $TEMP_PATH
echo "已创建临时目录$TEMP_PATH"

# 环境(需提前自行准备)
export JAVA_HOME=/opt/jdk21
export PATH=$JAVA_HOME/bin:$PATH

# 代码
echo "准备拉取代码，可能需要验证信息..."
git clone https://github.com/shrimp-cloud/$APP.git

# 编译
echo "准备编译..."
cd $TEMP_PATH/$APP/
/opt/maven3.6/bin/mvn -U clean -Dmaven.test.skip=true -am package

# 部署
echo "准备发布..."
cp $TEMP_PATH/$APP/target/*.jar $DIST_PATH/$APP/

# 启动
echo "重启应用..."
sh $DIST_PATH/$APP/service.sh restart

# 清理遗留
rm -rf $TEMP_PATH

echo "=====================> 完成!"

cd ~

```
