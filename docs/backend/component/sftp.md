# SFTP

> SFTP（SSH File Transfer Protocol，也称 Secret File Transfer Protocol），是一种安全的文件传输协议，一种通过网络传输文件的安全方法；它确保使用私有和安全的数据流来安全地传输数据。

## 配置

### 确认 openssl 版本
```shell
ssh -V
```
> 版本必须大于4.8p1,低于这个版本需要升级。

### 创建sftp组
```shell
groupadd sftp
```

### 创建sftp用户
```shell
# 该用户不能登陆到系统, 不同系统可能存在差异
useradd -g sftp -s /bin/false sftpuser
useradd -g sftp -s /bin/nologin sftpuser

# 为sftpuser用户设置密码
passwd sftpuser
```

### 创建sftp指定Chroot目录
```shell
mkdir -p /opt/sftp/
```

### 配置 sftp
- `vim /etc/ssh/sshd_config`
注释：
```shell
# Subsystem sftp /usr/libexec/openssh/sftp-server
```
增加：
```shell
# 配置一个外部子系统，值是子系统的名字和对应的命令行
Subsystem sftp internal-sftp
# 限定只有sftp组的才能访问      
Match Group sftp 
# 设置属于用户组sftp的用户访问的根文件夹
ChrootDirectory /opt/sftp/ 
# 强制执行这里指定的命令而忽略客户端提供的任何命令
ForceCommand internal-sftp
# 是否允许TCP转发
AllowTcpForwarding no
# 是否允许进行 X11 转发
X11Forwarding no
```
### 修改Chroot目录权限
```shell
chown -R root:sftp /opt/sftp/
chmod -R 755 /opt/sftp/
```

### 建立sftp用户写入权限目录
```shell
cd /opt/sftp/
mkdir upload
chown sftpuser:sftp upload
chmod 755 upload
```

### 重启sshd服务
```shell
systemctl restart sshd
```

## 使用 sftp

### 登录
```shell
sftp sftpuser@sftp.example.com
```

### 命令

| 命令           | 解释                                |
|--------------|-----------------------------------|
| cd           | 更改远程工作目录                          |
| lcd          | 更改和/或打印本地工作目录                     |
| ls           | 列出远程目录的内容                         |
| lls          | 列出本地目录的内容                         |
| pwd          | 打印远程工作目录                          |
| lpwd         | 打印本地工作目录                          |
| explore      | 浏览您的本地目录，即打开本地目录                  |
| get test.txt | 把sftp服务器上当前目录下test.txt文件下载到本地当前目录 |
| put test.txt | 把本地文件当前目录下test.txt上传到ftp服务器当前目录   |
| rm           | 删除文件                              |
| rmdir        | 删除目录                              |


