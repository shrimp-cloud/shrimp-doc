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


### 向k8s中推送更新
1. 进入 https://flow.aliyun.com/ 的 k8s 集群管理，添加集群
2. vim ~/.kube/cofig, 添加到 flow 中【不能修改服务器中的 config】
3. 在 server 同级位置添加配置： `insecure-skip-tls-verify: true`，并修改 server 地址为外部地址，开通服务器防火墙
3. 在 flow 中向 k8s 发起更新, 跳过TLS 验证。部署时即可将应用部署到自定义的 k8s 集群中