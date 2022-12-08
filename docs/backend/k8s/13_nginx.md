# 部署 Nginx

> Nginx 用于部署测试

部署：
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

测试：
```shell
curl http://master_or_node ip:30931
```