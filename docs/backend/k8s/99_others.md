# k8s 其他内容

> 本章节放置一些相关度不大，不方便类归，或未完成的工作

### 网段规划
- node 网段：192.168.0.0/16
- pod 网段：10.12.0.0/16


### 安装 helm

helm 是kubernetes 包管理器。帮助您管理 Kubernetes 应用
- 官网：https://helm.sh/zh/docs/intro/install/
- 安装
```shell
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```