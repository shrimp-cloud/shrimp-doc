# 删除检查项

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-rmckeck</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `rm_check_rule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `rule_code` NOT NULL DEFAULT '' COMMENT '规则编码',
  `table_name` NOT NULL DEFAULT '' COMMENT '表名',
  `column_name` NOT NULL DEFAULT '' COMMENT '字段名',
  `enable_flag` int NOT NULL DEFAULT '1' COMMENT '状态',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `table_name` (`table_name`) USING BTREE,
  KEY `rule_code` (`rule_code`),
  KEY `column_name` (`column_name`)
) ENGINE=InnoDB COMMENT='删除检查规则';

CREATE TABLE `rm_check_rule_item` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `rule_code` varchar(31) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '规则编码',
  `check_table_name` NOT NULL DEFAULT '' COMMENT '被检查表名',
  `check_column_name` NOT NULL DEFAULT '' COMMENT '被检查字段名',
  `notice_message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '提示信息',
  `enable_flag` int NOT NULL DEFAULT '1' COMMENT '状态',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `rule_code` (`rule_code`) USING BTREE,
  KEY `check_table_name` (`check_table_name`),
  KEY `check_column_name` (`check_column_name`)
) ENGINE=InnoDB COMMENT='删除检查规则-检查项';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【配置管理 / 删除检查项】



## 功能使用


```java
public class SeqDemo {

  @Autowired
  private RmCheckApi rmCheckApi;

  public void test() {
    // 前置检查逻辑
    rmCheckApi.check(RmCheckRule.class, rule);
    // 后置删除逻辑
  }

}

```

## 工作原理

1. 从类中获取到表名（必需使用标准命名）
2. 获取当前表的所有检查规则
3. 通过检查规则内的字段配置，反射获取需要检查的 value
4. 从检查项中，获得其他表和字段信息
5. 从其他表和字段中，深度获取此 value 值
6. 若成功获取，则拦截删除，提示用户先进行关联数据处理
