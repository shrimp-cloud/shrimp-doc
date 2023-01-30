# Request 封装

## request.js

### 位置
utils/request.js

### 内容
```javascript
const apiBase = "https://api.example.com"

const request = (options) => {
    wx.showLoading({
        title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      const headers = {};
      headers['Content-Type'] = 'application/json;charset=utf-8'
      if (token) {
        headers['token'] = token;
      }
      
      wx.request({
          url: apiBase + options.url,
          method: options.method || 'get',
          data: options.data,
          header: headers,
          success: res => {
              resolve(res.data)
          },
          fail: err => {
              reject(err)
          },
          complete: wx.hideLoading
      })
    })
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


## 引用

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