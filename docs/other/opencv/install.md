# OpenCV 安装

> 以下针对 java 语言

## 使用

```java
public class OpenCvTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
}
```

- 在使用之前，您还需要安装OpenCV的动态连接库。以下是不同的操作系统的安装方式


## Windows

- 访问 https://opencv.org/releases/
- 获取最新版本OpenCV下的 Windows 版本库
- 默认路径安装
- 安装完成后，将此位置的 ddl 复制到 JDK的 bin 目录下：C:/Program Files/opencv/build/java/x64
- 将以下位置的 jar 包集成到项目中：C:/Program Files/opencv/build/java 【OpenCV 居然不发布中央仓库，此处可选择自行发布到私有仓库】


## Mac 【待实践】

- https://blog.csdn.net/Mattscl/article/details/134259677

## x86 Linux 【待实践】

## Arm Linux 【待实践】

## others 【待实践】
