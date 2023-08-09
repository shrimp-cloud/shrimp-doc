# Harbor

## 安装包

- 官网: https://goharbor.io/
- github 安装包下载: https://github.com/goharbor/harbor/releases

## 配置

```shell
cp harbor.yml.tmpl harbor.yml
vim harbor.yml
```

- hostname: 改成本机 ip
- 注释 https 相关配置
- harbor_admin_password: 修改 admin 密码
- 端口: 80
- 编译安装 `./install.sh`

## 启停
```shell
# 若命令不存在
yum install docker-compose -y

docker-compose stop
docker-compose start
docker-compose up -d
```