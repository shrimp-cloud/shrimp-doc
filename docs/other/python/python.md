# Python

> Python

## 环境搭建

### CentOS7 源码安装 Python3.12.1

- 安装 Python3

```shell
# 安装基本依赖
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
# 下载源码：
https://www.python.org/downloads/source/
# 解压源码
tar -zxvf Python-3.12.1.tgz
cd Python-3.12.1
# 配置
./configure  --prefix=/opt/Python-3.12.1
# 编译
make 
# 安装
make install
# 连接
ln -s /opt/Python-3.12.1/bin/python3.12 /usr/bin/python3
```

- 安装 pip

```shell
# 下载 py
curl -O https://bootstrap.pypa.io/get-pip.py
# 安装 pip
python3 get-pip.py
```


### Windows 安装Python

- 安装 python: https://www.python.org/
- 安装 pip
  - curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
  - python3 get-pip.py

### 准备
- IDE: https://www.jetbrains.com/pycharm/
- web 框架： Django (为什么是 web 呢？我就干这个)

### Django
- 安装 Diango: pip3 install django
- 初始化: django-admin startproject py_web
- 启动: python3 manage.py runserver
- 访问: http://127.0.0.1:8000

### 进入开发
- 创建sqlite3数据库文件: python3 manage.py migrate 
- 创建应用: python3 manage.py startapp login (将一个大的系统进行小模块化拆分，就是此处的应用)