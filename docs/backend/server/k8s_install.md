# K8S 安装

***

[toc]

## 系统要求
- CentOS 7.x

***

## 前期准备

- 修改主机名，使得每个节点都有自己的名称
```shell script
hostnamectl set-hostname ser01
```

- 关闭防火墙
```shell script
systemctl stop firewalld
systemctl disable firewalld
```

- 关闭 selinux
```shell script
# vim /etc/selinux/config
SELINUX=disabled
# :wq
# setenforce 0
```

-  关闭 swap
```shell script
# vim /etc/fstab
注释掉 swap
```

- host 解析
```shell script
# vim /etc/hosts
172.12.12.230 dev02.test.com
172.12.12.208 dev02.test.com
```

- sysctl
 ```shell script
# vim /etc/sysctl.conf
vm.swappiness = 0  #     （尽量不使用交换分区，注意不是禁用）
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
net.ipv6.conf.all.forwarding = 1
# :wq
# swapoff -a && swapon -a  # 可以执行命令刷新一次SWAP（将SWAP里的数据转储回内存，并清空SWAP里的数据）
# sysctl -p  #  (执行这个使其生效，不用重启)
```



## 安装 docker

```shell script
# 卸载旧版本：
yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
# 使用 Docker 仓库进行安装
# 安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。
yum install -y yum-utils device-mapper-persistent-data lvm2
# 使用以下命令来设置稳定的仓库。
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 使用以下命令来设置稳定的仓库。
yum install -y docker-ce docker-ce-cli containerd.io

# mkdir -p /etc/docker
# 修改或创建/etc/docker/daemon.json，加入下面的内容：
# vim /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "registry-mirrors": [
  	"https://t1gbabbr.mirror.aliyuncs.com",
  	"https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}

# :wq
systemctl start docker
systemctl daemon-reload
systemctl enable docker
```


## 安装  nfs-utils 用于挂载 nfs 网络存储
```shell script
yum install -y nfs-utils
```

## 卸载 k8s, kube* 方便重装
```shell script
kubeadm reset -f
modprobe -r ipip
lsmod
rm -rf ~/.kube/
rm -rf /etc/kubernetes/
rm -rf /etc/systemd/system/kubelet.service.d
rm -rf /etc/systemd/system/kubelet.service
rm -rf /usr/bin/kube*
rm -rf /etc/cni
rm -rf /opt/cni
rm -rf /var/lib/etcd
rm -rf /var/etcd
yum clean all
yum remove -y kube*
```

## 重新安装 k8s
```shell script

# vim /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
# :wq

yum clean all
yum makecache
yum install -y kubelet-1.17.3 kubeadm-1.17.3 kubectl-1.17.3

systemctl enable kubelet
systemctl start kubelet
```


# 到这里了


```

#1、下载master节点需要的镜像【选做】
#创建一个.sh文件，内容如下，
#!/bin/bash
images=(
	kube-apiserver:v1.17.3
    kube-proxy:v1.17.3
	kube-controller-manager:v1.17.3
	kube-scheduler:v1.17.3
	coredns:1.6.5
	etcd:3.4.3-0
    pause:3.1
)
for imageName in ${images[@]} ; do
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
done


kubeadm init \
--apiserver-advertise-address=172.12.12.230 \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
--kubernetes-version v1.17.3 \
--service-cidr=10.96.0.0/16 \
--pod-network-cidr=10.244.0.0/16


# 如果报错， kubeadm reset -f 后可重复执行

kubeadm join 172.12.12.230:6443 --token 5anm8z.haifjr9f7efh5fa4 \
    --discovery-token-ca-cert-hash sha256:b835513e919b6998ef09d75364d2f77c2f48ab6056ffa7351c1071ca4701f46d


```


***


# 修改docker Cgroup Driver为systemd [deprecated]
vim /usr/lib/systemd/system/docker.service
添加 【见下图】 ： --exec-opt native.cgroupdriver=systemd

systemctl start kubelet
systemctl enable kubelet

# 使用kubelet的启动参数–fail-swap-on=false去掉必须关闭Swap的限制  【配置已deprecated】
vim /etc/sysconfig/kubelet
KUBELET_EXTRA_ARGS="--fail-swap-on=false"
:wq

# 统一 cgroup 为 systemd
vim /var/lib/kubelet/kubeadm-flags.env
KUBELET_KUBEADM_ARGS="--cgroup-driver=systemd --network-plugin=cni --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.2"
:wq


# 需要配置国内镜像仓库
kubeadm init --image-repository registry.aliyuncs.com/google_containers

# 得到提示：
# dev01
Then you can join any number of worker nodes by running the following on each as root:
kubeadm join 172.12.12.189:6443 --token 20pg4c.gylicj0scluu855l \
    --discovery-token-ca-cert-hash sha256:ba0ad99712609fad2da9ee4cd83aa6b5c4f52db7cf124275265f1e975d4e2730 
# dev02
Then you can join any number of worker nodes by running the following on each as root:
kubeadm join 172.12.12.230:6443 --token e6xezg.2klk5i264l0s3ja8 \
    --discovery-token-ca-cert-hash sha256:e5367c49854759c9984d17fcbcda655205753b2681d603400d0be6277a760dad

# 启动成功
# 若启动失败， journalctl -xefu kubelet 可以看到错误详情

# token 24 小时过期，要重新生成
kubeadm token create --print-join-command

# 在master上生成用于新master加入的证书
kubeadm init phase upload-certs --upload-certs 

# master 加入
kubeadm join 172.12.12.189:6443 --token td2rt7.ps4q2ndl131s1hkb  \   
  --discovery-token-ca-cert-hash sha256:ba0ad99712609fad2da9ee4cd83aa6b5c4f52db7cf124275265f1e975d4e2730 \
  --control-plane --certificate-key 7cfbe6a7d17035ae9ba2a19926d98fafab5f49f8b697afa7783b1c17f415566b



```
![](../img/k8s_01.png)





