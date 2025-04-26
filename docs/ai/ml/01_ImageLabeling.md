# 数据标注

> 数据标注（Data Annotation）是指为原始数据添加标签或注释的过程，使数据能够被机器学习模型理解和利用。数据标注是机器学习和人工智能项目中的关键步骤，尤其是在监督学习任务中，模型需要大量标注数据来学习和泛化。

> 当前使用 YOLO 模型进行目标检测，使用 故数据标注需要使用 YOLO 的数据格式, 当前选择了 Yolo_Label 工具。

# 基础信息

- Yolo_Label: https://github.com/developer0hye/Yolo_Label


# 使用过程

- Mac: 参照 Readme 编译执行报错
- windows 版在 Windows 11 上标注过程自动退出
- 其他：待验证


# 数据格式

- BoundingBoxesYOLOFormat
  - 使用YOLO（You Only Look Once）模型系列进行目标检测时，对检测结果的一种标注或表示方法
  - YOLO格式中，边界框由一个元组表示，包含5个值：类别序号、x中心点坐标、y中心点坐标、宽度和高度
  - YOLO格式的边界框表示的坐标是相对于图像宽度和高度进行归一化的，范围在0到1之间
  - 当前学习，使用的是 EasyAi (java), 使用XY轴坐标系：左上角(0,0)为原点，X向右为正，Y向下为正。需要进行转换


