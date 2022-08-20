# 多环境支持

> 配置化的支持多环境

### 多环境配置
1. package.json.scripts 内添加打包命令："build:uat": "vite build --mode uat",
2. 添加配置文件： .env.uat，内容如下
```text
# 标题
VITE_APP_TITLE = 系统名称【UAT】
# 环境
VITE_APP_ENV = 'uat'
# 接口
VITE_APP_BASE_API = 'http://api-uat.example.com'
```
