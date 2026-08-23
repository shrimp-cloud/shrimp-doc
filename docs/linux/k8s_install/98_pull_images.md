# 境外镜像拉取

> 思路：购买一台境外临时服务器（按量计费）→ 在上面拉取并导出镜像 → 拷回本地 → 导入集群
> 适合拉取 gcr.io、quay.io、ghcr.io 等国内无法访问的镜像，用完即释放，整体成本很低

## 购买按量服务器

- 未直接说明的，保留默认值
- 付费类型: 抢占式实例
- 地域: 境外 (建议东南亚)
- 实例: 2C2G (按实际情况调整，可更小，可顺畅安装 containerd 和执行少量命令即可)
- 实例使用时长: 无固定时长
- 镜像: Rocky Linux 9.5 x64
- 系统盘: 最小 (20G)
- 带宽: 使用CDT计费, 带宽峰值调整至最高 (国内20G免费, 境外180G免费)
- 登录凭证: 自定义密码，并设置一个复杂的密码
- 下单购买
- 使用完成之后立即释放
- 整体方案，一小时才 1 毛多

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
dnf install -y containerd
systemctl start containerd
```

## 拉取镜像并导出

### ctr 拉取，导出镜像

```shell
# 拉取镜像（示例用 hello-world，按需替换为 [仓库/镜像:标签]，-k 表示跳过证书校验）
ctr -n k8s.io i pull -k hello-world:latest
# 查看镜像
ctr -n k8s.io images ls
# 导出镜像
ctr -n k8s.io i export hello-world.tar hello-world:latest
```

### docker 拉取，导出镜像

```shell
# 拉取镜像
docker pull hello-world:latest
# 查看镜像
docker images
# 导出镜像
docker save hello-world:latest > hello-world.tar
```


## 将镜像拉回到本地

```shell
scp root@out:/root/hello-world.tar.gz ./
```

## 导入镜像

```shell
# 导入镜像（在目标集群节点上执行）
ctr -n k8s.io images import hello-world.tar
# 查看镜像（ctr 与 crictl 均可查看）
ctr -n k8s.io images list
crictl images
```
