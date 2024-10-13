# 报表模块

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-report</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_report` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `report_code` varchar(31) NOT NULL DEFAULT '' COMMENT '报表编码',
  `report_name` varchar(255) DEFAULT NULL COMMENT '报表名称',
  `report_type` varchar(31) DEFAULT NULL COMMENT '报表类型',
  `data_script` varchar(4095) DEFAULT NULL COMMENT '数据脚本',
  `result_type` varchar(31) DEFAULT NULL COMMENT '返回类型:OBJECT/LIST/PAGE',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `report_code` (`report_code`) USING BTREE
) ENGINE=InnoDB COMMENT='DATA定义';

CREATE TABLE `mdm_report_param` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `report_code` varchar(31) DEFAULT NULL COMMENT '报表编码',
  `field_type` varchar(31) DEFAULT NULL COMMENT '参数类型',
  `field_code` varchar(31) DEFAULT NULL COMMENT '字段编码',
  `field_name` varchar(31) DEFAULT NULL COMMENT '字段名称',
  `placeholder` varchar(255) DEFAULT NULL COMMENT '输入提示',
  `width` int DEFAULT NULL COMMENT '宽度',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `report_code` (`report_code`) USING BTREE,
  KEY `field_code` (`field_code`) USING BTREE
) ENGINE=InnoDB COMMENT='DATA参数';

CREATE TABLE `mdm_report_result` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `report_code` varchar(31) DEFAULT NULL COMMENT '报表编码',
  `field_type` varchar(31) DEFAULT NULL COMMENT '字段类型',
  `field_code` varchar(31) DEFAULT NULL COMMENT '字段编码',
  `field_name` varchar(31) DEFAULT NULL COMMENT '字段名称',
  `width` int NOT NULL DEFAULT '100' COMMENT '宽度',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `report_code` (`report_code`) USING BTREE,
  KEY `field_code` (`field_code`) USING BTREE
) ENGINE=InnoDB COMMENT='DATA结果';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【报表】

### 权限
- RestMappingTest#main 扫描获得所有 report 接口，并导入 auth
- 参照 shrimp-mdm 页面结构创建菜单并绑定接口
- 创建角色，并绑定报表功能
- 用户申请相关角色，获得报表的管理权限，或执行权限
- 报表维护，报表查询


## 功能使用

- 基础数据 - 报表，进行报表维护，和查询，导出。
