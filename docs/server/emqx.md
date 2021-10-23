# EMQ X 安装与使用

> 官网：https://www.emqx.com/zh

> 官方文档： https://docs.emqx.cn/broker/v4.3/


### zip 解压方式 【不成功】
在这里选中了 ZIP 包解压使用的方式
- 下载 zip 包：https://www.emqx.com/en/downloads/broker?osType=Linux
- wget https://packages.emqx.io/emqx-ce/v4.3.8/emqx-centos7-4.3.8-amd64.zip
- unzip emqx-centos7-4.3.8-amd64.zip
- cd emqx
- ./bin/emqx start
- 然后就启动失败了，原因未知

### sh | yum 安装

```shell
curl https://repos.emqx.io/install_emqx.sh | bash
systemctl start emqx
systemctl status emqx
```

### 控制台
> http://127.0.0.1:18083