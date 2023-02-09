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

// 记录登录时间，防止登录时旧 token 的影响，以及新 token 被清理
let loginTime = undefined;

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
                if (httpCode !== 200) {
                    wx.showToast({icon: 'error', title: httpCode + ':' + res.data.error})
                    reject(httpCode + ':' + res.data.error)
                    return;
                }

                // 请求正常
                const data = res.data;
                const code = data.code;
                const msg = data.msg;

                if (code === 10001 || code === 10002 || code === 10005 || code === 10006 || code === 10007) {
                    console.error('request.notlogin', code, msg);
                    await login(); // 登录时需要阻塞。防止登录请求重复执行。
                    const data = request(options); // 若当前请求需要登录，登录后需要重新执行此请求
                    return resolve(data);
                } else if (code === -1 || code === 0) {
                    wx.showToast({icon: 'error', title: code + ':' + msg})
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
        let token = wx.getStorageSync('token');
        const now = Date.now();

        // 保证 60 秒内不重新清理 token
        if ((loginTime === undefined || ((now - loginTime) > 60 * 1000) ) && token) {
            console.log('request.notlogin.clear.token');
            wx.removeStorageSync('token');
            token = undefined;
        }
        if (token) {
            console.log('online now');
            return resolve();
        }
        wx.login({
            success (res) {
                const code = res.code;
                if (!code) {
                    console.error('登录失败！' + res.errMsg)
                    return reject();
                }

                // 不使用封装，只使用 wx.request
                wx.request({
                    url: app.config.apiBase + '/cas/public/miniapp/login',
                    method: 'post',
                    data: {appId: app.config.appId, code},
                    header: getHeaders(),
                    success: (res) => {
                        // http 异常
                        const httpCode = res.statusCode;
                        if (httpCode !== 200) {
                            wx.showToast({icon: 'error', title: httpCode + ':' + res.data.error})
                            return reject();
                        }
                        const data = res.data;

                        // 服务端处理异常
                        if (data.code !== 1) {
                            wx.showToast({icon: 'error', title: code + ':' + data.msg})
                            return reject();
                        }

                        // 服务端处理成功
                        const loginData = data.data;
                        if (loginData.status !== 0) {
                            console.error('登录失败：' + loginData.msg);
                            return reject();
                        }

                        // 登录成功
                        loginTime = now;
                        wx.setStorageSync('token', loginData.token);
                        console.log('login.new.reload');
                        return resolve();
                    },
                    fail: (err) => {
                        console.error('err', err);
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