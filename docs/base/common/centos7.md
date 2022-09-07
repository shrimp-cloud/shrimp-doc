# Centos7常用命令

> 个人服务器基本使用 CentOS7, 故以下命令实践均在 CentOS7 ，不代表只能适用于 CentOS7


## 配置DNS
```shell
# vim /etc/resolv.conf
nameserver 114.114.114.114
nameserver 114.114.115.115
```

## 字符替换
1. 将当前目录下包含jack串的文件中，jack字符串替换为tom
```shell
sed -i "s/jack/tom/g" `grep "jack" -rl ./`
```
2. 将某个文件中的jack字符串替换为tom
```shell
sed -i "s/jack/tom/g" test.txt
```

## 查找文本内容
从根目录开始查找所有扩展名为.log的文本文件，并找出包含”ERROR”的行
```shell
find / -type f -name "*.log" | xargs grep "ERROR"
```

例子：从当前目录开始查找所有扩展名为.in的文本文件，并找出包含”thermcontact”的行
```shell
find . -name "*.in" | xargs grep "thermcontact"
```

## 时间同步
查看时间
```shell
date
```

安装时间同步工具
```shell
yum install -y ntpdate
```
复制时区信息
```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
进行一次同步：
```shell
ntpdate us.pool.ntp.org
```
自动定时同步时间：
```shell
# crontab -e
0-59/10 * * * * /usr/sbin/ntpdate us.pool.ntp.org | logger -t NTP
```

## 查看熵池
```shell
watch -n 1 cat /proc/sys/kernel/random/entropy_avail
```

## 更换yum源
> aliyun

安装 yum 源
```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```
清理，更新缓存
```shell
yum clean all
yum makecache
yum makecache fast
```
更新
```shell
yum update -y
```


## 防火墙命令
用途 | 命令
---|---
启动一个服务 | systemctl start firewalld
关闭一个服务 | systemctl stop firewalld
重启一个服务 | systemctl restart firewalld
显示一个服务的状态 | systemctl status firewalld
在开机时启用一个服务 | systemctl enable firewalld
在开机时禁用一个服务 | systemctl disable firewalld
查看服务是否开机启动 | systemctl is-enabled firewalld
查看已启动的服务列表 | systemctl list-unit-files|grep enabled
查看启动失败的服务列表 | systemctl --failed
查看版本 | firewall-cmd --version
查看帮助 | firewall-cmd --help
显示状态 | firewall-cmd --state
查看所有打开的端口 | firewall-cmd --zone=public --list-ports
更新防火墙规则 | firewall-cmd --reload
查看区域信息 | firewall-cmd --get-active-zones
查看指定接口所属区域 | firewall-cmd --get-zone-of-interface=eth0
拒绝所有包 | firewall-cmd --panic-on
取消拒绝状态 | firewall-cmd --panic-off
查看是否拒绝 | firewall-cmd --query-panic

