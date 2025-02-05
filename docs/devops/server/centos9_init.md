# CentOS Stream 9 初始化


## 常用仓库

- BaseOS 仓库包含了操作系统的基础组件。
```shell
# vim /etc/yum.repos.d/CentOS-Stream-BaseOS.repo

[baseos]
name=CentOS Stream $releasever - BaseOS
metadata_expire=-1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
baseurl=https://mirrors.centos.org/$contentdir/$stream/BaseOS/$basearch/os/
enabled=1
```

- AppStream 仓库包含了各种应用程序和开发库。
```shell
# vim /etc/yum.repos.d/CentOS-Stream-AppStream.repo
[appstream]
name=CentOS Stream $releasever - AppStream
metadata_expire=-1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
baseurl=https://mirrors.centos.org/$contentdir/$stream/AppStream/$basearch/os/
        https://mirrors.centos.org/$contentdir/9-stream/AppStream/x86_64/os/repodata/repomd.xml
enabled=1
```

- CRB 仓库提供了额外的构建工具和开发库，类似于之前的 PowerTools 仓库
```shell
# 启用 CRB 仓库
# dnf config-manager --set-enabled crb

# vim /etc/yum.repos.d/CentOS-Stream-CRB.repo
[crb]
name=CentOS Stream $releasever - CRB
metadata_expire=-1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
baseurl=https://mirrors.centos.org/$contentdir/$stream/CRB/$basearch/os/
enabled=1
```

```shell
# 改个名
hostnamectl set-hostname shrimp

# 清理和更新软件仓库缓存
dnf clean all
dnf -y update
# 检查仓库状态
dnf repolist
```

- 常用工具

```shell
dnf -y install epel-release
dnf -y install tar vim net-tools numactl fontconfig zip unzip wget git telnet htop
```

- 配置公钥

```shell
mkdir .ssh
chmod 700 .ssh/
cd .ssh
vim authorized_keys
chmod 600 authorized_keys
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
