# Systemd

## 含义
> systemd (system daemon)  是一个 Linux 系统基础组件的集合,提供了一个系统和服务管理器,运行为 PID 1 并负责启动其它程序。


## 命名风格
> systemd这一名字源于Unix中的一个惯例：在Unix中常以“d”作为系统守护进程（英语：daemon，亦称后台进程）的后缀标识。除此以外，systemd亦是借代英文术语D体系，而这一术语即是用于描述一个人具有快速地适应环境并解决困难的能力。


## systemctl

systemctl 用于管理 systemd 的行为。可以用于启动/停止其他系统服务

以下使用 firewalld 来讲解 systemctl 的使用

| 命令                              | 含义                   |
|---------------------------------|----------------------|
| `systemctl start firewalld`     | 启动防火墙                |
| `systemctl stop firewalld`      | 停止防火墙                |
| `systemctl restart firewalld`   | 重启防火墙                |
| `systemctl reload firewalld`    | 重新加载防火墙              |
| `systemctl enable firewalld`    | 下次开机自启动防火墙           |
| `systemctl disable firewalld`   | 取消下次开机自启动防火墙         |
| `systemctl status firewalld`    | 查看防火墙状态              |
| 其他不常用命令                         | -                    |
| `systemctl is-active firewalld` | 查看防火墙正在运行            |
| `systemctl is-enable firewalld` | 查看防火墙有没有开机自启动        |
| `systemctl kill firewalld`      | 向防火墙发送关闭信号(并不马上强制关闭) |
| `systemctl show firewalld`      | 列举防火墙配置              |
| `systemctl mask firewalld`      | 注销防火墙，注销后就无法启动了      |
| `systemctl unmask firewalld`    | 取消注销防火墙              |


什么样的服务才能使用  systemctl 操作：
1. 在 /etc/systemd/system 或者在 /usr/lib/systemd/system 目录下存在 .service 文件
2. 在 .service 文件中定义服务的启动方式、环境变量以及其他选项，例如服务的启动命令、所需的用户和组等。
3. 使用 systemctl reload 命令重新加载 systemd 配置，使其能够识别新的服务。
4. 一般通过包管理工具（比如 yum） 安装的软件，都能通过 systemctl 进行控制
