# JumpServer

> JumpServer 是广受欢迎的开源堡垒机，是符合 4A 规范的专业运维安全审计系统。JumpServer 帮助企业以更安全的方式管控和登录所有类型的资产，实现事前授权、事中监察、事后审计，满足等保合规要求。


## 单机部署

- 系统要求
  - 4C/8/100G
  - yum install -y wget curl tar gettext iptables
  - MySQL 5.7+
  - Redis 6.0+
- 安装过过程
  - 下载 jumpserver-ce: https://community.fit2cloud.com/#/products/jumpserver/downloads
  - cd /opt && tar -xf jumpserver-ce-v4.10.16-x86_64.tar.gz && cd jumpserver-ce-v4.10.16-x86_64 (自行纠正版本信息)
  - 修改配置: `vim config-example.txt`，重点修改数据库，安装过程发现无法修改类型。其他内容看说明修改就行
  - 执行安装: `./jmsctl.sh install`
  - 启动: `./jmsctl.sh start`
  - 首次登录，改密码 (默认为 `admin / ChangeMe`)




