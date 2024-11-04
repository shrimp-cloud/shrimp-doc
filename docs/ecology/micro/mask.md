# 数据脱敏

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-mask</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_mask_rule` (
     `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
     `mask_rule_code` varchar(31) NOT NULL DEFAULT '' COMMENT '脱敏规则编码',
     `mask_rule_name` varchar(255) DEFAULT NULL COMMENT '脱敏规则名称',
     `request_method` varchar(15)  DEFAULT NULL COMMENT '请求方法',
     `request_uri` varchar(255)  DEFAULT NULL COMMENT '请求路径,支持AntPathMacher',
     `mask_json_path` varchar(127)  DEFAULT NULL COMMENT '脱敏数据路径',
     `mask_rule_regular` varchar(256) DEFAULT NULL COMMENT '脱敏正则',
     `mask_rule_script` varchar(4095) DEFAULT NULL COMMENT '脱敏函数',
     `enable_flag` int DEFAULT NULL COMMENT '可用状态',
     `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
     `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
     `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
     `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
     `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
     `remark` varchar(255) DEFAULT NULL COMMENT '备注',
     `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
     `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
     PRIMARY KEY (`id`) USING BTREE,
     UNIQUE KEY `mask_rule_code` (`mask_rule_code`) USING BTREE
) ENGINE=InnoDB COMMENT='脱敏规则';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【配置管理 / 脱敏规则】



## 功能使用

- 配置管理 / 脱敏规则 完成脱敏规则维护
  - 脱敏规则编码：建议填写有业务含义的编码，不能重复，留宿自动生成
  - 脱敏规则名称：仅是方便自己看
  - 请求方法：拦截数据进行脱敏的接口请求方法， GET / POST
  - 请求路径：拦截数据进行脱敏的接口请求路径，支持 AntPathMachter
  - 脱敏JSON路径：从返回数据体中抽取数据进行脱敏的表达式。支持多级对象内容，支持数组，但数组只支持一个变量。示例：`$.data.rows[*].remark`
  - 脱敏正则：将以上拦截到的数据，进行识别和 * 替换。示例：`(?<=^.{3}).{4}` 可用于手机号脱敏，含义为：排除前三位，从第四位开始，取4位替换成 * 号
  - 脱敏函数：若脱敏规则太复杂，无法使用正则来识别，可以支持 js 函数方式脱敏。包含一个入参(原值)，需要一个返回值 (脱敏后的值)
  - 兜底规则：数据长度小于4，统一使用3个 * 替代，数据长度小于8，统一使用第一个字符，加4个 * 替代，长度大于8，将使用前三个字符，加四个 * 替代
  - 规则优先级：脱敏正则 > 脱敏函数 > 兜底规则
- 缓存
  - 单节点：从管理页面更新，则立即更新规则缓存。数据库直接修改，则不自动更新缓存。
  - 集群：从管理页面更新 操作命中的节点立即更新规则缓存，其他节点将在 15s 内更新缓存。数据库直接修改，则不自动更新缓存。

## 后续可能扩展的逻辑

- 豁免权：将使用数据权限方式，给角色绑定脱敏接口，若包含绑定关系，则不走脱敏规则
- 临时解密：将密文返回给用户，若需临时解密，可让用户解密，但需要记录解密日志
