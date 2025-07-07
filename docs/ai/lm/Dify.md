# Dify

> Dify 是一款开源的大语言模型(LLM) 应用开发平台。它融合了后端即服务（Backend as Service）和 LLMOps 的理念，使开发者可以快速搭建生产级的生成式 AI 应用。即使你是非技术人员，也能参与到 AI 应用的定义和数据运营过程中。


## OS X安装

```shell
# 拉取代码
git clone https://github.com/langgenius/dify.git --branch 0.15.3
# 进入 Docker 目录
cd dify/docker
# 配置文件
cp .env.example .env
# 启动
docker compose up -d
# 检查启动状态
docker compose ps

# 更新
cd dify/docker
docker compose down
git pull origin main
docker compose pull
docker compose up -d
```


## 配置

- 访问： http://localhost/install
- 邮箱：admin@wkclz.com
- 用户名：admin
- 密码：不告诉你


过程报错及解决：
- 报网络连接问题：请爬墙
- 报没有docker-credential-desktop： 在 `~/.docker/config.json` 中将 credsStore 配置居空引号
- 报：incorrect username or password：需要 `docker login`


