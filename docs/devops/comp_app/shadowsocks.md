# shadowsocks 搭建


## 安装 shadowsocks-libev

- 安装 yum 源

```shell
wget -O /etc/yum.repos.d/librehat-shadowsocks-epel-7.repo https://copr.fedorainfracloud.org/coprs/librehat/shadowsocks/repo/epel-7/librehat-shadowsocks-epel-7.repo
```

- 安装 shadowsocks

```shell
yum -y install shadowsocks-libev
```

- 配置

```shell
vim /etc/shadowsocks-libev/config.json
```

```json
{
  "server":"qqqq.com",
  "server_port": 19499,
  "password": "改掉密码",
  "method":"chacha20-ietf-poly1305",
  "other":"其他的按需修改",
  "verbose":2,
  "log_level":"info",
  "log-file":"/var/log/shadowsocks.log"
}
```

- 启动

```shell
systemctl status shadowsocks-libev
systemctl start shadowsocks-libev
systemctl enable shadowsocks-libev
systemctl restart shadowsocks-libev
systemctl stop shadowsocks-libev
systemctl disable shadowsocks-libev
```

- 查看日志

```shell
journalctl -u shadowsocks-libev -f
```

- 防火墙开放 19499

```shell
systemctl restart firewalld
firewall-cmd --permanent --zone=public --add-port=19499/tcp
firewall-cmd --reload
firewall-cmd --list-ports
```

- 运营商网络开放 19499 (文档略过)



## 连接


### GUI

- 客户端下载: https://shadowsocks.org/doc/getting-started.html
- 本地 host 给 qqqq.com 做个解析


## Command

- 与服务端相同方式安装
- 配置 shadowsocks-libev, 对应的配置为 local_port
- 作为客户端启动

- 配置文件

```json
{
  "server":"qqqq.com",
  "local_port": 1080,
  "password": "改掉密码",
  "method":"chacha20-ietf-poly1305"
}
```


```shell
ss-local -c /etc/shadowsocks-libev/config.json
```

- 使用 privoxy 将 socks5 代理转换为 http 代理

- 安装
```shell
yum -y install privoxy
```

- 配置代理转换
```shell
# vim /etc/privoxy/config
forward-socks5t / 127.0.0.1:1080 .
# systemctl restart privoxy
```

- http 代理： `127.0.0.1:8118`
