# MinIO

> MinIO是一个对象存储解决方案，它提供了与Amazon Web Services S3兼容的API，并支持所有核心S3功能。


## k8s 部署

```yaml
# pod
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: minio
  name: minio
  namespace: uat
spec:
  containers:
    - name: minio
      image: quay.io/minio/minio:latest
      command:
        - /bin/bash
        - -c
      args:
        - minio server /data --console-address :9001
      env:
        - name: MINIO_ROOT_USER
          value: 'admin'
        - name: MINIO_ROOT_PASSWORD
          value: 'your password'
      volumeMounts:
        - mountPath: /data
          name: localvolume
  nodeSelector:
    kubernetes.io/hostname: k8s-master01
  volumes:
    - name: localvolume
      hostPath:
        path: /data/minio/data
        type: DirectoryOrCreate
---
apiVersion: v1
kind: Service
metadata:
  name: minio-svc
  # namespace: uat
spec:
  type: ClusterIP
  ports:
    - port: 9001
      targetPort: 9001
      name: http-9001
  selector:
    app: minio
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minio-ingress
  # namespace: uat
  annotations:
    # 重写路径，取正则表达式的第二个变量
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  ingressClassName: nginx
  rules:
    - host: domain.example.com
      http:
        paths:
          - path: /(.*)
            pathType: Prefix
            backend:
              service:
                name: minio-svc
                port:
                  number: 9001
  tls:
    - hosts:
        - domain.example.com
      # 需要提前导入证书，对应上名称
      secretName: domain.example.com

```

