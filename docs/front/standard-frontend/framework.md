# 前端规范

## 技术栈
- Vue3
- TypeScript(?)
- Element-Plus
- vite

## 目录规范

- public  公共静态文件
- src  项目源码
  - components 公共组件
  - composables 公共方法抽取定义
  - layout 布局定义
  - models 模型定义
    - sys SYS模块模型(由后端生成)
    - cas CAS模块模型(由后端生成)
    - types 前端模型，由前端定义
  - plugins 插件
  - router 路由
  - services 后端服务
  - store 状态管理
  - styles 公共样式
  - utils  工具类
  - views 页面视图
    - 按页面功能，路由规则作为目录结构。页面内模块化拆分
  - main.ts 入口
  - App.vue 页面入口
- package.json  打包定义文件
- tsconfig.json  TS配置
- vite.config.ts  vite配置
- README.md   项目说明
- .editorconfig   编辑器规范配置
- .env  环境配置
- .eslintignore  eslint忽略配置
- .eslintrc.js  eslint配置
- .gitignore  GIT提交忽略
- index.html
  

## 命名规范
- 目录使用小写命名，不带复杂含义，均使用单含义单词
- ts， vue 使用驼峰命名，需要包含完整用途释义


## 数据存储规范
- 谨慎使用 cookie 【仅用于单点登录情况下的共用属性存储】
- 较大量数据存储于 localStorage
- 会议级别数据时效：登录后清理一次，其他时间不清理。时效过期时全量清理
- 字典类数据时效：登录后清理一次，其他时间不处理。

## Table 展示规范
1. cell 宽度，要满足 90%以上的文本显示（固定宽度100%展示）
2. 日期，需要格式化
3. 枚举，需要用字典翻译