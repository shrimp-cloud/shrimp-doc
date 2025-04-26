# Yolo 学习过程


## 前期准备

- 标注样本
- Yolo 配置

## 配置示例

```java
private static void yoloStudy() {
  FastYolo fastYolo = new FastYolo(yc);
  long start = System.currentTimeMillis();
  fastYolo.toStudy(samples);
  long stop = System.currentTimeMillis();
  System.out.println("训练耗时: " + (stop - start) / 1000);

  // 训练结果
  YoloModel yoloModel = fastYolo.getModel();
  String modelStr = JSONObject.toJSONString(yoloModel);
  System.out.println(modelStr);
}

```

## 然后是漫长的训练过程
