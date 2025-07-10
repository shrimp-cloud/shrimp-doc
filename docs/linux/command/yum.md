# Yum

> Yum（全称为 Yellow dog Updater, Modified）是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。

## 使用方法

- 命令形式： `yum [options] [command] [package ...]`
  - options是可选的，选项包括-h（帮助）、-y（当安装过程提示选择时全部为yes）、-q（不显示安装过程）等。
  - command是所要进行的操作，包括install、update、remove、list、info等。
  - package是操作的对象。
- 示例： `yum -y install vim git`

## 常用命令

| 命令                      | 含义                                 |
|-------------------------|------------------------------------|
| yum install xxx         | 安装指定程序包                            |
| yum update xxx          | 更新指定程序包                            |
| yum check-update        | 检查可更新的程序                           |
| yum upgrade xxx         | 升级指定程序包                            |
| yum info                | 列出所有已安装包信息                         |
| yum info xxx            | 显示安装包信息                            |
| yum list                | 显示所有已经安装和可以安装的程序包                  |
| yum list xxx            | 显示指定程序包安装情况                        |
| yum list updates        | 列出所有可以更新的程序包                       |
| yum list installed      | 列出所有已安装的程序包                        |
| yum list extras         | 列出所有已安装但不在yum Repository中的程序包      |
| yum deplist xxx         | 查看指定程序包的依赖关系                       |
| yum search xxx          | 查找指定程序包，xxx可以是包名的一部分，会列出所有包含xxx的包名 |
| yum remove xxx          | 卸载指定程序包                            |
| yum clean packages      | 清除缓存目录下的软件包                        |
| yum clean headers       | 清除缓存目录下的headers                    |
| yum clean oldheaders    | 清除缓存目录下旧的headers                   |
| yum clean,yum clean all | 除缓存目录下的软件包及旧的headers               |

## yum 源

- yum之所以能自动查找依赖关系，得益于资源仓库Repository的配置，在yum server端的仓库Repository中存储有rpm的header（包括rpm包的描述、功能、提供的文件、依赖性等）以便于分析依赖关系。
- yum 源配置目录：/etc/yum.repos.d/
- 安装 yim 源 `yum -y install epel-release`
- 变更 yum 后清空缓存和重新建立缓存


## 更换yum源
> aliyun


安装 yum 源
```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```



更新
```shell
yum update -y
```



清理，更新缓存

```shell
yum clean all
yum makecache
yum makecache fast
```

## yum 离线安装

```shell
# 安装工具
yum install yum-utils
# 下载离线包
yumdownloader --resolve htop
# 传输到目标机器安装
rpm -Uvh htop*.rpm
```
