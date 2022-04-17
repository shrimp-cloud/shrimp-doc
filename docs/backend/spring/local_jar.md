# 使用本地jar引入

## 场景
jar只在本地有，不想上传到 mvn 仓库，只想在项目中带着

## 本地调试依赖
```xml
<dependency>
    <groupId>com.wkclz.demo</groupId>
    <artifactId>demo</artifactId>
    <version>1.0.1-SNAPSHOT</version>
    <scope>system</scope>
    <systemPath>${basedir}/src/main/resources/libs/demo-0.0.0-SNAPSHOT.jar</systemPath>
</dependency>
```
Tips:
1. scope 要指定为 system 才能从本地加载
2. systemPath 需要指定依赖包路径


## Spring打包
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <includeSystemScope>true</includeSystemScope>
            </configuration>
        </plugin>
    </plugins>
</build>
```
Tips: String 打包需要配置includeSystemScope=true 才会将jar 包打到 libs 里面去

## 疑点
1. 某些情况下会报无法通过 systemPath 引入依赖。影响因素未知
2. systemPath 所引入的 jar 包，不会自动引入其内部 pom 所定义的依赖，故需要将相关依赖重新引入

## 使用愉快
