# Centos 常用命令

> 个人服务器基本使用 CentOS 7, 故以下命令实践均在 CentOS7 ，不代表只能适用于 CentOS7


## 压缩解压
```shell
压缩
tar –cvf jpg.tar *.jpg // 将目录里所有jpg文件打包成tar.jpg
tar –czf jpg.tar.gz *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
tar –cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
tar –cZf jpg.tar.Z *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux
zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux

解压
tar –xvf file.tar //解压 tar包
tar -xzvf file.tar.gz //解压tar.gz
tar -xjvf file.tar.bz2   //解压 tar.bz2
tar –xZvf file.tar.Z   //解压tar.Z
unrar e file.rar //解压rar
unzip file.zip //解压zip

总结
1、*.tar 用 tar –xvf 解压
2、*.gz 用 gzip -d或者gunzip 解压
3、*.tar.gz和*.tgz 用 tar –xzf 解压
4、*.bz2 用 bzip2 -d或者用bunzip2 解压
5、*.tar.bz2用tar –xjf 解压
6、*.Z 用 uncompress 解压
7、*.tar.Z 用tar –xZf 解压
8、*.rar 用 unrar e解压
9、*.zip 用 unzip 解压
```

## 交换分区
> 可以让小内存服务器跑起大应用，但性能非常低
```shell
# cd /var
dd if=/dev/zero of=file bs=1M count=4096  # -- 生成4G的大文件
mkswap file
swapon file
swapon -s
# vim /etc/fstab
/var/file   swap   swap   defaults  0   0
```

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
