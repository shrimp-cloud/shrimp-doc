# Nginx

## 系统,基础依赖

- CentOS 7.x
```shell script
yum install -y epel-release yum-utils
yum install -y vim net-tools numactl lrzsz zip unzip wget htop git telnet
yum install -y gcc automake autoconf libtool make
yum install -y pcre-devel openssl openssl-devel
```

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
--with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie'

make && make install

mkdir /opt/nginx/cache # 这个傻x 不会自己创建的
```

---

### 操作
```shell script
cd /opt/nginx/sbin
启动： ./nginx
重载： ./nginx -s reload
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

