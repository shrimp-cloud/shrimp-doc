# OpenClaw


## 准备

- 一个全新的系统 (当前为 RockyLinux10)
- 一个 IM 账号，并完成相关配置 (当前使用 飞书)



## 安装步骤
- 新建系统账号:
  - 创建账号: `useradd -m openclaw`
  - 设置密码: `passwd openclaw`
  - 赋予 sudo 权限: `usermod -aG wheel openclaw`
  - 切换账号: `su - openclaw`
- 安装 OpenClaw: `curl -fsSL https://openclaw.ai/install.sh | bash` (耗时较长)
- 配置向导: `openclaw onboard --install-daemon`


