# 打包 image


### 打包[JDK基础镜像]
准备JDK
```shell
wget https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.tar.gz
tar -zxvf jdk-21_linux-x64_bin.tar.gz
mv jdk-21* jdk21
wget https://github.com/alibaba/arthas/releases/download/arthas-all-3.7.2/arthas-bin.zip
unzip arthas-bin.zip -d arthas

```

打包镜像
```shell
vim Dockerfile
tee ./Dockerfile <<-'EOF'
FROM centos:latest
MAINTAINER shrimp
WORKDIR /apps

# JDK & arthas
ADD jdk21 jdk21
ADD arthas arthas
ADD simsun.ttf /usr/share/fonts/zh/simsun.ttf

# 环境变量
ENV TZ=Asia/Shanghai
ENV JAVA_HOME=/apps/jdk21
ENV PATH=/apps/jdk21/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ENV LANG=en_US.utf8

# 安装基本依赖
RUN sed -i s/mirror.centos.org/vault.centos.org/g /etc/yum.repos.d/*.repo && \
    sed -i s/^#.*baseurl=http/baseurl=https/g /etc/yum.repos.d/*.repo && \
    sed -i s/^mirrorlist=http/#mirrorlist=https/g /etc/yum.repos.d/*.repo && \
    yum makecache && \
    yum update -y && yum install -y zsh vim less openssh-clients net-tools numactl fontconfig zip unzip wget telnet bind-utils && \
    yum clean all && \
    ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    fc-cache -fv

EOF
```

### 打包前端node 环境镜像
> 用于前端编译

准备 node16
```dockerfile
FROM centos:7
MAINTAINER shrimp
WORKDIR /apps

ADD node16.15.1 node16.15.1

RUN yum update -y && \
  yum install -y gcc make automake libtool zlib git wget && \
  wget http://www.zlib.net/fossils/zlib-1.2.9.tar.gz && tar -zxvf zlib-1.2.9.tar.gz && \
  cd zlib-1.2.9 && ./configure && make && make install && ln -s -f /usr/local/lib/libz.so.1.2.9 /lib64/libz.so.1 && \
  cd /apps/ && rm -rf zlib-1.2.9* && \
  yum clean all

ENV PATH=/apps/node16.15.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```


### 打包后端应用
```shell
# 打包到指定版本
docker build -t image.wkclz.com/shrimp-cloud/centos7:0.0.1 .
# 打包到latest
docker build -t image.wkclz.com/shrimp-cloud/centos7:latest .
# 多打一个 tag
docker tag [ImageId] image.wkclz.com/shrimp-cloud/centos7:latest
# 运行并进入 img:
docker run -it image.wkclz.com/shrimp-cloud/centos7:0.0.1 /bin/bash
# 查看正在运行的容器
docker ps
# 进入正在运行的容器
docker attach 容器id #Ctrl + P + Q 退出
# 进入正在运行的容器
docker exec -it 容器id /bin/bash
```
Tips:
1. 同一个Dockerfile 使用不同的 tag 标签进行打包，不会重新打包，只会新增标签。推送也将是一样的效果。故可用此方式打出多个标签，方便通过 vpc 网络推送镜像
2. 可以通过命令快速将已有的镜像打上新标签：docker tag [ImageId] [new tag]

### 推送镜像到 img仓库
```shell
# 登录，根据提示完成登录
docker login image.wkclz.com
# 带密码登录
cat /xx/xx/docker.pwd | docker login --username=${username} --password-stdin image.wkclz.com
# 推送
docker push image.wkclz.com/shrimp-cloud/centos7:0.0.1
```


### 镜像使用
> 需要配置镜像源
```shell
FROM image.wkclz.com/shrimp-cloud/centos7:latest
MAINTAINER wkclz

WORKDIR /apps
ADD ./target/*.jar app.jar
```

### 异常处理
- 镜像占用空间太大需要清理：docker system prune -a



## Idea插件连接服务端Docker并打包
- IntelliJ IDEA 2022 (Ultimate Edition)
- 安装插件： Docker
- 配置 Docker,通过 ssh 连接到已经安装Docker的服务器
- 进入 Server 工具窗口，即可远程操作 Docker


## springboot插件打包docker

### 添加依赖
```xml
<!-- Docker maven plugin -->
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>docker-maven-plugin</artifactId>
    <version>1.0.0</version>
    <configuration>
        <imageName>${docker.image.prefix}/${project.artifactId}</imageName>
        <dockerDirectory>src/main/docker</dockerDirectory>
        <resources>
            <resource>
                <targetPath>/</targetPath>
                <directory>${project.build.directory}</directory>
                <include>${project.build.finalName}.jar</include>
            </resource>
        </resources>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>javax.activation</groupId>
            <artifactId>activation</artifactId>
            <version>1.1.1</version>
        </dependency>
    </dependencies>
</plugin>
<!-- Docker maven plugin -->
```
### 添加 dockerfile
- 在 src/main 下创建 docker 目录，再添加 Dockerfile 文件

### 打包
- Jenkins: clean -Dmaven.test.skip=true package docker:build
- Jenkins 权限问题：修改 /lib/systemd/system/docker.service文件，增加启动参数  -G apps

### 后面未完成
