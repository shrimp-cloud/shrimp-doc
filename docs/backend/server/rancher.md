# Rancher


> 官方文档： https://docs.ranchermanager.rancher.io/zh/


## 前提
- 安装 iptables, 若在 docker 之后安装，要重启docker
- [安装Docker](docker.md)

## 安装

```shell
docker run --privileged -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:stable

# 找密码
docker ps # 获取 container-id
docker logs container-id 2>&1 | grep "Bootstrap Password:"

# 新用户名 admin
# 新密码 即时设置

tqrjwk494t4wlpb4kbshgtwbhz64nkcqmh8sffxhvwj56pc87gsclg
```