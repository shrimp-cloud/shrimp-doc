# Python3 环境


## CentOS7 源码安装

### 安装 Python3

```shell
# 安装基本依赖
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
# 下载源码：
https://www.python.org/downloads/source/
# 解压源码
tar -zxvf Python-3.12.1.tgz
# 进入源码目录
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

### 安装 pip

```shell
# 下载 py
curl -O https://bootstrap.pypa.io/get-pip.py
# 安装 pip
python3 get-pip.py
pip --version
```


## Windows 安装

### 安装 python3

- 安装 python: https://www.python.org/
- 下载后按向导安装即可

### 安装 pip
```shell
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
pip --version
```


## Mac 安装

### 安装 python3

- 下载: https://www.python.org/downloads/
- 安装: 使用安装向导即可
- 查看: `python3 --version`
- 多个 python 导致版本不对: 安装之后的目录有 `Update Shell Profile.command`

### 安装 pip

```shell
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
pip --version
```


