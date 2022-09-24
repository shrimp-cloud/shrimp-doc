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
- elTagClass: 将会作为 el-tag 的 class 使用
- 具体 type 和 class 取值，请找 el 官方文档

### 页面引入
```javascript
const { DICT_TYPE1, DICT_TYPE2 } = proxy.useDict("DICT_TYPE1", "DICT_TYPE2");
```

### 列表内使用
```html
 <el-table-column label="枚举" align="center" prop="type" min-width="80">
    <template #default="scope"><dict-tag :options="DICT_TYPE1" :value="scope.row.configType" /></template>
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
`