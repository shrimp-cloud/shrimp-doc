# 函数库

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-fun</artifactId>
    <version>${latest.version}</version>
</dependency>
```


### 表结构

```sql
CREATE TABLE `fun_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pcode` varchar(31) NOT NULL DEFAULT '' COMMENT '父类Code,0为顶级',
  `category_code` varchar(31) NOT NULL DEFAULT '' COMMENT '分类编码',
  `category_name` varchar(63) NOT NULL DEFAULT '' COMMENT '分类名称',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `visible` int DEFAULT '1' COMMENT '可见1/0',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `pcode` (`pcode`) USING BTREE,
  KEY `category_code` (`category_code`) USING BTREE
) ENGINE=InnoDB COMMENT='函数-分类';

CREATE TABLE `fun_function` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_code` varchar(31) NOT NULL DEFAULT '' COMMENT '分类编码',
  `fun_code` varchar(31) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '函数编码',
  `fun_name` varchar(31) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '函数名称',
  `fun_params` varchar(255) NOT NULL DEFAULT '' COMMENT '参数列表',
  `fun_language` varchar(31) NOT NULL DEFAULT '' COMMENT '函数语言',
  `fun_body` longtext NOT NULL COMMENT '函数体',
  `fun_return` varchar(31) NOT NULL COMMENT '返回类型',
  `fun_desc` text COMMENT '函数说明',
  `fun_mock_data` varchar(255) DEFAULT '' COMMENT '模拟数据',
  `visible` int NOT NULL DEFAULT '1' COMMENT '可见1/0',
  `default_flag` int NOT NULL DEFAULT '1' COMMENT '内置',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fun_code` (`fun_code`) USING BTREE,
  KEY `fun_name` (`fun_name`)
) ENGINE=InnoDB COMMENT='函数-函数体';

```


### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【函数库】


## 使用


### 计划支持的函数

| 语言         | 引擎                                    |
|------------|---------------------------------------|
| JavaScript | org.graalvm.js:js                     |
| Python     | org.graalvm.polyglot:python-community |
| Ruby       | org.graalvm.polyglot:ruby-community   |
| Groovy     | org.codehaus.groovy:groovy            |
| QLExpress  | com.alibaba:QLExpress                 |


### 使用示例

```java
package com.example.fun.demo;

@Service
public class FunDemo {
  @Resource
  private ScriptService scriptService;

  public void funFunctionTest() {
    // 函数名
    String funCode = "demoFunCode";
    // 参数参数
    String param = "demoFunCode";

    // 获取函数引擎
    ScriptEngine engine = scriptService.getEngine(funCode);
    // 执行函数
    Object rt = engine.exec(param);
    // 打印执行结果
    System.out.println(rt);
  }

}

```

待优化

1. 函数入参多样化，又要通用性，目前妥协为，函数入参为 Object, 单参数。具体内容由功能和函数体决定
2. 函数要能被具体业务流程更好的使用，还需要后续的磨合

