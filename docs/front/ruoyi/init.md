# 初始化

> 初始化包含项目最基本的准备

### 仓库
从github中拉取最新代码。若后续有更新，只能按 commit 的顺序手动修改了
```shell
git clone https://github.com/yangzongzhuan/RuoYi-Vue3.git
```

### 基本信息
1. package.json 内的 名称/版本/描述/作者/
2. .env.* 内的系统名称。建议在TITLE 上直接附带环境标识
3. 全局风格：src/settings.js
4. 修改为 hash 模式：src/router/index.js，createWebHistory 改为 createWebHashHistory。部署在 oss 上, history 模式会404
### 基本配置
1. 删除 bin 目录【只有windows脚本，不会部署在windows中】
2. 后端接口调用配置代理：修改 vite.config.js -> server.proxy.target 为自己的后端服务地址
3. 后端接口调用不使用代理，直接对接后端服务：
   1. 注释 vite.config.js -> server.proxy 所有内容
   2. 修改 .env.* 的VITE_APP_BASE_API为后端域名
   3. 移除 .env.* 的VITE_BUILD_COMPRESS，不需要压缩
4. 移除 isToken 设计，跨域没有添加此header 名单。后端有白名单机制：
   1. 注释 src/utils/request.js 中 isToken 相关代码
   2. 注释 src/api/login.js中 isToken 相关代码
   3. token 机制在后缀有补充。将会改造此部分代码
5. README.md

### 标题，LOGO, 三方链接等
1. LOGO
   1. 新 icon: public/favicon.svg，并删除旧的 ico
   2. 删除旧 src/assets/logo/logo.png：若 logo 和 icon 不共用，也可以替换掉
   3. 更换 favicon: index.html
   4. 更换登录后菜单上方 logo为icon: src/layout/components/Sidebar/Logo.vue
2. 标题
   1. 默认页面标题：index.html
   2. Copyright: src/views/login.vue
   3. 登录页标题: src/views/login.vue
   4. 菜单上方标题: src/layout/components/Sidebar/Logo.vue
3. 登录页右上方git链接: src/layout/components/Navbar.vue
4. 登录页右上方文档链接: src/components/RuoYi/Doc/index.vue
5. Dashboard: src/views/index.vue

### 删除多余的页面文件
1. 删除：src/views/monitor 
2. 删除：src/views/system
3. 删除：src/views/tool
4. 删除多余的路由：src/router/index.js
5. 删除多余 api 文件：src/api