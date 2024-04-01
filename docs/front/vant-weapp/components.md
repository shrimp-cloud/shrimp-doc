# 组件封装

> 将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。

## 组件位置建议

- 全局组件（应用应用无关性）：在项目根目录创建 `components` 目录，将全局组件放置其中。
- 应用组件（应用内通用组件）：在pages目录创建 `components` 目录，将应用组件放置其中。
- 页面组件（页面内组件）：在具体的页面中创建 `components` 目录，将页面组件放置其中。
- 组件`components` 下以组件名称作为目录名，组件下的文件均以 index 命名

## index.json
> json 文件比较简单，为组件的申明，和用到的其他组件引入

```json
{
  "component": true,
  "usingComponents": {}
}
```

## index.wxss
> 组件所用到的样式。此样式作用域仅为当前组件

## index.js

```js
// 组件的依赖 import

Component({
  properties: {
    // 组件属性
  },
  data: {
    // 组件数据
  },

  methods: {
    init() {
      // 提供给外部的寝化方法
    },

    // 组件对外暴露的其他方法
  },

})
```


## index.xml
```xml
<view>
    <!-- 组件的页面代码 -->
</view>
```


## 组件引用

> 在需要使用此组件的页面中，在 usingComponents 中引入组件，并使用组件

