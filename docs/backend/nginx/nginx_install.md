# Nginx安装


## yum 安装
```shell script
vim /etc/yum.repos.d/nginx.repo
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

yum install nginx -y
systemctl start nginx
systemctl enable nginx

```

## 源码安装


### 系统,基础依赖

- CentOS 7.x
```shell script
yum install -y epel-release yum-utils
yum install -y vim net-tools numactl lrzsz zip unzip wget htop git telnet
yum install -y gcc automake autoconf libtool make
yum install -y pcre-devel openssl openssl-devel
```

---

### 安装 LuaJIT

> 若不需要 lua 支持，可忽略此过程

```shell script

wget http://luajit.org/download/LuaJIT-2.0.5.tar.gz
tar -zxvf  LuaJIT-2.0.5.tar.gz
cd LuaJIT-2.0.5
make install PREFIX=/usr/local/luajit

# /etc/profile 文件中加入环境变量
vim /etc/profile.d/LuaJIT.sh
export LUAJIT_LIB=/usr/local/luajit/lib
export LUAJIT_INC=/usr/local/luajit/include/luajit-2.0

source /etc/profile
```
 ---


### lua 环境处理

> 若不需要 lua 支持，可忽略此过程

```shell script
# vim /etc/ld.so.conf.d/lua.conf
/usr/local/luajit/lib
# ldconfig
```

---

###  ngx_devel_kit 和 lua-nginx-module

> 若不需要 lua 支持，可忽略此过程
> 
```shell script
cd /opt/download

wget https://github.com/simpl/ngx_devel_kit/archive/v0.3.1.tar.gz
mv v0.3.1.tar.gz ngx_devel_kit-0.3.1.tar.gz
tar -zxvf ngx_devel_kit-0.3.1.tar.gz

wget https://github.com/openresty/lua-nginx-module/archive/v0.10.9rc7.tar.gz
mv v0.10.9rc7.tar.gz lua-nginx-module-0.10.9rc7.tar.gz
tar -zxvf lua-nginx-module-0.10.9rc7.tar.gz
```
> 这里有一个大坑, lua-nginx-module-v0.10.17.tar.gz 安装会报错。更换 0.10.9rc7 后解决


---



### 源码安装 nginx
```shell script

mkdir /opt/download
cd /opt/download
wget http://nginx.org/download/nginx-1.18.0.tar.gz
tar -zxvf nginx-1.18.0.tar.gz 
cd /opt/download/nginx-1.18.0

./configure --prefix=/opt/nginx \
--sbin-path=/opt/nginx/sbin/nginx \
--modules-path=/opt/nginx/modules \
--conf-path=/opt/nginx/config/nginx.conf \
--error-log-path=/opt/nginx/log/error.log \
--http-log-path=/opt/nginx/log/access.log \
--pid-path=/opt/nginx/log/nginx.pid \
--lock-path=/opt/nginx/log/nginx.lock \
--http-client-body-temp-path=/opt/nginx/cache/client_temp \
--http-proxy-temp-path=/opt/nginx/cache/proxy_temp \
--http-fastcgi-temp-path=/opt/nginx/cache/fastcgi_temp \
--http-uwsgi-temp-path=/opt/nginx/cache/uwsgi_temp \
--http-scgi-temp-path=/opt/nginx/cache/scgi_temp \
--user=nginx \
--group=nginx \
--with-compat \
--with-file-aio \
--with-threads \
--with-http_addition_module \
--with-http_auth_request_module \
--with-http_dav_module \
--with-http_flv_module \
--with-http_gunzip_module \
--with-http_gzip_static_module \
--with-http_mp4_module \
--with-http_random_index_module \
--with-http_realip_module \
--with-http_secure_link_module \
--with-http_slice_module \
--with-http_ssl_module \
--with-http_stub_status_module \
--with-http_sub_module \
--with-http_v2_module \
--with-mail \
--with-mail_ssl_module \
--with-stream \
--with-stream_realip_module \
--with-stream_ssl_module \
--with-stream_ssl_preread_module \
--with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC' \
--with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie -Wl,-rpath,/usr/local/include/lib' \
--add-module=/opt/download/ngx_devel_kit-0.3.1 \
--add-module=/opt/download/lua-nginx-module-0.10.9rc7

# 若不需要 lua 支持，请移除最后两个 module

make && make install

mkdir /opt/nginx/cache # 这个傻x 居然不会自己创建 cache 目录

# 权限
chown -R apps:apps /otp/nginx/
chown root:apps /otp/nginx/sbin/nginx
chmod u+s /otp/nginx/sbin/nginx

```

---

### 操作
```shell script
cd /opt/nginx/sbin
启动： ./nginx
重载： ./nginx -s reload
```

---


### 测试
```shell script
server {
    listen       80;
    server_name lua.test.wkclz.com;

    location /lua {
        set $test "hello,world";
        content_by_lua '
        ngx.header.content_type="text/plain"
        ngx.say(ngx.var.test)';
    }
}

```
 ---



### 其他处理
```shell script
# 查看动态连接库
 ldd $(which /otp/nginx/sbin/nginx)
```

---

### nginx 自动部署:
> 为方便完成 nginx 的自动部署，需要配置规范化，并放置脚本到 git 仓库中，下属服务器后自动化部署。具体规范过一次sh 脚本即可

##### 跟随nginx的脚本【nginx 操作】：
```shell script
#!/bin/sh

# 参数
DIST_PATH=/opt/nginx/config # nginx 配置目录
TEMP_PATH=/opt/deploy_temp # 临时目录,与git 仓库拉取的一致
REPO_NAME=nginx_config  # git 仓库的名称
SERVER=服务器名称,与git上的目录对应,便于发布

echo "部署中..."

rm -rf $DIST_PATH/conf.d
rm -rf $DIST_PATH/nginx.conf

cp -r $TEMP_PATH/$REPO_NAME/$SERVER/conf.d $DIST_PATH
cp -r $TEMP_PATH/$REPO_NAME/$SERVER/nginx.conf $DIST_PATH

# 启动
echo "重启应用..."
cd $DIST_PATH
cd ../sbin
./nginx -s reload

exit
```

##### 跟随服务器的脚本【服务器内nginx 配置下发操作】：
```shell script
#!/bin/sh

# 参数
GIT_REPO=https://gitee.com/work_group/nginx_config.git
REPO_NAME=nginx_config  # git 仓库的名称
export SERVER=服务器名称,与git上的目录对应,便于发布

echo "开始..."


# 临时目录
export TEMP_PATH=/opt/deploy_temp
mkdir -p $TEMP_PATH
cd $TEMP_PATH
echo "已创建临时目录 $TEMP_PATH"


# 代码
echo "准备拉取代码，可能需要验证信息..."
git clone $GIT_REPO

# 部署
echo "准备发布..."

echo "切换 nginx 权限用户 root： "

su - root -c 'sh $TEMP_PATH/$REPO_NAME/$SERVER/deploy.sh'

# 清理遗留
rm -rf $TEMP_PATH
echo "=====================> 完成!"

cd ~

```

