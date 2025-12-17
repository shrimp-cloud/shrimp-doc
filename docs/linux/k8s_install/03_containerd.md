# 安装 containerd

> 2022 年 4 月 dockershim 将会从 Kubernetes 1.24 中完全移除, 运行需要是 containerd


### 安装 containerd 服务

```shell
dnf -y install containerd.io
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml
```

### 修改配置

启用 cgroup, 修改镜像源
```shell
# vim /etc/containerd/config.toml
SystemdCgroup = true
# 以下镜像若获取不了，才需要替换
sandbox_image = "registry.aliyuncs.com/google_containers/pause:latest"
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
- 阿里云镜像仓库不再提供给阿里云服务以外的应用使用 【若有其他镜像获取方法，可不配置】
```shell
# vim /etc/containerd/config.toml
config_path = "/etc/containerd/certs.d"
# mkdir -p /etc/containerd/certs.d/docker.io/
# vim /etc/containerd/certs.d/docker.io/hosts.toml
[host."https://xxxx.mirror.aliyuncs.com"]
  capabilities = ["pull"]
[host."https://registry.docker-cn.com"]
  capabilities = ["pull"]
```

- config_path 与 mirrors 不能同时存在，在要对 mirrors 做定制化时，更宜用以下方式:
```shell
    [plugins."io.containerd.grpc.v1.cri".registry]
      [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
          endpoint = ["https://xxxx.xx.com"]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."k8s.gcr.io"]
          endpoint = ["https://xxxx.xx.com"]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."gcr.io"]
          endpoint = ["https://xxxx.xx.com"]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."ghcr.io"]
          endpoint = ["https://xxxx.xx.com"]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."quay.io"]
          endpoint = ["https://xxxx.xx.com"]
```


- 设置代理

```shell
# 示例配置文件 /etc/containerd/config.toml

[proxy_plugins]
  [proxy_plugins."io.containerd.proxy.dockerhub"]
    registry_mirrors = ["https://your-proxy-address:port"]
    # 如果代理需要认证，可以在此处添加用户名和密码
    # username = "your-proxy-username"
    # password = "your-proxy-password"
```

- 临时代理

```shell
# 设置HTTP代理
export HTTP_PROXY=http://<proxy_host>:<proxy_port>
export HTTPS_PROXY=https://<proxy_host>:<proxy_port>

# 拉取镜像
crictl pull <image_name>
```


### 启动
```shell
systemctl enable containerd --now
```

- 启动后需检查启动状态，若有失败信息，需要解决
