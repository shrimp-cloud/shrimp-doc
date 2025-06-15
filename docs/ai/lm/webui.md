# Open WebUI

> Open WebUI is an extensible, feature-rich, and user-friendly self-hosted AI platform designed to operate entirely offline. It supports various LLM runners like Ollama and OpenAI-compatible APIs, with built-in inference engine for RAG, making it a powerful AI deployment solution.

## InStall



### Python pip

```shell
# 安装 pip
dnf install -y python-pip
# 安装 open-webui
pip install open-webui
# 运行 open-webui
open-webui serve

# 报错：
# ROR: Could not find a version that satisfies the requirement open-webui (from versions: none)
# ERROR: No matching distribution found for open-webui
```

### Docker

```shell
dnf install -y docker
docker pull ghcr.io/open-webui/open-webui:main

docker run -d -p 3000:8080 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always ghcr.io/open-webui/open-webui:main \
  --add-host=host.docker.internal:host-gateway
```



