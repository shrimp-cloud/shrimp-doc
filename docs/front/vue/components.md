# 组件开发

---

## 组件位置
- 公共基础组件：src/components
- 公共业务组件：src/views/components
- 模块私有组件：./components 【即对应模块的相对路径下】

## 命名规范
- 组件目录首字母大写
- vue 文件件字母小写
- 入口文件名为： index.vue
- 组件下级子组件：按具体含义命名

--- 
## 组件开发

### name
建议与 组件目录名一致。若是组件的子组件，再加后缀予以区分

### defineProps
组件接收属性
```javascript
const props = defineProps({
  value: {
      type: Number, // 需要指定类型
      default: 0, // 建议指定默认值
  },
  level: {
    type: Number,
    default: 0,
  }
});
```

### defineEmits
组件回调方法定义
```javascript
const emit = defineEmits(['update:value', 'change']);
```
组件回调方法调用【组件】
```javascript
emit("change", data);
```

组件回调方法调用【父页面】
```html
<component @change="functionName"/>
```

### defineExpose
组件对外暴露方法
```javascript
defineExpose({getList})
```
外部引用组件暴露无遗的方法
1. 组件定义 ref="componentsRef"
   2 引用方法：
```javascript
proxy.$refs.componentsRef.getList();
```

### 子组件初始化方法只调用一次
场景：el-dialog弹框里引入的组件只会触发一次组件里面的方法，再次打开不起作用
原因：el-dialog弹框因为是用display：none和display：block来控制显示隐藏的，dom元素不会被删除，所以dialog弹框里面的内容只会初始化的时候创建dom元素渲染页面，如果里面有组件且组件在初始化时候会调用方法，那么这个方法只会在第一次打开弹框时调用！
解决1：选择给dialog弹框加个v-if 
- 优点：弹框每次打开会会重新创建里面的元素包括引入的组件
- 缺点：不利于底层的diff算法，性能受到影响
解决2：对外暴露方法，自行调用子组件的方法

### 组件监听器
```javascript
watch(() => props.value, val => {
  init(); // 调用实际处理逻辑
}, {
  immediate: true // 变化后立即执行动作
});
```

### 组件初始化完时执行
```javascript
onMounted(() => {
  init();
});
```

---

## 雷区
1. 组件初始化后，重新调用组件，不再执行 onMounted
2. watch，即使是重新设置一次值，只要值一样，也不会触发
3. 要保证在每次调用组件时都执行特定逻辑，建议使用 defineExpose 定义一个方法给外部调用
4. watch 性能不高，建议使用 computed

