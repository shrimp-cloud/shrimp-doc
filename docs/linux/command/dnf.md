# Dnf 包管理工具

> DNF（Dandified YUM）是新一代的 RPM 软件包管理器，是 Yum 的继任者，在 RHEL 8/9、Rocky Linux 8/9、Fedora 22+ 中作为默认包管理器，命令用法与 yum 基本兼容。

## 与 yum 的关系

- dnf 是 yum 3.x 的重写版本，底层同样基于 RPM，依赖解析由 libsolv 完成，速度更快、依赖处理更可靠。
- RHEL 8/9 及 Rocky Linux 中，`yum` 命令已被软链接到 `dnf`，两者等价。
- CentOS 7 默认使用 yum；RHEL 9 / Rocky 9 默认使用 dnf。

## 常用命令

| 命令                          | 含义                                   |
|-----------------------------|--------------------------------------|
| dnf install xxx             | 安装软件包                               |
| dnf update / dnf upgrade    | 更新软件包（upgrade 与 update 等价）           |
| dnf remove xxx              | 卸载软件包                               |
| dnf search xxx              | 搜索软件包                               |
| dnf info xxx                | 查看软件包信息                             |
| dnf list installed          | 列出已安装的软件包                           |
| dnf list updates            | 列出可更新的软件包                           |
| dnf provides /path/to/file  | 查看某个文件由哪个软件包提供（反向查询）               |
| dnf repolist                | 查看已配置的软件源                           |
| dnf clean all               | 清理缓存                                |
| dnf makecache               | 生成缓存                                |
| dnf history                 | 查看事务历史，支持回滚                        |
| dnf autoremove              | 卸载软件时自动移除不再需要的依赖包                 |

## 软件源配置

- 源配置目录：/etc/yum.repos.d/（dnf 复用该目录）
- 常用操作示例

```shell
# 查看已配置的软件源
dnf repolist
# 启用 EPEL 源
dnf install -y epel-release
# 更换源后清理并重建缓存
dnf clean all && dnf makecache
```

## 常用示例

```shell
# 安装 nginx 并设置开机自启动
dnf install -y nginx
systemctl enable --now nginx

# 查看 nginx 是否已安装
dnf list installed | grep nginx

# 反向查询 /usr/bin/nginx 由哪个包提供
dnf provides /usr/bin/nginx

# 卸载 nginx 并清理不再需要的依赖
dnf remove nginx
dnf autoremove
```
