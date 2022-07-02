# 前端定制基础镜像

### Dockerfile 打包[基础镜像]
准备 Node
```shell
wget https://cdn.npmmirror.com/binaries/node/v16.15.1/node-v16.15.1-linux-x64.tar.xz
xz -d node-v16.15.1-linux-x64.tar.xz
tar -xvf node-v16.15.1-linux-x64.tar
mv node-v16.15.1-linux-x64 node16.15.1
```

打包镜像
```shell
vim Dockerfile
tee ./Dockerfile <<-'EOF'
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
EOF
```
打包
```shell
# 打包到指定版本
docker build -t registry-vpc.cn-shenzhen.aliyuncs.com/lz-cloud/centos7-nodejs:16.15.1 .
# 运行并进入 img:
docker run -it registry-vpc.cn-shenzhen.aliyuncs.com/lz-cloud/centos7-nodejs:16.15.1 /bin/bash
docker run -w /root/workspace --entrypoint=/bin/bash -it registry-vpc.cn-shenzhen.aliyuncs.com/lz-cloud/centos7-nodejs:16.15.1
# 查看正在运行的容器
docker ps
# 进入正在运行的容器
docker attach 容器id #Ctrl + P + Q 退出
# 进入正在运行的容器
docker exec -it 容器id /bin/bash
```

### 推送镜像到 img仓库
```shell
# 登录，根据提示完成登录
docker login registry-vpc.cn-shenzhen.aliyuncs.com
# 推送
docker push registry-vpc.cn-shenzhen.aliyuncs.com/lz-cloud/centos7-nodejs:16.15.1
```

### 可能的后缀步骤
```shell
# 安装 yarn
npm install -g yarn
# 安装依赖
yarn install
# 编译
yarn build:uat
```


