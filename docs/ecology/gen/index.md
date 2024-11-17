# 代码生成-规划中


## 功能逻辑需求
1. 权限：用户维度隔离，用户可自行创建数据，完成整个代码生成逻辑
2. 模板：系统模板，按现有依赖包，或行业习惯，制定模板，设置为系统模板。系统模板可给所有用户使用
3. 数据库：用户完全隔离。用户可维护自己的数据库连接。只能使用自己的数据库链接
4. 在线生成：可在线直接按模板生成代码，可复制
5. 在线下载：可直接在线下载生成的代码压缩包
6. 插件生成：对于后端代码，可由 maven 插件直接生成到项目中

## 技术栈

### 前端
> 待确认

### 后端
1. springboot
2. mysql
3. freemarker

## 功能清单
- 数据源管理
  - 数据源增删改查
  - 数据源测试
  - 数据表清单
    - 字段清单
    - 选择模板，生成代码
- 项目工程
  - 工程增删改查(绑定数据源)
    - 代码生成(打包下载)
  - 工程任务管理
    - 工程任务增删改查(绑定模板)
    - 日志(包含异常信息)
- 系统管理
  - 模板管理
    - 增删改查
    - 模板编辑需要有语法高亮
  - 全局变量管理
    - 增删改查
- 权限管理
  - 查看个人信息
  - 修改密码
  - 暂不支持其他高级权限管理