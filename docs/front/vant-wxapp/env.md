# 环境配置



## 目的
将系统的所有环境变量统一配置，并且依据系统运行的环境信息自动的获取变量，减少人为干预，和出错的可能

## 配置

- 位置：/app.json
- 代码及说明
```javascript
App({
  // 环境配置信息，环境包含小程序指定的develop，trial，release。配置内容为应用所依赖的配置
  env: {
    develop: { appCode: 'miniapp', apiBase: 'https://api.example.com'}, // 开发版
    trial: { appCode: 'miniapp', apiBase: 'https://api.example.com'}, // 体验版
    release: { appCode: 'miniapp', apiBase: 'https://api.example.com'}, // 正式版
  },
  // 依据运行环境信息所确定的变量信息
  config: {
    appId: '',
    appCode: '',
    apiBase: '',
  },

  // 应用加载时计算变量信息
  onLaunch: function() {
    const accountInfo = wx.getAccountInfoSync();
    const envVersion = accountInfo.miniProgram.envVersion;

    this.config.appId = accountInfo.miniProgram.appId;
    this.config.appCode = this.env[envVersion].appCode;
    this.config.apiBase = this.env[envVersion].apiBase;
  }
})
```

## 使用
- 在需要使用环境配置信息时，需要在具体页面引入 app: `const app = getApp();`
- 获取配置信息appCode：`app.config.appCode;`