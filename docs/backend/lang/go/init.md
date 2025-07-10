# GO 环境初始化

### SDK

- 下载地址：https://golang.google.cn/dl/
- mac选择：go1.17.9.darwin-amd64.pkg，安装后自动设置环境变量
- Linux选择：go1.17.9.linux-amd64.tar.gz 【二进制】


### Centos7环境
```shell
wget https://golang.google.cn/dl/go1.17.9.linux-amd64.tar.gz
tar -zxvf go1.17.9.linux-amd64.tar.gz
# 临时环境变量：
export PATH=$PATH:/usr/local/go/bin
# 永久生效
sodu echo 'export PATH=$PATH:/usr/local/go/bin' > /etc/profile.d/go.sh
sodu source /etc/profile
```

### 其他环境
> 自己搞，太简单了

### 测试
查看 go 版本
```shell
go version
```
go demo

```go
# vim test.go
package main
import "fmt"
func main() {
   fmt.Println("Hello, World!")
}
# go run test.go
```

### 编译执行
编译
```shell
go build test.go
```
执行
```shell
./test
```


### 开发工具
> https://www.jetbrains.com/go/


### 代理
go 依赖下载的默认代理为：https://proxy.golang.org。在国内访问不了，可更换代理
```shell
go env -w GOPROXY=https://goproxy.cn
```