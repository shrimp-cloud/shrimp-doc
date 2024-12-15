# Cert-Manager

Cert-Manager 是一款用于 Kubernetes 集群中自动化管理 TLS 证书的开源工具，它使用了 Kubernetes 的自定义资源定义（CRD）机制，让证书的创建、更新和删除变得非常容易。
Cert-Manager 是将 TLS 证书视为一种资源，就像 Pod、Service 和 Deployment 一样，可以使用 Kubernetes API 进行管理。它使用了自定义资源定义（CRD）机制，通过扩展 Kubernetes API，为证书的生命周期提供了标准化的管理方式。


- 官网：https://cert-manager.io/docs/installation/kubectl/
- 支持的 DNS01: https://cert-manager.io/docs/configuration/acme/dns01/#webhook
- alidns-webhook【下文选用此方案】: https://github.com/pragkent/alidns-webhook
- Alibaba Cloud DNS ACME webhook: https://github.com/DEVmachine-fr/cert-manager-alidns-webhook
- 引用个讲得比较透彻的文章：https://cloud.tencent.com/developer/article/1731547

## 安装 Cert-Manager

- github: https://github.com/cert-manager/cert-manager/releases
- 安装: `kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.15.0/cert-manager.yaml`
- 安装成功: `kubectl get pods -n cert-manager` 三个 pod 都正常启动之后即为安装成功，可以下一步
- 安装 alidns-webhook: `kubectl apply -f https://raw.githubusercontent.com/pragkent/alidns-webhook/master/deploy/bundle.yaml`
  - 使用 docker.m.daocloud.io 无法拉取，不在白名单


## 创建 alidns-secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: alidns-secret
  namespace: cert-manager
data:
  access-key: 【echo "Accesskey-ID" |base64】
  secret-key: 【echo "Accesskey-secret" |base64】
```


## 创建证书颁发实体对象

```yaml
# 使用 dns01 验证器
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-issuer
spec:
  acme:
    # 自己的邮箱
    email: admin@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-issuer
    solvers:
      - dns01:
          webhook:
            groupName: api.example.com
            solverName: alidns
            config:
              region: ""
              accessKeySecretRef:
                name: alidns-secret
                key: access-key
              secretKeySecretRef:
                name: alidns-secret
                key: secret-key
---
# 使用 http01 验证 【基于 http 可以调通的情况下】
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-issuer
spec:
  acme:
    email: admin@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-issuer
    solvers:
      - http01:
          ingress:
            class: nginx
```



- ClusterIssuer 对任意命名空间都生效，不属于任何一个全名空间


## 创建证书

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: api.example.com
  namespace: uat
spec:
  # 证书名称，将被用在 ingress 上
  secretName: api.example.com
  dnsNames:
    - api.example.com
  issuerRef:
    # 需要对应上 ClusterIssuer
    name: letsencrypt-issuer
    kind: ClusterIssuer

```

- 查看签发过程：`kubectl logs -f -n cert-manager cert-manager-webhook-xxxxxxxxxx-xxxxx`
- 查看签发状态: `kubectl get certificate -A`


## Ingress 引用

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-issuer"
spec:
  tls:
  - hosts:
    - api.example.com
    secretName: api.example.com
```
- 移除了不相关的内容
- 签发时间: 据说是10分钟。。等待ing，不行呐

- 现在还没成功。。谁能指导一下呢
