# COMMON

> 框架全局类的定义，工具包


## 集成


```xml
<dependency>
    <groupId>com.wkclz.common</groupId>
    <artifactId>shrimp-cloud-common</artifactId>
    <version>${lastVersion}</version>
</dependency>
```



## annotation 注解


| 注解      | 用途                               |
|---------|----------------------------------|
| @Router | 标注此类用于 restful 路由管理，方便代码对路由的自动分析 |
| @Desc   | 对字段，或方法进行描述，方便代码对字段的生成           |
| @Debug  | 标注此方法启用了 debug, 执行时将输出更详细的日志信息   |




## enum 枚举



| 枚举     | 用途              |
|--------|-----------------|
| ResultStatus | Restful 接口特殊状态码 |

- 注: 大部分枚举定义在应用的字典中，全局的枚举较少

## Exception 异常

| 异常              | 用途                                           |
|-----------------|----------------------------------------------|
| CommonException | 自定义异常，用于抛出异常，并返回给前端。此异常为以下异常的父类              |
| BizException    | 业务逻辑异常，此异常需要业务人员介入，以确认逻辑上存在何种问题，并推动解决        |
| DataException   | 数据异常。此异常一般为数据混乱引发，业务人员需要知道异常原因，技术人员需要协同解决此异常 |
| SysException    | 系统异常。业务人员一般无法斛此类异常，需要技术人员排查原因及解决问题           |
| UserException   | 用户操作异常，需要将正确的操作方式提示给用户，管理者不需要关心此异常           |

## Domain

| Domain         | 用途                   | 说明                                          |
|----------------|----------------------|---------------------------------------------|
| BaseEntity     | 基础类。数据库对象 Entity 的父类 | 包含基础字段，包含了 Entity 的基础操作。 实现了 Serializable   |
| Result         | Restful 返回对象         | 包含 Restful 返回的基础字段，数据泛型，以及快速构建 Result 的一些方法 |
| FieldInfo      | 字段信息                 | 用于保存 Java 类的字段信息                            |
| SystemBaseInfo | 系统基础信息               | 用于封装系统的各种参数                                 |


- 其他类无需太关心，用到时再看能知道用途即可

## 其他

> 一些使用率较高，但又不需要特殊写明用途的内容


- tools: 一些小工具，偏重于完成一个较复杂的问题
- utils: 一些小工具，只完成单项任务，需要开发人员组合成为自身的逻辑
