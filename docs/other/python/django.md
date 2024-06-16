# Django

## Django

- 安装 Diango: pip3 install django
- 验证: python3 -m django --version
- 初始化: django-admin startproject py_web
- 进入项目: cd py_web
- 创建虚拟环境：python3 -m venv .venv
- 激活虚拟环境：source .venv/bin/activate
- 启动: python3 manage.py runserver
- 访问: http://127.0.0.1:8000


## 创建应用

- 创建 cas 应用(模块)：`django-admin startapp cas`
- 注册模块：在 {projectname}/settings.py 下，将 cas 添加到 INSTALLED_APPS 中


## MySQL

- 安装驱动: `pip3 install pymysql`
- 配置 MySQL: py_web/settings.py 配置 DATABASES
  - ENGINE = "django.db.backends.mysql"
  - HOST = "127.0.0.1"
  - PORT = 3306
  - NAME = "schema"
  - USER = "username"
  - PASSWORD = "password"


## 进入开发

- 创建sqlite3数据库文件: python3 manage.py migrate
- 创建应用: python3 manage.py startapp login (将一个大的系统进行小模块化拆分，就是此处的应用)
