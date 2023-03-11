# 基础组件

## 输入提示组件

### 使用

全局引入
```javascript
// main.js
import InfoTips from 'shrimp-ui/es/components/InfoTips'
app.component('InfoTips', InfoTips)
```

按需引入
```javascript
// 在具体 vue 内
import InfoTips from 'shrimp-ui/es/components/InfoTips'
```

业务代码
```html
<el-form-item prop="field">
    <template #label>
      <info-tips label="字段编辑提示" content="支持 htlp 标签的提示语"/>
    </template>
    <el-input v-model="form.field" placeholder="请输入 字段值" />
</el-form-item>
```