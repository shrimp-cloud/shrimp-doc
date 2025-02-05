# Ollama

## Install

### download

- https://ollama.com/download
- ollama 支持的所有模型: https://ollama.com/library


### ollama 命令
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

### Install on Mac

- install:
  - unzip and move to Application
  - run:  `ollama run qwen2.5:7b` # 无则下载，有则安装
  - stp: `/bye`

- ui
  - enchanted: https://github.com/AugustDev/enchanted

### Install on Rockylinux9

- install:
  - run: `curl -fsSL https://ollama.com/install.sh | sh`


### others

#### kvm gpu 虚拟化

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
