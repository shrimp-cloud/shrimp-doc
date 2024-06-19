# 命令 ctl

> 常用命令

| 命令                               | 含义          | 说明  |
|----------------------------------|-------------|-----|
| kubectl get nodes                | 查看 nodes 状态 | -   |
| kubectl get pod --all-namespaces | 查看所有命名空间pod | -   |
| kubectl get pod -A               | 同上          | -   |
| crictl images                    | 查看 现有镜像     | -   |

```shell
# 列举已完成的 pod
kubectl get pod --field-selector=status.phase==Succeeded -A
# 删除所有已完成的pod
kubectl delete pod --field-selector=status.phase==Succeeded -A
```


### ctr
| 命令                                                      | 含义          |
|---------------------------------------------------------|-------------|
| ctr image list, ctr i list , ctr i ls                   | 查看ctr image |
| ctr -n k8s.io i tag xxxx/pause:3.2 k8s.gcr.io/pause:3.2 | 镜像标记tag     |
| ctr -n k8s.io i rm k8s.gcr.io/pause:3.2                 | 删除镜像        |
| ctr -n k8s.io i pull -k k8s.gcr.io/pause:3.2            | 拉取镜像        |
| ctr -n k8s.io i push -k k8s.gcr.io/pause:3.2            | 推送镜像        |
| ctr -n k8s.io i export pause.tar k8s.gcr.io/pause:3.2   | 导出镜像        |
| ctr -n k8s.io i import pause.tar                        | 导入镜像        |

### crictl
| 命令                                  | 含义          |
|-------------------------------------|-------------|
| crictl inspect _containerd_id       | 列出业务容器状态    |
| crictl pods                         | 查看运行中的容器    |
| crictl pods --name _name            | 打印某个固定pod   |
| crictl images                       | 打印镜像        |
| crictl ps -a                        | 打印容器清单      |
| crictl ps                           | 打印正在运行的容器清单 |
| crictl exec -i -t _containerd_id ls | 容器上执行命令     |
| crictl exec -it _containerd_id bash | 进入容器        |
| crictl logs _containerd_id          | 获取容器的所有日志   |
| crictl logs --tail=2 _containerd_id | 获取最近的 N 行日志 |
| crictl pull busybox                 | 拉取镜像        |
| crictl rmi --prune                  | 清理未在使用的镜像   |

### 命令对比
| Containerd命令                   | Docker命令                              | 描述             |
|--------------------------------|---------------------------------------|----------------|
| ctr task ls                    | docker ps                             | 查看运行容器         |
| ctr image ls                   | docker images                         | 获取image信息      |
| ctr image pull pause           | docker pull pause                     | pull 应该pause镜像 |
| ctr image push pause-test      | docker push pause-test                | 改名             |
| ctr image import pause.tar     | docker load 镜像                        | 导入本地镜像         |
| ctr run -d pause-test pause    | docker run -d --name=pause pause-test | 运行容器           |
| ctr image tag pause pause-test | docker tag pause pause-test           | tag应该pause镜像   |



### Pod 异常
| 名称                                  | 含义                 |
|-------------------------------------|--------------------|
| CrashLoopBackOff                    | 容器退出，kubelet正在将它重启 |
| InvalidImageName                    | 无法解析镜像名称           |
| ImageInspectError                   | 无法校验镜像             |
| ErrImageNeverPull                   | 策略禁止拉取镜像           |
| ImagePullBackOff                    | 正在重试拉取             |
| RegistryUnavailable                 | 连接不到镜像中心           |
| ErrImagePull                        | 通用的拉取镜像出错          |
| CreateContainerConfigError          | 不能创建kubelet使用的容器配置 |
| CreateContainerError                | 创建容器失败             |
| internalLifecycle.PreStartContainer | 执行hook报错           |
| RunContainerError                   | 启动容器失败             |
| PostStartHookError                  | 执行hook报错           |
| ContainersNotInitialized            | 容器没有初始化完毕          |
| ContainersNotReady                  | 容器没有准备完毕           |
| ContainerCreating                   | 容器创建中              |
| PodInitializing                     | pod 初始化中           |
| DockerDaemonNotReady                | docker还没有完全启动      |
| NetworkPluginNotReady               | 网络插件还没有完全启动        |


### Pod uffy
| 状态        | 含义   | 说明                                                                                |
|-----------|------|-----------------------------------------------------------------------------------|
| Pending   | 等待中  | Pod已经被创建，但还没有完成调度，或者说有一个或多个镜像正处于从远程仓库下载的过程。处在这个阶段的Pod可能正在写数据到etcd中、调度、pull镜像或启动容器 |
| Running   | 运行中  | 该 Pod 已经绑定到了一个节点上，Pod 中所有的容器都已被创建。至少有一个容器正在运行，或者正处于启动或重启状态。                       |
| Succeeded | 正常终止 | Pod中的所有的容器已经正常的执行后退出，并且不会自动重启，一般会是在部署job的时候会出现。                                   |
| Failed    | 异常停止 | Pod 中的所有容器都已终止了，并且至少有一个容器是因为失败终止。也就是说，容器以非0状态退出或者被系统终止。                           |
| Unkonwn   | 未知状态 | API Server无法正常获取到Pod对象的状态信息，通常是由于其无法与所在工作节点的kubelet通信所致。                          |


### 其他

#### 镜像从 docker 导入到 containerd

- `docker save my-image:tag > my-image-tag.tar`
- `ctr -n=k8s.io images import my-image-tag.tar`
- `crictl images`
