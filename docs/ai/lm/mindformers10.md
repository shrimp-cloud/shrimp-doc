# mindformers

> 使用MindFormers大模型套件进行Llama2-7B模型的LoRA微调和推理，MindSpore Transformers套件的目标是构建一个大模型训练、微调、评估、推理、部署的全流程开发套件：提供业内主流的Transformer类预训练模型和SOTA下游任务应用，涵盖丰富的并行特性，期望帮助用户轻松的实现大模型训练和创新研发。


## 概念

| 概念          | 描述                                                                                                                                 |
|-------------|------------------------------------------------------------------------------------------------------------------------------------|
| 权重文件        | 深度学习和机器学习模型中的核心组成部分，它保存了模型在训练过程中学到的参数（parameters）。这些参数决定了模型如何将输入数据转换为输出结果。                                                         |
| 分词器         | 大模型的分词器文件（Tokenizer Files） 是自然语言处理（NLP）中非常关键的一类资源，它们定义了如何将原始文本（如句子、段落）转换为模型可以理解的数字形式（即 token IDs），以及如何将模型输出的 token IDs 还原为人类可读的文本。 |
| NovelSet数据集 | 开源的指令微调数据集，包括新闻撰写、常识对话、小说扩写等指令数据。                                                                                                  |



## 设备

> 设备将在实验过程进行调整。

- 操作系统: Rocky Linux 9 (RHEL9)
- GPU: 无
- CPU: 8vCPU
- 内存: 16G
- 磁盘: 100G

## 环境准备

### 基础环境

```shell
# 安装 python3, python3-pip
dnf install -y python3 python3-pip
```

### 应用环境

```shell
# 拉取代码
cd ~
git clone -b r1.0 https://gitee.com/mindspore/mindformers.git
cd mindformers

# 创建虚拟环境
python -m venv .venv && source .venv/bin/activate
# 通过脚步安装mindformers模块

# 安装基础依赖
# sh build.sh 安装依赖失败，使用如下方式先安装依赖
pip install --upgrade pip -i https://repo.huaweicloud.com/repository/pypi/simple/
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
pip install mindspore -i https://mirrors.aliyun.com/pypi/simple/
sh build.sh

# 查看模块列表
pip list
```

### 模型相关文件获取

```shell
# 模型存放目录
mkdir -p ~/mindformers/models/llama2 && cd ~/mindformers/models/llama2

# 下载权重文件
wget https://ascend-repo-modelzoo.obs.cn-east-2.myhuaweicloud.com/MindFormers/llama2/llama2_7b.ckpt
# 下载分词器
wget https://ascend-repo-modelzoo.obs.cn-east-2.myhuaweicloud.com/MindFormers/llama2/tokenizer.model


# 数据集存放目录
mkdir -p ~/mindformers/datasets/novelset && cd ~/mindformers/datasets/novelset

# 下载原始数据
wget https://hf-mirror.com/datasets/Delius/ChineseWebNovel/resolve/main/mergedwithNovelsDataset.jsonl
```


### 数据格式转换

> 将数据集转换成alpaca数据格式，方便后续使用alpaca数据预处理工具。

# novelset2alpaca.py

```python
import json
import time

list=[]
with open ("./mergedwithNovelsDataset.jsonl","r") as fp:
  for i in fp.readlines():
    k={}
    j=json.loads(i)
    k["instruction"]=j["Instruction"]
    k["input"]=j["Input"]
    k["output"]=j['Response']
    list.append(k)
with open("./novelset.json","w",encoding="utf-8") as f:
  json.dump(list,f,ensure_ascii = False)
```

```shell
# 格式转换
python novelset2alpaca.py
```



- 执行alpaca_converter.py，使用fastchat工具添加prompts模板，将原始数据集转换为多轮对话格式

```shell

python ~/mindformers/mindformers/tools/dataset_preprocess/llama/alpaca_converter.py \
  --data_path ~/mindformers/datasets/novelset/novelset.json \
  --output_path ~/mindformers/datasets/novelset/novelset-conversation.json.json

```

- 分词器预处理并保存成Mindrecord格式

> 执行llama_preprocess.py，进行数据预处理、Mindrecord数据生成，将带有prompt模板的数据转换为Mindrecord格式。


```shell
python ~/mindformers/mindformers/tools/dataset_preprocess/llama/llama_preprocess.py \
  --dataset_type qa \
  --input_glob ~/mindformers/datasets/novelset/novelset-conversation.json \
  --model_file ~/mindformers/models/llama2/tokenizer.model \
  --seq_length 2048 \
  --output_file ~/mindformers/datasets/novelset/novelset.mindrecord

# 报错，版本不匹配
```
