# containerd

## 基本信息

- github: https://github.com/containerd/containerd
- 官网: https://containerd.io

## 下载 containerd

```shell
wget https://github.com/containerd/containerd/releases/download/v2.0.0/containerd-2.0.0-linux-amd64.tar.gz
tar Cxzvf /usr/local containerd-2.0.0-linux-amd64.tar.gz

```

## systemd

- https://raw.githubusercontent.com/containerd/containerd/main/containerd.service
- 下载到 `/usr/local/lib/systemd/system/containerd.service`

```shell
systemctl daemon-reload
systemctl enable containerd --now
```

## 安装 runc

- 在 https://github.com/opencontainers/runc/releases 下载 runc.amd64
- 安装: `install -m 755 runc.amd64 /usr/local/sbin/runc`


## 安装 CNI 插件

- 下载地址：https://github.com/containernetworking/plugins/releases
- 安装: `mkdir -p /opt/cni/bin && tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-*.tgz`


## 交互

| Name    | Community             | API    | Target             | Web site                                                                |
|---------|-----------------------|--------|--------------------|-------------------------------------------------------------------------|
| ctr     | containerd            | Native | For debugging only | (None, see ctr --help to learn the usage)                               |
| nerdctl | containerd (non-core) | Native | General-purpose    | https://github.com/containerd/nerdctl                                   |
| crictl  | Kubernetes SIG-node   | CRI    | For debugging only | https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md |

- 使用示例：

```shell
# Example (ctr):
ctr images pull docker.io/library/redis:alpine
ctr run docker.io/library/redis:alpine redis
# Example (nerdctl):
nerdctl run --name redis redis:alpine
```


## 配置

- 创建默认配置文件: `containerd config default > /etc/containerd/config.toml`
- 配置示例: https://github.com/containerd/containerd/blob/main/docs/man/containerd-config.toml.5.md

- mirror 说明：
  - containerd 配置 mirror 后，crictl拉取镜像才能生效，ctr 命令拉取镜像不生效
  - docker 只支持 dockerhub 配置 mirror，cotainerd支持任意仓库配置 mirror
