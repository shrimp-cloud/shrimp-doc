# 仓库管理

# 概述
> 为方便公共依赖包的发布，需要维护一个个人仓库。

# 原理
- 使用 github 做包存储 (本质是一个 git仓库)
- 访问使用 raw，就可以把 git 仓库作为 mvn 仓库使用
- 服务器 repo 目录直接开放
- 以上五种方法，都各种问题，还得用 nexus

# 使用
1. 搭建 nexus
```
http://mvn.wkclz.com
```
2. 需要部署的项目上，添加配置 【自行修改路径】
```
    <distributionManagement>
        <repository>
            <id>wkclz-release</id>
            <name>wkclz-release</name>
            <url>http://mvn.wkclz.com/repository/wkclz-release/</url>
        </repository>
        <snapshotRepository>
            <id>wkclz-snapshot</id>
            <name>wkclz-snapshot</name>
            <url>http://mvn.wkclz.com/repository/wkclz-snapshot/</url>
        </snapshotRepository>
    </distributionManagement>
```
3. 添加账号配置
```
        <server>
            <id>wkclz-release</id>
            <username>username</username>
            <password>passwd</password>
        </server>
        <server>
            <id>wkclz-snapshot</id>
            <username>username</username>
            <password>passwd</password>
        </server>

```
4. 需要部署的项目上，执行 deploy
5. 在需要引用包的项目上，添加配置
```
    <repositories>
        <repository>
            <id>wkclz-public</id>
            <url>http://mvn.wkclz.com/repository/wkclz-public/</url>
            <snapshots>
                <enabled>true</enabled>
                <updatePolicy>always</updatePolicy>
            </snapshots>
        </repository>
    </repositories>

```
6. 为方便全部项目可用此仓库，可以将此仓库加入到 mvn 的 setting 中。
7. 强制使用快照是为了更好的进行包管理，当然也影响了包获取的速度和成功率。

