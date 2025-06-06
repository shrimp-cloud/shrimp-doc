# 表单模块

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-from</artifactId>
    <version>${latest.version}</version>
</dependency>
```


### 表结构

```sql
CREATE TABLE `mdm_form` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `form_code` varchar(31) NOT NULL DEFAULT '0' COMMENT '表单编码',
  `form_name` varchar(31) DEFAULT NULL COMMENT '表单名称',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
PRIMARY KEY (`id`) USING BTREE,
    KEY `form_code` (`form_code`) USING BTREE
) ENGINE=InnoDB COMMENT='表单';

CREATE TABLE `mdm_form_item` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `form_code` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '表单编码',
  `item_group` varchar(31) NOT NULL DEFAULT '' COMMENT '分组',
  `item_code` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '表单输入项编码',
  `item_name` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '绑定字段名称',
  `input_type` varchar(31) NOT NULL DEFAULT '' COMMENT '输入项类型',
  `field_type` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '字段类型',
  `dict_type` varchar(31) NOT NULL DEFAULT '' COMMENT '字典类型',
  `label` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '输入项标签',
  `min` int DEFAULT NULL COMMENT '最小值',
  `max` int DEFAULT NULL COMMENT '最大值',
  `min_length` int DEFAULT NULL COMMENT '最小长度',
  `max_length` int DEFAULT NULL COMMENT '最大长度',
  `placeholder` varchar(127) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '输入提示',
  `required` int NOT NULL DEFAULT '0' COMMENT '必填',
  `default_value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '默认值',
  `rules` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '校验规则(rules)',
  `clearable` int NOT NULL DEFAULT '1' COMMENT '是否可清除',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
PRIMARY KEY (`id`) USING BTREE,
  KEY `form_code` (`form_code`) USING BTREE,
  KEY `item_code` (`item_code`) USING BTREE
) ENGINE=InnoDB COMMENT='表单-输入项';

CREATE TABLE `mdm_form_rule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `form_rule_code` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表单校验规则编码',
  `form_rule_name` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表单校验规则编码',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
PRIMARY KEY (`id`) USING BTREE,
    KEY `form_rule_code` (`form_rule_code`) USING BTREE
) ENGINE=InnoDB  COMMENT='表单校验规则';


CREATE TABLE `mdm_form_rule_item` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `form_rule_code` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表单校验规则编码',
  `field_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '字段名称',
  `required` int NOT NULL DEFAULT '1' COMMENT '必填',
  `type` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '字段类型',
  `min` int DEFAULT NULL COMMENT '最小值',
  `max` int DEFAULT NULL COMMENT '最大值',
  `pattern` varchar(127) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表单校验正则',
  `trigger` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '触发方式',
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '验证失败提示',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
PRIMARY KEY (`id`) USING BTREE,
    KEY `form_rule_code` (`form_rule_code`) USING BTREE
) ENGINE=InnoDB  COMMENT='表单校验规则-校验项';

```


### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【表单管理】
- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【表单验证】



