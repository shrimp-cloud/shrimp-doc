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

- 客户端下载: https://shadowsocks.org/doc/getting-started.html
- 本地 host 给 qqqq.com 做个解析
