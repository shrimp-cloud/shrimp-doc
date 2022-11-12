# 使用 redirect 完成单点登录

> 页面跳转到 cas 完成登录的方式进行。登录完成后，再跳转回原来的页面


### 单点登录方处理


文件：src/permission.js
1. 获取 token 和 url 上的 redirect
```javascript
const token = getToken();
const href = window.location.href;
const redirectIdx = href.indexOf('redirect=');
const redirect = redirectIdx > 0 ? href.substring(redirectIdx+9) : undefined;
```
2. 若存在 token, 但不存在 redirect, 完成 cas 正常的业务逻辑
3. 若存在 token, 也存在 redirect, 获取新的 ticket, 跳转回到 redirect
```javascript
    publicSsoTokenTicket().then(res => {
      if (res.data.ticket) {
        const redirectUrl = redirect + '?ticket=' + res.data.ticket;
        window.open(redirectUrl, '_self');
        NProgress.done()
      } else {
        ElMessage.error(res.data.msg || res.msg)
        // 清理 token 重新登录
        removeToken();
        next();
        NProgress.done()
      }
    })
```
4. 若不存在  token, 存在 redirect, 继续跳转登录，在登录页面完成 redirect
5. 若不存在  token, 也不存在 redirect, 跳转自身的 login, 再返回 / 即可
```javascript
next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
NProgress.done()
```

6. 文件 src/store/modules/user.js， 在登录完成后， 若存在 redirect 且来源于另外一个地址，需要加上 tocket 跳转回去
```javascript
const href = window.location.href;
const redirectIndex = href.indexOf('redirect=http');
const ticket = res.data.ticket;
if (redirectIndex > 0 && ticket) {
    let redirect = href.substring(redirectIndex + 9);
    redirect = redirect + '?ticket=' + ticket;
    window.open(redirect, '_self');
    reject('即将跳转回原地址：' + redirect);
    return;
}
```



### 接入方系统处理

文件：src/permission.js
1. 获取 token 和 url 上的 tocket
```javascript
const token = getToken();
const href = window.location.href;
const ticketIdx = href.indexOf('ticket=');
const ticket = ticketIdx > 0 ? href.substring(ticketIdx+7) : undefined;
```
2. 若存在 token, 正常完成业务逻辑
3. 若不存在 token, 但存在 ticket, 需要使用 ticket 完成token 兑换，再跳转回原地址
```javascript
publicSsoTicketLogin({ticket}).then(res => {
  if (res.data.token) {
    setToken(res.data.token);
    next({ path: '/', replace: true })
  } else {
    ElMessage.error('登录失败：' + res.data.msg || res.msg)
  }
})
```
4. 若不存在 token, 也不存在 ticket, 跳转到 cas 登录页面即可
```javascript
const loginUrl = CAS + '/#/login?redirect=' + href;
console.log('auth.login.casUrl', loginUrl);
window.open(loginUrl, '_self');
// next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
NProgress.done()
```
