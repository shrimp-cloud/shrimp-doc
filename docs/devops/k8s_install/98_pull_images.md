# 境外镜像拉取

> 一个可靠的，花点小钱，但尽可能少花钱的从境外拉取镜像的方式

## 购买按量服务器

- 付费类型: 按量付费
- 地域: 境外 (建议东南亚)
- 实例: 2C2G (按实际情况调整，可更小，可顺畅安装 docker-ce 和执行少量命令即可)
- 镜像: Rocky Linux 9.5 x64
- 系统盘: 最小 (20G)
- 带宽: 使用CDT计费, 带宽峰值调整至最高 (国内20G免费, 境外180G免费)
- 登录凭证: 自定义密码，并设置一个复杂的密码
- 下单购买
- 使用完成之后立即释放
- 整体方案，一小时才1毛多。。

## hosts

设置 hosts 方便操作

```shell
xxx.xxx.xxx.xxx out
```

## 安装 Docker

- 安装 Docker 将自动包含 containerd

```shell
# 安装
wget -O /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
dnf install -y docker-ce
systemctl start containerd
```

## 拉取镜像并导出

```shell
# 拉取镜像
ctr -n k8s.io i pull -k hello-world
# 查看镜像
ctr -n k8s.io images ls
# 导出镜像
ctr -n k8s.io i export hello-world.tar.gz hello-world
```

## 将镜像拉回到本地

```shell
scp root@out:/root/hello-world.tar.gz ./
```

## 导入镜像

```shell
ctr -n k8s.io i import hello-world.tar.gz
```
