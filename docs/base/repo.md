# 仓库管理

# 概述
> 为方便公共依赖包的发布，需要维护一个个人仓库。

# 原理
- 使用 github 做包存储 (本质是一个 git仓库)
- 访问使用 raw，就可以把 git 仓库作为 mvn 仓库使用

# 使用
1. 克隆(创建)仓库项目
```
git clone https://github.com/wkclz/mvn-repository.git
```
2. 需要部署的项目上，添加配置 【自行修改路径】
```
    <distributionManagement>
        <repository>
            <id>nexus</id>
            <name>nexus</name>
            <url>file:${user.home}/path/to/mvn-repository</url>
        </repository>
        <snapshotRepository>
            <id>Nexus Snapshot</id>
            <url>file:${user.home}/path/to/mvn-repository</url>
        </snapshotRepository>
    </distributionManagement>
```
3. 需要部署的项目上，执行 deploy
4. push mvn-repository 项目
5. 在需要引用包的项目上，添加配置
```
    <repositories>
        <repository>
            <id>github-mvn</id>
            <url>https://github.com/wkclz/mvn-repository/raw/master</url>
            <snapshots>
                <enabled>true</enabled>
                <updatePolicy>always</updatePolicy>
            </snapshots>
        </repository>
    </repositories>
```
6. 为方便全部项目可用此仓库，可以将此仓库加入到 mvn 的 setting 中。
6. 强制使用快照是为了更好的进行包管理，当然也影响了包获取的速度和成功率。

# 可选升级方案
1. 自行搭建 nexus 进行包管理
2. 项目足够成熟之后，发布 release 包到 mvn 中央仓库