# PHP

> LNMP 安装，只讲述 Nginx 配置， php 安装，及 Wordpress 安装

- 说明: 本文指在安装 php, 和 wordpress, 没提及 nginx, mysql 的安装
  - nginx: [点我](nginx.md)
  - mysql: [点我](mysql.md)


## php 安装
```shell
# 安装源
yum install -y epel-release
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

# 清除历史
yum remove -y php*

# 安装 php 及各种插件
yum install -y php72w php72w-cli php72w-fpm php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-opcache php72w-pdo php72w-xml

# 启动 php, 并自动启动
systemctl start php-fpm
systemctl start php-fpm
```


## 下载 wordpress

```shell
cd /opt/
wget https://cn.wordpress.org/latest-zh_CN.tar.gz
tar -zxvf latest-zh_CN.tar.gz

# 得到  /opt/wordpress 代码
```


## 配置 nginx

```text
server {
    listen 80;
    root /opt/wordpress;
    server_name localhost;
    index index.php index.html index.htm;

    add_header Referrer-Policy                      "no-referrer"   always;
    add_header X-Content-Type-Options               "nosniff"       always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include fastcgi.conf;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
    # rewrite /wp-admin$ $scheme://$host$uri/ permanent;
}
```

## 安装

1. 访问域名，配置数据库信息
2. 配置站点信息
3. 登录




## 坑

- Q: 配置数据库提示：数据库密码正确，也提示【建立数据库连接时出错】
- A: 再次确认密码是否正确，若无误，手动创建 wp-config.php, 并配置 debug = true

***

- Q: 以上异常提示了具体 debug 信息 【The server requested authentication method unknown to the client】
- A: 在 mysql 8.0 以后，caching_sha2_password是默认的身份验证插件，而不是以往的mysql_native_password。解决(注意替换关键信息):`ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY '12345678';`

