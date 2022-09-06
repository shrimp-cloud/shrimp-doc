# 基于SQL生成其他代码

> 功能释义：在业务开发过程，需要大量的 sql查询，实体类的创建，service 的编写， Contriller 的编写，最后还有页面查询栏，table展示栏，form 表单开发。
> 这些开发过程有太多的相似性，时间花在相似的流程上感觉太浪费了，故有了这个功能：提供一段 sql 语句，选择对应的输出模板，就能得到近似可用的代码。

## SQL
- 目前仅确认支持 mysql
- 支持嵌套, join, union 等复杂逻辑，但语法不能错
- 在复杂sql场景下，得到的columns 和 conditions 可能不全是自己想要的，可自行移除

## json 结构
```json
{
    "columns":[
        {
            "tableName":"cas_user",
            "tableNameLowerCaseCamel":"casUser",
            "tableNameUpperCaseCamel":"CasUser",
            "columnName":"id",
            "columnNameLowerCaseCamel":"id",
            "columnNameUpperCaseCamel":"Id",
            "dataType":"bigint",
            "javaType":"Long",
            "tsType":"number",
            "columnComment":"ID"
        }
    ],
    "conditions":[
        {
            "tableName":"cas_user",
            "tableNameLowerCaseCamel":"casUser",
            "tableNameUpperCaseCamel":"CasUser",
            "columnName":"id",
            "columnNameLowerCaseCamel":"id",
            "columnNameUpperCaseCamel":"Id",
            "dataType":"bigint",
            "javaType":"Long",
            "tsType":"number",
            "columnComment":"ID",
            "operator":"=",
            "values":[1]
        }
    ]
}
```

## 字段含义
- columns 返回字段，数组【若是嵌套查询，会包含内嵌字段】
  - tableName 原始表名，规范为下划线分隔
  - tableNameLowerCaseCamel 小写驼峰表名
  - tableNameUpperCaseCamel 大写驼峰表名
  - columnName 原始表字段，规范为下划线分隔
  - columnNameLowerCaseCamel 小写驼峰字段旬
  - columnNameUpperCaseCamel 大写驼峰字段旬
  - dataType 原始类型（数据库字段类型）
  - javaType 字段对应的JAVA类型
  - tsType 字段对应的TypeScript类型
  - columnComment 字段备注
- conditions 查询条件【会自动包含 join 条件】
  - tableName 原始表名，规范为下划线分隔
  - tableNameLowerCaseCamel 小写驼峰表名
  - tableNameUpperCaseCamel 大写驼峰表名
  - columnName 原始表字段，规范为下划线分隔
  - columnNameLowerCaseCamel 小写驼峰字段旬
  - columnNameUpperCaseCamel 大写驼峰字段旬
  - dataType 原始类型（数据库字段类型）
  - javaType 字段对应的JAVA类型
  - tsType 字段对应的TypeScript类型
  - columnComment 字段备注
  - operator 条件关联符（操作符：>,<,= 等）
  - values sql 的值，若 sql 中写了值，会体现在这里