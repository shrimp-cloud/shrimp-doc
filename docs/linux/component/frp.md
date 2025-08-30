# FRP

> 说明


## 基础信息

- 源码: https://github.com/fatedier/frp
- 下载: https://github.com/fatedier/frp/releases
- 文档: https://gofrp.org/zh-cn/docs/
- 请求路径: 浏览器 ->  http://ip:80 -> nginx -> frps:vhostHTTPPort -> frps:bindPort -> frpc(临时端口) -> localPort(web)
- 下载: 自行按架构类型下载
- 安装: 无需安装。解压即可
- 配置示例: `/frps.toml` & 启动
- 防火墙: `firewall-cmd --permanent --zone=public --add-port=7000/tcp && firewall-cmd --reload`
- 运营商防火墙: 自行开启
- 配置 nginx 转发等


## 启动

### 直接启动

> Linux, Windows, Mac 均相同

```shell
# 启动服务端
nohup ./frps -c ./frps.toml &
# 启动客户端
nohup ./frps -c ./frps.toml &
```


### 注册为系统服务启动

- 作为服务端，配置如下

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
Restart = on-failure
RestartSec = 5s
StartLimitIntervalSec = 0

[Install]
WantedBy = multi-user.target

# 重新加载： systemctl daemon-reload
```

- 作为客户端，service 名称应当为 frpc, 启动命令修正一下即可
- 后续就可用 systemctl 进行管理了




## Server服务端配置

```toml
# frp 端口
bindPort = 7000
# 指定 HTTP 请求的监听端口
vhostHTTPPort = 7080
# 无需配置其他端口，在 client 注册上来时，会自动开启相关端口
```

## Client

### 配置 http 站点

```toml
serverAddr = "xxx.xxx.xxx.xxx"
serverPort = 7000

[[proxies]]
# 名称
name = "web"
# 协议
type = "http"
# 本地端口
localPort = 8080
# 此处，可以是其他局域网IP, 缺省是本地
localIP = "127.0.0.1"
# 接受的域名
customDomains = ["www.example.com"]
```


### 配置 ssh


```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
# 此处，可以是其他局域网IP, 缺省是本地
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

### 配置 RDP

```toml

[[proxies]]
name = "rdp"
type = "tcp"
# 此处，可以是其他局域网IP, 缺省是本地
localIP = "127.0.0.1"
localPort = 3389
remotePort = 3389
```

## 其他补充

### 注册为服务后的 frp 操作命令

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

### server 端 nginx 配置示例。

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
