# Spring

> 此模块，Spring 与 为框架组件的粘合剂，使得整个应用更轻松的使用 Spring 框架，以及当前框架。


## AOP 拦截器


| 类名       | 描述                                                                          | 备注               |
|----------|-----------------------------------------------------------------------------|------------------|
| DebugAop | 调试拦截器，在需要调试的方法上添加注解 @Debug，则对应方法就可以使用 DebugHelper 内所提供的快速打日志的方法，自动添加序列及计算耗时 | Arthas 是一个很完美的工具 |


## Config 配置内容

| 类名                  | 描述               | 备注                                      |
|---------------------|------------------|-----------------------------------------|
| SystemConfig        | 自定义参数配置          | /                                       |
| CustomWebSerializer | 自定义 WebMVC 序列化工具 | 当前定义了LocalDateTime的格式化逻辑                |
| MyEncryptable       | 配置信息解密工具         | 带有 cipher: 前缀的内容，需要使用 Aes来解密。注意自定义aes密钥 |


## 实体

| 类名        | 描述                              |
|-----------|---------------------------------|
| RestInfo  | 描述一个 Restful 接口所应当包含的字段信息的实体    |
| DebugInfo | 在启用 Debug 标注情况下用于收集 Debug 信息的实体 |
| EnvType   | 环境枚举                            |



## 辅助类


| 类名                 | 用途说明                                                          |
|--------------------|---------------------------------------------------------------|
| DebugHelper        | 调试辅助类，用于在程序执行过程中输出调试信息，包括执行步骤、耗时等                             |
| IpHelper           | IP地址处理辅助类，用于获取客户端真实IP地址、服务器IP地址等信息                            |
| LocalThreadHelper  | 线程本地变量辅助类，使用ThreadLocal实现多Key存储，适用于Web请求上下文传递                 |
| RequestHelper      | HTTP请求辅助类，提供请求参数处理、URL匹配、获取请求信息等功能                            |
| ResponseHelper     | HTTP响应辅助类，用于处理HTTP响应，如返回错误信息、响应Excel文件等                       |
| RestTemplateHelper | REST请求模板辅助类，提供配置好的RestTemplate实例用于发送HTTP请求                    |
| SmsHelper          | 短信发送辅助类，封装了阿里云短信服务的发送功能                                       |
| SnowflakeHelper    | 雪花算法ID生成辅助类，用于生成全局唯一ID                                        |
| SystemConfigHelper | 系统配置辅助类，用于管理系统配置信息，支持Redis缓存更新                                |


## 日志处理工具


| 类名                   | 用途说明                                                 |
|----------------------|------------------------------------------------------|
| MaskingPatternLayout | 日志脱敏布局类，继承自 PatternLayout，支持对日志中的敏感信息进行脱敏处理，防止敏感数据泄露 |


## 全局 Restful 接口


- 类，及用途

| 类名           | 用途说明                               |
|--------------|------------------------------------|
| Apis         | API 接口控制器，提供接口列表查询和前端 API 代码生成功能   |
| ErrorHandler | 全局异常处理器，统一处理系统中各种类型的异常并返回统一格式的错误信息 |
| Monitor      | 系统监控控制器，提供服务器状态、IP信息、系统属性等监控接口     |


- 全局 restful 接口

| 请求方法 | URI                   | 功能说明                   | 实现类及方法                       |
|------|-----------------------|------------------------|------------------------------|
| GET  | /apis/list            | 获取所有 REST API 接口列表     | Apis.apisList()              |
| GET  | /apis/code/v1         | 生成前端 API 调用代码（格式1）     | Apis.apisCodeV1()            |
| GET  | /apis/code/v2         | 生成前端 API 调用代码（格式2）     | Apis.apisCodeV2()            |
| GET  | /apis/code/v3         | 生成前端 API 调用代码（格式3）     | Apis.apisCodeV3()            |
| GET  | /public/status        | 系统监控探针，检查服务状态          | Monitor.monitorStatus()      |
| GET  | /monitor/ips          | 获取服务器 IP 信息            | Monitor.ips()                |
| GET  | /monitor/properties   | 获取服务器系统属性              | Monitor.properties()         |
| GET  | /monitor/server/state | 获取服务器状态信息（包括内存、线程、GC等） | Monitor.monitorServerState() |



## 工具类


| 类名                     | 用途说明                                                                    |
|------------------------|-------------------------------------------------------------------------|
| FreeMarkerTemplateUtil | FreeMarker 模板工具类，用于处理 FreeMarker 模板的解析和渲染，支持从类路径或自定义路径加载模板，也支持直接解析字符串模板 |
| MailUtil               | 邮件发送工具类，支持发送纯文本邮件、HTML 邮件、带图片的邮件和带附件的邮件，支持 SMTP 协议和 SSL 加密              |
| RestUtil               | REST 接口工具类，用于扫描和获取项目中的 REST 接口信息，可以获取接口 URI、请求方法、接口描述等信息                |




***
以下内容未整理
***

## 概述
> 核心包，包含支撑微服务的基本内容

## 目录结构
- src
  - main
    - java
      - com.wkclz.core
        - config  全局配置
          - handler
            - AccessLogHandler 访问日志【微服务情况在网关实现，非微服务在 GwFilter 实现，此处已不再使用】
            - AuthHandler 鉴权拦截器，包含 api域名拦截，uri 白名单拦截，token 拦截，uri权限拦截【暂未实现】
            - LogTraceHandler 日志检测处理 【已转移到 GwFilter 去实现】
          - AppInterceptor 拦截器定义 【已完成由 GwFilter 替代】
          - FeignHeadConfiguration Feign请求header透传定义，选择性透传，防止污染
          - GwFilter 网关拦截器【在非微服务情况下启用】，包含：日志检测处理，请求日志记录，鉴权拦截，uri 路由前缀处理
          - LzConfig 所有自定义配置字段信息
          - ResetRedisTemplateSerializer redis存储时产生乱码问题纠正，更换默认的序列化方式
          - SystemConfig 系统级配置
          - SystemInit 系统启动时执行的缓存初始化。
        - helper  系统辅助类【内容太多了，将一点点添加】
          - cache 缓存方案，见[这里](../design/cache.md)
          - gen 生成器
            - RedisIdGenHelper 基于redis的ID生成器，可用于生成订单号
            - SystemClock 辅助生成器的锁
          - redis 基于redis实现的队列
          - AccessHelper rest请求的处理，鉴权
          - ApiDomainHelper API域名拦截处理
          - AppHelper 系统启动时的辅助类
          - AuthHelper 鉴权相关方法
          - BaseHelper 一些常用辅助方法
          - DictHelper 字典辅助类，主要为字典内容缓存
          - ExcelHelper Excel响应推流
          - GenHelper 代码生成器辅助，主要为生成器客户端逻辑
          - IpHelper IP辅助类，获取客户IP，服务器IP
          - LogTraceHelper 日志跟踪辅助类
          - OssHelper OSS上传相关封装
          - RequestHelper 方便在静态方法中提出HttpServletRequest
          - RestTemplateHelper 组装Rest请求
          - TenantDomainHelper 租户域名解析
