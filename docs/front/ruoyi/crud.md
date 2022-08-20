# 单表增删改查

> 最简单的增删改醒

### API引入
1. 在 src/api/xxx/.js 按模块引入自定义 API
2. 引入api需要按规范编写命名，接口可自动化生成。

### 菜单定义
1. 已经对接后端动态菜单场景，直接在管理后台添加
2. mock 菜单场景，在 src/mock/router 下添加菜单

### 页面开发
1. 页面存放位置：src/views
2. 目录：功能模块/功能点/拆分的子页面
3. 移除部分默认功能
   1. 移除 按钮组模块【并入查询 row】
   2. 移除复选功能，大多数场景不需要
4. 改动功能模块
   1. 功能按钮放到查询 row 上的右边：style="float:right;"
   2. 数据列表名称统一为：dataList
   3. 所有数据列，均指明width
   4. 修正 pagination 的参数，和后端对应上
   5. 编辑表单名称统一为 editRef
   6. 引入功能点 api, 并替换所有接口方法
   7. 拆解 const data 为具体的子参数。保留名称
   8. getList 方法，需要把 loading.value = false; 移动到 finally 内
   9. submitForm 方法，合并新增和删除，仅有提示语不一样
   10. handleDelete 只需支持单个操作。将删除方法置入其中，拆分删除成功和失败的两个场景
   11. 对接数据字段