# 登录

> 登录，包含登录界面修改，请求拦截，响应解析，和 token 存储相关内容。

### 整体维护
1. 移除 js-cookie， 将涉及到的存储全部改 localStorage (可批量替换)
2. src/utils/auth.js，TokenKey 改为标准的 token

### 验证码改造
1. 登录页面：src/views/login.vue
2. 移除 captchaEnabled 变量，默认启动验证码
3. 纠正 验证码id 的取值, 以及变量名称，以符合后端接口，强迫症还可以纠正全局验证码相关命名

### 记住密码
- 若要求安全性高，建议直接移除 【记住我】相关代码设计
- bug: password 返回了 boolean, 需要增强判断


### 登录
1. src/store/modules/user.js#login 入参直接放 userInfo，少一层转换才好。。
2. 更换登录接口
3. 完成登录失败时的信息提示，和登录成功时的 token 设置


### 用户信息获取
1. src/store/modules/user.js#getInfo
2. Jwt格式的 token， 直接解析jwt 即可
```javascript
const token = getToken();
if (!token) {
    reject("token 不存在");
    return;
}
const jwtInfoArr = token.split(".");
    if (jwtInfoArr.length !== 3) {
    reject("token 格式不正确");
    return;
}
const payload = jwtInfoArr[1];
let userInfo = Base64.decode(payload);
userInfo = JSON.parse(userInfo);

this.name = userInfo.username
this.avatar = userInfo.avatar;
// 后面再移除
this.roles = ['ROLE_DEFAULT']
```

### 登出
Jwt 无状态，直接清楚缓存即可。后面变成有状态了再调接口登出
```javascript
this.token = ''
this.roles = []
this.permissions = []
removeToken()
localStorage.clear();
```

### 路由
6. src/store/modules/permission.js 的getRouters 更换为 mock 数据。使用json字义菜单
7. src/store/modules/permission.js 的filterAsyncRouter，增强component适配。
8. src/permission.js 所有的 isRelogin.show 都赋值 false, 框架bug,在登录失效后页面刷新不跳转登录页面

