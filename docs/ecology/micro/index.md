# 微模块

> 微模块，指在建设包含特定弱业务的功能模块，在任意应用中，若需要使用相关功能模块，可快速的通过依赖 starter ，再完成数据库表创建/配置，应用配置，即可完成功能模块的快速集成。


## 微模块定位

- 微模块, 微小的，不可再拆分的功能单位。
- 微模块一般不涉及业务功能，但辅助于业务功能
- 微模块的底层，是框架，上层是业务模块
- 微模块不具备独立部署能力

## 已建设的微模块

| 组件名称                                   | 组件用途       |
|----------------------------------------|------------|
| [shrimp-micro-audit](./audit.md)       | 审计日志       |
| [shrimp-micro-dict](./dict.md)         | 字典         |
| [shrimp-micro-file-system](./file.md)  | 文件系统       |
| [shrimp-micro-form](./form.md)         | 动态表单       |
| [shrimp-micro-liteflow](./liteflow.md) | LiteFlow流程 |
| [shrimp-micro-mask](./mask.md)         | 脱敏         |
| [shrimp-micro-msg](./msg.md)           | 站内消息       |
| [shrimp-micro-next](./next.md)         | 智能接口       |
| [shrimp-micro-pdf](./pdf.md)           | PDF模板      |
| [shrimp-micro-report](./report.md)     | 报表         |
| [shrimp-micro-seq](./seq.md)           | 序列生成       |

