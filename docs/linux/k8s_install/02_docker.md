# 安装 docker

> k8s 1.24 起已不再使用 Docker 作为容器运行时（改由 containerd 负责），因此 Docker 对集群运行**不是必需**的
> 但以下场景仍然需要 Docker：
> - 需要自行构建、打包镜像
> - 习惯用 `docker pull/tag/push` 操作镜像（可以用 ctr/crictl 替代）
> - 部分中间件（如 Harbor 安装脚本）依赖 docker/docker-compose

- 安装见 [Docker](../platform/docker.md)
