# 常见API

## 读取与输出

> 在OpenCV中，图象输入与输出使用imread()、imwrite()两个方法

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

> OpenCV中的imencode方法和imdecode方法是用于图像压缩和解压缩的函数。

### 编码
> imencode方法将一个OpenCV格式的图像进行编码成指定格式的图像数据流，常用的编码格式有JPEG、PNG等。
> imdecode方法则是将压缩后的图像数据流解码成OpenCV格式的图像。

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        // 编码
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".png", mat, matOfByte);
        byte[] bytes = matOfByte.toArray();
        // bytes 可继续写到文件中
        // Files.write(Paths.get("path_to_image_new.png"), matOfByte.toArray());

        // 编码
        // byte[] bytes = Files.readAllBytes(Paths.get("path_to_image_new.png"));
        Mat matImage = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_COLOR);
        mat.release();
        matImage.release();
    }
}
```

## 转换
> 在识别图像的时候一般用灰度图像，因为彩色图片信息量太大，为了提高运算速度，通常采用灰度。如果灰度图还是过大，则采用二值化图像。

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        // 创建一个空的Mat对象dst，用于存储经过处理调整后的图像
        Mat dst = new Mat();
        if (src.channels() == 3) {
            Imgproc.cvtColor(src, dst, Imgproc.COLOR_RGB2GRAY);
        } else {
            System.out.println("图像不是BGR格式");
        }

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("彩色图", src);
        HighGui.imshow("灰度图", dst);
        HighGui.waitKey(0);

        src.release();
        dst.release();
    }
}
```

## 缩放

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        // 定义缩放比例
        double scale = 0.5;
        // 计算新图像尺寸
        Size newSize = new Size(src.width() * scale, src.height() * scale);
        // 创建一个与输入图像src相同大小和类型的Mat对象
        Mat dst = new Mat();
        Mat.zeros(src.size(), src.type());
        // 对图像进行缩放
        Imgproc.resize(src, dst, newSize, 0, 0, Imgproc.INTER_LINEAR);
        // 显示原始图像和缩放后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```

## 亮度调整

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        Mat dst = new Mat();
        // 创建一个与输入图像src相同大小和类型的Mat对象
        Mat black = Mat.zeros(src.size(), src.type());
        // 使用addWeighted函数将输入图像src和black图像按比例相加，实现亮度调整
        // 参数1.2表示亮度增加的比例，0.5表示black图像的权重，0表示亮度调整的偏移量
        Core.addWeighted(src, 1.2, black, 0.5, 0, dst);
        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```


## 锐化

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        Mat dst = new Mat();
        // 定义一组锐化滤波器的参数值sharper
        float[] sharper = new float[]{0, -1, 0, -1, 5, -1, 0, -1, 0};
        // 定义一个3x3的卷积核operator
        Mat operator = new Mat(3, 3, CvType.CV_32FC1);
        // 使用sharper
        operator.put(0, 0, sharper);
        // 使用filter2D函数将卷积核应用于原始图像src
        Imgproc.filter2D(src, dst, -1, operator);

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}

```

## 梯度

> 图像梯度计算的是图像变化的速度。对于图像的边缘部分，其灰度值变化较大，梯度值也较大。一般情况下，图像梯度计算的是图像的边缘信息。严格来讲，图像梯度计算需要求导数，但图像梯度一般通过计算像素差值来得到梯度的近似值。


```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        Mat grad_x = new Mat();
        Mat grad_y = new Mat();
        Mat abs_grad_x = new Mat();
        Mat abs_grad_y = new Mat();
        // 使用Sobel滤波器计算其水平和垂直梯度
        Imgproc.Sobel(src, grad_x, CvType.CV_32F, 1, 0);
        Imgproc.Sobel(src, grad_y, CvType.CV_32F, 0, 1);
        Core.convertScaleAbs(grad_x, abs_grad_x);
        Core.convertScaleAbs(grad_y, abs_grad_y);
        grad_x.release();
        grad_y.release();
        // 最终的梯度通过加权平均值组合在gradxy中
        Mat gradxy = new Mat();
        Core.addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 10, gradxy);

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```

## 二值化

> 图像二值化是将一幅彩色或灰度图像转换为只包含两种颜色的图像，其中颜色通常为黑色（灰度为0）和白色（灰度为255）。二值化图像可以帮助我们更好地分离物体和背景，简化图像处理流程。
> 二值化的好处就是将图片上的有用信息和无用信息区分开来。
> 常见的二值化方法为固定阀值和自适应阀值: 固定阀值，自适应阀值
> 每次根据图片的灰度情况找合适的阀值。自适应阀值的方法有很多，这里采用了一种类似K均值的方法，就是先选择一个值作为阀值，统计大于这个阀值的所有像素的灰度平均值和小于这个阀值的所有像素的灰度平均值，再求这两个值的平均值作为新的阀值。重复上面的计算，直到每次更新阀值后，大于该阀值和小于该阀值的像素数目不变为止。


```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        // 读取灰度化的图像
        Mat mat = Imgcodecs.imread("path_to_image.jpg", Imgcodecs.IMREAD_GRAYSCALE);

        // 阈值化
        Mat dst = new Mat();
        Imgproc.threshold(src, dst, 127, 255, Imgproc.THRESH_BINARY);

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```


## 边缘检测

> 边缘检测是指寻找图像中明暗变化的区域，并将这些区域称为边缘。这些边缘通常表示了图像中物体之间的界限或轮廓。使用OpenCV进行边缘检测，可以帮助我们更好地理解图像中的细节和结构，从而提高图像处理和分析的效率和准确性。

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        // 读取灰度化的图像
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        // 边缘检测
        Mat dst = new Mat();
        Imgproc.Canny(src, dst, 100, 200);

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```


## 高斯模糊

> 高斯模糊本质上是低通滤波器，输出图像的每个像素点是原图像上对应像素点与周围像素点的加权和，原理并不复杂,就是用高斯分布权值矩阵与原始图像矩阵做卷积运算

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        // 读取灰度化的图像
        Mat mat = Imgcodecs.imread("path_to_image.jpg");
        
        // 高斯模糊
        Mat dst = new Mat();
        Imgproc.GaussianBlur(src, dst, new Size(15, 15), 0);

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```

## 反色

> 图像反色是指对图像中的每个像素值进行取反操作，即将原始图像中每个像素的亮度值或颜色值减去255得到的新图像

```java
public class OpenCVTest {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }
    public static void main(String[] args) {
        // 读取灰度化的图像
        Mat mat = Imgcodecs.imread("path_to_image.jpg");

        Mat dst = src.clone();
        int width = dst.cols();
        int height = dst.rows();
        int dims = dst.channels();
        byte[] data = new byte[width * height * dims];
        dst.get(0, 0, data);

        int index, r, g, b;
        for (int row = 0; row < height; row++) {
            for (int col = 0; col < width * dims; col += dims) {
                index = row * width * dims + col;
                b = data[index] & 0xff;
                g = data[index + 1] & 0xff;
                r = data[index + 2] & 0xff;

                r = 255 - r;
                g = 255 - g;
                b = 255 - b;

                data[index] = (byte) b;
                data[index + 1] = (byte) g;
                data[index + 2] = (byte) r;
            }
        }

        dst.put(0, 0, data);

        // 使用HighGui库显示原始图像和修改后的图像
        HighGui.imshow("原图", src);
        HighGui.imshow("新图", dst);
        // 等待用户按下任意键继续程序执行
        HighGui.waitKey(0);
        // 释放内存
        src.release();
        dst.release();
    }
}
```
