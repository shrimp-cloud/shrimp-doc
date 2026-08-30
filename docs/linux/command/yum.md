# Yum

> Yum（全称为 Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 CentOS 中的 Shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。
> 注：RHEL 8 / Rocky 8 及以上系统中，yum 命令实际由 dnf 提供，用法完全兼容，详见 [dnf](dnf.md)。

## 使用方法

- 命令形式：`yum [options] [command] [package ...]`
  - options 是可选的，选项包括 -h（帮助）、-y（当安装过程提示选择时全部为 yes）、-q（不显示安装过程）等。
  - command 是所要进行的操作，包括 install、update、remove、list、info 等。
  - package 是操作的对象。
- 示例：`yum -y install vim git`

## 常用命令

| 命令                      | 含义                                 |
|-------------------------|------------------------------------|
| yum install xxx         | 安装指定程序包                            |
| yum update xxx          | 更新指定程序包                            |
| yum check-update        | 检查可更新的程序                           |
| yum upgrade xxx         | 升级指定程序包（与 update 等价）               |
| yum info                | 列出所有可用包的详细信息（含已安装与可安装）           |
| yum info xxx            | 显示指定安装包的信息                         |
| yum list                | 显示所有已经安装和可以安装的程序包                  |
| yum list xxx            | 显示指定程序包安装情况                        |
| yum list updates        | 列出所有可以更新的程序包                       |
| yum list installed      | 列出所有已安装的程序包                        |
| yum list extras         | 列出所有已安装但不在 yum Repository 中的程序包    |
| yum deplist xxx         | 查看指定程序包的依赖关系                       |
| yum search xxx          | 查找指定程序包，xxx 可以是包名的一部分，会列出所有包含 xxx 的包名 |
| yum remove xxx          | 卸载指定程序包                            |
| yum history             | 查看软件安装卸载的历史记录，可用于回滚               |
| yum clean packages      | 清除缓存目录下的软件包                        |
| yum clean headers       | 清除缓存目录下的 headers                    |
| yum clean oldheaders    | 清除缓存目录下旧的 headers                   |
| yum clean all           | 清除缓存目录下的软件包及旧的 headers             |

## yum 源

- yum 之所以能自动查找依赖关系，得益于资源仓库 Repository 的配置，在 yum server 端的仓库 Repository 中存储有 rpm 的 header（包括 rpm 包的描述、功能、提供的文件、依赖性等）以便于分析依赖关系。
- yum 源配置目录：/etc/yum.repos.d/
- 安装 EPEL 源：`yum -y install epel-release`
- 变更 yum 源后，清空缓存并重新建立缓存

## 更换 yum 源

> 以阿里云镜像源为例

安装 yum 源

```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```

> 注意：CentOS 8 已于 2021 年底 EOL，官方源已停服；CentOS 7 请将地址中的 Centos-8 替换为 Centos-7。新系统建议直接使用 Rocky Linux / AlmaLinux，或改用腾讯云、清华等镜像源。

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
# 下载离线包（--resolve 连同依赖一起下载）
yumdownloader --resolve htop
# 传输到目标机器安装
rpm -Uvh htop*.rpm
```
