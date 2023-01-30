# 初始化

## 基础信息

| 内容   | 地址                                              |
|------|-------------------------------------------------|
| 文档   | https://vant-contrib.gitee.io/vant-weapp/#/home |
| DEMO | https://github.com/vant-ui/vant-demo            |


## 创建项目

1. 将 vant-weapp/base 目录下的内容 copy 新创建的目录下
2. 使用微信开发工具打开项目【自行完成登录，AppId 申请，关联等配置】
3. 以下两步参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html
4. 升级 `@vant/weapp` 到最新
5. 终端执行 `yarn install`
6. 微信工具执行 `工具 -> 构建 npm`
7. 以下两步参考文档：https://vant-contrib.gitee.io/vant-weapp/#/quickstart
8. 修改 `project.config.json`
```shell
{
    ...
    "setting": {
        ...
        "packNpmManually": true,
        "packNpmRelationList": [
            {
                "packageJsonPath": "./package.json",
                "miniprogramNpmDistDir": "./"
            }
        ]
    }
}
```
9. 将项目中所有 `/@vant/weapp/dist/` 均替换成 `@vant/weapp/`

## 修改项目
1. 升级基础库版本：project.config.json 中的 libVersion 修改为最新的稳定版本【可在开发工具 本地设置 中找到】
2. 升级后报错：`routeDone with a webviewId 13 that is not the current page`：为开发工具的 bug, 等待修复
3. 添加 .gitignore
```gitignore
# wxapp
miniprogram_npm
node_modules
package-lock.json
yarn.lock

# OS
.DS_Store
```

## 代码提交 git
- 微信居然也搞了个 git...: https://git.weixin.qq.com/
