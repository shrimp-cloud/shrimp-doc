# 图像检测


## 前期准备


```java
private static void yoloLook() {
  // 初始化配置，参数与训练时一致
  FastYolo fastYolo = new FastYolo(yc);

  // 加载模型
  YoloModel yoloModel = JSONObject.parseObject(jsonString, YoloModel.class);
  fastYolo.insertModel(yoloModel);

  // 检测
  String testJpg = "/Users/my_username/project/test/test1.jpg";
  String resultJpg = "/Users/my_username/project/test_1_result.jpg";
  ThreeChannelMatrix threeMatrix = Picture.getThreeMatrix(testJpg, true);
  List<OutBox> outBoxes = fastYolo.look(threeMatrix, 2);

  // 检测结果画图
  ImageTools.drawBox(testJpg, outBoxes, resultJpg, 30);
}

```
