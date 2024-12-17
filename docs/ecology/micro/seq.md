# 序列生成

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-seq</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_sequence` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `prefix` varchar(31) DEFAULT 'SEQ' COMMENT '字典分类',
  `sequence` int NOT NULL DEFAULT '0' COMMENT '当前序列',
  `code_length` int NOT NULL DEFAULT '4' COMMENT '序列长度(不计长度)',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `prefix` (`prefix`) USING BTREE
) ENGINE=InnoDB COMMENT='序列生成记录';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【配置管理 / 序列生成】



## 功能使用


```java

@Autowired
private SeqApi seqAPi;

// 生成单个
seqAPi.genSequence("PREFIX");
// 生成单个,指定长度
seqAPi.genSequence("PREFIX", 4);
// 生成多个
seqAPi.genSequences("PREFIX", 2);
// 生成多个，指定长度
seqAPi.genSequences("PREFIX", 2, 4);
```

## 使用注意

- PREFIX 不存在时，首次调用将会自动生成从1开始的序列
- 指定长度，只在首次生成一个前缀的序列产生。若后期需要改变，需要从管理页面改变
- 为保证序列生成的统一性，此生成工具牺牲了性能来保唯一
- 此工具适合序列可读性敏感的需求的生成，且全局的序列要求不多的场景 (建议只用在4位数以内)
- 若需要大量的序列生成，建议使用 RedisIdGenHelper
