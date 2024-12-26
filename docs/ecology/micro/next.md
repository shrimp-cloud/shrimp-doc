# API 模块

> 目标：通过界面配置方式完成 API 开发



## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-next</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `next_api` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `api_code` varchar(31) NOT NULL DEFAULT '' COMMENT 'API 编码',
  `api_name` varchar(31) DEFAULT NULL COMMENT 'API 名称',
  `api_method` varchar(15) NOT NULL DEFAULT 'GET' COMMENT 'API 方法',
  `api_uri` varchar(127) NOT NULL DEFAULT '' COMMENT 'API 路径',
  `result_type` varchar(31) NOT NULL DEFAULT 'OBJECT' COMMENT '返回值类型,OBJECT/LIST/PAGE',
  `enable_flag` int DEFAULT '1' COMMENT '启用状态',
  `api_script` longtext COMMENT 'API 脚本',
  `api_script_count` longtext COMMENT 'API 脚本-COUNT',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `api_method` (`api_method`) USING BTREE,
  KEY `api_uri` (`api_uri`) USING BTREE
) ENGINE=InnoDB COMMENT='API 定义';

CREATE TABLE `next_api_param` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `api_code` varchar(31) NOT NULL DEFAULT '' COMMENT 'API 编码',
  `field_name` varchar(31) NOT NULL DEFAULT '' COMMENT '字段名称',
  `field_type` varchar(31) NOT NULL DEFAULT '' COMMENT '字段类型',
  `placeholder` varchar(255) DEFAULT NULL COMMENT 'Placeholder',
  `required` int NOT NULL DEFAULT '0' COMMENT '必填',
  `dict_type` varchar(31) DEFAULT NULL COMMENT '校验字典项',
  `validate_script` longtext COMMENT '校验JS脚本',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `api_code` (`api_code`) USING BTREE
) ENGINE=InnoDB COMMENT='API 参数验证';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【配置管理 / 智能接口】




## 实现思路

### 工作流程
1. 使用前缀匹配 Restful，做 Method 和 uri 匹配，若匹配成功，则进入自定义接口逻辑处理
   2. 未匹配成功，向前端返回 404 (无需额外配置逻辑)
3. API 模块，加载当前 API 参数
   4. 当前 API 缓存维护逻辑
5. 参数校验，参数不符合，将拒绝并返回
6. 参数符合之后，从系统中获取并设置参数（当前登录用户，当前租户，用户的权限信息，固定参数 等）
7. 执行数据库查询：（对象查询/列表查询/简单分页查询/复杂分页查询）
   8. 不同的查询逻辑，需要的配置内容不同
9. 返回参数处理
10. 返回前端
