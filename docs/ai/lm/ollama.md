# Ollama

Ollama 是一个用于管理和运行大型语言模型的工具。它提供了以下主要功能：

1. 模型管理：支持下载、删除、拷贝和推送模型。
2. 模型运行：可以运行本地或远程的模型，并与之交互。
3. 跨平台支持：支持在 macOS 和 Linux 系统上安装和使用。
4. 命令行工具：提供了一系列命令行工具来管理模型，如 ollama list、ollama pull、ollama run 等。

Ollama 使得开发者能够更方便地使用和实验各种大型语言模型，如 GPT 等。

## 基础信息

- https://ollama.com/download
- ollama 支持的所有模型: https://ollama.com/library

## 在 Mac 上安装 Ollama

- visit: https://ollama.com/download
- dowmload: 【Download for Mac】
- unzip and move to Application

## 在 Windows 上安装 Ollama

- visit: https://ollama.com/download
- dowmload: 【Download for Windows】
- 使用安装向导进行安装即可

## 在 Linux 上安装 Ollama

- visit: https://ollama.com/download
- Install: `curl -fsSL https://ollama.com/install.sh | sh`
- Manual install:
  - `curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz`
  - `tar -C /usr -xzf ollama-linux-amd64.tgz`
  - `useradd -r -s /bin/false -U -m -d /usr/share/ollama ollama`
  - `usermod -a -G ollama $(whoami)`
  - 临时启动: `ollama serve`
  - 添加 service, 使用 systemctl 管理: 【见下方脚本】
- 配置：`vim /etc/systemd/system/ollama.service` (可以多个Environment共存)
  - 配置访问地址：`Environment="OLLAMA_HOST=0.0.0.0:11434"`
  - 配置模型路径：`Environment="OLLAMA_MODELS=/data/ollama/models"`
  - 允许跨域访问：`Environment="OLLAMA_ORIGINS=*"`
  - 加载 service: `systemctl daemon-reload`
  - 若自义了 models 目录，需要给权限：`chown -R ollama:ollama /data/ollama/models/`
- 使用 systemctl 管理 ollama


```shell
# vim /etc/systemd/system/ollama.service
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="PATH=$PATH"
Environment="OLLAMA_HOST=0.0.0.0:11434
Environment="OLLAMA_MODELS=/data/ollama/models"
Environment="OLLAMA_ORIGINS=*"

[Install]
WantedBy=default.target
```


## 下载模型

- run: `ollama pull qwen2.5:7b`

## 启动/停止模型

- run:  `ollama run qwen2.5:7b`
- stp: `/bye`


## 模型UI

- enchanted: https://github.com/AugustDev/enchanted
- Cherry Studio: https://cherry-ai.com/download
  - 安装，添加模型


## ollama 命令
| 命令          | 用途      |
|-------------|---------|
| ollama      | 使用帮助    |
| ollama list | 显示模型列表  |
| ollama show | 显示模型的信息 |
| ollama pull | 拉取模型    |
| ollama push | 推送模型    |
| ollama cp   | 拷贝一个模型  |
| ollama rm   | 删除一个模型  |
| ollama run  | 运行一个模型  |



## 其他(非重点)


### kvm gpu 虚拟化

```shell
# 安装 QEMU 的 VFIO（Virtual Function I/O）驱动
dnf -y install qemu-kvm-tools libguestfs-tools
# 加载 VFIO 驱动
echo "vfio" | tee -a /etc/modules-load.d/vfio.conf
echo "vfio_iommu_type1" | tee -a /etc/modules-load.d/vfio.conf
echo "vfio_pci" | tee -a /etc/modules-load.d/vfio.conf
echo "vfio_virqfd" | tee -a /etc/modules-load.d/vfio.conf
# 禁用 Nouveau 驱动（如果使用的是 NVIDIA GPU）
echo "blacklist nouveau" | tee -a /etc/modprobe.d/blacklist.conf
echo "blacklist lbm-nouveau" | tee -a /etc/modprobe.d/blacklist.conf
echo "options nouveau modeset=0" | tee -a /etc/modprobe.d/nouveau.conf
# 重新启动
init 6
# 编辑 libvirt 的默认网络配置，以启用 VFIO：
virsh net-edit default
# 在 <network> 标签内添加
# <host><qemu:commandline><qemu:arg value='-nodefaults'/><qemu:arg value='-audiodev'/><qemu:arg value='pa,id=audio0'/></qemu:commandline></host>

# 重启 libvirt
systemctl restart libvirtd
```

- net-edit  的内容:
```xml
  <host>
    <qemu:commandline>
      <qemu:arg value='-nodefaults'/>
      <qemu:arg value='-audiodev'/>
      <qemu:arg value='pa,id=audio0'/>
    </qemu:commandline>
  </host>
```

- 不识别集显，没有独显，无法继续实验。


