# OpenVPN

> 申明: 此处只从技术讨论如何安装。请确认安装合法合规后再实践!

## 安装

### 安装准备

- CentOS 7

### 安装源


- 安装源:  `yum install -y epel-release`


### 生成证书

```shell
# 安装 证书生成工具
yum install -y openssl lzo pam easy-rsa
```

- 创建证书环境目录
```shell
mkdir -p /opt/easy-rsa
cp -a /usr/share/easy-rsa/3.0.8/* /opt/easy-rsa/
cp -a /usr/share/doc/easy-rsa-3.0.8/vars.example /opt/easy-rsa/vars
```

- 生成秘钥前，准备vars文件
```shell
set_var EASYRSA_DN      "cn_only"
set_var EASYRSA_REQ_COUNTRY     "CN"
set_var EASYRSA_REQ_PROVINCE    "Shanghai"
set_var EASYRSA_REQ_CITY        "Shanghai"
set_var EASYRSA_REQ_ORG         "lucifer"
set_var EASYRSA_REQ_EMAIL       "demo@qq.com"
set_var EASYRSA_NS_SUPPORT      "yes"
```

- 当前目录下创建pki目录，用于存储证书
```shell
cd /opt/easy-rsa/
/opt/easy-rsa/easyrsa init-pki
```

- 创建根证书(根证书用于ca对之后生成的server和client证书签名时使用) (必需要有密码)
```shell
/opt/easy-rsa/easyrsa build-ca
```

- 创建server端证书和私钥文件
```shell
/opt/easy-rsa/easyrsa gen-req server nopass
```

- 给server证书签名
```shell
/opt/easy-rsa/easyrsa sign server server
```

- 创建Diffie-Hellman文件，秘钥交换时的Diffie-Hellman算法
```shell
/opt/easy-rsa/easyrsa gen-dh
```

- 创建client端证书和私钥文件
```shell
/opt/easy-rsa/easyrsa gen-req client nopass
```

- 给client端证书签名
```shell
/opt/easy-rsa/easyrsa sign client client
```


### 安装 OpenVPN

- 安装openvpn软件
```shell
yum install -y openvpn
```

- 生成ta.key文件（防DDos攻击）
```shell
openvpn --genkey --secret /etc/openvpn/ta.key
```


### 配置
```shell
# vim /etc/openvpn/server.conf (需要移除注释，否则无法识别)
port 11195 #端口
proto udp #协议可以改成tcp协议
dev tun #采用路由隧道模式tun
ca ca.crt #ca证书文件位置
cert server.crt #服务端公钥名称
key server.key #服务端私钥名称
dh dh.pem #交换证书
server 10.8.0.0 255.255.255.0 #给客户端分配地址池，注意：不能和VPN服务器内网网段有相同
push "route 192.168.0.0 255.255.0.0" #允许客户端访问内网192.168.0.0网段
push "redirect-gateway def1 bypass-dhcp"  #是否翻墙
push "dhcp-option DNS 114.114.114.114"  #设置客户端DNS
ifconfig-pool-persist ipp.txt #地址池记录文件位置
cipher AES-256-CBC
keepalive 10 120 #存活时间，10秒ping一次,120 如未收到响应则视为断线
max-clients 100 #最多允许100个客户端连接
status openvpn-status.log #日志记录位置
verb 3 #openvpn版本
client-to-client #客户端与客户端之间支持通信
log /var/log/openvpn.log #openvpn日志记录位置
tls-auth /etc/openvpn/ta.key  #防止Ddos攻击
persist-key #通过keepalive检测超时后，重新启动VPN，不重新读取keys，保留第一次使用的keys。
persist-tun #检测超时后，重新启动VPN，一直保持tun是linkup的。否则网络会先linkdown然后再linkup
duplicate-cn
```

- 迁移证书
```shell
cp -a /opt/easy-rsa/pki/ca.crt /etc/openvpn/
cp -a /opt/easy-rsa/pki/issued/server.crt /etc/openvpn/
cp -a /opt/easy-rsa/pki/private/server.key /etc/openvpn/
cp -a /opt/easy-rsa/pki/dh.pem /etc/openvpn/
```

- 启动
```shell
systemctl -f enable openvpn@server.service
systemctl start openvpn@server.service
systemctl restart openvpn@server.service
systemctl status openvpn@server.service
```


- 查看端口情况
```shell
netstat -tunlp | grep openvpn
ss -tunlp | grep openvpn
```

- 添加地址转发
```shell
# 添加地址转发
echo 'net.ipv4.ip_forward = 1' >> /etc/sysctl.conf && sysctl -p
# 添加iptable的nat
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -j MASQUERADE
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
iptables -A INPUT -p udp --dport 11195 -j ACCEPT
iptables -A INPUT -p tcp --dport 11195 -j ACCEPT
```



## 客户端使用

- 客户端下载: https://openvpn.net/client/
- 下载客户端相关证书，并放到同一个目录下：
```shell
/opt/easy-rsa/pki/ca.crt
/opt/easy-rsa/pki/issued/client.crt
/opt/easy-rsa/pki/private/client.key
/etc/openvpn/ta.key
```
- 创建 client.ovpn 添加如下内容
```shell
client #指定当前VPN是客户端
dev tun #使用tun隧道传输协议
proto udp #根据openvpnserver端决定使用的是udp协议传输数据，还是tcp协议
remote 192.168.31.168 1195 #openvpn服务器IP地址端口号
resolv-retry infinite #断线自动重新连接，在网络不稳定的情况下非常有用
nobind #不绑定本地特定的端口号
ca ca.crt #指定CA证书的文件路径
cert client.crt #指定当前客户端的证书文件路径
key client.key #指定当前客户端的私钥文件路径
tls-auth ta.key #防止Ddos攻击
cipher AES-256-CBC
verb 3 #指定日志文件的记录详细级别，可选0-9，等级越高日志内容越详细
persist-key #通过keepalive检测超时后，重新启动VPN，不重新读取keys，保留第一次使用的keys
persist-tun #检测超时后，重新启动VPN，一直保持tun是linkup的。否则网络会先linkdown然后再linkup

```

- 使用 OpenVPN Connect 导入 .ovpn 并连接
