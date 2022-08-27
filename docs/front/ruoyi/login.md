# 登录

> 登录，包含登录界面修改，请求拦截，响应解析，和 token 存储相关内容。

#### 登录页面
1. 登录接口，在 cas.js 中维护登录接口
2. src/utils/auth.js token改为会用 localStorage 存储，TokenKey 改为标准的 token
3. src/utils/request.js 修改请求的 token 逻辑，和返回的结果拦截逻辑
4. src/views/login.vue 移除验证码逻辑【后面章节再加上】，Cookies 改为 localStorage。登录返回若 res.code=1才设置 token
5. src/store/modules/user.js login更换为新的登录接口，logOut只需要简单的清除缓存。若要注销token，待后续完善
6. src/store/modules/permission.js 的getRouters 更换为 mock 数据。使用json字义菜单
7. src/store/modules/permission.js 的filterAsyncRouter，增强component适配。
8. src/permission.js 所有的 isRelogin.show 都赋值 false, 框架bug,在登录失效后页面刷新不跳转登录页面

