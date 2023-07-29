# TRACE 跟踪

## 概述
> 微服务之间，需要相互调用。就涉及调用链的跟踪，基本信息的传递，在这里统称为跟踪信息传递

## 跟踪信息


| 字段                 | 含意            | 说明                    |
|--------------------|---------------|-----------------------|
| upstreamServiceId  | 上游 serviceId  | 作为跟踪信息，但不在 teaceInfo内 |
| upstreamInstanceId | 上游 instanceId | 作为跟踪信息，但不在 teaceInfo内 |
| *                  | *             | *                     |
| applicationGroup   | 应用组           | *                     |
| serviceId          | 应用名称          | *                     |
| instanceId         | 应用实例          | *                     |
| serverIp           | 所在服务IP        | 当前服务器                 |
| envType            | 环境            | *                     |
| traceId            | 跟踪ID          | *                     |
| spanId             | 跟踪序列号         | 每请求到一个服务，都自增1         |
| upstreamIp         | 上游IP          | 来源服务器ip               |
| remoteIp           | 来源upstream    | 来源服务器ip               |
| tenantCode         | 租户编码          | *                     |
| authId             | 认证ID          | *                     |
| userCode           | 用户编码          | *                     |
| user               | 用户            | 包含用户的所有信息             |


## 管理
1. 入口的地方，清除线程变量，检测，还原跟踪信息。
2. 任何需要获取相关信息的地方，均按性能先后顺序获取信息
3. 服务之间feign 调用使用 header 传输信息
4. 服务内使用 ThreadLocal 绑定到线程
5. feign 调用前，附加 upstream 信息
6. 应用接收请求时，提取 upstream 信息

## traceId 跟踪链
- 跟踪链用于微服务调用过程的跟踪，集群部署情况下，可以知道具体请求来源，去向。
- 每次请求均需要保证唯一
- 从请求的起始位置产生，最后返回给前端

## spanId 跟踪序号
- 在知道服务调用对应的具体机器之下，还需要知道调用的具体路径，
- 每经过一个服务，spanId+1，提取相同 traceId, 再使用 spanId 排序，得到请求的全路径

## user 用户信息
- 用户有登录情况下，传递用户信息

## tenantCode 租户

> (站点/租户/...)

- 业务隔离标识。