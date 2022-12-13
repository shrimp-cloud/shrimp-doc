# 其他 k8s内容

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



### 镜像同步方案
热心网友的镜像同步方案：
- https://github.com/anjia0532/gcr.io_mirror
  示例：ingress-nginx.controller
1. 发 issue 等待同步，同步后 issue 自动回复新镜像地址
2. 将镜像拉回本地：`crictl pull anjia0532/google-containers.ingress-nginx.controller:v1.5.1`
3. 查看镜像：`crictl images`
4. 使用镜像：`docker.io/anjia0532/google-containers.ingress-nginx.controller:v1.5.1`