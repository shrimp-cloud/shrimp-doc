# Git

## 下载

- https://git-scm.com/downloads
- 官方安装包不适用于 RHEL 系（如 CentOS/Rocky），需源码编译安装

## 编译安装

```shell
yum update -y
yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install -y gcc perl-ExtUtils-MakeMaker

wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.44.0.tar.gz

tar -zxf git-2.44.0.tar.gz
cd git-2.44.0

make prefix=/usr/local all
make prefix=/usr/local install

```
