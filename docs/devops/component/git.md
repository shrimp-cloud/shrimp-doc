# Git


## Download
- https://git-scm.com/downloads
- but not for RHEL


## make install

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
