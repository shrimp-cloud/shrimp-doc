# 优化，Bug修复记录

> 此章节记录 ruoyi bug 的修复情况

### CSS 修复
1. 创建自定义 scss 文件，方便纠正系统的 css 错误：src/assets/styles/custom.scss
2. 在 src/assets/styles/index.scss 内，将 custom.scss 加入其中

### cell 中图片图层异常
- 问题：table 内 cell 打开图片被 row 覆盖问题
- 解决方法：覆盖 css
```scss
.el-table .el-table__cell {
  z-index: auto !important;
}
```


### 分页优化
问题1： 分页组件上方空白区域太大
位置：src/components/Pagination/index.vue
修改：
1. `class=pagination-container` 添加属性 `margin-top: 6px;`

问题2：el-table 的高度不自动适配
位置：任意页面
修改：
1. el-table 高度引用变量：` :height="tableHeight"`，
2. 使用计算属性计算当下高度：`const tableHeight = computed(() => window.innerHeight - 216);`

### 时间范围查询
问题：后端为自定义 时间范围字段，addDateRange 方法无法自适应
位置：src/utils/ruoyi.js.addDateRange
修改：【适应自己的后端框架】
```
search['timeFrom'] = dateRange[0];
search['timeTo'] = dateRange[1];
```