# FRP

> 说明


## 基础信息

- 源码: https://github.com/fatedier/frp
- 下载: https://github.com/fatedier/frp/releases
- 文档: https://gofrp.org/zh-cn/docs/
- 请求路径: 浏览器 ->  http://ip:80 -> nginx -> frps:vhostHTTPPort -> frps:bindPort -> frpc(临时端口) -> localPort(web)


## Server

- 下载: 自行按架构类型下载
- 安装: 无需安装。解压即可
- 配置示例: `/frps.toml`
- 启动: `nohup ./frps -c ./frps.toml &` (建议配置为 systemd)
- 防火墙: `firewall-cmd --permanent --zone=public --add-port=7000/tcp && firewall-cmd --reload`
- 运营商防火墙: 自行开启
- 配置 nginx 转发

```toml
# frp 端口
bindPort = 7000
# 指定 HTTP 请求的监听端口
vhostHTTPPort = 7080
```

```
server {
    listen 80;
    server_name www.example.com;

    location / {
        proxy_pass http://127.0.0.1:7080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## client

- 配置
```toml
serverAddr = "xxx.xxx.xxx.xxxx"
serverPort = 7000

[[proxies]]
# 名称
name = "web"
# 协议
type = "http"
# 本地端口
localPort = 8080
# 接受的域名
customDomains = ["www.example.com"]
```

- 启动: `nohup ./frpc -c ./frpc.toml &` (建议配置为 systemd)


## 注册为服务

##  创建 frps.service

```shell
# vim /etc/systemd/system/frps.service

[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /path/to/frps -c /path/to/frps.toml

[Install]
WantedBy = multi-user.target

# 重新加载： systemctl daemon-reload
```


## frpc 配置ssh

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```


## 操作命令

```shell
# 启动frp
systemctl start frps
# 停止frp
systemctl stop frps
# 重启frp
systemctl restart frps
# 查看frp状态
systemctl status frps
# 自启动
systemctl enable frps
```
