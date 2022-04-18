# kernel内核

## 关注内核？
在某些场景下，你必需关注内核：
1. CentOS 7.x 系统自带的3.10.x内核存在一些Bugs.导致运行的Docker.Kubernetes不稳定。
2. 多内核存在，会占用较大的 /boot 空间，若空间不足，需要考虑清理


## 查看内核版本
```shell
uname -a
# output: Linux localhost 3.10.0-1160.62.1.el7.x86_64 #1 SMP Tue Apr 5 16:57:59 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
```
内核为：3.10.0-1160.62.1.el7.x86_64

## 升级内核

### 安装 ELRepo 最新版本

载入公钥
```shell
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
```
安装 ELRepo 最新版本
```shell
yum install -y https://www.elrepo.org/elrepo-release-7.el7.elrepo.noarch.rpm
```

### 升级

列出可以使用的 kernel 包版本
```shell
yum list available --disablerepo=* --enablerepo=elrepo-kernel
```
Tips:
- lt：长期维护版
- ml：最新稳定版

安装指定内核版本
```shell
yum install -y kernel-lt-5.4.189-1.el7.elrepo --enablerepo=elrepo-kernel
```

查看系统可用内核
```shell
# grub引导
cat /boot/grub2/grub.cfg | grep menuentry
# efi引导
cat /etc/grub2-efi.cfg | grep ^menuentry
```

设置开机从新内核启动
```shell

grub2-set-default "CentOS Linux (5.4.189-1.el7.elrepo.x86_64) 7 (Core)"
```

查看内核启动项
```shell
grub2-editenv list
# output: saved_entry=CentOS Linux (5.4.189-1.el7.elrepo.x86_64) 7 (Core)
```

重启系统使内核生效
```shell
init 6
```

## 删除旧内核

列表现有内核
```shell
rpm -q kernel
```

删除内核
```shell
yum remove kernel-3.10.0-1160.el7.x86_64
```

