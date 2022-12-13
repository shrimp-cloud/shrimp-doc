# 应用 APP

## Nginx

### Nginx 部署

```shell
# 部署 nginx
kubectl create deployment nginx --image=nginx
# 配置 NodePort 映射
kubectl expose deployment nginx --port=80 --type=NodePort
# 获取映射的端口
kubectl get pod,svc
# 改变副本数
kubectl scale deployment nginx --replicas=3
# 查看 pods
kubectl get pods
```

### Nginx 测试

```shell
curl http://master_or_node ip:30931
```


## Redis

### 部署

```shell
# 部署
kubectl create deployment redis --image=redis
# 查看状态
kubectl get pods
# 查看进程
crictl ps
# 进入容器
crictl exec -it [_containerd_id] bash

```