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
   9. handleDelete 只需支持单个操作。将删除方法置入其中，拆分删除成功和失败的两个场景
   10. 对接数据字段

### 示例CRUD
- 应用分页查询，删除
```html
<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
        <el-form-item prop="appCode">
          <el-input v-model="queryParams.appCode" placeholder="应用编码" clearable style="width: 160px" @keyup.enter="handleQuery"/>
        </el-form-item>
        <el-form-item prop="appName">
          <el-input v-model="queryParams.appName" placeholder="应用名称" clearable style="width: 160px" @keyup.enter="handleQuery"/>
        </el-form-item>
        <el-form-item prop="isDefault">
          <el-select v-model="queryParams.isDefault" placeholder="默认" clearable style='width: 100px'>
            <el-option v-for="dict in BOOLEAN" :key="dict.value" :label="dict.label" :value="dict.value"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="domain">
          <el-input v-model="queryParams.domain" placeholder="访问地址" clearable style="width: 160px" @keyup.enter="handleQuery"/>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="dateRange" style='width: 380px' value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery" v-hasPermi="['page']">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" icon="Plus" @click="handleAdd" v-hasPermi="['create']">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :height="tableHeight" :data="dataList">
        <el-table-column label="ID" align="center" prop="id" width="80"/>
        <el-table-column label="应用编码" align="left" prop="appCode" min-width="120" :show-overflow-tooltip="true" />
        <el-table-column label="应用名称" align="left" prop="appName" min-width="160" :show-overflow-tooltip="true" />
        <el-table-column label="访问地址" align="left" prop="domain" min-width="240" :show-overflow-tooltip="true"/>
        <el-table-column label="默认" align="center" prop="isDefault" width="80">
          <template #default="scope"><dict-tag :options="BOOLEAN" :value="scope.row.isDefault"/></template>
        </el-table-column>
        <el-table-column label="排序" align="left" prop="sort" min-width="80" :show-overflow-tooltip="true"/>
        <el-table-column label="备注" align="left" prop="comments" min-width="200" :show-overflow-tooltip="true"/>
        <el-table-column label="修改人" align="left" prop="updateBy" width="100" :show-overflow-tooltip="true"/>
        <el-table-column label="修改时间" align="center" prop="updateTime" width="160">
          <template #default="scope"><span>{{ parseTime(scope.row.updateTime) }}</span></template>
        </el-table-column>
        <el-table-column label="创建人" align="left" prop="createBy" width="100" :show-overflow-tooltip="true"/>
        <el-table-column label="创建时间" align="center" prop="createTime" width="160">
          <template #default="scope"><span>{{ parseTime(scope.row.createTime) }}</span></template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed='right' width="160" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button type="text" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['update']">修改</el-button>
            <el-button type="text" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['remove']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination 
          v-show="total > 0" 
          :total="total" 
          v-model:page="queryParams.current" 
          v-model:limit="queryParams.size" 
          @pagination="getList"
      />

     <edit ref="editRef" @change="getList"/>
   </div>
</template>

<script setup name="AppPage">
import {appPage, appRemove} from "@/api/ops";
import Edit from "./components/edit";
//import {parseTime} from "@/utils/ruoyi";

const tableHeight = computed(() => window.innerHeight - 216);
const { proxy } = getCurrentInstance();
const { BOOLEAN } = proxy.useDict("BOOLEAN");
const dataList = ref([]);
const loading = ref(true);
const total = ref(0);
// const dateRange = ref([]);
const queryParams = ref({
  current: 1,
  size: 20,
  appCode: undefined,
  appName: undefined,
  domain: undefined
});

function init() {
  /* 若存在时间范围
  const now = new Date();
  dateRange.value = [
    parseTime(now.setDate(now.getDate()-7), '{y}-{m}-{d}') + ' 00:00:00',
    parseTime(new Date(), '{y}-{m}-{d}') + ' 23:59:59'
  ];
  */
  queryParams.value.current = 1;
}

/** 查询参数列表 */
function getList() {
  loading.value = true;
  // proxy.addDateRange(queryParams.value, dateRange.value)
  appPage(queryParams.value).then(res => {
    const data = res.data;
    dataList.value = data.rows;
    total.value = data.total;
  }).finally(() => {
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.current = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  // dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

function handleAdd() {
  proxy.$refs["editRef"].handleEdit();
}
function handleUpdate(row) {
  proxy.$refs["editRef"].handleEdit(row);
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm('是否确认删除应用: "' + row.appCode + '"？').then(() => {
    appRemove({id: row.id}).then(res => {
      if (res.code === 1) {
        getList();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        proxy.$modal.msgError('删除失败: ' + res.msg);
      }
    })
  }).catch(() => {});
}

init();
getList();
</script>
```

- 应用新增, 编辑
```html
<template>
  <!-- 添加或修改参数配置对话框 -->
  <el-dialog :title="title" v-model="open" width="800px" append-to-body draggable :close-on-click-modal="false">
    <el-form ref="editRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="应用编码" prop="appCode">
        <el-input v-model="form.appCode" :disabled="!!form.id" placeholder="请输入应用编码" />
      </el-form-item>
      <el-form-item label="应用名称" prop="appName">
        <el-input v-model="form.appName" placeholder="请输入应用名称" />
      </el-form-item>
      <el-form-item label="访问地址" prop="domain">
        <el-input v-model="form.domain" placeholder="请输入访问地址" />
      </el-form-item>
      <el-form-item label="默认" prop="isDefault">
        <el-radio-group v-model="form.isDefault">
          <el-radio v-for="dict in BOOLEAN" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认" prop="isDefault">
        <el-select v-model="form.isDefault">
          <el-option v-for="dict in BOOLEAN" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" type="number" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="备注" prop="comments">
        <el-input v-model="form.comments" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-hasPermi="['create', 'update']">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="AppEdit">
import { appInfo, appUpdate, appCreate } from "@/api/ops";

defineExpose({handleEdit})
const emit = defineEmits(['change']);
const { proxy } = getCurrentInstance();
const open = ref(false);
const title = ref("");
const form = ref({});
const rules = ref({
  appCode: [{ required: true, message: "应用编码不能为空", trigger: "blur" }],
  appName: [{ required: true, message: "应用名称不能为空", trigger: "blur" }],
  domain: [{ required: true, message: "访问地址不能为空", trigger: "blur" }],
});

/** 表单重置 */
function reset() {
  form.value = {};
  proxy.resetForm("editRef");
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

// 新增/修改按钮操作
function handleEdit(row) {
  reset();
  if (!row || !row.id) {
    open.value = true;
    title.value = "添加";
  } else {
    // form.value = JSON.parse(JSON.stringify(row));
    appInfo({id:row.id}).then(res => {
      form.value = res.data;
      open.value = true;
      title.value = "修改";
    });
  }
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["editRef"].validate(valid => {
    if (valid) {
      if (form.value.id) {
        appUpdate(form.value).then(res => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          emit("change", true);
        });
      } else {
        appCreate(form.value).then(res => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          emit("change", true);
        });
      }
    }
  });
}
</script>
```