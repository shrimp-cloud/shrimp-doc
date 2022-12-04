# 安装 Docker

> 若在容器中使用的是containerd，那么 Docker 不是必需的。但可能需要自行打包镜像，仍然可能需要

### 安装  Docker
安装 docker repo
```shell
yum install -y device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

yum install -y docker-ce
```
Tips: device-mapper-persistent-data lvm2: 存储驱动


### 配置docker ]镜像加速器

```shell
# vim /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "registry-mirrors": ["https://xxxx.mirror.aliyuncs.com"]
}
```

Tips
> registry-mirrors 地址为阿里云镜像服务申请的镜像加速地址，阿里提供了镜像服务：
1. 镜像加速地址获取：https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors
2. 登录账号密码设置：https://cr.console.aliyun.com/cn-shenzhen/instance/credentials
3. 创建仓库并推送镜像：https://cr.console.aliyun.com/cn-shenzhen/instance/repositories

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

