# MQTT

## 用途
> 物联网消息中间件

## 华为云 IoTDA

### 相关地址
- 文档：https://support.huaweicloud.com/iothub/index.html
- 控制台：https://console.huaweicloud.com/iotdm/

### 步骤
1. 控制台，按需求创建/购买实现。当前购买了【标准版-免费单元S0】
2. 产品：创建产品，MQTT 协议，JSON 数据格式
3. 设备：注册设备
   1. 设备标识码： model
   2. 设备名称: model_sn
   3. 设备ID: model_sn
   4. 密钥: 自定义
4. 密码获取：https://iot-tool.obs-website.cn-north-4.myhuaweicloud.com/
5. 设备接入
6. 坑：PubSubClient 的 keepAlive 默认是15，云平台要求是 30~120，需要指定 keepAlive


## 其他云

> 使用时再填写