# KVM

## 安装 kvm
```shell
# 确保你的 CPU 支持虚拟化技术 (输出为 0, 说明不支持，或需要在BIOS/UEFI中开启。输出大于0，则表示已经支持)
egrep -c '(vmx|svm)' /proc/cpuinfo

# 安装必要的软件包
dnf install @virtualization
dnf install qemu-kvm libvirt virt-install virt-manager libguestfs-tools-c
# 这个命令会安装一组与虚拟化相关的软件包，包括 QEMU-KVM、libvirt、Virt-Manager 等等。@virtualization 用不了，就用下面的 install

# 启动并启用 libvirtd 服务
systemctl start libvirtd
systemctl enable libvirtd
```

## Cockpit

> Cockpit 是一个现代的、易于使用的系统管理工具，支持通过 Web 界面管理 KVM 虚拟机。

### 安装
```shell
# 安装 Cockpit
dnf install cockpit cockpit-machines

# 启动并启用 Cockpit 服务
systemctl start cockpit
systemctl enable cockpit
```

### 访问

- 禁止访问 cockpit 的用户： /etc/cockpit/disallowed-users

- https://domain_ip:9090/
