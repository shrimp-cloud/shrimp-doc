# Rocky Linux 9 初始化


## 常用配置

- 改名

```shell
hostnamectl set-hostname shrimp
```

- 配置公钥

```shell
mkdir .ssh
chmod 700 .ssh/
cd .ssh
vim authorized_keys
chmod 600 authorized_keys
```

## 常用软件

```shell
# 清理和更新软件仓库缓存
dnf -y install epel-release
dnf -y update
dnf -y install tar vim net-tools numactl fontconfig zip unzip wget git telnet htop

dnf clean all

# 检查仓库状态
dnf repolist
```

- 关闭 selinux
```shell
vim /etc/selinux/config
SELINUX=disabled
```

- 关闭 swap

```shell
# vim /etc/fstab
注释掉 swap
```
