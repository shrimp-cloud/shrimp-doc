# samba 安装使用手册

### 安装
- 系统： centos 7

步骤：
```
yum install samba -y # 安装 samba
yum install samba-client -y # 安装 centos 的客户端，用于测试
yum install cifs-utils -y # 用于测试挂载

# 添加系统账户 并修改密码
adduser smb 
passwd smb
# 此处输入密码

systemctl start smb # 启动程序
systemctl enable smb # 自启动

# 添加账户
smbpasswd -a smb 
# 此处输入密码
# 激活账户
smbpasswd -e smb 

#关闭Selinux
# 开放 端口
# centos 6
vim /etc/sysconfig/iptables
-A INPUT -p tcp -m state --state NEW -m tcp --dport 139 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 445 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 137 -j ACCEPT
-A INPUT -p udp -m state --state NEW -m udp --dport 138 -j ACCEPT
service restart iptables
# centos 7
firewall-cmd --zone=public --add-port=137-139/tcp --permanent
firewall-cmd --zone=public --add-port=137-139/udp --permanent
firewall-cmd --zone=public --add-port=445/tcp --permanent
firewall-cmd --reload


# 创建共享目录
mkdir /opt/share
修改用户，组，及权限
chown -R smb:smb /opt/share
chmod -R 777 /opt/share

#添加 共享目录=
vim /etc/samba/smb.conf
[share]
      path = /opt/share
      available = yes
      browseable = yes
      public = yes
      writable = yes
systemctl restart smb # 重启生效

# 查看状态
smbclient -L 127.0.0.1 -U smb # 可看到详情

# 测试挂载
mkdir /mnt/samba_test
mount -t cifs -o username=smb,password=你的密码 //127.0.0.1/share
cd /mnt/samba_test

```


### 使用【Linux】
```
yum install cifs-utils -y
mkdir /mnt/samba_test
mount -t cifs -o username=smb,password=你的密码 //127.0.0.1/share
cd /mnt/samba_test

```

### 使用【Mac】
- 打开 Finder
- Cmd + K
- 输入地址：smb://服务器IP/share
- 客人方式访问即可

### 【Windows】使用方法【任选其一】
1.  SMB client 访问
    - 安装  SMB 1 client
    - 重启电脑
2. 临时访问一：Win+R，\\\服务器IP\share
3. 临时访问二：Explorer，\\\服务器IP\share
4. 保存访问链接：我的电脑，空白处右键，添加网络位置，添加 \\\服务器IP\share