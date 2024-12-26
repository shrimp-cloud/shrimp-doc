# 审计日志

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-audit</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_change_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `batch_no` varchar(31) NOT NULL DEFAULT '' COMMENT '批次',
  `table_name` varchar(31) NOT NULL DEFAULT '' COMMENT '表名',
  `data_id` bigint NOT NULL DEFAULT '0' COMMENT '数据ID',
  `operate_type` varchar(15) NOT NULL DEFAULT 'UPDATE' COMMENT '操作类型',
  `data_from` varchar(31) NOT NULL DEFAULT '' COMMENT '原数据',
  `data_to` varchar(31) NOT NULL DEFAULT '' COMMENT '目标数据',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `batch_no` (`batch_no`) USING BTREE,
  KEY `table_name` (`table_name`) USING BTREE,
  KEY `data_id` (`data_id`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE,
  KEY `create_by` (`create_by`)
) ENGINE=InnoDB COMMENT='变更记录';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【系统日志/待完成】


## 功能使用

```java
public class AuditDemo {
  @Autowired
  private AuditApi auditApi;

  public void test() {
    // 数据创建(需要在 insert之后以保证有 id, 注意批量 insert 的 id 获取)
    auditApi.create(entity);
    // 数据变更
    auditApi.modify(hisEntity, newEntity);
    // 数据删除
    auditApi.delete(entity);
    // 查询变更历史
    entity.setClazz(Entity.class);
    auditApi.getLogPage(entity);
  }
}
```
