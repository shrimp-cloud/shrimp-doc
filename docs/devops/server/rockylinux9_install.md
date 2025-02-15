# Rocky Linux 9

> 为什么不是 CentOS 9 ? CentOS 8 以后，变成了 RHEL 的上游分支，不再是那个稳定可靠的 CentOS 了。 Rocky Linux 与 CentOS 同父，延续了 CentOS 的特性。

## 下载
- 下载地址：
  - 官网：https://rockylinux.org/zh-CN/download

## 安装

- 写 U 盘，U 盘启动 ...

## 分区

- 可快速配置之后再调整分区大小

- /boot 1024M
- /boot/efi 600M
- /home 10G
- / 100G
- /data 剩余所有
- swap 4G (不用也得分配)


## 网络配置

- 配置已有连接
```shell
cd /etc/NetworkManager/system-connections
vim enpxxx.nmconnection

# autoconnect=true # 其他配置按需修改
```

- 新建连接 (正常情况下不需要此步骤)

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
# 安装 wifi 相关工具 pci 接口查询工具，usb 接口查询工具， wifi 管理工具
dnf -y install pciutils usbutils NetworkManager-wifi
# 查看无线网卡
lspci | grep -i network # 默认网络设备
lsusb # usb 网络设备
# 重启网络服务
systemctl restart NetworkManager

# 查看可用的 Wi-Fi 网络
nmcli dev wifi list
# 连接到 Wi-Fi 网络
nmcli dev wifi connect <SSID> password <PASSWORD>
# 检查连接状态
nmcli connection show
```


## 显卡

```shell
# 安装工具包
dnf -y install pciutils
# 查看显卡信息
lspci | grep -i "vga\|3d\|2d"
lspci -vnn | grep -i VGA -A 12
```


## 使用

- 包管理工具： dnf 替代 yum
