# Firewalld 防火墙

## 基本概念

> Firewalld 通过 zone（区域）来组织防火墙规则，不同区域对应不同的信任级别，默认区域为 public。
> 规则的作用范围分两种：
> - 不带 --permanent 的规则立即生效，但重启后丢失；
> - 带 --permanent 的规则永久生效，但需执行 firewall-cmd --reload 才会加载。

## 防火墙命令

| 用途          | 命令                                                          |
|-------------|-------------------------------------------------------------|
| 启动防火墙       | systemctl start firewalld                                   |
| 关闭防火墙       | systemctl stop firewalld                                    |
| 重启防火墙       | systemctl restart firewalld                                 |
| 显示防火墙的状态    | systemctl status firewalld                                  |
| 在开机时启用防火墙   | systemctl enable firewalld                                  |
| 在开机时禁用防火墙   | systemctl disable firewalld                                 |
| 查看防火墙是否开机启动 | systemctl is-enabled firewalld                              |
| 查看版本        | firewall-cmd --version                                      |
| 查看帮助        | firewall-cmd --help                                         |
| 显示状态        | firewall-cmd --state                                        |
| 打开一个端口      | firewall-cmd --permanent --zone=public --add-port=80/tcp    |
| 关闭一个端口      | firewall-cmd --permanent --zone=public --remove-port=80/tcp |
| 查看所有打开的端口   | firewall-cmd --zone=public --list-ports                     |
| 更新防火墙规则     | firewall-cmd --reload                                       |
| 查看区域信息      | firewall-cmd --get-active-zones                             |
| 查看指定接口所属区域  | firewall-cmd --get-zone-of-interface=eth0                   |
| 拒绝所有包       | firewall-cmd --panic-on                                     |
| 取消拒绝状态      | firewall-cmd --panic-off                                    |
| 查看是否拒绝      | firewall-cmd --query-panic                                  |

## 其他常用命令

| 用途             | 命令                                                       |
|----------------|----------------------------------------------------------|
| 开放服务（如 http）  | firewall-cmd --permanent --zone=public --add-service=http  |
| 查看已开放的服务      | firewall-cmd --zone=public --list-services                |
| 查看默认区域        | firewall-cmd --get-default-zone                            |
| 设置默认区域        | firewall-cmd --set-default-zone=public                     |
| 查看当前区域的所有规则  | firewall-cmd --zone=public --list-all                      |
| 临时规则转永久       | firewall-cmd --runtime-to-permanent                        |
