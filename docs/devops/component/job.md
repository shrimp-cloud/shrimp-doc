# JOB

## 选型

> xxl-job

## 部署

- 初始化数据库, 并将数据连接信息使用在下方 yaml 中
- 容器部署，使用以下 yaml 直接在 k8s 部署

```yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: xxl-job
  labels:
    app: xxl-job
spec:
  replicas: 1
  selector:
    matchLabels:
      app: xxl-job
  # 发布策略-平滑发布
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: xxl-job
    spec:
      volumes:
        # 挂载本地磁盘写日志
        - name: xxl-job-logs
          hostPath:
            path: /opt/xxl-job/logs
            type: DirectoryOrCreate
      containers:
        - name: xxl-job
          image: xuxueli/xxl-job-admin:2.4.0
          env:
            - name: JAVA_OPTS
              value: '-server -Xms512m -Xmx512m'
            - name: PARAMS
              value: '--spring.datasource.username=xxl_job --spring.datasource.password=xxl_job_password --spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai'
          ports:
            - containerPort: 8080
          # 日志目录
          volumeMounts:
            - mountPath: /apps/logs
              name: xxl-job-logs
---
apiVersion: v1
kind: Service
metadata:
  name: xxl-job-svc
spec:
  type: ClusterIP
  ports:
    - port: 8080
      targetPort: 8080
      name: http-8080
  selector:
    app: xxl-job
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: xxl-job-ingress
  annotations:
    # 重写路径，取正则表达式的第二个变量
    nginx.ingress.kubernetes.io/rewrite-target: /$1
    # 支持跨域
    nginx.ingress.kubernetes.io/enable-cors: 'true'
    # 响应所有origin
    nginx.ingress.kubernetes.io/cors-allow-origin: '*'
    # 响应所有请求方法
    nginx.ingress.kubernetes.io/cors-allow-methods: GET, POST, PUT, DELETE, OPTIONS
    # 可跨域的请求头
    nginx.ingress.kubernetes.io/cors-allow-headers: Content-Type
spec:
  ingressClassName: nginx
  rules:
    - host: xxl-job.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: xxl-job-svc
                port:
                  number: 8080


```

