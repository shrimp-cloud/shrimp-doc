# Helm


## 官方脚本安装

```shell
# 官方下载和安装
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
# 验证安装
helm version
```


## 包管理器安装

```shell
dnf install epel-release -y
dnf install helm -y

# 验证安装
helm version
```


## 使用（以 gitlab 作为示例）

- 添加 GitLab 的 Helm 仓库
```shell
helm repo add gitlab https://charts.gitlab.io/
helm repo update
```

- 安装 GitLab Helm Chart


```shell
# 使用 gitlib 的 certmanager 管理证书
helm install gitlab gitlab/gitlab \
  --set global.host=git.example.com \
  --set global.ingress.tls.enabled=true \
  --set global.ingress.tls.autoGenerateCertificate=true \
  --set certmanager.email=admin@example.com

# 使用k8s现有的 certmanager
helm install gitlab gitlab/gitlab \
  --set global.host=git.example.com \
  --set global.ingress.tls.enabled=true \
  --set global.ingress.tls.autoGenerateCertificate=true \
  --set certmanager.install=false

# 使用外部 yaml 安装
helm install gitlab gitlab/gitlab -f gitlab-values.yaml
```


- 配置 gitlab-values.yaml
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
