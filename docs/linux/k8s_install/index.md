# Kubernetes

> Kubernetes 的全系列文章，按文档顺序操作即可搭建 k8s 集群

## 安装主线

| 文档 | 说明 |
| --- | --- |
| [01 服务器初始化](01_init.md) | 服务器基础环境准备：主机名、SELinux、swap、防火墙、时间同步、内核参数 |
| [02 安装 Docker](02_docker.md) | Docker 安装（使用 containerd 时可不装，但可能需自行打包镜像） |
| [03 安装 containerd](03_containerd.md) | containerd 容器运行时安装、镜像加速配置 |
| [04 安装 kubelet](04_kubelet.md) | 安装 kubelet / kubeadm / kubectl 并初始化集群 |
| [05 集群 node](05_node.md) | node 节点加入集群、标签与污点管理 |
| [06 安装 calico](06_calico.md) | Calico 网络组件安装及异常处理 |
| [07 安装 Ingress](07_ingress.md) | ingress-nginx 安装与使用 |

## 工具与组件

| 文档 | 说明 |
| --- | --- |
| [08 Secret](08_cert.md) | k8s 证书管理（Cert-Manager） |
| [09 阿里 ACR](09_acr.md) | 阿里云容器镜像服务（ACR）使用 |
| [10 Harbor](10_harbor.md) | Harbor 私有镜像仓库搭建 |
| [11 Metrics-Server](11_metricsServer.md) | Metrics Server 安装与问题处理 |
| [12 Helm](12_helm.md) | Helm 安装与使用 |
| [39 界面 UI](39_other_ui.md) | Dashboard、Kuboard、Rancher 管理界面 |

## 参考

| 文档 | 说明 |
| --- | --- |
| [98 境外镜像拉取](98_pull_images.md) | 从境外服务器拉取镜像的方案 |
| [99 其他 k8s 内容](99_others.md) | 网段规划、镜像同步、常见异常处理 |
