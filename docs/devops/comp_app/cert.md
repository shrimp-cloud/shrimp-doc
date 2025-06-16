# Cert 证书


## RHEL 安装

```shell
# 安装
dnf install -y epel-release
dnf install -y certbot python3-certbot-nginx
# CentOS7默认为 python2, 需要使用如下命令安装 nginx 插件
yum install -y certbot python2-certbot-nginx

# 申请证书
certbot --nginx -d domain.example.com
# 按提示进行，就能拿到证书。这家伙居然自己找到了配置文件，完成了证书配置, 还重新加载了 nginx 配置

# 手动签发证书，不自动
# certbot certonly --manual -d domain.example.com
```

```shell
# 手动测试续期
certbot renew --dry-run
```


## k8s


Cert-Manager 是一款用于 Kubernetes 集群中自动化管理 TLS 证书的开源工具，它使用了 Kubernetes 的自定义资源定义（CRD）机制，让证书的创建、更新和删除变得非常容易。
Cert-Manager 是将 TLS 证书视为一种资源，就像 Pod、Service 和 Deployment 一样，可以使用 Kubernetes API 进行管理。它使用了自定义资源定义（CRD）机制，通过扩展 Kubernetes API，为证书的生命周期提供了标准化的管理方式。


- 官网：https://cert-manager.io/docs/installation/kubectl/
- 支持的 DNS01: https://cert-manager.io/docs/configuration/acme/dns01/#webhook
- 引用个讲得比较透彻的文章：https://cloud.tencent.com/developer/article/1731547


- 安装 cert-manager
- github: https://github.com/cert-manager/cert-manager/releases

```shell
# 安装 cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml

# 检查状态
kubectl get pods -n cert-manager


# 若安装过 Rancher 捍但没卸载干净，会导致安装失败
```

- 创建一个 ClusterIssuer 资源指向 Let's Encrypt 的 ACME 服务

```yaml
# cluster-issuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # 替换为你的邮箱
    email: your-email@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
      - http01:
          ingress:
            class: nginx
```


- 为 Ingress 自动申请证书


```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    # 重点，需要与 ClusterIssuer 保持一致
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
    - hosts:
        - example.com
      secretName: example-com-tls
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

