# k8s 命令

> 常用命令

| 命令                               | 含义          | 说明  |
|----------------------------------|-------------|-----|
| kubectl get nodes                | 查看 nodes 状态 | -   |
| kubectl get pod --all-namespaces | 查看所有命名空间pod | -   |
| kubectl get pod -A               | 同上          | -   |
| crictl images                    | 查看 现有镜像     | -   |



### ctr
| 命令                                                      | 含义          |
|---------------------------------------------------------|-------------|
| ctr image list, ctr i list , ctr i ls                   | 查看ctr image |
| ctr -n k8s.io i tag xxxx/pause:3.2 k8s.gcr.io/pause:3.2 | 镜像标记tag     |
| ctr -n k8s.io i rm k8s.gcr.io/pause:3.2                 | 删除镜像        |
| ctr -n k8s.io i pull -k k8s.gcr.io/pause:3.2            | 拉取镜像        |
| ctr -n k8s.io i push -k k8s.gcr.io/pause:3.2            | 推送镜像        |
| tr -n k8s.io i export pause.tar k8s.gcr.io/pause:3.2    | 导出镜像        |
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
| crictl logs _containerd_id          | 获取容器的所有日志   |
| crictl logs --tail=2 _containerd_id | 获取最近的 N 行日志 |
| crictl pull busybox                 | 拉取镜像        |

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


### 镜像同步方案
热心网友的镜像同步方案：
- https://github.com/anjia0532/gcr.io_mirror