# Harbor

> Harbor is an open source trusted cloud native registry project that stores, signs, and scans content. Harbor extends the open source Docker Distribution by adding the functionalities usually required by users such as security, identity and management. Having a registry closer to the build and run environment can improve the image transfer efficiency. Harbor supports replication of images between registries, and also offers advanced security features such as user management, access control and activity auditing.

## 安装包

- 官网: https://goharbor.io/
- 开源地址：https://github.com/goharbor/harbor
- github 安装包下载: https://github.com/goharbor/harbor/releases

## 安装过程


- 解压: `tar -xcvf harbor-offline-installer-v2.11.2.tgz`
- 配置: `cp harbor.yml.tmpl harbor.yml`
  - 按需修改配置
  - hostname: harbor.base #或改为本地 IP
  - http.port: 80
  - https.port: 443
  - https.certificate: /opt/harbor/certs/server.crt
  - https.private_key: /opt/harbor/certs/server.key
  - harbor_admin_password: Harbor12345
  - data_volume: /opt/harbor/data
- 安装: `./install.sh`
- 自签证书没通过，最终是把 https 配置移除了，再重新安装。
- 成功：http://harbor.base


## 启停
```shell
# 若命令不存在
yum install docker-compose -y

docker-compose stop
docker-compose start
docker-compose up -d
```



## 镜像拉取和推送

```shell
# 登录本地仓库
docker login -u admin harbor.base

# 拉取镜像：从原始仓库中拉取所需的镜像。
docker pull source_registry/repo:tag
# 重打标签：可以给镜像打上新标签。
docker tag source_registry/repo:tag your_registry/repo:tag
# 推送镜像：将镜像推送到你的私有仓库（如 Harbor）。
docker push your_registry/repo:tag
```


```shell
# 上墙
docker pull hello-world
# 下墙
docker tag hello-world:latest harbor.base/library/hello-world:latest
docker push harbor.base/library/hello-world:latest
docker run harbor.base/library/hello-world:latest
```

### 解决地址信任问题:

- 待添加信息
```shell
{
  "insecure-registries": ["harbor.base"]
}
```
- macOS: Docker Desktop -> Settings -> Docker Engine -> 添加上述内容
- Linux: /etc/docker/daemon.json -> 添加上述内容

### 完犊子了啧

> WARNING: The requested image's platform (linux/arm64) does not match the detected host platform (linux/amd64/v3) and no specific platform was requested


### 生成  ssl 证书

```shell

yum install openssl
mkdir certs && cd certs
# 生成私钥
openssl genpkey -algorithm RSA -out server.key -pkeyopt rsa_keygen_bits:2048
# 创建证书签名请求 (CSR)
openssl req -new -key server.key -out server.csr
# 生成自签名证书
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

```


### Mac OS 下添加证书
```shell
# 添加
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /path/to/your-self-signed-cert.crt
# 验证
security find-certificate -a -p /Library/Keychains/System.keychain | openssl x509 -text | less
```
