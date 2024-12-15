# MyBatis

## 依赖
```xml
<dependency>
    <groupId>com.wkclz.mybatis</groupId>
    <artifactId>shrimp-cloud-mybatis</artifactId>
</dependency>
```

## 配置
```yaml
spring:
  datasource:
    url: jdbc:mysql://host:port/schema?useUnicode=true&characterEncoding=utf8&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=Asia/Shanghai
    username: username
    password: password
    driverClassName: com.mysql.cj.jdbc.Driver
```

## 目录结构

- src
  - main
    - java
      - com.wkclz.mybatis
        - aop  AOP 拦截器
          - DaoAop 拦截 Dao 方法，包含：查询时的空参处理，查询时间处理，排序条件处理等
        - base  业务代码编写过程中所依赖的最基本的包
          - BaseMapper Mapper父类，包含基本的CRUD操作
          - BaseService Service的父类，包含基本的CURD的封装
          - PageData 分页对象
          - PageHandle 分页辅助类
        - bean  实体，枚举
          - DataSource 数据资源对象
        - config  全局配置
          - DruidStatView druid过滤器定义
        - constant  静态变量【内容过于简单，不添加说明】
        - exception  异常
          - BizException 自定义异常类
        - helper  系统辅助类【内容太多了，将一点点添加】
          - MyBatisHelper MyBatis操作辅助类
        - plugins 插件
          - MybatisConfiguration MyBatis 插件配置
          - MybatisUpdateInterceptor MyBatis 更新时的拦截插件，处理更新时的基础信息。唯一启用的插件
        - util  静态工具【有各种常用工具，均为静态工具】
          - JdbcUtil JDBC 工具
          - ResultSetMapper 数据集处理工具
        - StarterAutoConfigure 自动配置类


## 附加特性

### 查询空参处理

> 查询参数的 "" 自动处理成 null, 可简化 mybatis xml 的 if 判断

1. 拦截 Mapper 注解，在第一次进入此 AOP 时，获取所有 mappedStatement，并筛选出 DQL,DML 操作。为后续操作提供参照
2. 对于 DQL 语句，确认参数是否继承了BaseModel， 若有继承，截取参数进行分析
3. 查询参数包含 "" 时，将其置为 null, 以简化 xml 动态语法的编写
4. order by 条件，需要使用 ${} 方式拼接，在此处校验注入风险。
5. 对 order by  的内容做驼峰转换处理，增强对 order by 参数的兼容度
6. 给 keyword 关键词加上 前后百分号处理，方便使用过程直接 LIKE
7. 对 dateRangeType 字段转换成确切的时间范围 timeFrom, timeTo 两个字段，方便在数据库中直接使用
8. 乐观锁控制
9. 更新人，更新时间，修改人，修改时间处理【需要 cas 将用户信息放到 ThreadLocal 中】

### BaseMapper

> 定义了日常的数据库操作方法

- 脚手架/代码生成器所能实现的常用 单表增删改查。
- 结合代码生成器生成的 xml 使用

| 方法                         | 说明            |
|----------------------------|---------------|
| count                      | 统计            |
| getById                    | 用ID查找         |
| getByEntity                | 用 Entity 查找   |
| list                       | 查询列表，不包含Blobs |
| insert                     | (选择性)插入       |
| insertBatch                | 全量批量插入        |
| updateAll                  | 更新(带乐观锁       |
| updateSelective            | 选择性更新(带乐观锁)   |
| updateSelectiveWithoutLock | 选择性更新(不带乐观锁)  |
| updateBatch                | 批量更新(不带乐观锁)   |
| delete                     | 删除            |


### BaseService

> 定义了日常的数据库操作方法，mapper 之上添加逻辑判断

- 从 BaseModel 延伸出来的单表的增删改查接口
- 结合代码生成器使用
- 结合 mapper 使用


| 方法                         | 说明                           |
|----------------------------|------------------------------|
| count                      | 统计                           |
| get                        | 用ID查找                        |
| getWithCheck               | 用ID查找, 若不存在则报错               |
| get                        | 用 Entity 查找                  |
| getWithCheck               | 用 Entity 查找, 若不存在则报错         |
| list                       | 查询列表，不包含Blobs                |
| page                       | 查询列分页，不包含Blobs               |
| insert                     | (选择性)插入                      |
| insert                     | 全量批量插入                       |
| updateAll                  | 更新(带乐观锁)                     |
| updateSelective            | 选择性更新(带乐观锁)                  |
| updateSelectiveWithoutLock | 选择性更新(不带乐观锁)                 |
| update                     | 批量更新(不带乐观锁)                  |
| saveWithCheck              | 保存，无id则新增，有id则修改，带乐观锁, 选择性更新 |
| deleteByEntitys            | 批量删除                         |
| delete                     | 删除                           |
| deleteWithCheck            | 删除，若成功，返回删除前的对象              |
| delete                     | 删除                           |
| delete                     | 批量删除                         |


### PageQuery 快速分页

> xml 只写 list 查询，java 中一句话完成分页查询

```java
@Service
public class DemoService {

    @Autowired
    private DemoTypesMapper demoTypesMapper;

    public PageData selectPage(DemoTypes demoTypes){
        return PageQuery.page(demoTypes, demoTypesMapper::list);
    }

}
```


### 动态数据源

> 系统中，想随时连接任何数据源，需要动态数据源支持

#### 数据源获取
```java
@Component
public class DynamicDataSourceInit implements DynamicDataSourceFactory {

    @Autowired
    private GenDatasourceService genDatasourceService;

    @SneakyThrows
    @Override
    public DataSource createDataSource(String key) {
        // 获取数据源并参数 map 化
        return DruidDataSourceFactory.createDataSource(map);
    }
}
```

#### 使用
```java
@Component
public class Demo {
    public static void main(String[] args) {
        // 执行查询前，先set dsCode
        DynamicDataSourceHolder.set("dsCode");
        // sql 执行完后，需要 清除
        DynamicDataSourceHolder.clear();
    }
}
```




### config.DruidStatView
Druid 监控视图配置

### helper.MyBatisHelper
动态 MyBatis 语法解析执行器扩展。
使用方法： selectList， selectPage 方法，只需要传入符合 mybatis xml 语法的 sql, 和 参数，即可返回已处理好的数据。
可用于灵活的自定义 sql 查询，大屏展示或实时可编辑报表。

### plugin.MybatisUpdateInterceptor
功能说明：
1. 拦截 DML 语句（在拦截器中全部会被当成query 处理）
2. 搜索 请求参数的直接对象，或 List 中的对象，若继承了 BaseModel, 将做下一步处理
3. 修改动作过程，需要附加 最后更新人，最后更新时间，确保 ID 存在，
4. 新建时追回创建人，创建时间信息，排序。
5. 删除时校验id 存在性
6. 乐观锁校验：结合 service 使用。强制使用乐观锁场景将校验 version 字段
7. 将校验异常结果转换为更友好的提示

### util.JdbcUtil
JDBC 基本工具类

### util.ResultSetMapper
ResultSet 映射转换工具

## MyBatis四大组件

### 组件
- Executor：一个 SqlSession 对应一个 Executor 对象，这个对象负责增删改查的具体操作
- ParameterHandler：mybatis 提供的 参数处理器, 没有过多的类关联关系, 只有一个默认的实现类
- StatementHandler：StatementHandler 是 mybatis 创建 Statement 的处理器, 会负责 Statement 的创建工作, 在 JDBC 中 Statement 执行 SQL 语句时主要分为两个主要对象。 一个是平常大家都知道的 Statement 和 PrepareStatement, 都是在 java.sql 包下提供的对象
- ResultSetHandler：同 ParameterHandler 一致, 都只有一个默认的实现类。ResultSetHandler 作用域只有一个, 那就是负责处理 Statement 返回的结果, 根据定义返回类型进行封装返回
- 参考：https://zhuanlan.zhihu.com/p/186261260

### 执行SQL过程
Mybatis执行SQL的完整过程， 参考：https://www.bbsmax.com/A/B0zqre03Jv/

### 拦截器

拦截器示例
#### 拦截参数处理
```java
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.plugin.*;

import java.sql.PreparedStatement;
import java.util.Properties;

@Intercepts({@Signature(type = ParameterHandler.class, method = "setParameters", args = PreparedStatement.class)})
public class MybatisParameterInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 拦截参数设置
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
```

#### 拦截查询执行
```java
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import java.util.Properties;

@Intercepts({
    @Signature(type = Executor.class,method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}),
    @Signature(type = Executor.class,method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class})
})
public class MybatisQueryInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 拦截查询执行
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
```

#### 拦截入库执行
```java
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;

import java.util.Properties;

@Intercepts({@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})})
public class MybatisUpdateInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 拦截入库执行
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
```

#### 拦截结果处理
```java
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.plugin.*;

import java.sql.Statement;
import java.util.Properties;

@Intercepts({@Signature(type = ResultSetHandler.class, method = "handleResultSets", args = {Statement.class})})
public class MybatisResultSetInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 拦截查询结果
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
```

#### 拦截其他
- 指定 Signature 的 类型，方法，和参数。即可完成拦截
  拦截器执行顺序参考：https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/Interceptor.md
