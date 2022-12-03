# kuboard

> Kuboard, 快速在 Kubernetes 落地微服务

官网 https://kuboard.cn/

## 前提
- [安装Docker](docs/backend/k8s/docker.mdend/k8s/docker.md)


## 安装 Kubernetes

### 安装 Kuboard-Spray

- 安装 kuboard-spray
```shell
docker run -d \
  --privileged \
  --restart=unless-stopped \
  --name=kuboard-spray \
  -p 80:80/tcp \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/kuboard-spray-data:/data \
  eipwork/kuboard-spray:latest-amd64
  # 如果抓不到这个镜像，可以尝试一下这个备用地址：
  # swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard-spray:latest-amd64
```

- 添加域名映射：http://kuboard.example.com/
- 重置密码：你猜

- 安装 Kuboard v3 - 内建用户库
```shell
sudo docker run -d \
  --restart=unless-stopped \
  --name=kuboard \
  -p 80:80/tcp \
  -p 10081:10081/tcp \
  -e KUBOARD_ENDPOINT="http://内网IP:80" \
  -e KUBOARD_AGENT_SERVER_TCP_PORT="10081" \
  -v /root/kuboard-data:/data \
  eipwork/kuboard:v3
  # 也可以使用镜像 swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v3 ，可以更快地完成镜像下载。
  # 请不要使用 127.0.0.1 或者 localhost 作为内网 IP \
  # Kuboard 不需要和 K8S 在同一个网段，Kuboard Agent 甚至可以通过代理访问 Kuboard Server \
```

## 未完成