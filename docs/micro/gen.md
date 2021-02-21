# 代码生成器
> 代码生成器是一个能快速生成代码的工具。

## 原因解析
1. 从数据库读出表结构信息
2. 按代码逻辑写好代码生成的模板，与表结构相关的信息全部用变量做占位符
3. 表结构信息与模板作用，得到代码文本
4. 代码文本在项目架构中，保证语法的正确性，就成为一个可支行的项目

## 代码生成器配置
1. 维护数据库:
    - console 控制台 -> 代码生成器 -> 数据库
    - 新增数据库，数据库链接为JDBC链接，表前缀为匹配具体的表，用于生成代码，《忽略的表》为不希望生成代码的表，可能为测试用途的表，《忽略的字段》为系统中定义的基础字段
2. 项目维护：
    - console 控制台 -> 代码生成器 -> 项目
    - 选择数据库，填写基本信息，完成项目的新增
3. 任务维护：
    - console 控制台 -> 代码生成器 -> 任务
    - 在生成项目时，已经默认生成了任务，可对任务做编辑，若路径不对，可以进行修改
    - 任务项目基本路径：生成文件的路径，不包含类路径
    - 任务包路径：类路径
4. 模板：
    - console 控制台 -> 代码生成器 -> 模板
    - 纯增删改查的模板维护。模板内容都是经过调试的，不能随便改动。
    

## 代码生成器使用
1. 在具体项目中，pom 添加插件:
    ```xml
    <build>
        <plugins>
            <plugin>
                <groupId>com.wkclz.gen</groupId>
                <artifactId>lz-gen-plugin</artifactId>
                <version>3.1.0-SNAPSHOT</version>
                <configuration>
                    <options>
                        <!-- auth-code 在 console 控制台 -> 代码生成器 -> 项目 中找 -->
                        <option>auth-code</option>
                    </options>
                </configuration>
            </plugin>
        </plugins>
    </build>
   ```
2. 获取 auth-code 填写到 xml 中
3. maven -> Plugins -> lz-gen 双击即可
