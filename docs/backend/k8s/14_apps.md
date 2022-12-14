# 应用 APP


## yaml 部署

### yaml 部署 pod
```shell
kubectl create -f app.yaml
```

### 导出 yaml
```shell
# 导出 deployment
kubectl get deployment redis -o yaml > redis.yaml
# 导出 service
kubectl get service redis-svc -o yaml > redis.yaml
```



## 单机版 redis

打包镜像
```dockerfile
FROM redis
MAINTAINER shrimp
WORKDIR /apps
# 需要自行准备好 redis.conf 文件。包含密码
COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
```

yaml 定义
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      imagePullSecrets:
      - name: aliyun # 阿里云 Secrets
      containers:
      - name: redis
        image: redis # 需要更换为自定义的 redis 镜像
        ports:
        - containerPort: 6379
```

部署
```shell
# yaml 部署
kubectl create -f redis.yaml
# 官方镜像部署
kubectl create deployment redis --image=redis

# 查看状态
kubectl get pods
# 查看进程
crictl ps
# 进入容器
crictl exec -it [_containerd_id] bash
# 改变副本数
kubectl scale deployment redis --replicas=2
```




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


