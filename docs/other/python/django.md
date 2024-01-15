# Django

## Django

- 安装 Diango: pip3 install django
- 初始化: django-admin startproject py_web
- 启动: python3 manage.py runserver
- 访问: http://127.0.0.1:8000


## 进入开发

- 创建sqlite3数据库文件: python3 manage.py migrate 
- 创建应用: python3 manage.py startapp login (将一个大的系统进行小模块化拆分，就是此处的应用)