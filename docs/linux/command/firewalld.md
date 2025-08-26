# Firewalld 防火墙




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
| 打开一个端口      | firewall-cmd --permanent --zone=public --remove-port=80/tcp |
| 查看所有打开的端口   | firewall-cmd --zone=public --list-ports<br/>                |
| 更新防火墙规则     | firewall-cmd --reload                                       |
| 查看区域信息      | firewall-cmd --get-active-zones                             |
| 查看指定接口所属区域  | firewall-cmd --get-zone-of-interface=eth0                   |
| 拒绝所有包       | firewall-cmd --panic-on                                     |
| 取消拒绝状态      | firewall-cmd --panic-off                                    |
| 查看是否拒绝      | firewall-cmd --query-panic                                  |

