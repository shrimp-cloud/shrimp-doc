# MyBatis

> 此模块基于 MyBatis, 扩展了一些对数据库的常规操作，以简化开发。


## 集成

### 添加依赖

```xml
<dependency>
    <groupId>com.wkclz.mybatis</groupId>
    <artifactId>shrimp-cloud-mybatis</artifactId>
    <version>${lastVersion}</version>
</dependency>
```

### 配置

- 参照 druid-spring-boot-3-starter 与 mybatis-spring-boot-starter 配置 的官方配置即可


## 核心逻辑


### BaseMapper

> BaseMapper 定义了单表的基本操作 (需配合代码生成器)

| 方法名                        | 描述            | 参数                              | 返回值           |
|----------------------------|---------------|---------------------------------|---------------|
| count                      | 统计            | Entity e                        | Long          |
| getById                    | 用ID查找         | @Param("id") Long id            | Entity        |
| getByEntity                | 用 Entity 查找   | Entity e                        | Entity        |
| list                       | 查询列表，不包含Blobs | Entity e                        | List<Entity\> |
| insert                     | (选择性)插入       | Entity e                        | Long          |
| insertBatch                | 全量批量插入        | @Param("list") List<Entity\> es | Integer       |
| updateAll                  | 更新(带乐观锁)      | Entity e                        | Integer       |
| updateSelective            | 选择性更新(带乐观锁)   | Entity e                        | Integer       |
| updateSelectiveWithoutLock | 选择性更新(不带乐观锁)  | Entity e                        | Integer       |
| updateBatch                | 批量更新(不带乐观锁)   | @Param("list") List<E\> es      | Integer       |
| delete                     | 删除            | Entity e                        | Integer       |




### BaseService

> BaseService 对 Mapper 进一步封装。同时，Service 是完成业务逻辑的主要场所。

| 方法名                        | 描述                           | 参数               | 返回值               |
|----------------------------|------------------------------|------------------|-------------------|
| count                      | 统计                           | Entity e         | Long              |
| get(Long id)               | 用ID查找                        | Long id          | Entity            |
| getWithCheck(Long id)      | 用ID查找, 若不存在则报错               | Long id          | Entity            |
| get(Entity e)              | 用 Entity 查找                  | Entity e         | Entity            |
| getWithCheck(Entity e)     | 用 Entity 查找, 若不存在则报错         | Entity e         | Entity            |
| list                       | 查询列表，不包含Blobs                | Entity e         | List<Entity\>     |
| page                       | 查询列分页，不包含Blobs               | Entity e         | PageData<Entity\> |
| insert(Entity e)           | (选择性)插入                      | Entity e         | Long              |
| insert(List<E\> es)        | 全量批量插入                       | List<E\> es      | Integer           |
| updateAll                  | 更新(带乐观锁)                     | Entity e         | Integer           |
| updateSelective            | 选择性更新(带乐观锁)                  | Entity e         | Integer           |
| updateSelectiveWithoutLock | 选择性更新(不带乐观锁)                 | Entity e         | Integer           |
| update(List<E\> es)        | 批量更新(不带乐观锁)                  | List<E\> es      | Integer           |
| saveWithCheck              | 保存，无id则新增，有id则修改，带乐观锁, 选择性更新 | Entity e         | Entity            |
| deleteByEntitys            | 批量删除                         | List<Entity\> es | Integer           |
| delete(Long id)            | 删除                           | Long id          | Integer           |
| deleteWithCheck(Long id)   | 删除，若成功，返回删除前的对象              | Long id          | Entity            |
| delete(List<Long\> ids)    | 删除                           | List<Long\> ids  | Integer           |
| delete(Entity e)           | 批量删除                         | Entity e         | Integer           |



### 实体


| 实体名            | 用途       |
|----------------|----------|
| PageData       | 分页数据     |
| DataSourceInfo | 数据库基本信息  |
| TableInfo      | 表信息      |
| KeyInfo        | 表的索引信息   |
| ColumnQuery    | 字段查询的参数  |
| ColumnInfo     | 字段信息     |
| DataTypeEnum   | 字段类型映射枚举 |



### 配置类

> 全辅助配置，略过




## MyBatis 插件


| 插件名                     | 描述               | 状态                           |
|-------------------------|------------------|------------------------------|
| ParameterInterceptor    | 参数处理插件           | 不好用，未启用                      |
| ParameterizeInterceptor | xx               | 不好用，未启用                      |
| PrepareInterceptor      | xx               | 不好用，未启用                      |
| QueryInterceptor        | SQL 在执行前，进行拦截和处理 | 已启用(功能与 DaoAop 有重叠，需要考虑去留问题) |
| SqlInjInterceptor       | SQL 注入风险检测       | 已启用                          |
| UpdateInterceptor       | SQL 执行更新方法时的拦截器  | 已启用，注入创建人，更新人信息              |



## Rest 方法


| 请求方法 | URI | 描述     |
|------| --- |--------|
| GET  | /db/table/list | 获取表清单  |
| GET  |   /db/column/list  | 获取字段清单 |


- 注意: 此接口不能默认授权给所有用户，仅可授权给指定功能



## 工具类

| 类名              | 用途                              |
|-----------------|---------------------------------|
| JdbcUtil        | SQL 较为原生的执行方法                   |
| MySqlUtil       | MySQL 语句的分析方法(考虑与 SqlHelper 合并) |
| ResultSetMapper | SQL 执行返回结果的处理方法                 |




## 动态数据源


```java
package com.example.demo;
@Service
public class DemoService {
    @Resource
    private DemoMapper demoMapper;

    public void demo() {
        // 标识需要使用的数据源
        DynamicDataSourceHolder.set("dbCode");
        // 执行查询，会自动使用上述指定的数据源进行查询，并在完成查询之后，AOP 会自动清除 数据源标识
        demoMapper.handleSelect(param);
        // 若非经过 Aop （直接调用低层 sqlSession 的过程）情况下，需要在 finally 中清除数据源标识
        DynamicDataSourceHolder.clear();
    }
}
```






## 辅助逻辑

### DaoAop

- 当数据库操作是 Select 时，将所有参数进行过滤，去除参数前后的空内容，若去除后，无真实内容，将置为 null
- 若是多数据源，在完成  Dao 执行后，将清空线程变量，防止对后续的 sql 动作千万影响
- 对 OrderBy 参数进行检测，若存在注入风险，将拦截。同时，规范化 OrderBy 参数

### PageQuery

- 分页查询封装对象
- 入参：查询参数; List 查询接口
- 出参: 已经完成分页的对象
- 实现: 利用 PageHelper 完成分页查询，再转换查询结果
- list 查询接口，只需要定义正常的 list 查询即可，无需关心分页相关参数
- 注意:
  - 复杂分页场景，此分页工具可能不支持。同时自行写 sql 可能会有更好的性能体验。
  - 简单单表的自动分页，sql 优化器可以自动帮忙优化，在外面包一层count 对性能影响非常小
  - 在多表关联场景，关联条件，查询条件可能存在业务逻辑，优化器可能判断无法优化，从而影响查询性能。此时需要自行考虑优化 sql
  - MyBatis-Plus 的自动分页，会对sql 语法树进行分析，移除一些从技术角度能移除的条件，再进行 count。此处夸一下 MyBatis-Plus。但仍然无法解决所有场景
  - 若性能要求极致，可能还要考虑分页进行过程中扫描数据量的变化，以及不稳定排序等因素，故在某些场景，需要自定义分页
- MyBatis-Plus 是个好工具，但此处还是没有引入

弃用原因：
1. 加入 MyBatis-Plus 增加了好多包，包体积增大
2. MyBatis-Plus 的使用，仍然需要多行代码，达不到自己想要的极简（一行代码）
3. MyBatis-Plus 自行拦截了 MappedStatement, 在此基础上，又自行做了责任链来完成自身逻辑。对已有的拦截器逻辑可能造成影响【可解决】
4. MyBatis-Plus 的 Wrapper 封装，会脱离对象属性，导致自定义的 Interceptor 难以捕捉参数进行处理【可解决，难度指数极大】
5. MyBatis-Plus 使用了大量的自定义父类，使得自行扩展逻辑开发非常困难
6. 自己已经开发出一套自动化 CRUD 的套件了。虽然支持场景没那么丰富，但使用极端简

什么时候再选用：
1. MyBatis-Plus 可以不用自己写一套CRUD套件。集成相当简单
2. MyBatis-Plus 维护者非常多，也有丰富的特性，如多数据源【自己的框架也搞了多数据源啊】
3. 广大开发者掌握 MyBatis-Plus 的人非常多，存在即是合理


### TableInfoMapper

> 此 Mapper 的设计，是辅助获取 MySQL 最基本的信息，以辅助完成一些自动化过程

| 方法             | 用途      |
|----------------|---------|
| getTables      | 获取数据库表  |
| getColumnInfos | 获取数据库字段 |


### SqlHelper

> SQL 语句的分析工具

| 方法        | 用途                             |
|-----------|--------------------------------|
| getParams | 获取满足 MyBatis 语法的 SQL 的参数       |
| getResults | 获取满足 MyBatis 语法的 SQL 中的返回列举结果集 |
| sqlExecutor | Sql 执行工具                       |
| linkedHashMap2List | Map 转 List                           |



### MyBatisHelper

> MyBatis 的辅助工具

| 方法                | 用途                                     |
|-------------------|----------------------------------------|
| selectList        | 执行 List 查询                             |
| selectListToCamel | 执行 List 查询, 返回值带驼峰转换                   |
| selectPage        | 执行 Page 查询                             |
| selectPageToCamel | 执行 Page 查询, 返回值带驼峰转换                   |
| reloadSql         | 将 SQL 加载到 SqlSession 中去，并返回  statement |
| getXmlStr         | 辅助拼装满足 MyBatis 语法的 XML 语句              |


