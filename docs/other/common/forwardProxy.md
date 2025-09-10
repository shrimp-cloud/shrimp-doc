# 正向代理

> 正向代理，意思是一个位于客户端和原始服务器之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端才能使用正向代理。

## 单次 curl 代码
```shell
curl -v --proxy ip:port http://www.baidu.com
curl -v -x ip:port http://www.baidu.com
```

## CentOS7 会话级代理

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
okhttp
```java
kHttpClient.Builder builder = new OkHttpClient.Builder();

// 设置代理地址
SocketAddress sa = new InetSocketAddress("代理服地址", 代理端口);
builder.proxy(new Proxy(Proxy.Type.HTTP, sa));

OkHttpClient client = builder.build();
Request.Builder requestBuilder = new Request.Builder();
requestBuilder.url("目标服务器地址");
client.newCall(requestBuilder.build());
```



