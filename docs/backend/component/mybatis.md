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

## 附加特性

### 查询空参处理

> 查询参数的 "" 自动处理成 null, 可简化 mybatis xml 的 if 判断

- aop 拦截并判断是否为 select
- 拦截查询参数，将 "" 处理成 null
- order by 注入风险拦截
- 乐观锁控制
- 更新人，更新时间，修改人，修改时间处理【需要 cas 将用户信息放到 ThreadLocal 中】

### BaseMapper

> 定义了日常的数据库操作方法

- 结合代码生成器使用
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

