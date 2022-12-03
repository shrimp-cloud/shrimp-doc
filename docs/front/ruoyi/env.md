# 多环境支持

> 配置化的支持多环境

### 多环境配置
1. package.json.scripts 内添加打包命令："build:uat": "vite build --mode uat",
2. 根目录创建新目录： env, 将所有 .env 放到此目录下
3. vite.conf.js 的 defineConfig 内，return 添加：`envDir: 'env',`
4. 添加配公共置文件： .env，内容如下
```text
VITE_APP_APP_CODE = shrimp-cas
```
5. 添加环境配置： .env.uat
```text
# 标题
VITE_APP_TITLE = 系统名称【UAT】
# 环境
VITE_APP_ENV = 'uat'
# 接口
VITE_APP_BASE_API = 'http://api-uat.example.com'
```
