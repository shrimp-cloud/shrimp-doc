# k8s 命令

> 常用命令

| 命令                | 含义          | 说明  |
|-------------------|-------------|-----|
| kubectl get nodes | 查看 nodes 状态 | -   |
| crictl images     | 查看 现有镜像     | -   |


### 安装 helm

helm 是kubernetes 包管理器。帮助您管理 Kubernetes 应用
- 官网：https://helm.sh/zh/docs/intro/install/
- 安装
```shell
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

