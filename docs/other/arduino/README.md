# Arduino

## 开发板
- esp32

## IDE下载/安装/配置
- 下载地址: https://www.arduino.cc/en/software
- 安装
- File -> Preferences 配置 Addittional boards manager URLs: 
  - https://espressif.github.io/arduino-esp32/package_esp32_index.json
- Tools -> Board -> Boards Manager: 搜索 ESP32, 并下载 【下载会报错，需反复重试直到下载完成】

## 离线安装esp32依赖库

> 在线下载相关依赖库基本不成功，此处记录离线下载方式

- 依赖库: https://github.com/espressif/arduino-esp32/releases
- 下载: esp32-2.0.9.zip 【自行确认最新版本的依赖名】【不区分操作系统，多个系统开发可跨系统复制】
- 手动下载的依赖放入到指定目录后，再在界面上点击安装，会安装其他内容
- 若安装过程无法下载，会提示下载地址，转移到迅雷下载，完成之后再放到指定目录
- 下载中的依赖，也可以从 index.json 中找到源地址，再手动下载
- 下载后，将依赖库按操作系统类型放置到指定目录
- 多次执行 board 依赖库安装，在依赖齐全后，安装即可成功

### Windows
- 位置: C:\Users\username\AppData\Local\Arduino15\staging\packages

### Mac
- 位置: /Users/username/Library/Arduino15/staging/packages

## 依赖库

> 依赖库按需安装。以下列举使用到的库名以及用途

| 库           | 用途        |
|-------------|-----------|
| ArduinoJson | JSON生成和解析 |
| PubSubClient | MQTT 客户端  |

## 开发过程

- 连接开发板
- Tools -> Board -> 选择 ESP 32Dev Module
- Tools -> Port -> 选择新出现的 COM 口/或dev设备
- 写代码，上载到开发板中，可从监视窗口看到串口日志


