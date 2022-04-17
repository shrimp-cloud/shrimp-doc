# Docker安装和使用

## Docker 安装


### 环境准备
```shell
- yum install -y vim yum-utils device-mapper-persistent-data lvm2
- yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
- yum makecache fast
```
Tips: device-mapper-persistent-data lvm2: 存储驱动


### 安装 Docker
- yum -y install docker-ce
- 若安装冲突，需要 yum remove 冲突的依赖包

- 镜像加速：
```bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxxxxxx.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
```
registry-mirrors 地址为阿里云镜像服务申请的镜像加速地址，阿里提供了镜像服务：
1. 镜像加速地址获取：https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors
2. 登录账号密码设置：https://cr.console.aliyun.com/cn-shenzhen/instance/credentials
3. 创建仓库并推送镜像：https://cr.console.aliyun.com/cn-shenzhen/instance/repositories

### 启动 Docker 后台服务
```shell
systemctl start docker
systemctl enable docker
```

### 测试运行 hello-world
> 由于本地没有hello-world这个镜像，所以会下载一个hello-world的镜像，并在容器内运行。
```shell
docker run hello-world
```


### Dockerfile 打包[基础镜像]
准备JDK
```shell
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz
tar -zxvf jdk-17_linux-x64_bin.tar.gz
mv jdk-17* jdk17
```

打包镜像
```shell
vim Dockerfile
tee ./Dockerfile <<-'EOF'
FROM centos:7
MAINTAINER lz
WORKDIR /apps

# JDK
ADD jdk17 jdk17

# 安装基本依赖
RUN yum install -y zsh vim less openssh-clients net-tools numactl zip unzip wget telnet bind-utils && \
  yum clean all

# 环境变量
ENV JAVA_HOME=/apps/jdk17
ENV PATH=/apps/jdk17/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ENV LANG=en_US.utf8
EOF
```
打包
```shell
# 打包到指定版本
docker build -t image.wkclz.com/lz-cloud/centos7:0.0.1 .
# 打包到latest
docker build -t image.wkclz.com/lz-cloud/centos7:latest .
# 运行并进入 img:
docker run -it image.wkclz.com/lz-cloud/centos7:0.0.1 /bin/bash
```
Tips: 
1. 同一个Dockerfile 使用不同的 tag 标签进行打包，不会重新打包，只会新增标签。推送也将是一样的效果。故可用此方式打出多个标签，方便通过 vpc 网络推送镜像
2. 可以通过命令快速将已有的镜像打上新标签：docker tag [ImageId] [new tag]

### 推送镜像到 img仓库
```shell
# 登录，根据提示完成登录
docker login image.wkclz.com
# 推送
docker push image.wkclz.com/lz-cloud/centos7:0.0.1
```


### 镜像使用
> 需要配置镜像源
```shell
FROM image.wkclz.com/lz-cloud/centos7:latest
MAINTAINER wkclz
 
WORKDIR /apps
ADD ./target/lz-demo.jar app.jar
```


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