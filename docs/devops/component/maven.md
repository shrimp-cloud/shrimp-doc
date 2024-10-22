# Maven

## Maven 下载

- https://maven.apache.org/download.cgi
- 选择 【Binary tar.gz archive】版本
- 使用 wget 下载到服务器中

## 安装
- 建议安装目录：`/opt/maven`

## 环境变量

```shell
# vim /etc/profile.d/maven.sh
export M2_HOME=/opt/maven
export PATH=M2_HOME/bin:$PATH

# source /etc/profile
```


## 使用

- 参照正常使用方式。暂不完善
