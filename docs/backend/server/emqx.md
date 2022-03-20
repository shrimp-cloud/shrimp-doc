# EMQX 安装与使用

> 官网：https://www.emqx.com/zh
> 安装包：https://www.emqx.io/zh/downloads
> 官方文档： https://www.emqx.io/docs/zh/v4.4/


### zip 解压方式
在这里选中了 ZIP 包解压使用的方式
```shell
wget https://www.emqx.com/zh/downloads/broker/4.4.1/emqx-4.4.1-otp24.1.5-3-el7-amd64.zip
unzip emqx-4.4.1-otp24.1.5-3-el7-amd64.zip
cd emqx
./bin/emqx start/stop/restart
# 修改控制台密码
./bin/emqx_ctl admins passwd admin admin123
# 查看 emqx 启动的端口：
netstat -ntlp | grep emqx
```

### 控制台
> http://127.0.0.1:18083 (用户名admin 密码 public)
> 配置 nginx 转发以开发控制台

### 认证：
- MySQL 认证：https://www.emqx.io/docs/zh/v4.4/advanced/auth-mysql.html#mysql-连接信息
