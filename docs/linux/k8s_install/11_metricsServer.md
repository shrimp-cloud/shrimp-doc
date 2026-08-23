# Metrics-Server

> Metrics Server 采集集群中节点的 CPU/内存指标，是 `kubectl top` 命令和 HPA（水平自动伸缩）的数据来源
> 注意：官方 Kubernetes Dashboard 的图形化指标也依赖它，未安装时 `kubectl top` 会报错


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
