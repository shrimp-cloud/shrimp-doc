# PDF 模板

## 模块集成

### 依赖
```xml
<dependency>
    <groupId>com.wkclz.micro</groupId>
    <artifactId>micro-pdf</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 表结构

```sql
CREATE TABLE `mdm_pdf_template` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `template_code` varchar(31)  NOT NULL DEFAULT '' COMMENT '模板编码',
  `template_name` varchar(31)  NOT NULL DEFAULT '' COMMENT '模板名称',
  `template_context` longtext  COMMENT '模板内容',
  `mock_data` longtext  COMMENT '模拟数据',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(31)  DEFAULT NULL COMMENT '创建人',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_by` varchar(31)  DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255)  DEFAULT NULL COMMENT '备注',
  `version` int NOT NULL DEFAULT '0' COMMENT '版本号',
  `status` bigint unsigned NOT NULL DEFAULT '1' COMMENT 'status',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `template_code` (`template_code`) USING BTREE
) ENGINE=InnoDB COMMENT='PDF模板';
```

### 界面

- [shrimp-mdm-ui](https://github.com/shrimp-cloud/shrimp-mdm-ui) 项目中的 【配置管理 / PDF模板】



## 功能使用


- 模板管理
  - 使用 html 方式编辑 pdf 模板。支持 themleaf 语法渲染业务数据
  - 编辑模板时，可模拟业务数据渲染模板的效果


- 使用示例
```java
public class PdfDemo {
  @Autowired
  private PdfApi pdfAPi;

  public void test() {
    // 生成PDF文件，返回本地文件路径
    String pdfPath = pdfAPi.writePdf("templateCode", data);
    // 生成PDF文件，并通过响应流，响应到前端
    pdfAPi.responsePdf("templateCode", data, response);
  }
}
```

## 使用注意

- <body>标签需要完整保留，用于嵌入字体 (系统默认只支持宋体，若要支持其他字段，需要扩充字体库和功能)
- 无法完全支持所有  css 语法，需反复调试模板以达到目标效果
