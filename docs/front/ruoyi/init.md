# 初始化

> 初始化包含项目最基本的准备

#### 仓库
从github中拉取最新代码。若后续有更新，只能按 commit 的顺序手动修改了
```shell
git clone https://github.com/yangzongzhuan/RuoYi-Vue3.git
```

#### 基本配置
1. 删除 bin 目录【只有windows脚本，不会部署在windows中】
2. 后端接口调用配置代理：修改 vite.config.js -> server.proxy.target 为自己的后端服务地址
3. 后端接口调用不使用代理，直接对接后端服务：
   1. 注释 vite.config.js -> server.proxy 所有内容
   2. 修改 .env.* 的VITE_APP_BASE_API为后端域名
4. 移除 isToken 设计，跨域没有添加此header 名单。后端有白名单机制：
   1. 注释 src/utils/request.js 中 isToken 相关代码
   2. 注释 src/api/login.js中 isToken 相关代码
   3. token 机制在后缀有补充。将会改造此部分代码