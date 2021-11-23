# 安装 Docker【未完成】

### 环境准备
- yum install -y yum-utils device-mapper-persistent-data lvm2
- yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
- yum makecache fast
### 安装 Docker
- yum -y install docker-ce
- 若安装冲突，需要 yum remove 冲突的依赖包

- 镜像加速：
```bash
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://9o7dslh2.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
```

### 启动 Docker 后台服务
- systemctl start docker

### 测试运行 hello-world,由于本地没有hello-world这个镜像，所以会下载一个hello-world的镜像，并在容器内运行。
- docker run hello-world


# pringboot 打包 docker
### 添加依赖
```xml
            <!-- Docker maven plugin -->
            <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <version>1.0.0</version>
                <configuration>
                    <imageName>${docker.image.prefix}/${project.artifactId}</imageName>
                    <dockerDirectory>src/main/docker</dockerDirectory>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                        </resource>
                    </resources>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>javax.activation</groupId>
                        <artifactId>activation</artifactId>
                        <version>1.1.1</version>
                    </dependency>
                </dependencies>
            </plugin>
            <!-- Docker maven plugin -->
```
### 添加 dockerfile
- 在 src/main 下创建 docker 目录，再添加 Dockerfile 文件

### 打包
- Jenkins: clean -Dmaven.test.skip=true package docker:build
- Jenkins 权限问题：修改/lib/systemd/system/docker.service文件，增加启动参数  -G apps
```aidl
$ systemctl daemon-reload
$ systemctl restart docker
```