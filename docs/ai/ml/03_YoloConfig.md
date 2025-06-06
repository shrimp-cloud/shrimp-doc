# Yolo 参数配置


## 配置清单

| 参数名             | 类型      | 默认值    | 说明                                                                                                                                                                                                                                                                                                                                                                            |
|-----------------|---------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| windowWidth     | int     | 90     | 设置移动检测窗口的宽度。该宽度通常取值范围为检测目标物平均宽度的0.6-1.5倍之间，且所有待检测物与其倍数方差越小越好。                                                                                                                                                                                                                                                                                                                 |
| windowHeight    | int     | 120    | 设置移动检测窗口的高度。该高度通常取值范围为检测目标物平均高度的0.6-1.5倍之间，且所有待检测物与其倍数方差越小越好。                                                                                                                                                                                                                                                                                                                 |
| typeNub         | int     | 10     | 图像检测的类别数。                                                                                                                                                                                                                                                                                                                                                                     |
| hiddenNerveNub  | int     | 16     | 神经网络线性层，隐层每一层的神经元数量。                                                                                                                                                                                                                                                                                                                                                          |
| studyRate       | float   | 0.0025 | 图像学习率，推荐默认值0.0025。                                                                                                                                                                                                                                                                                                                                                            |
| kernelSize      | int     | 3      | 神经网络卷积层，卷积核大小，推荐默认值为3。                                                                                                                                                                                                                                                                                                                                                        |
| showLog         | boolean | false  | 是否在神经网络学习过程中，控制台打印学习过程中的数据。                                                                                                                                                                                                                                                                                                                                                   |
| oneConvStudy    | float   | 0.0025 | 图像1v1卷积层学习率，推荐默认值0.0025。                                                                                                                                                                                                                                                                                                                                                      |
| enhance         | int     | 2      | 训练增强次数，即重复循环训练次数，最小值为1，推荐值为2。                                                                                                                                                                                                                                                                                                                                                 |
| iouTh           | float   | 0.05   | 非极大抑制值的交并比阈值，取值范围(0,1)，推荐默认值0.05。                                                                                                                                                                                                                                                                                                                                             |
| containIouTh    | float   | 0.15   | 判断是否包含样本进入训练的交比阈值，取值范围(0,1)。即检测框内包含的训练目标内容面积与训练目标面积之间的比值。该值若没有自定义需求，可使用常用默认值[0.2,0.25]。                                                                                                                                                                                                                                                                                       |
| coreNumber      | int     | 1      | 设置多线程并行计算加速线程的数量，该数量的理论极限值为你当前设备核心数*2，该值设置小于等于1时，则依然为单进程运算。注意：只有当移动检测窗口宽高windowWidth，windowHeight中至少一个超过300时，才值得开启并行运算进行加速。若小于该数值，则并行运算效率反而会低于单进程运算！                                                                                                                                                                                                                          |
| pth             | float   | 0.4    | 可信概率阈值。                                                                                                                                                                                                                                                                                                                                                                       |
| stepReduce      | float   | 0.25   | 训练时窗口移动步长，它基于窗口大小的收缩系数，取值范围是(0,1]。实际训练窗口每次遍历，移动步长为stepReduce * windowWidth与stepReduce * windowHeight，即该数值越小，训练步长越小，步长越小就越适合训练样本内训练物越多越密集的情况。步长越大越适合样本照片内训练物越少越稀疏的情况。                                                                                                                                                                                                          |
| checkStepReduce | float   | 0.5    | 检测时窗口移动步长，它基于窗口大小的收缩系数，取值范围是(0,1]。实际检测窗口每次遍历，移动步长为checkStepReduce * windowWidth与checkStepReduce * windowHeight，即该数值越小，检测步长越小，步长越小就越适合单张照片检测物越多越密集的情况。步长越大越适合单张照片内检测物越少越稀疏的情况。                                                                                                                                                                                                 |
| channelNo       | int     | 1      | 升降维度通道数，通道越低速度越快，越适合更简单的识别场景。通道数越大速度越慢，越能适合更复杂识别场景，该值最小为1。                                                                                                                                                                                                                                                                                                                    |
| norm            | boolean | true   | 是否进行维度调节，大多时候为默认值为true，当它为false的时候则不进行通道的升降维度，如果样本量较少，可以增加误差的下降速度，样本需求量降低，但是也会损失些许精度。                                                                                                                                                                                                                                                                                         |
| minFeatureValue | int     | 3      | 卷积层最后输出矩阵特征最小维度，卷积层最后一层的输出矩阵参数规模，不可以小于该参数数值的平方，推荐默认值3，任务越复杂，样本种类越多，该参数则设置则越大。                                                                                                                                                                                                                                                                                                 |
| regularModel    | int     | 0      | 正则模式，选取不同的正则模式带来不同效果的强化，它是基于对神经元权重施加惩罚，提升权重稀疏性来实现效果的提升。当该值设置为RZ.NOT_RZ时即无正则模式，无正则模式即不对权重施加惩罚，当面对一些指定外形，图像大小都比较固定的工业品时，或者样本数据量较为大充足时，可直接使用无正则模式。当该值设置为RZ.L1时，为L1正则模式，当出现异常值，或者未见过的异常噪音时，L1的鲁棒性非常强。它是以简化模型，突出重点权重的方式来增强其稳定性与鲁棒性的。当面对形态多变，且种类数较少检测物，比如说人脸，人类，动植物等情况有更有益的表达。当该值设置为RZ.L2时，为L2正则模式，它更容易调动全部参数特征，让特征平均的落在每个权重上，误差最容易最快下降到最优解的位置上。面对形态多变且种类复杂，或者维度比较大的情况下，能获得最好的优化效果。 |
| regular         | float   | 0      | 正则系数，取值范围是[0,1)，当取值为0时即为无正则影响，调整到合适的正则系数有助于抵抗过拟合，增强网络的鲁棒性与稳定性，该值越大则对神经元权重惩罚越强，推荐默认值是0.01。                                                                                                                                                                                                                                                                                     |
| auto            | boolean | false  | 是否使用自适应学习率，当该参数为true时，则学习率会在学习中自适应梯度。                                                                                                                                                                                                                                                                                                                                         |
| gaMa            | float   | 0.9    | 自适应学习率的衰减系数，该参数通常为0.9f，只有auto为true时该参数才生效。                                                                                                                                                                                                                                                                                                                                    |
| GMaxTh          | float   | 0.9    | 梯度裁剪阈值，当梯度超过该阈值时，该梯度会被裁剪，防止突发性大梯度，引起梯度爆炸。只有auto为true时该参数才生效。                                                                                                                                                                                                                                                                                                                  |


## 配置示例


```java

private static void yoloConfig() {
  // 提前计算出 sampleInfo

  // 训练配置
  YoloConfig yc = new YoloConfig();
  yc.setWindowWidth(sampleInfo.getWidthAvg());
  yc.setWindowHeight(sampleInfo.getHeightAvg());
  yc.setTypeNub(sampleInfo.getTypeCount());
  yc.setEnhance(2);
  yc.setContainIouTh(sampleInfo.getContainIouTh());
  yc.setCoreNumber(Runtime.getRuntime().availableProcessors());
  yc.setShowLog(true);
  // 其他调优参数后续看情况补充
}

```


