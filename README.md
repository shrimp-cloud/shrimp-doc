# lz-doc

### 创建目录
mkdir lz-doc && cd lz-doc

### 使用yarn初始化
yarn init

### 修改 npm 源，解决依赖拉取问题
- npm config set registry https://registry.npm.taobao.org
- npm config set disturl https://npm.taobao.org/dist

### 引入 vuepress
yarn add -D vuepress

### 创建第一个文件
mkdir docs && echo '# Hello VuePress' > docs/README.md

### 添加启动命令，编译命令
```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

```

### 本地启动项目
yarn docs:dev


### 坑
- 如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn (opens new window)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。

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
```json
plugins: [
    'vuepress-plugin-mermaidjs'
],
```
