# 标注转换为样本

## 瓢数据解析

- 图片同名 txt 文本
- 每行一body, 每行有5个值：类别序号、x中心点坐标、y中心点坐标、宽度和高度
- 宽度和高度都归一化到0-1之间
- 从样本中，我们还可以获取一些辅助设置, 用于设置 YoloConfig

## 数据转换

```java

    public static YoloSample getYoloSample(String picUrl, String boxesUrl) {
        if (!picUrl.endsWith(".jpg")) {
            return null;
        }
        YoloSample sample = new YoloSample();
        sample.setLocationURL(picUrl);
        System.out.println("正在解析: " + picUrl);
        /* 若图片不规范，还需要读取图片的 宽和高 【耗时长，实际生产过程应当为同规格的图片】
        ThreeChannelMatrix threeMatrix;
        try {
            // 以左上角(0,0)为原点，Y向右为正，X向下为正 【false 符合，但此处需要取值给 Body 使用】
            threeMatrix = Picture.getThreeMatrix(picUrl, true);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        int x = threeMatrix.getX();
        int y = threeMatrix.getY();
        */
        // 假设图片规范，直接指定
        int x = 2800;
        int y = 1024;

        List<YoloBody> bodies = new ArrayList<>();
        sample.setYoloBodies(bodies);

        File boxesFile = new File(boxesUrl);
        if (!boxesFile.isFile()) {
            throw new RuntimeException("error file: " + boxesUrl);
        }
        FileReader reader = null;
        BufferedReader bReader = null;
        try {
            reader = new FileReader(boxesFile);
            bReader = new BufferedReader(reader);
            String s;
            while ((s = bReader.readLine()) != null) {
                // 类别序号、x中心点坐标、y中心点坐标、宽度, 高度
                if (!s.isEmpty()) {
                    String[] split = s.trim().split(" ");
                    if (split.length == 5) {
                        // 使用XY轴坐标系，左上角(0,0)为原点，X向右为正，Y向下为正。与所有矩阵类型,三通道矩阵行列XY是相反关系！
                        YoloBody body = new YoloBody();
                        bodies.add(body);
                        body.setTypeID(Integer.parseInt(split[0]));

                        body.setWidth((int) (x * Double.parseDouble(split[3])));
                        body.setHeight((int) (y * Double.parseDouble(split[4])));
                        body.setX((int) ((x * Double.parseDouble(split[1])) - (body.getWidth() / 2D)));
                        body.setY((int) ((y * Double.parseDouble(split[2])) - (body.getHeight() / 2D)));
                        // 保证为正整数
                        body.setX(Math.max(body.getX(), 0));
                        body.setY(Math.max(body.getY(), 0));
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (bReader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    //
                }
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    //
                }
            }
        }
        return sample;
    }

```


## 从 samples 获取 Config 数据

```java

public static SamplateInfo getSampleInfo(List<YoloSample> samples) {

  Set<Integer> types = new HashSet<>();

  int widthCount = 0;
  int hightCount = 0;
  int bodyCount = 0;

  int widthMin = Integer.MAX_VALUE;
  int widthMax = Integer.MIN_VALUE;

  int hightMin = Integer.MAX_VALUE;
  int hightMax = Integer.MIN_VALUE;

  int widthAvg = 0;
  int hightAvg = 0;


  for (YoloSample yoloSample : samples) {
    List<YoloBody> yoloBodies = yoloSample.getYoloBodies();
    if (yoloBodies == null) {
      continue;
    }
    for (YoloBody body : yoloBodies) {
      if (body == null) {
        continue;
      }
      types.add(body.getTypeID());

      widthCount += body.getWidth();
      hightCount += body.getHeight();
      bodyCount ++;

      widthMin = Math.min(widthMin, body.getWidth());
      widthMax = Math.max(widthMax, body.getWidth());
      hightMin = Math.min(hightMin, body.getHeight());
      hightMax = Math.max(hightMax, body.getHeight());
    }
  }

  widthAvg = widthCount / bodyCount;
  hightAvg = hightCount / bodyCount;

  SamplateInfo info = new SamplateInfo();

  // body 数量
  info.setBodyCount(bodyCount);

  // 最小宽度，最大宽度，平均宽度
  info.setWidthMin(widthMin);
  info.setWidthMax(widthMax);
  info.setWidthAvg(widthAvg);

  // 最小高度，最大高度，平均高度
  info.setHightMin(hightMin);
  info.setHightMax(hightMax);
  info.setHightAvg(hightAvg);

  // 图像检测的类别数
  info.setTypeCount(types.size());

  return info;
}

```
