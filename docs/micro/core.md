# 核心包

## 概述
> 核心包，包含支撑微服务的基本内容

## 目录结构
- src
  - main
    - java
      - com.wkclz.core
        - aop  AOP 拦截器,用于拦截某些方法，添加上场，统计，改变默认行为
        - base  业务代码编写过程中所依赖的最基本的包
        - config  全局配置
        - constant  静态变更
        - exception  异常
        - helper  系统辅助类
        - pojo  实体，枚举
        - rest  系统全局接口，用于后期微服务的监控，运维
        - util  静态工具


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

