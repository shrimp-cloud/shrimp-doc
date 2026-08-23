# 安装 containerd

> containerd 是 k8s 的容器运行时，负责真正创建/运行容器（每个 pod 里的容器都由它启动）
> k8s 1.24 起已彻底移除 dockershim，集群节点必须使用 containerd（或 CRI-O）等 CRI 兼容运行时


## 安装 containerd 服务

> 注意：`containerd.io` 这个包来自 docker-ce 软件源，请确保已配置 docker-ce 的 yum 源（见 02_docker.md）
```shell
dnf -y install containerd.io cri-tools
# 生成默认配置文件（生成后可按需修改 /etc/containerd/config.toml）
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml
```

## 修改配置

启用 cgroup, 修改镜像源
> SystemdCgroup = true：让 containerd 与 kubelet 使用同一种 cgroup 驱动（systemd），不一致会导致 kubelet 无法正常管理 pod 资源
> sandbox_image：pause 基础镜像（每个 pod 都会先启动它），国内访问 k8s 官方仓库受限时替换为国内镜像源
```shell
# vim /etc/containerd/config.toml
SystemdCgroup = true
# 以下镜像若获取不了，才需要替换
sandbox_image = "registry.aliyuncs.com/google_containers/pause:latest"
```

配置 crictl
> crictl 是 containerd 的命令行客户端（类似 docker 命令），通过 /etc/crictl.yaml 指定连接哪个运行时
```shell
# vim /etc/crictl.yaml
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
timeout: 10
debug: false
```


## 配置 containerd 镜像加速
> 目的：让 containerd 从国内镜像源拉取镜像，避免拉取超时
> 说明：阿里云镜像仓库不再提供给阿里云服务以外的应用使用，若有其他镜像获取方法，可不配置

方式一：config_path 目录方式（按仓库目录放 hosts.toml 配置）
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

方式二：mirrors 配置方式
> `config_path` 与 `mirrors` 不能同时存在；需要精细控制每个仓库的镜像源时，更宜用以下方式：
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


## 启动
```shell
systemctl enable containerd --now
```

- 启动后需检查启动状态，若有失败信息，需要解决
```shell
# 检查服务状态，active (running) 为正常
systemctl status containerd
# 验证 crictl 能正常连接 containerd
crictl version
```
