# 字典管理

> 字典从后端获取，需要先准备好后端字典接口

### API 引入字典接口
```javascript
export function restToDict(params) {
  return request({url: '/rest/to/dict', method: 'get', params})
}
```

### 修正字段映射
- 位置：src/utils/dict.js
- elTagType: 将会作为 el-tag 的 type 使用
- elTagClass: 将会作为 el-tag 的 class 使用【复杂，暂时不支持】
- 具体 type 和 class 取值，请找 el 官方文档
- 修正 value 匹配：value 可能为字符，或数字：`value: isNaN(p.dictValue) ? p.dictValue : Number(p.dictValue), // 若 value 为数字，需要转成数字`

### 页面引入
```javascript
// 单个枚举
const { DICT_TYPE } = proxy.useDict("DICT_TYPE");
// 多个枚举
const { DICT_TYPE1, DICT_TYPE2 } = proxy.useDict("DICT_TYPE1", "DICT_TYPE2");
```

### 列表(table)内使用
```html
 <el-table-column label="枚举" align="center" prop="type" min-width="80">
    <template #default="scope"><dict-tag :options="DICT_TYPE1" :value="scope.row.type" /></template>
 </el-table-column>
```

### 下拉筛选栏使用
```html
 <el-form-item label="枚举" prop="type">
    <el-select v-model="queryParams.type" placeholder="枚举" clearable  @keyup.enter="handleQuery">
       <el-option v-for="dict in DICT_TYPE1" :key="dict.value" :label="dict.label" :value="dict.value"/>
    </el-select>
 </el-form-item>
```

### 单选使用
```html
<el-radio-group v-model="form.type" class="ml-4" :disabled="!!form.id">
    <el-radio v-for="dict in DICT_TYPE1" :label="dict.value">{{dict.label}}</el-radio>
</el-radio-group>
```

### 标签展示修复
- 用途：在 table 内展示 `dict-tag` 时，数字枚举无法匹配
- 字典值转换：
  - 位置: src/utils/dict.js
  - 修改: 若 value 为数字，需要转成数字： `value: isNaN(p.dictValue) ? p.dictValue : Number(p.dictValue)`
- 字典展示：
  - 位置：src/components/DictTag/index.vue
  - 修改：`String(props.value)` 移除 String 包装，直接使用 `props.value`