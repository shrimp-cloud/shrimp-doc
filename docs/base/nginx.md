# Nginx 配置

## 概述
> Nginx 作为反向代理，静态页面server.

## 配置
- 配置要求前后端分离
- 域名分离
- 后端接口做跨域支持
- 此处提供多个配置 demo，需要组合使用


## 纯静态文件
```
server {
    listen       80;
    server_name  static.wkclz.com;
    location / {
        root   /opt/dist/static;
        index  index.html;
    }
}
```

## 纯反向代理配置
```
server {
    listen       80;
    server_name eureka.wkclz.com;
    location / {
        proxy_set_header Host $host;
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8001;
        break;
    }
}
```


## 纯301跳转配置
```
server {
    listen       80;
    server_name  www.wkclz.com api.wkclz.com;
    if ($scheme = http ) {
        return 301 https://$host$request_uri;
    }
}
```

## 重写实现 301
```
server {
    listen       80;
    server_name jenkins.wkclz.com;
    location / {
        rewrite ^/(.*)$ http://11.22.33.44:9012/$1 permanent;
    }
}
```



## 单页面应用配置
```
server {
    listen       80;
    server_name  mobile.wkclz.com;
    location / {
        root   /opt/dist/mobile;
        index  index.html;
        try_files /index.html /index.html;
    }
    location ~* .(js|css|jpg|png|mp3|html|htm|jpeg|ttf|woff|ico|woff2|map)$ {
        alias /opt/dist/mobile/$uri;
    }
}
```


## SSL 配置
```
server {
    listen       443;
    server_name  api.wkclz.com;

    ssl on;
    underscores_in_headers on;

    ssl_certificate      conf.d/ssl/api.wkclz.com.pem;
    ssl_certificate_key  conf.d/ssl/api.wkclz.com.key;

    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        # proxy
        proxy_set_header Host $host;
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8080;
        break;
    }
}

```

## 跨域配置
```
server {
    listen       80;
    server_name  api.wkclz.com;

    location / {
        # options request
        if ( $request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin "$http_origin";
            add_header Access-Control-Allow-Credentials 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,token';
            add_header 'Access-Control-Max-Age' 1728000;
            return 204;
        }

        # other request
        add_header Access-Control-Allow-Origin "$http_origin" always;
        add_header Access-Control-Allow-Credentials 'true' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,token' always;

        # proxy
        proxy_set_header Host $host;
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8080;
        break;
    }
}

```

