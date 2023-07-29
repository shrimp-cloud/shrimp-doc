# 分页

> 分页查询，要写那么多代码，看着就烦。。此处，提供了一些快捷的分页查询方案

## 单表极简分页
```java
PageData<Entity> pageData = entityService.page(entity)
```
默认特性：
1. 全部字段支持全等匹配查询
2. ids 支持 in 查询
3. 创建时间，扩展了范围查询
4. 默认 id 倒序
5. 每页10条
6. 返回参数不包含 Blob 字段【大小不可预测】
7. 查询条件为 "" 时自动替换成 null 【框架特性：get 请求的 "" 都会转换成 null】

## 自定义sql简单分页
- 定义 sql 语句: 只需要定义  list 查询
```xml
  <select id="getDataList" parameterType="path.to.entity" resultType="path.to.entity">
      SELECT
          t1.id,
          t1.version,
          t2.id t2_id
      FROM
          table_name1 t1
          INNER JOIN table_name2 t2 ON t2.ts_id = t1.id
      WHERE
          t1.status = 1
          AND t2.status = 1
      ORDER BY
          t1.sort ASC,
          t1.id DESC
  </select>
  
```
- 定义 mapper: 只需要定义  list 接口
```java
List<Entity> getDataList(Entity param);
```

- 分页查询：
  - 必需先 new 再调用 list 查询【getDataList必需放在 page 内，不可提前执行】
```java
PageData<Entity> pageData = new PageHandle<>(entity).page(mapper.getDataList(entity));
```

## 自定义高级分页查询
> 考虑以上分页查询，是将原生 sql 再包装一层。sql 优化器不一定能将sql 优化到最佳（包含复杂业务条件判断的场景），故上述分页可能有性能问题。此时需要自行编写 count 和 list 查询，再自行装配 PageData

话外音：
- 简单单表的自动分页，sql 优化器可以自动帮忙优化，在外面包一层count 对性能影响非常小
- 在多表关联场景，关联条件，查询条件可能存在业务逻辑，优化器可能判断无法优化，从而影响查询性能。此时需要自行考虑优化 sql
- MyBatis-Plus 的自动分页，会对sql 语法树进行分析，移除一些从技术角度能移除的条件，再进行 count。此处夸一下 MyBatis-Plus。但仍然无法解决所有场景
- 若性能要求极致，可能还要考虑分页进行过程中扫描数据量的变化，以及不稳定排序等因素，故在某些场景，需要自定义分页


## 不用MyBatis-Plus 分页
> 以前觉得 MyBatis-Plus 太复杂，所以不想去使用，自己封装了一套CRUD的逻辑，并搭配上了代码生成器。后面听别人说好用，又因为任务原因，深入研究了 MyBatis-Plus, 最终还是决定在自己的框架上弃用 MyBatis-Plus

弃用原因：
1. 加入 MyBatis-Plus 增加了好多包，包体积增大
2. MyBatis-Plus 的使用，仍然需要多行代码，达不到自己想要的极简（一行代码）
3. MyBatis-Plus 自行拦截了 MappedStatement, 在此基础上，又自行做了责任链来完成自身逻辑。对已有的拦截器逻辑可能造成影响【可解决】
4. MyBatis-Plus 的Wrapper 封装，会脱离对象属性，导致自定义的 Interceptor 难以捕捉参数进行处理【可解决，难度指数极大】
5. MyBatis-Plus 使用了大量的自定义父类，使得自行扩展逻辑开发非常困难
6. 自己已经开发出一套自动化 CRUD 的套件了。虽然支持场景没那么丰富，但使用极端简

什么时候再选用：
1. MyBatis-Plus 可以不用自己写一套CRUD套件。集成相当简单
2. MyBatis-Plus 维护者非常多，也有丰富的特性，如多数据源【自己的框架也搞了多数据源啊】
3. 广大开发者掌握 MyBatis-Plus 的人非常多，存在即是合理

