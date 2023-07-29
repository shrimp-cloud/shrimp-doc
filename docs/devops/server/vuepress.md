# VuePress

> 本文讲述（近似）白嫖一个文档站点【例如当前站点】

## 技术栈
- Markdown 语法：http://www.markdown.cn/
- Git 基本命令
  - 基础教程：https://www.runoob.com/git/git-tutorial.html
  - 专业教程：https://www.liaoxuefeng.com/wiki/896043488029600

## 三方工具
- VuePress(文档工具): https://www.vuepress.cn/
- Node.js(核心语言环境): https://nodejs.org/zh-cn/
- Git终端(本地操作Git): https://git-scm.com/
- Github(或其他git仓库,存储代码): https://github.com/
- Visual Studio Code(VS Code编辑工具): https://code.visualstudio.com/
- 阿里云-云效(自动发布文档): https://flow.aliyun.com/
- 阿里云-OSS(站点静态文件存储): https://oss.console.aliyun.com/
- 域名(访问地址,可以直接使用oss域名, 但访问不直观, 可用子域名): https://dc.console.aliyun.com/

## 步骤
*以下步骤，假设已经掌握了使用上面技术栈，和三方工具的使用技能*

### 1.本地环境搭建
1. NodeJs安装
    - https://nodejs.org/zh-cn/ 按操作系统下载最新的长期维护(LTS)版本，并安装
    - 安装完成后，在控制台执行 `node -v`看到返回版本号，则为安装成功
    - 安装yarn（Javascript 包管理器，后面会用到）: `npm install -g yarn`
2. Git安装
    - https://git-scm.com/ 按操作系统下载最新的Git，并安装
    - 安装完成后，在控制台执行 `git --version`看到返回版本号，则为安装成功
3. VS Code 安装
    - https://code.visualstudio.com/ 按操作系统下载，并安装。这是一款文本编辑工具，可以编辑电脑上的各种纯文本
    - Markdown 插件安装：打开 vs code 左侧的 Extensions, 搜索 `Markdown All in One`并安装
    - 新建文件，编写几个 Markdown 文本，ctrl+shift+v 可实时预览效果（可调整成左右分屏，一边编辑一边看效果）

### 2.Git注册和仓库创建
1. Github（https://github.com/） 在国外，用户数最多，但速度体验不好，有可能打不开。可选择国内的 gitee(https://gitee.com/)
2. 注册，并新建项目，项目名自己定义, 模板内只要一个 Readme，其他什么内容都不要。
3. 完成仓库创建，后缀将写好的文档提交到此仓库内
4. 在电脑的某个目录内，拉取代码 `git clone https://xxx.com/xxx/xxx.git`, 输入用户名密码后，可将远程仓库同步到本地
5. 此时项目非常空, `.git`不能动，里面有代码的所有内容

### 3.项目创建和启动
1. 按照 https://www.vuepress.cn/ 上的教程，创建本地项目【过程会有点多，有一定经验的建议自行搭建，无经验的建议直接使用本项目来改】
2. 本项目的 README.md 内有改动细节
2. 假设已经完成了项目的创建【使用本项目复制也算】，进行下一步：本地启动调试
3. 安装依赖：`yarn install`，本地启动: `yarn docs:dev`, 启动成功后可预览：http://localhost:8080/
4. 坑：不支持 node 18!
5. 提交代码： 
   - `git add .`
   - `git commit -m '你做了什么，要写清楚'
   - `git push`

### 4.OSS-bucket创建
- 未完待续

### 5.云效流水线创建
- 未完待续

### 6.OSS访问配置
- 未完待续

### 7.继续添加自己的笔记
- 未完待续




