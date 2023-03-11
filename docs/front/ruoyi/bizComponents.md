# 业务组件

## 图片选择组件

> 图片统一集中管理，不允许分散上传。在各个业务内，可选择图片

### 使用


按需引入
```javascript
// 在具体 vue 内
import ShImage from '@/views/components/ShImage';
```

业务代码
```html
<el-form-item label="LOGO" prop="logo">
    <sh-image v-model="form.logo" placeholder="请选择 logo" width="32px" height="32px"/>
</el-form-item>
```