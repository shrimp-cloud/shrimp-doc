# Nginx-lua

## 系统,基础依赖

- CentOS 7.x
```shell script
yum install -y epel-release yum-utils
yum install -y nodejs
yum install -y vim net-tools numactl lrzsz zip unzip wget htop git telnet
yum install -y gcc automake autoconf libtool make
yum install -y pcre-devel openssl openssl-devel
```

---

### 安装 LuaJIT
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
### lua 环境处理
```shell script
# vim /etc/ld.so.conf.d/lua.conf
/usr/local/luajit/lib
# ldconfig
```


###  ngx_devel_kit 和 lua-nginx-module

```shell script
cd /opt/download

wget https://github.com/simpl/ngx_devel_kit/archive/v0.3.1.tar.gz
mv v0.3.1.tar.gz ngx_devel_kit-0.3.1.tar.gz
tar -zxvf ngx_devel_kit-0.3.1.tar.gz

wget https://github.com/openresty/lua-nginx-module/archive/v0.10.17.tar.gz
mv v0.10.17.tar.gz lua-nginx-module-0.10.17.tar.gz
tar -zxvf lua-nginx-module-0.10.17.tar.gz
```

### 源码安装 nginx
```shell script

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
--http-uwsgi-temp-path=/opt/nginx/cache/nginx/uwsgi_temp \ 
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
--add-module=/opt/download/lua-nginx-module-0.10.17

make && make install



```
### 其他处理/
```shell script
# 查看动态连接库
 ldd $(which /otp/nginx/sbin/nginx)
```
