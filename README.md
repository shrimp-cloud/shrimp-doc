# shrimp-doc

### 创建目录
```shell
mkdir shrimp-doc && cd shrimp-doc
```

### 使用yarn初始化
```shell
yarn init
```

### 修改 npm 源，解决依赖拉取问题
```shell
npm config set registry https://registry.npmmirror.com
```

### 引入 vuepress
```shell
yarn add -D vitepress
```

### 创建第一个文件
```shell
mkdir docs && echo '# Hello VuePress' > docs/README.md
```


### 添加启动命令，编译命令
```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs"
  }
}
```

### 安装依赖
```shell
yarn install
```

### 本地启动项目
yarn docs:dev


## 扩展

### mermaid 支持
1. package 追加 mermaidjs
```json
{
    "devDependencies": {
        "vuepress-plugin-mermaidjs": "^1.8.1"
    }
}
```

2. config 配置插件
```js
module.exports = {
    plugins: [
        'vuepress-plugin-mermaidjs'
    ],
}
```


### 内容区域扩展到100
问题：
内容区域只在整体页面的中间位置，期待让内容靠左。

解决方案：

创建styl文件并放入以下内容：
```shell
vim ./docs/palette.styl
```
```css
.page .theme-default-content:not(.custom) {
    max-width: none;
}
```
