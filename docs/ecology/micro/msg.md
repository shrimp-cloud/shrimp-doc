# 站内消息

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-msg</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `msg_notification` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `notice_no` varchar(31) DEFAULT NULL COMMENT '消息编码',
  `username` varchar(31) DEFAULT NULL COMMENT '通知发送人',
  `title` varchar(255) DEFAULT NULL COMMENT '通知标题',
  `content` varchar(255) DEFAULT NULL COMMENT '通知正文',
  `ext_url` varchar(255) DEFAULT NULL COMMENT '扩展URL',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `username` (`username`) USING BTREE,
  KEY `notice_no` (`notice_no`) USING BTREE
) ENGINE=InnoDB COMMENT='消息通知';

CREATE TABLE `msg_user_record` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(31) DEFAULT NULL COMMENT '用户名',
  `notice_no` varchar(31) DEFAULT NULL COMMENT '消息编码',
  `read_status` int NOT NULL DEFAULT '0' COMMENT '阅读状态',
  `read_time` datetime DEFAULT NULL COMMENT '阅读时间',
  `show_times` int NOT NULL DEFAULT '0' COMMENT '消息展示次数',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `username` (`username`) USING BTREE,
  KEY `notice_no` (`notice_no`) USING BTREE
) ENGINE=InnoDB COMMENT='用户消息记录';

CREATE TABLE `msg_user_settings` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(31) DEFAULT NULL COMMENT '用户名',
  `notify_event` varchar(4095) DEFAULT NULL COMMENT '事件消息配置(JSON)',
  `notify_system` varchar(4095) DEFAULT NULL COMMENT '系统消息配置(JSON)',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB COMMENT='用户消息设置';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【页面功能未开发】
- 文档：暂未部署


## 功能使用

- 发送消息
```java
public class MsgDemo {
  @Autowired
  private MsgApi msgApi;

  public Integer sentMsg() {
    return msgApi.sentMsg("title", "content", "toUsername");
  }
}
```

