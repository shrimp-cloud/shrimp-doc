# milvus 向量数据库

> Milvus 是一个为 GenAI 应用程序构建的开源向量数据库。使用 pip 安装，执行高速搜索，并在性能损失最小的情况下扩展到数十亿个向量。


## 基本信息

- 官网: [https://milvus.io/](https://milvus.io/)
- 文档: [https://milvus.io/docs/](https://milvus.io/docs/)
- Github: [https://github.com/milvus-io/milvus](https://github.com/milvus-io/milvus)
- 语言: Python


## 安装


### Milvus Lite

- 自行安装 Python
- 安装 Milvus Lite: `pip install -U pymilvus`
- 创建向量数据库: `MilvusClient("./demo.db")`
- 尽情的使用

```jupyter
from pymilvus import MilvusClient
client = MilvusClient("./milvus_demo.db")
```


### Milvus Standalone

- 以下是官网 Docker 安装脚本

```shell
# Download the installation script
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
# Start the Docker container
bash standalone_embed.sh start
# restart
bash standalone_embed.sh restart
```

- 界面: http://127.0.0.1:9091/webui/
- 使用

```jupyter
from pymilvus import MilvusClient
client = MilvusClient(uri="http://localhost:19530", token="username:password")
```


### Milvus Distributed

> Milvus Distributed 可部署在Kubernetes集群上。

- [搭建 k8s 集群](../k8s_install/index.md)
- 安装 StorageClass: https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/
- 安装 Milvus: `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml`
- 创建 Milvus 集群: `kubectl apply -f kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml`
- 创建 svc 开放入口给应用使用 (略)
- 使用 node_port 开放端口到主机，或外部网络 (略)
- 使用 Ingress 开放 WebUI 用于日常维护

## 使用

```jupyter
# 引入包
from pymilvus import MilvusClient

# 连接到 Lite 版的 db 文件
client = MilvusClient("./milvus_demo.db")

# 连接到 milvus
client = MilvusClient(uri="http://localhost:19530", token="username:password")

```

