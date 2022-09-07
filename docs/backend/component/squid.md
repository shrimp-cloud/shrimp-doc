# Squid

## 环境准备
- http://www.squid-cache.org/Versions/v3/3.0/
- 下载稳定的squid-3.0.STABLE26版本（可以下载最新版）。
- 系统包安装：
- gcc.x86_64
- gcc-c++.x86_64

## 软件解压编译安装
```
$tar –xvf  squid-3.0.STABLE26.tar.gz
$cd squid-3.0.STABLE26
$编译安装 
$./configure --prefix=/apps/svr/squid/ --localstatedir=/apps/dbdat --mandir=/apps/svr/squid/man --enable-async-io=200 --enable-icmp --enable-delay-pools --enable-kill-parent-hack --enable-epoll --enable-snmp --enable-cache-digests --enable-follow-x-forwarded-for --with-large-files --disable-arp-acl --disable-ident-lookups   --enable-underscore   --enable-gnuregex
$make && make install
```

## 软件初始化和启动
```
###squid配置文件：squid.conf模板详看附录
$cp /apps/svr/squid.conf  /apps/svr/squid/etc
$/apps/svr/squid/sbin/squid  -zX
启动：
$/apps/svr/squid/sbin/squid -sf /apps/svr/squid/squid.conf

```

## 配置日志切割（部署到apps用户crontab）
```
0	3 * * *  /apps/svr/squid/sbin/squid -k rotate 
```

## 基本维护命令
```
#关闭：/apps/svr/squid/sbin/squid -k kill
#重新载入配置：/apps/svr/squid/sbin/squid -k rec
#开启debug功能：/apps/svr/squid/sbin/squid -k debug
#查看访问日志：tail -100f /apps/svr/squid/access.log|perl -pe 's/^\d+\.\d+/localtime($&)/e;'

/apps/svr/squid/bin/squidclient -p 8080 mgr:info #运行状态信息 
/apps/svr/squid/bin/squidclient -p 8080 mgr:mem #内存情况 
/apps/svr/squid/bin/squidclient -p 8080 mgr:diskd #磁盘情况 
/apps/svr/squid/bin/squidclient -p 8080 mgr:objects 
/apps/svr/squid/bin/squidclient -p 8080 mgr: #查看更多。。

```