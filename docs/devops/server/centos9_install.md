# CentOS Stream 9 安装

## 下载
- 下载地址：
  - 官网：https://mirror.stream.centos.org/9-stream/BaseOS/x86_64/iso/
  - 清华：https://mirrors.tuna.tsinghua.edu.cn/centos-stream/9-stream/BaseOS/x86_64/iso/
  - 阿里云：https://mirrors.aliyun.com/centos-stream/9-stream/BaseOS/x86_64/iso/
  - 阿里云镜像站，有丰富的镜像：https://mirrors.aliyun.com/
- 若需要其他版本，请切换目录

## 安装

以下列举已经发现的，与 CentOS7 不一样的地方

- 没有 Minimal包，只有 boot 包
- 安装过程，可配置 yum 源，按需进行扩展安装
- 可下载 dvd 全量包进行离线安装 (10G+)

## 分区

- 可快速配置之后再调整分区大小

- /boot 1024M
- /boot/efi 600M
- /home 10G
- / 1000G
- /data 剩余所有
- swap 4G (不用也得分配)


## 网络配置

- 配置已有连接
```shell
cd /etc/NetworkManager/system-connections
vim enpxxx.nmconnection

# autoconnect=true # 其他配置按需修改
```

- 新建连接

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
# 安装 wifi 相关工具
dnf -y install pciutils usbutils
# 查看无线网卡
lspci | grep -i network # 默认网络设备
lsusb # usb 网络设备
# 安装 wifi 管理工具
dnf -y install NetworkManager-wifi # wireless-tools 没有这个工具
# 重启网络服务
systemctl restart NetworkManager

# 查看可用的 Wi-Fi 网络
nmcli dev wifi list
# 连接到 Wi-Fi 网络
nmcli dev wifi connect <SSID> password <PASSWORD>
# 检查连接状态
nmcli connection show
```

## 使用

- 包管理工具： dnf 替代 yum
