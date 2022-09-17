# 请求和返回拦截

### token
service.interceptors.request.use 添加 token 获取及附带
```javascript
const token = getToken();
if (token) {
config.headers['token'] = token;
}
```


service.interceptors.response.use 按当前系统逻辑处理登录相关的 code
```javascript
const httpCode = res.code || 200;
const bizCode = res.data.code || 0;
```

重新登录是否需要提示栏，需要再添加判断，若已经是登录页面，不再出现提示栏：
```javascript
if (code === 10001 /* 所有判定为需要重新登录的code */) {
    const path = router?.currentRoute?._value?.path;
    if (path === '/' || path === '/login') {
        useUserStore().logOut().then(() => {
            location.href = '/index';
        })
    } else {
        // 原有重新登录逻辑
    }
}
```


修正所有异常判断，正确之后才返回 data
- 修正最后一个 else if