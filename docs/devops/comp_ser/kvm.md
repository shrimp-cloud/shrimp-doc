# KVM

## 安装 kvm
```shell
# 确保你的 CPU 支持虚拟化技术 (输出为 0, 说明不支持，或需要在BIOS/UEFI中开启。输出大于0，则表示已经支持)
egrep -c '(vmx|svm)' /proc/cpuinfo

# 安装必要的软件包
dnf -y install @virtualization
# 这个命令会安装一组与虚拟化相关的软件包，包括 QEMU-KVM、libvirt、Virt-Manager 等等。@virtualization 用不了，就用下面的 install
dnf -y install qemu-kvm libvirt virt-install virt-manager libguestfs-tools-c

# 启动并启用 libvirtd 服务
systemctl start libvirtd
systemctl enable libvirtd
```

## Cockpit

> Cockpit 是一个现代的、易于使用的系统管理工具，支持通过 Web 界面管理 KVM 虚拟机。

### 安装
```shell
# 安装 Cockpit
dnf -y install cockpit cockpit-machines

# 启动并启用 Cockpit 服务
systemctl start cockpit
systemctl enable cockpit
# ebable 失败，可在 /etc/rc.d/rc.local 添加启动命令
```

### 访问

- 禁止访问 cockpit 的用户： /etc/cockpit/disallowed-users
- https://domain_ip:9090/


### 术语

#### 存储池

| 类型       | 说明                                                               |
|----------|------------------------------------------------------------------|
| 文件系统目录   | 在主机上的一个目录                                                        |
| 网络文件系统   | 远程的文件系统，将被挂载到当前主机的一个目录中                                          |
| iSCSI 目标 | 使用 iSCSI 协议进行连接的远程文件系统，将被挂载到当前主机的一个目录中                           |
| 物理磁盘设备   | 与 【文件系统目录】类似，但多了一层挂载关系，一般用于扩展的独立存储设备                             |
| LVM 卷组   | LVM,Logical Volume Manager,逻辑卷管理,逻辑分区                            |
| 预格式化的块设备 | 系统中可以随机访问（不需要按顺序）访问固定大小数据片(chunks)的设备称为块设备，磁盘、软盘驱动器、CD-ROM驱动器、闪存 |

- 在使用 kvm 中，需要使用何种存储池，完全依赖于现有的资源是以什么样的形式存在。
- 自己玩的情况，选择【文件系统目录】即可，将在当前系统创建一个目录，用于创建存储池

#### 本地网络

- 桥接模式：允许虚拟机直接连接到物理网络，就像它是物理网络中的一个独立设备一样
- 在 kvm 中，若要使用本地网络，需要先在系统层面创建一个网桥，并将系统的网络添加为网桥成员

#### 虚拟网络

| 类型                                | 说明                                            |
|-----------------------------------|-----------------------------------------------|
| NAT (Network Address Translation) | 一个局域网内的多个设备通过单一的公共IP地址访问互联网                   |
| Open                              | 开放网络，与宿主机平等的网络环境，同 Bridged (桥接)               |
| None (isolated network)           | 一个完全与外界隔绝的网络环境。这种网络不允许任何外部通信，除非特别配置了规则来允许特定流量 |

- 不同的网络类型，用于不同的场景
- 若要在 kvm 中使用本地网络，不能使用虚拟网络，而需要直接选择桥接到本地

> 桥接网桥: 在物理机上创建一个网桥，然后让虚拟机使用这个网桥，这样，虚拟机就可以直接连接到物理网络了。

#### 存储

- 存储

| 类型           | 说明 |
|--------------|----|
| 创建新的 qcow2 卷 | xx |
| 创建新的原始卷      | xx |
| 没有存储         | xx |
| 存储池          | xx |

- qcow2: QEMU/KVM支持的一种磁盘镜像格式，它代表 "QEMU Copy On Write version 2"
- 问题：为什么不可以指定创建的存储位置？
  - 虚拟机使用的任何主机资源，都依赖于 【存储池】
  - 若存储池不存在，则会自动创建。在创建虚拟机时，若不选择存储池，会创建默认存储池 【default】目标路径为：/var/lib/libvirt/images
  - 若要自定义系统安装的存储池，需要在创建虚拟机时，先不启动，添加自己【磁盘】，再移除默认关联的磁盘，此时，就可自定义存储位置了

#### 虚拟机

- 使用 ISO 安装，选择提前下载好的系统。
- 选择提前创建的存储池和卷
- 内存指定为 8G
- 增加【桥网络接】，移除原有网络
- 安装操作系统
- 移除多余的系统镜像，正常启动


