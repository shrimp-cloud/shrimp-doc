# Bug修复记录

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