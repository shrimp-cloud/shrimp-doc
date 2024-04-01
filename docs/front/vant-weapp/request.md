# Request 封装

1. 请求封装：业务逻辑处理过程，不希望太关心请求逻辑。需要重新封装请求。
2. 登录逻辑：在请求需要登录的情况下，自动完成登录逻辑。业务逻辑处理不再需要关心是否已登录

## request.js

### 位置
utils/request.js

### 内容
```javascript
// guid 为生成唯一 id 的集数， tansParams 参数处理函数
import { guid, tansParams } from './tools'
const app = getApp();

// 重复的登录请求，需要被拦截并等待
let loginLock = undefined;

const request = (options) => {
    return new Promise((resolve, reject) => {
        const headers = getHeaders();
        const token = wx.getStorageSync('token');
        if (token) {
            headers['token'] = token;
        }
        const method = options.method || 'get';
        let url = app.config.apiBase + options.url;
        if ('get' === method) {
            url = url + '?' + tansParams(options.params);
            url = url.slice(0, -1);
        }

        wx.showLoading({title: '加载中...'});
        wx.request({
            url: url,
            method: method,
            data: options.data,
            header: headers,
            success: async (res) => {
                // http 异常
                const httpCode = res.statusCode;

                if (httpCode === 401 || httpCode === 403) {
                    console.error('request notlogin');
                    await login();
                    // 登录后需要二次请求，并 resolve
                    const data = request(options);
                    return resolve(data);
                }
                const data = res.data;
                const msg = data.msg;
                const code = data.code;

                if (httpCode !== 200) {
                    wx.showToast({icon: 'error', title: msg})
                    reject(httpCode + ':' + msg)
                    return;
                }

                // 请求正常
                if (code === -1 || code === 0) {
                    wx.showToast({icon: 'error', title: msg})
                    return reject(msg);
                } else {
                    return resolve(data);
                }
            },
            fail: (err) => {
                console.log('err', err);
                reject(err)
            },
            complete: wx.hideLoading
        })
    })
}

function login() {
    return new Promise((resolve, reject) => {
        const now = Date.now();

        // 锁，登录不能被重复执行
        if (loginLock && ((now - loginLock) < 12 * 1000)) {
            // 已经在执行登录了，第二次登录请求需要锁
            const waitLogin = setInterval(function() {
                if (!loginLock || ((Date.now() - loginLock) > 12 * 1000)) {
                    clearInterval(waitLogin);
                    return resolve();
                }
            }, 10);
            // 不往下执行，但也不 resolve， 只等 interval 内的 resolve，
            return;
        }
        // 标识有一个登录正在执行了，在执行完登录之后，再变成  false
        loginLock = now;

        wx.removeStorageSync('token');

        wx.login({
            success (res) {
                const code = res.code;
                if (!code) {
                    console.error('登录失败！' + res.errMsg)
                    loginLock = undefined;
                    return reject();
                }

                // 不使用封装，只使用 wx.request
                wx.request({
                    url: app.config.apiBase + MINIAPP_LOGIN,
                    method: 'post',
                    data: {appId: app.config.appId, code},
                    header: getHeaders(),
                    success: (res) => {
                        // http 异常
                        const httpCode = res.statusCode;
                        if (httpCode !== 200) {
                            wx.showToast({icon: 'error', title: res.data.error})
                            loginLock = undefined;
                            return reject();
                        }
                        const data = res.data;

                        // 服务端处理异常
                        if (data.code !== 1) {
                            wx.showToast({icon: 'error', title: data.msg})
                            loginLock = undefined;
                            return reject();
                        }

                        // 服务端处理成功
                        const loginData = data.data;
                        if (loginData.status !== 0) {
                            console.error('登录失败：' + loginData.msg);
                            loginLock = undefined;
                            return reject();
                        }

                        // 登录成功
                        wx.setStorageSync('token', loginData.token);
                        console.log('login success');
                        loginLock = undefined;
                        return resolve();
                    },
                    fail: (err) => {
                        console.error('err', err);
                        loginLock = undefined;
                        return reject();
                    },
                })
            }
        })
    })
}

// 统一封装请求头
function getHeaders() {
    const headers = {};
    headers['Content-Type'] = 'application/json;charset=utf-8';
    headers['trace-id'] = guid();
    headers['tenant-code'] = wx.getStorageSync('tenant-code') || 'default';
    headers['app-code'] = app.config.appCode;
    return headers;
}


export default request
```

## api

### 位置
api/xxx.js

### 内容
```javascript
import request from '../utils/request'

export function publicXxx(params) {
  return request({url: "/public/xxx", method: 'get', params })
}
```


## 使用

### 引入
```javascript
import { publicXxx } from "../../api/xxx"
```

### 使用
```javascript
publicXxx({}).then(res => {
  console.log(res.data);
})
```