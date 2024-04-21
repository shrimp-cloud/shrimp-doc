# 常见API

## 读取与输出

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        // 读取图片
        Mat mat = Imgcodecs.imread("path_to_image.jpg");
        // 保存图片
        Imgcodecs.imwrite("path_to_image_new.jpg", mat);
        // 释放资源
        mat.release();
    }
}
```

## 显示

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        // 读取图片
        Mat mat = Imgcodecs.imread("path_to_image.jpg");
        // 展示图片
        HighGui.imshow("Display Image", mat);
        HighGui.waitKey(0);
        // 释放资源
        mat.release();
    }
}
```

## 压缩和解压缩
## 转换
## 缩放
## 亮度调整
## 锐化
## 梯度
## 二值化
## 边缘检测
## 高斯模糊
## 反色