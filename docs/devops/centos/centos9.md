# CentOS Stream 9

## 安装

以下列举已经发现的，与 CentOS7 不一样的地方

- 没有 Minimal包，只有 boot 包
- 安装过程，可配置 yum 源，按需进行扩展安装
- 可下载 dvd 全量包进行离线安装 (10G+)

## 网络配置

- 有线网络

```shell
# 查看网络接口
nmcli device

# 创建有线连接
nmcli connection add type ethernet ifname enp0s3 con-name eth0

# 配置 DHCP
nmcli connection modify eth0 ipv4.method auto

# 配置静态 IP
nmcli connection modify eth0 ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual

# 启用连接
nmcli connection up eth0

# 检查连接状态
nmcli connection show
```

- 无线网络

```shell
# 查看可用的 Wi-Fi 网络
nmcli dev wifi list

# 连接到 Wi-Fi 网络
nmcli dev wifi connect "MyWiFi" password "MyPassword"

# 检查连接状态
nmcli connection show
```


## 使用

- 包管理工具： dnf 替代 yum
