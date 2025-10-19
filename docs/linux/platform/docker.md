# Docker

> Docker是一组平台即服务（PaaS）的产品。它基于操作系统层级的虚拟化技术，将软件与其依赖项打包为容器。托管容器的软件称为Docker引擎。Docker能够帮助开发者在轻量级容器中自动部署应用程序，并使得不同容器中的应用程序彼此隔离，高效工作。该服务有免费和高级版本。

## 准备

- Docker 可以安装在常见的服务器环境和桌面环境安装。以下只使用 Rocky Linux 9 完成相关逻辑
- RockyLinux9 操作系统
- 梯子



## 安装  Docker


### 安装 docker
安装 docker repo
```shell
# 安装驱动
dnf install -y device-mapper-persistent-data lvm2
# 安装 repo,以下方式，地址，选择其一
wget -O /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
# 安装 docker
dnf install -y docker-ce
```
Tips:
- device-mapper-persistent-data lvm2: 存储驱动


### 配置docker镜像加速器

```shell
# vim /etc/docker/daemon.json
# 阿里云 (现已不再提供给云服务之外的应用使用)
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "registry-mirrors": [
    "https://xxxx.mirror.aliyuncs.com"
  ]
},
# 腾讯云
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com"
  ]
}

# 生效
systemctl daemon-reload
systemctl restart docker
# 查看
docker info
```

Tips(现已不再提供给云服务之外的应用使用)
> registry-mirrors 地址为阿里云镜像服务申请的镜像加速地址，阿里提供了镜像服务：
1. 镜像加速地址获取：https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors
2. 登录账号密码设置：https://cr.console.aliyun.com/cn-shenzhen/instance/credentials
3. 创建仓库并推送镜像：https://cr.console.aliyun.com/cn-shenzhen/instance/repositories
4. 生效: `systemctl daemon-reload && systemctl restart docker`,


systemd
> systemd是系统自带的cgroup管理器, 系统初始化就存在的, 和cgroups联系紧密,为每一个进程分配cgroups, 用它管理就行了. 如果设置成cgroupfs就存在2个cgroup控制管理器, 实验证明在资源有压力的情况下,会存在不稳定的情况.
确认 systemd 配置是否生效：
```shell
docker info | grep Cgroup
```

### 启动和测试 Docker
启动
```shell
systemctl enable docker --now
```

测试
```shell
docker run hello-world
```

代理
```shell
# 设置HTTP代理
export HTTP_PROXY=http://<proxy_host>:<proxy_port>
export HTTPS_PROXY=https://<proxy_host>:<proxy_port>

# 拉取镜像
docker pull <image_name>
```


## 使用


## 常用命令

# Docker 常用命令速查表

| 类别         | 命令                                        | 说明                        | 示例                                                |
|------------|-------------------------------------------|---------------------------|---------------------------------------------------|
| **镜像管理**   | `docker pull <镜像名>:<标签>`                  | 从仓库下载镜像                   | `docker pull nginx:latest`                        |
|            | `docker images`                           | 查看本地所有镜像                  | `docker images`                                   |
|            | `docker rmi <镜像ID/名称>`                    | 删除本地镜像                    | `docker rmi nginx`                                |
|            | `docker image ls`                         | 同 `docker images`         | `docker image ls`                                 |
|            | `docker image rm <镜像>`                    | 同 `docker rmi`            | `docker image rm nginx`                           |
| **容器管理**   | `docker run [选项] <镜像>`                    | 创建并运行容器                   | `docker run -d -p 80:80 --name web nginx`         |
|            | `docker ps`                               | 查看运行中的容器                  | `docker ps`                                       |
|            | `docker ps -a`                            | 查看所有容器（含已停止）              | `docker ps -a`                                    |
|            | `docker stop <容器>`                        | 停止运行中的容器                  | `docker stop web`                                 |
|            | `docker start <容器>`                       | 启动已停止的容器                  | `docker start web`                                |
|            | `docker restart <容器>`                     | 重启容器                      | `docker restart web`                              |
|            | `docker rm <容器>`                          | 删除已停止的容器                  | `docker rm web`                                   |
|            | `docker kill <容器>`                        | 强制终止容器                    | `docker kill web`                                 |
| **容器操作**   | `docker exec -it <容器> /bin/bash`          | 进入运行中的容器                  | `docker exec -it web /bin/sh`                     |
|            | `docker logs <容器>`                        | 查看容器日志                    | `docker logs web`                                 |
|            | `docker logs -f <容器>`                     | 实时跟踪日志输出                  | `docker logs -f web`                              |
|            | `docker stats`                            | 实时查看容器资源使用                | `docker stats`                                    |
|            | `docker cp <源> <目标>`                      | 容器与宿主机间复制文件               | `docker cp web:/app/log.txt .`                    |
|            | `docker inspect <容器>`                     | 查看容器详细信息（JSON）            | `docker inspect web`                              |
| **网络管理**   | `docker network ls`                       | 查看所有网络                    | `docker network ls`                               |
|            | `docker network create <网络名>`             | 创建自定义网络                   | `docker network create mynet`                     |
|            | `docker network connect <网络> <容器>`        | 将容器连接到网络                  | `docker network connect mynet web`                |
|            | `docker network disconnect <网络> <容器>`     | 断开容器网络连接                  | `docker network disconnect mynet web`             |
| **数据卷管理**  | `docker volume ls`                        | 查看所有数据卷                   | `docker volume ls`                                |
|            | `docker volume create <卷名>`               | 创建数据卷                     | `docker volume create dbdata`                     |
|            | `docker volume rm <卷名>`                   | 删除数据卷                     | `docker volume rm dbdata`                         |
| **系统管理**   | `docker info`                             | 查看 Docker 系统信息            | `docker info`                                     |
|            | `docker version`                          | 查看 Docker 版本              | `docker version`                                  |
|            | `docker system prune`                     | 清理未使用的资源（容器、网络、镜像）        | `docker system prune`                             |
|            | `docker system df`                        | 查看磁盘使用情况                  | `docker system df`                                |
| **构建镜像**   | `docker build -t <镜像:标签> .`               | 根据 Dockerfile 构建镜像        | `docker build -t myapp:v1 .`                      |
|            | `docker build --no-cache -t <镜像> .`       | 构建时不使用缓存                  | `docker build --no-cache -t myapp .`              |
| **镜像导出导入** | `docker save -o <文件名.tar> <镜像名>:<标签>`     | 将镜像导出为 tar 文件（保留所有层和元数据）  | `docker save -o nginx.tar nginx:latest`           |
|            | `docker save <镜像> \| gzip > <文件名.tar.gz>` | 导出并压缩镜像（节省空间）             | `docker save nginx:latest \| gzip > nginx.tar.gz` |
|            | `docker save -o - <镜像> > <文件.tar>`        | 导出镜像到文件（标准输出重定向）          | `docker save -o - nginx:latest > nginx.tar`       |
|            | `docker load -i <文件名.tar>`                | 从 tar 文件导入镜像              | `docker load -i nginx.tar`                        |
|            | `gzip -dc <文件名.tar.gz> \| docker load`    | 导入压缩的镜像文件                 | `gzip -dc nginx.tar.gz \| docker load`            |
|            | `docker load < <文件名.tar>`                 | 从文件导入镜像（重定向输入）            | `docker load < nginx.tar`                         |
| **其他**     | `docker pause <容器>`                       | 暂停容器（冻结进程）                | `docker pause web`                                |
|            | `docker unpause <容器>`                     | 恢复暂停的容器                   | `docker unpause web`                              |
|            | `docker rename <旧名> <新名>`                 | 重命名容器                     | `docker rename web web-server`                    |
|            | `docker tag <源镜像> <目标镜像>`                 | 为镜像打标签                    | `docker tag nginx myrepo/nginx:v1`                |
|            | `docker login`                            | 登录 Docker 仓库              | `docker login`                                    |
|            | `docker push <镜像>`                        | 推送镜像到仓库                   | `docker push myrepo/nginx:v1`                     |
|            | `docker run --rm <镜像>`                    | 容器退出后自动删除                 | `docker run --rm alpine echo "hello"`             |
|            | `docker run --platform linux/amd64 <镜像>`  | 指定运行平台（如 ARM Mac 上运行 x86） | `docker run --platform linux/amd64 ubuntu`        |



### 跨平台拉取镜像

- 本地有梯子，但本地为 arm。服务器无梯子(复杂)，但服务器为 amd64, 无法本地拉镜像到服务器
- 查看当前 Docker 所处的CPU 架构: `docker version | grep 'Arch'`

```shell
docker pull --platform linux/amd64 hello-world:latest
```

- platform 参数清单

| 平台值            | 说明                                  |
|----------------|-------------------------------------|
| linux/amd64    | Intel/AMD 64位（x86_64）               |
| linux/arm64	   | ARM 64位（Apple Silicon、AWS Graviton） |
| linux/arm/v7   | ARM 32位 v7（树莓派 Raspberry Pi OS）     |
| linux/arm/v6   | 更老的 ARM 32位（如初代树莓派）                 |
| linux/386      | 32位 x86（i386）                       |
| linux/ppc64le  | IBM PowerPC 64位小端                   |
| linux/s390x    | IBM Z 大型机架构                         |
| llinux/riscv64 | RISC-V 64位（新兴架构)                    |
| windows/amd64  | Windows 64位                         |
| windows/386    | Windows 32位（较少见）                    |




### 其他

```shell
# 清理悬空的挂载卷
docker volume prune
# 清理悬空的镜像
docker image prune -af
# 清理悬空的资源(容器/镜像/网络/缓存)
docker system prune -f
```

