# 核心包

## 概述
> 核心包，包含支撑微服务的基本内容

## 目录结构
- src
  - main
    - java
      - com.wkclz.core
        - aop  AOP 拦截器
          - DaoAop 拦截 Dao 方法，包含：查询时的空参处理，查询时间处理，排序条件处理等
          - DebugAop 调试拦截器，在需要调试的方法上添加注解 @Debug，则对应的方法就可以使用 DebugHelper 内所提供的快速打日志的方法，自动添加序列及计算耗时
          - RestAop 拦截所有 rest 请求。打印请求日志，计算请求耗时，debug 模式下打印返回参数，
        - base  业务代码编写过程中所依赖的最基本的包
          - annotation
            - Debug 调试辅助注解，结合 DebugAop，DebugHelper 使用
            - Desc 只为方便在类，方法，变量上打注释
            - Routers 用于标识这是一个编写路由的接口类，方便提取路由上的注释
          - BaseMapper Mapper父类，包含基本的CRUD操作
          - BaseModel 所有实体类的基类，包含基础字段
          - BaseService Service的父类，包含基本的CURD的封装
          - PageData 分页对象
          - PageHandle 分页辅助类
          - Result 标准Rest返回对象
          - Sys 系统启动信息辅助类
        - config  全局配置
          - handler
            - AccessLogHandler 访问日志【微服务情况在网关实现，非微服务在 GwFilter 实现，此处已不再使用】
            - AuthHandler 鉴权拦截器，包含 api域名拦截，uri 白名单拦截，token 拦截，uri权限拦截【暂未实现】
            - LogTraceHandler 日志检测处理 【已转移到 GwFilter 去实现】
          - AppInterceptor 拦截器定义 【已完成由 GwFilter 替代】
          - DruidStatView druid过滤器定义
          - FeignHeadConfiguration Feign请求header透传定义，选择性透传，防止污染
          - GwFilter 网关拦截器【在非微服务情况下启用】，包含：日志检测处理，请求日志记录，鉴权拦截，uri 路由前缀处理
          - LzConfig 所有自定义配置字段信息
          - MyEncryptableProperty,MyEncryptablePropertyDetector,MyEncryptablePropertyResolver 配置文件密码解密配置
          - ResetRedisTemplateSerializer redis存储时产生乱码问题纠正，更换默认的序列化方式
          - SystemConfig 系统级配置
          - SystemInit 系统启动时执行的缓存初始化。
        - constant  静态变量【内容过于简单，不添加说明】
        - exception  异常
          - BizException 自定义异常类
        - helper  系统辅助类【内容太多了，将一点点添加】
          - cache 缓存方案，见[这里](/design/cache.md)
          - gen 生成器
            - RedisIdGenHelper 基于redis的ID生成器，可用于生成订单号
            - SystemClock 辅助生成器的锁
          - redis 基于redis实现的队列
          - AccessHelper rest请求的处理，鉴权
          - ApiDomainHelper API域名拦截处理
          - AppHelper 系统启动时的辅助类
          - AuthHelper 鉴权相关方法
          - BaseHelper 一些常用辅助方法
          - DebugHelper 调试辅助类，包含日志打印，耗时计算等
          - DictHelper 字典辅助类，主要为字典内容缓存
          - ExcelHelper Excel响应推流
          - GenHelper 代码生成器辅助，主要为生成器客户端逻辑
          - IpHelper IP辅助类，获取客户IP，服务器IP
          - LogTraceHelper 日志跟踪辅助类
          - MyBatisHelper MyBatis操作辅助类
          - OssHelper OSS上传相关封装
          - RedisLockHelper 基于Redis的分布式锁实现
          - RequestHelper 方便在静态方法中提出HttpServletRequest
          - RestTemplateHelper 组装Rest请求
          - ServiceHelper 使用服务名及URI请求微服务内某个Rest
          - SmsHelper 阿里短信发送封装
          - SnowflakeHelper 雪花算法ID生成器
          - SystemConfigHelper 系统配置缓存辅助
          - TenantDomainHelper 租户域名解析
        - plugins 插件
          - MybatisConfiguration MyBatis 插件配置
          - MybatisUpdateInterceptor MyBatis 更新时的拦截插件，处理更新时的基础信息。唯一启用的插件
        - pojo  实体，枚举
          - dto 实体类
          - entity 实体类
          - enums 系统枚举
        - rest  系统全局接口，用于后期微服务的监控，运维
          - Apis 获取服务的 api 信息
          - ErrorHandler 异常处理逻辑，当请求异常时，会把异常重新封装成 Result
          - Monitor 系统监控相关接口
          - Routes 系统全局生效的Rest路由
        - util  静态工具【有各种常用工具，均为静态工具】


## 自定义扩展
自定义扩展，主要为自行封装的一些扩展方法，方便业务系统实现

### AOP
切面，当前主要用到 rest 接口的切面，方向统计调用耗时，接口调用日志打印

### base.BaseMapper
脚手回/代码生成器所能实现的常用 单表增删改查

### base.BaseModel
实体类都要求继承的一个父实体类。

### base.BaseService
从 BaseModel 延伸出来的单表的增删改查接口

### base.PageData
分页查询数据结构

### base.Result
默认返回结果对象。具体的返回结果需要放到 Result.data 中。

