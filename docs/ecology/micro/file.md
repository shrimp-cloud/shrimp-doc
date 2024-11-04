# 附件管理

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-file-system</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_fs_bucket` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `tenant_code` varchar(31) NOT NULL DEFAULT 'default' COMMENT '租户编码',
  `bucket` varchar(31) DEFAULT NULL COMMENT 'Bucket',
  `oss_sp` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'OSS服务商',
  `endpoint_inner` varchar(127) DEFAULT NULL COMMENT '内网Endpoint',
  `endpoint_outer` varchar(127) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '外网Endpoint',
  `region` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '区域',
  `access_key` varchar(127) DEFAULT NULL COMMENT 'Access Key',
  `secret_key` varchar(127) DEFAULT NULL COMMENT 'Secret Key',
  `default_flag` int DEFAULT '0' COMMENT '默认标识',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `tenant_code` (`tenant_code`) USING BTREE,
  KEY `bucket` (`bucket`) USING BTREE,
  KEY `access_key` (`access_key`) USING BTREE
) ENGINE=InnoDB COMMENT='Bucket管理';

CREATE TABLE `mdm_fs_files` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `tenant_code` varchar(31) NOT NULL DEFAULT 'default' COMMENT '租户编码',
  `busness_type` varchar(63) DEFAULT NULL COMMENT '业务类型',
  `file_size` bigint DEFAULT NULL COMMENT '文件大小',
  `file_name` varchar(255) DEFAULT '' COMMENT '文件名',
  `file_type` varchar(31) DEFAULT '' COMMENT '文件类型',
  `oss_sp` varchar(31) DEFAULT NULL COMMENT 'OSS服务商',
  `bucket` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Bucket',
  `file_id` varchar(255) DEFAULT '' COMMENT '文件ID/路径',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `tenant_code` (`tenant_code`) USING BTREE,
  KEY `busness_type` (`busness_type`) USING BTREE,
  KEY `file_name` (`file_name`) USING BTREE,
  KEY `bucket` (`bucket`),
  KEY `file_id` (`file_id`)
) ENGINE=InnoDB COMMENT='附件';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【文件系统】



## 功能使用

- Bucket 管理
  - 存储方案：支持 ALI_OSS, AWS_S3, MINIO 对象存储方案
  - Bucket：多个 Bucket 场景，有且仅有一个 Bucket 为默认。上传时不指定，即上传到默认Bucket
  - 内网Endpoint：用于上传。若云服务与对象存储均处于同一局域网，此时将获得最快速的网络优势。
  - 外网Endpoint：用于访问附件。网络效率可能比较低，但网络可达范围将大增。
  - 分类：上传时，可指定 Bucket 方式做存储隔离分类，也可以指定 businessType 方式做业务属性分类
  - 公开附件：上传时若指定了附件为公开属性，上传时会给文件路径添加  public/ 开头，此时文件无需签名即可被公网访问
- API
  - 文件操作：注入 `FsApi`
  - 上传：可指定是否公开，可指定业务类型，可指定 bucket 若均不指定，将是 默认 bucket, 不公开， default 分组
  - 上传返回：上传后，请将 fileId 存储到业务表，请将 previewUrl 用于预览。previewUrl 有效期为10分钟，过期请重新签名。
  - 访问：将 fileId 经过 签名处理，将获得临时可访问的 url。可单个操作，和批量操作，可指定过期时间。默认访问过期时间为 10 分钟。多个 fileId 请走批量方式。
  - 删除：调用 delete 方法，即可将对象存储内的文件删除，同时也会将本地记录删除，删除的文件将永远无法恢复。使用删除时请自行检查 fileId 的关联性

