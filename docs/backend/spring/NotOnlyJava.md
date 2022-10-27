# 打包非java文件

> 在 src 下，默认只会打包 java 文件，若为了方便，放了 非java 文件，想一起打包，需要进行一些配置

### 打包 mapper.xml 文件
当然，这里只是自己的一个习惯，将 xml 文件靠近 dao, 方便维护。大众的习惯更多是放在 resources 下。同时可能 resources 下的部分文件不希望被打入 jar 中
```xml
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <!-- 将匹配上的文件一起打包 -->
                <include>com/**/*Mapper.xml</include>
            </includes>
        </resource>
        <resource>
            <!-- 仍然需要打包 resources 下的其他文件 -->
            <directory>src/main/resources</directory>
            <excludes>
                <!-- 排除 resources 下的部分文件 -->
                <exclude>**/application-dev.yml</exclude>
                <exclude>**/application-uat.yml</exclude>
            </excludes>
        </resource>
    </resources>
</build>
```