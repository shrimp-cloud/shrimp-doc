# MaxKB

> MaxKB = Max Knowledge Base，是一款基于大语言模型和 RAG 的开源知识库问答系统，广泛应用于智能客服、企业内部知识库、学术研究与教育等场景。

## 基本信息

- 官网: https://maxkb.cn/
- 教程: https://maxkb.cn/docs/

## 安装

- 安装 Docker: 见 [Docker](../../linux/k8s_install/02_docker.md)
- 安装 MaxKB:
```shell
docker run -d --name=maxkb --restart=always -p 8080:8080 -v ~/.maxkb:/var/lib/postgresql/data -v ~/.python-packages:/opt/maxkb/app/sandbox/python-packages registry.fit2cloud.com/maxkb/maxkb
```
- 访问: http://ip:8080/
- 用户名/密码: admin / MaxKB@123.. 【登录后改密码】

