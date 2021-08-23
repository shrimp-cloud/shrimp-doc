# SDK [暂时不需要]

# 概述
> 软件开发工具包(SDK)一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件时的开发工具的集合。

# 原理
- 对现有的模块进行封装，简化调用。如支付接口

# 使用
1. parent 中已经引入，只需要继承 parent 项目
2. 使用具体的方法【示例：创建支付订单】

```
@Autowired
private PayService payService;

PayOrder payOrder = new PayOrder();
payOrder.set...
payService.payOrderNew(rep, payOrder);
```
