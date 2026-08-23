# Helm

> Helm 是 Kubernetes 的包管理器，帮助您管理 Kubernetes 应用
> 官网：https://helm.sh/zh/docs/intro/install/
> 三个核心概念：
> - **Chart**：打包好的应用模板（类似"安装包"，一个 Chart 对应一套应用，如 GitLab）
> - **Repo（仓库）**：存放 Chart 的仓库，用 `helm repo add` 添加
> - **Release**：Chart 安装到集群后的运行实例，用 `helm install/upgrade/delete` 管理

## 官方脚本安装

```shell
# 官方下载和安装
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
# 验证安装
helm version
```

> 也可先下载脚本，再执行安装：
```shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```


## 包管理器安装

```shell
dnf install epel-release -y
dnf install helm -y

# 验证安装
helm version
```


## 使用（以 GitLab 为例）

### 添加仓库

```shell
helm repo add gitlab https://charts.gitlab.io/
helm repo update
```

### 安装 Chart

```shell
# 使用 gitlib 的 certmanager 管理证书
helm install gitlab gitlab/gitlab \
  --set global.host=git.example.com \
  --set global.ingress.tls.enabled=true \
  --set global.ingress.tls.autoGenerateCertificate=true \
  --set certmanager.email=admin@example.com

# 使用 k8s 现有的 certmanager
helm install gitlab gitlab/gitlab \
  --set global.host=git.example.com \
  --set global.ingress.tls.enabled=true \
  --set global.ingress.tls.autoGenerateCertificate=true \
  --set certmanager.install=false

# 使用外部 yaml 安装
helm install gitlab gitlab/gitlab -f gitlab-values.yaml
```

### 配置 gitlab-values.yaml

```yaml
global:
  host: git.example.com
  ingress:
    tls:
      enabled: true
      autoGenerateCertificate: true
certmanager-issuer:
  email: admin@example.com
```


## 卸载

```shell
helm delete gitlab
```
