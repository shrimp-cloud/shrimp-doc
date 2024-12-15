# WordPress

## 准备

- 数据库信息（若为迁移，还需要准备好原数据）
- 附件信息（新建不需要，迁移需要）
- SSL 证书（提前导入）

## k8s 安装

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      volumes:
        - name: wp-uploads
          hostPath:
            # 需要将已有的附件上传到到这里
            path: /data/wp/uploads
            type: DirectoryOrCreate
      containers:
        - name: wordpress
          image: docker.io/library/wordpress:latest
          env:
            # 需要修正下述数据库信息
            - name: WORDPRESS_DB_HOST
              value: wp_host:port
            - name: WORDPRESS_DB_USER
              value: wp
            - name: WORDPRESS_DB_PASSWORD
              value: wp_pwd
            - name: WORDPRESS_DB_NAME
              value: wp_db
          volumeMounts:
            - name: wp-uploads
              mountPath: /var/www/html/wp-content/uploads
---
# ClusterIP 模式
apiVersion: v1
kind: Service
metadata:
  name: wordpress-svc
  namespace: prod
spec:
  type: ClusterIP
  ports:
    - name: http-80
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: wordpress
---
# 此处仅为 host 模式，需要使用 ClusterIP 模式开放
apiVersion: v1
kind: Service
metadata:
  name: wordpress-svc-nodeport
  namespace: prod
spec:
  type: NodePort
  ports:
    - name: http-80
      nodePort: 30081
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: wordpress
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: wordpress-ingress
  namespace: prod
spec:
  ingressClassName: nginx
  rules:
    - host: wp.example.com
      http:
        paths:
          - backend:
              service:
                name: wordpress-svc
                port:
                  number: 80
            path: /
            pathType: Prefix
  tls:
    - hosts:
        - wp.example.com
      secretName: wp.example.com

```
