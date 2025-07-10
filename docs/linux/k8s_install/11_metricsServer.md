# Metrics-Server


## 安装

```shell
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl apply -f components.yaml
```


## 问题处理

- 启动报错：kubectl logs -n kube-system deployment/metrics-server
- 错误处理
  - x509: cannot validate certificate:

yaml 增加参数

```yaml
args:
  - --kubelet-insecure-tls
```
