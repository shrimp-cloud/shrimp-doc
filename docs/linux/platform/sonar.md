# Sonar


## 基础信息

- 官网: [https://www.sonarqube.org/](https://www.sonarqube.org/)
- 源码: [https://github.com/SonarSource/sonarqube](https://github.com/SonarSource/sonarqube)


## 安装

> 使用 Docker 方式安装

- Docker 安装： 参照 k8s 集群安装方式
- 拉取镜像: `docker pull sonarqube:latest`
- 启动: `docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest`
- 访问: http://ip:9000/ admin / admin
- 修改密码: 请严格按照要求设置密码


## 使用


### 创建项目

- 创建项目:
  - 创建本地项目
  - 代码分析方法：本地

### Idea 连接

- Idea 安装插件: SonarQube for IDE
- Idea 插件，配置 SonarQube Server
- Idea 插件, 绑定 Sonar 上的项目

### 项目扫描

- 实时扫描: File -> Settings -> Tools -> SonarQube -> Scanner for IDE
- 手动扫描: 项目右键 -> SonarQube For IDE -> Analyze with SonarQube
- 代码分析: 项目添加 sonar 依赖 (见下方plugin 配置)
- 扫描1: 插件处，双击 `sonar:sonar` 触发扫描
- 扫描2: `mvn clean verify sonar:sonar -Dsonar.projectKey=shrimp-cloud -Dsonar.projectName='your_project_key' -Dsonar.host.url=http://localhost:9000 -Dsonar.token=your_token`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <properties>
        <sonar.host.url>http://localhost:9000</sonar.host.url>
        <sonar.login>your_token</sonar.login>
        <sonar.projectKey>your_project_key</sonar.projectKey>
    </properties>
    <build>
        <plugins>
            <plugin>
                <groupId>org.sonarsource.scanner.maven</groupId>
                <artifactId>sonar-maven-plugin</artifactId>
                <version>5.1.0.4751</version>
            </plugin>
        </plugins>
    </build>
</project>
```

### 项目处理

- SonarQube 上可看见扫描结果，即可按照扫描的问题对代码进行优化
