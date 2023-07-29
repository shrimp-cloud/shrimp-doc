# 后端架构

> shrimp 虾米，自个的网名，现在用于项目名

## 后端公共静态
- shrimp-cloud-bom: 物料清单
- shrimp-cloud-parent: 定义基础依赖
- shrimp-cloud-common: 静态工具与方法
- shrimp-cloud-redis: Redis 封装
- shrimp-cloud-spring: 最接近业务的 spring 封装
- shrimp-cloud-auth: 权限模块封装
- shrimp-cloud-mybatis: MyBatis 的统一封装

## shrimp-cloud-bom
> BOM stands for Bill Of Materials. A BOM is a special kind of POM that is used to control the versions of a project’s dependencies and provide a central place to define and update those versions. BOM provides the flexibility to add a dependency to our module without worrying about the version that we should depend on.

> BOM代表物料清单。BOM是一种特殊的POM，用于控制项目依赖项的版本，并提供定义和更新这些版本的中心位置。BOM提供了向我们的模块添加依赖项的灵活性，而不用担心我们应该依赖的版本。

### properties
- 版本号：框架级别的依赖，必需在 bom 中的 properties 定义
- 命名规范：<artifactId.version>版本号</artifactId.version>
- 排序：Spring 相关依赖；Shrimp 模块相关依赖; 三方静态工具依赖

### dependencyManagement
- 版本管理: 定义框架级别的依赖。引用 properties 中定义的版本号
- 排序：依照 properties 所定义的排序

## shrimp-cloud-parent
- 继承 Spring 父类
- 引入 bom: 在 dependencyManagement 内引入 Springboot 的 bom, 及自定义的 bom
- 定义公共依赖

## shrimp-cloud-common
> 静态资源：
  1. 注解
  2. 枚举
  3. 实体
  4. 异常
  5. 工具

## shrimp-cloud-redis
> redis 的封装
1. 序列化方法纠正
2. ID生成器
3. 分布式锁

## shrimp-cloud-spring
> 提供spring 耦合，大量与 Spring 相关的工具类，方法

## shrimp-cloud-auth
> 权限辅助工具
1. 权限相关实体
2. 拦截器
3. 网关

## shrimp-cloud-mybatis
> MyBatis 的统一封装
1. Aop 增强查询处理
2. Dao, Service 统一定义
3. MyBatis 拦截器增强处理
4. MyBatis 查询增强