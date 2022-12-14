# 阿里 ACR

> 此处介绍白票阿里云容器镜像服务  ACR 相关信息

### 基础信息
- 地址：https://cr.console.aliyun.com/cn-shenzhen/instances
- 创建命名空间
- 创建仓库
- 创建访问凭证

### 推送镜像
- 使用阿里云流水线，打包 Image, 并推送至 ACR 【过程省略】


### 在 k8s 中使用阿里云镜像
创建Secret绑定镜像仓库账号
```shell
kubectl create secret docker-registry aliyun --docker-server=registry.cn-shenzhen.aliyuncs.com --docker-username=XXX --docker-password=XXX --namespace=default
```
创建Deployment绑定Secret 【已省略非 Secret 相关内容】
```yaml
spec:
  template:
    spec:
      imagePullSecrets:
      - name: aliyun
```
然后就可以顺利的从阿里云镜像服务中获取镜像了