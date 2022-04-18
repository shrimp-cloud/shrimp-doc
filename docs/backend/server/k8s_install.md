# K8S 安装

***

## 安装  nfs-utils 用于挂载 nfs 网络存储
```shell script
yum install -y nfs-utils
```

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





