# 安装 containerd

> 2022 年 4 月 dockershim 将会从 Kubernetes 1.24 中完全移除, 运行需要是 containerd




### 安装 containerd 服务

```shell
yum install -y containerd.io
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml
```

### 修改配置

启用 cgroup, 修改镜像源
```shell
# vim /etc/containerd/config.toml
SystemdCgroup = true
sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.7"
```

修改配置
```shell
# vim /etc/crictl.yaml
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
timeout: 10
debug: false
```


### 配置 containerd 镜像加速
```shell
# vim /etc/containerd/config.toml
config_path = "/etc/containerd/certs.d"
# mkdir -p /etc/containerd/certs.d/docker.io/
# vim /etc/containerd/certs.d/docker.io/hosts.toml
[host."https://xxxx.mirror.aliyuncs.com",host."https://registry.docker-cn.com"]
 capabilities = ["pull"]
```

### 启动 
```shell
systemctl enable containerd --now
```
