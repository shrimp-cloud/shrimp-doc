# 字典模块

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-dict</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_dict` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dict_type` varchar(31) NOT NULL DEFAULT '0' COMMENT '字典类型',
  `description` varchar(255) DEFAULT NULL COMMENT '类型描述信息',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `dict_type` (`dict_type`) USING BTREE
) ENGINE=InnoDB COMMENT='字典';

CREATE TABLE `mdm_dict_item` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dict_type` varchar(31) DEFAULT NULL COMMENT '字典类型',
  `dict_value` varchar(31) DEFAULT NULL COMMENT '字典值',
  `dict_label` varchar(127) DEFAULT '' COMMENT '字典标签',
  `el_type` varchar(31) DEFAULT NULL COMMENT 'el类型',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `enable_flag` int NOT NULL DEFAULT '1' COMMENT '生效状态',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `dict_type` (`dict_type`) USING BTREE,
  KEY `dict_key` (`dict_value`) USING BTREE
) ENGINE=InnoDB COMMENT='字典内容';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【配置管理/字典管理】

### 权限
- RestMappingTest#main 扫描获得所有 dict 接口，并导入 auth
- 参照 shrimp-mdm 页面结构创建菜单并绑定接口
- 创建角色，并绑定字典功能
- 用户申请相关角色，获得字典管理权限
- 字典维护


## 功能使用

### 后端，枚举转中文含义

```java
@Autowired
private DictCache dictCache;

String dictValue = dictCache.get("DICT_TYPE", "DICT_KEY");
```

### 前端，获取字典

- 前端集成，参照 /shrimp-demo-ui/src/utils/dict.js 完成字典集成
- 页面内获取字典 `const { BOOLEAN } = proxy.useDict("BOOLEAN");`
- 字典渲染下拉：
```html
  <el-select v-model="form.isReal" placeholder="是否真实" clearable style='width: 600px'>
    <el-option v-for="dict in BOOLEAN" :key="dict.value" :label="dict.label" :value="dict.value"/>
  </el-select>
```
