# 请求和返回拦截

### token
const appCode = import.meta.env.VITE_APP_APP_CODE;

service.interceptors.request.use 添加 token 获取及附带
```javascript
const token = getToken();
if (token) {
  config.headers['token'] = token;
}
if (appCode) {
  config.headers['app-code'] = appCode;
}
config.headers['trace-id'] = guid();
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

guid 获取
```javascript
function guid() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, (c) => {
    const r = (Math.random() * 16) || 0;
    const integer = Math.trunc(r);
    return integer.toString(16);
  });
}
```


修正所有异常判断，正确之后才返回 data
- 修正最后一个 else if