# 磁盘扩容



## VirtualBox虚拟机磁盘扩容
- 问题：扩容CentOS7磁盘规划太小，又不想重装，可以使用扩容方式扩大磁盘空间
- 其他讨论：此处仅为一个实践场景，还可以有其他方式扩充空间

## 扩充 vdi 虚拟磁盘空间
1. Windows 下，vdi 虚拟磁盘扩容到40G
   在虚拟机关闭的场景下，执行如下命令
```shell
VBoxManage.exe modifyhd "/path/to/vdi" --resize 40960
```
执行命令之后，vdi 会在磁盘后方产生一块空白区域

2. CentOS 下,将分区初始化
- fdisk /dev/sda # 对sda 进行分区管理
  - n # 新建分区
  - p # 新建主分区
  - Enter,Enter #  两次回车，将会自动选择开始和结束扇区，创建 sda3
  - t # 修改分区类型
  - 3 # 选择要修改的分区
  - 8e # 将分区类型修改为 Linux LVM
  - w # 写入和退出
  - init 6#  重启后才能识别  sda3 (为什么需要重启才能识别 sda3呢)

3. 将sda3 扩容到根节点
- pvcreate /dev/sda3 #  初始化 sda3为物理卷
- vgextend centos /dev/sda3 # 在 VG 内增加额外的 PV
- lvextend -l 100%VG /dev/mapper/centos-root # 扩容/
- xfs_growfs /dev/mapper/centos-root # 自动扩展文件系统到最大的可用大小

## 其他命令
- pvs 查看逻辑卷
- vgs 查看卷组

## 感谢
- 感谢何老板的指导，扩充了对磁盘卷的认知，也搞明白了不换磁盘也能扩充磁盘空间的原理

