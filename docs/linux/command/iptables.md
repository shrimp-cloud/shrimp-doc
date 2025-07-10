# iptables

> netfilter/iptables（简称 iptables）组成 Linux 平台下的包过滤防火墙 。iptables 组件是一种工具，也称为用户空间，它使插入、修改和除去信息包过滤表中的规则变得容易

## 基础信息

- 五链
> 链就是从报文进入到报文离开这整个期间，计算机处理报文的关键环节

| 链           | 说明                                                                |
|-------------|-------------------------------------------------------------------|
| INPUT       | 处理入站数据包，匹配目标IP为本机的数据包                                             |
| OUTPUT      | 处理出站数据包，一般不在此链上做配置                                                |
| FORWARD     | 处理转发数据包，匹配流经本机的数据包                                                |
| PREROUTING  | 在进行路由选择前处理数据包，用来修改目的地址，用来做DNAT。相当于把内网中的80端口映射到路由器外网端口上            |
| POSTROUTING | 在进行路由选择后处理数据包，用来修改源地址，用来做SNAT。相当于内网通过路由器NAT转换功能实现内网主机通过一个公网IP地址上网 |

- 四表

> 在每个链上都有一堆规则，但是部分规则是相似的，那我们把一些实现相同功能的规则放在一起，就能轻松的完成复用了

| 表      | 说明                                                                            |
|--------|-------------------------------------------------------------------------------|
| raw    | 确定是否对该数据包进行状态跟踪。包含两个规则链，OUTPUT、PREROUTING                                     |
| mangle | 修改数据包内容，用来做流量整形的，给数据包设置标记。包含五个规则链，INPUT、OUTPUT、FORWARD、PREROUTING、POSTROUTING |
| nat    | 负责网络地址转换，用来修改数据包中的源、目标IP地址或端口。包含三个规则链，OUTPUT、PREROUTING、POSTROUTING           |
| filter | 负责过滤数据包，确定是否放行该数据包（过滤）。包含三个规则链，INPUT、FORWARD、OUTPUT                           |


- 网络流量的五元组

| 元组      | 说明    |
|---------|-------|
| S_IP    | 源 IP  |
| S_PORT  | 源端口   |
| D_IP    | 目的 IP |
| D_PORT  | 目的端口  |
| TCP/UDP | 四层协议  |


- 处理动作

| 动作         | 说明                                      |
|------------|-----------------------------------------|
| ACCEPT     | 允许数据包通过                                 |
| DROP       | 直接丢弃数据包。不回应任何信息，客户端只有当该链接超时后才会有反应       |
| REJECT     | 拒绝数据包。会给客户端发送一个响应的信息                    |
| SNAT       | 源 NAT，解决私网用户用同一个公网 IP 上网的问题             |
| MASQUERADE | 是 SNAT 的一种特殊形式，适用于动态的、临时会变的 IP 上        |
| DNAT       | 目的 NAT，解决私网服务端，接收公网请求的问题                |
| REDIRECT   | 在本机做端口映射                                |
| LOG        | 在 /etc/log/messages 中留下记录，但并不对数据包进行任何操作 |


## 用法

```shell
iptables + -t 表名 + 规则/链管理参数 + 匹配参数 + 动作类型参数
```

```shell
#  选择表
-t  #  对指定表进行操作（必须是 raw、nat、filter、mangle 中的一个。如没有指定则默认为 filter表）

#  规则管理
-A  #  在指定规则链的末尾加入新规则
-I  #  在指定规则链的头部加入新规则（默认在第一行添加）
-D  #  删除指定链中的一条规则（可按规则序号和内容删除）
-R  #  修改、替换指定链中的某一条规则（可按照规则序号和内容替换）

#  链管理
-P  #  设置指定链默认策略
-N  #  新建一条用户自己定义的规则链
-X  #  删除指定表中用户自定义的规则链
-E  #  重命名用户定义的链（不改变链本身）
-Z  #  将所有表的所有链的字节和数据包计数器清零

#  规则链
INPUT       #  处理入站的数据包
OUTPUT      #  处理出站的数据包
FORWARD     #  处理转发的数据包
PREROUTING  #  处理入站的路由规则
POSTROUTING #  处理出站的路由规则

#  匹配（加感叹号 “！“表示这个目标除外（加感叹号后需加空格后在加匹配项））
-s  #  匹配来源地址 IP/MASK
-d  #  匹配目标地址
-i  #  网卡名称（匹配从这块网卡流入的数据）
-o  #  网卡名称（匹配从这块网卡流出的数据）
-m  #  使用扩展模块
-p  #  匹配协议（如：tcp、udp、icmp）
    tcp     #  扩展选项：--source-port （扩展选项可用 iptables -p tcp -h 查看）
    udp     #  扩展选项：--source-port （扩展选项可用 iptables -p icmp -h 查看）
    icmp    #  可用扩展：  --icmp-type  （可用扩展可用 iptables -p icmp -h 查看）
    --dport 80  #  匹配目标端口 80
    --sport 81  #  匹配来源端口 81

#  指定动作类型
-j  #  指定动作类型
    动作类型：
    ACCEPT      #  允许数据包通过
    REJECT      #  拒绝数据包通过（必要时会发送响应信息）
    DROP        #  直接丢弃（不给出任何回应）
    QUEUE       #  中断过滤程序，将封包放入队列，交由其它程序处理
    RETURN      #  停止当前链中的后续规则，并返回到调用链（the calling chain）中
    REDIRECT    #  在本机上做端口映射
    DNAT        #  改变数据包的目的地址
    SNAT        #  改变数据包的源地址
    MASQUERADE  #  SNAT 的一种特殊形式，适用于动态、临时会变的 IP 上（只能用户 nat 表的 POSTROUTING 链）
    LOG         #  在 /var/log/messages 文件中记录日志信息，然后在将数据包传递给下一条规则

#  查看/清空 规则
-L  #  列出指定链中所有的规则
-n  #  IP地址和端口会一数字的形式打印
-v  #  详细输出
-F  #  清空规则链
```

- 使用实例

```shell
iptables -L             #  列出所有规则
iptables -L -nv         #  查看详细信息（IP 跟 端口会以数字形式显示）
iptables -t nat -L      #  列出 nat 表中的所有规则
iptables -t nat -L -nv  #  查看详细信息（IP 跟 端口会以数字形式显示）
iptables -F             #  清除所有规则（如不指定表，则默认表为 filter）
iptables -t nat -D INPUT 1  #  删除 nat 表 INPUT 链下的第一条规则
```

- 清空所有规则 (在 iptables 工作异常时全尝试)
```shell
# 备份规则:
iptables-save > ~/iptables_backup.txt
# 清空规则:
iptables -F
iptables -t nat -F
iptables -t mangle -F
iptables -X
# 自行重启可能影响的嗠，比如: docker, containerd
```
