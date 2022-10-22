# 正向代理

> 正向代理，指的是通过代理服务器访问目标地址

## CentOS7会话级代理

设置代理：
```shell
export http_proxy=http://ip:port
export https_proxy=http://ip:port
export no_proxy="localhost,127.0.0.1,::1"
```
取消代理
```shell
unset http_proxy
unset https_proxy
unset no_proxy
```

## CentOS7 全局代理
- vim /etc/profile.d/proxy.sh
- 将上述 export 放进去即可
- 立即生效：source /etc/profile


## Java 应用级代理
```shell
-Dhttp.proxyHost=proxy.example.com -Dhttp.proxyPort=8080 -Dhttp.nonProxyHosts=localhost|host.example.com
-Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=8080 -Dhttps.nonProxyHosts=localhost|host.example.com
```


## Java 具体业务代理



