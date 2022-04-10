# 使用 Docker 来打包运行 nginx

# Dockerfile
```shell
FROM centos:7
LABEL shrimp www.wkclz.com
WORKDIR /apps/
RUN yum install -y epel-release --nogpgcheck && \
 yum install -y yum-utils vim net-tools numactl zip unzip wget telnet gcc automake autoconf libtool make pcre-devel openssl openssl-devel && \
 yum clean all && rm -rf /var/cache/yum/*

RUN wget http://nginx.org/download/nginx-1.18.0.tar.gz && \
  tar -zxvf nginx-1.18.0.tar.gz && \
  cd nginx-1.18.0 && \
  ./configure --prefix=/apps/nginx \
    --sbin-path=/apps/nginx/sbin/nginx \
    --modules-path=/apps/nginx/modules \
    --conf-path=/apps/nginx/config/nginx.conf \
    --error-log-path=/apps/nginx/log/error.log \
    --http-log-path=/apps/nginx/log/access.log \
    --pid-path=/apps/nginx/log/nginx.pid \
    --lock-path=/apps/nginx/log/nginx.lock \
    --http-client-body-temp-path=/apps/nginx/cache/client_temp \
    --http-proxy-temp-path=/apps/nginx/cache/proxy_temp \
    --http-fastcgi-temp-path=/apps/nginx/cache/fastcgi_temp \
    --http-uwsgi-temp-path=/apps/nginx/cache/uwsgi_temp \
    --http-scgi-temp-path=/apps/nginx/cache/scgi_temp \
    --user=root \
    --group=root \
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
    --with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie' && \
  make && make install && \
  mkdir /apps/nginx/cache && \
  rm -rf /apps/nginx-1.18.0.tar.gz  /apps/nginx-1.18.0

CMD sleep 36000;
```


# 编译
```shell
docker build -t nginx:v1 .
```

# 前台启动
```shell
docker run -it centos:7
```