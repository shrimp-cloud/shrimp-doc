# JDK

## JDK 下载

### openjdk
-下载地址：https://jdk.java.net/18/
- 选择版本：Linux/x64	tar.gz

### OracleJdk
- 下载地址：https://www.oracle.com/java/technologies/downloads/
- 选择版本：【17】: x64 Compressed Archive

## 安装
- 建议安装目录：
  - /opt/jdk17
  - /opt/jdk18
  - /opt/openjdk18

## 环境变量

### 永久变量
```shell
# vim /etc/profile.d/jdk.sh
export JAVA_HOME=/opt/jdk17
export PATH=$JAVA_HOME/bin:$PATH

# source /etc/profile
```

### 临时变量
```shell
export JAVA_HOME=/opt/jdk17
export PATH=$JAVA_HOME/bin:$PATH
```

### 应用启动指定JDK
- 启动时直接指定 jdk:  
```shell
/opt/jdk17/bin/java -jar xxx.jar
```
