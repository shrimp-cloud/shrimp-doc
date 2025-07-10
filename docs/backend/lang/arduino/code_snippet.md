# 基本信息

## 打印基本信息
```shell
#include "Arduino.h"
#include "config.h"

uint32_t chipId = 0;
void printBaseInfo() {

  for(int i=0; i<17; i=i+8) {
    chipId |= ((ESP.getEfuseMac() >> (40 - i)) & 0xff) << i;
  }

  Serial.println();
  Serial.print("芯片ID: "); Serial.println(chipId); // 15556044
  Serial.printf("Mac地址: %012X \n", ESP.getEfuseMac());
  Serial.printf("芯片型号: %s\n", ESP.getChipModel());
  Serial.printf("芯片版本号: %d\n", ESP.getChipRevision());
  Serial.printf("芯片核心数: %d\n", ESP.getChipCores());
  Serial.printf("芯片时钟频率: %u MHz\n", ESP.getCpuFreqMHz());
  Serial.printf("自上电以来时钟走过的周期数: %u\n", ESP.getCycleCount());
  Serial.printf("SDK版本号: %u\n", ESP.getSdkVersion());
  Serial.println();

  //Internal RAM
  Serial.printf("总堆大小: %u Byte\n", ESP.getHeapSize());
  Serial.printf("可用堆大小: %u Byte\n", ESP.getFreeHeap());
  Serial.printf("启动以来最小可用堆大小: %u Byte\n", ESP.getMinFreeHeap());
  Serial.printf("可以一次分配的最大堆大小: %u Byte\n", ESP.getMaxAllocHeap());
  Serial.println();
  
  //SPI RAM
  Serial.printf("SPI 总堆大小: %u Byte\n", ESP.getPsramSize());
  Serial.printf("SPI 可用堆大小: %u Byte\n", ESP.getFreePsram());
  Serial.printf("SPI 启动以来最小可用堆大小: %u Byte\n", ESP.getMinFreePsram());
  Serial.printf("SPI 可以一次分配的最大堆大小: %u Byte\n", ESP.getMaxAllocPsram());
  Serial.println();
  
  Serial.printf("Flash大小: %u Byte\n", ESP.getFlashChipSize());
  Serial.printf("Flash运行速度: %u\n", ESP.getFlashChipSpeed());
  Serial.printf("Flash工作模式: %u\n", ESP.getFlashChipMode());
  Serial.printf("Flash大小: %u Byte\n", ESP.getFlashChipSize());
  Serial.println();
  
  Serial.printf("固件大小: %u Byte\n", ESP.getSketchSize());
  Serial.printf("固件MD5: %u\n", ESP.getSketchMD5());
  Serial.printf("固件区域剩余大小: %u Byte\n", ESP.getFreeSketchSpace());
  Serial.println();
}

```


## WIFI 连接

```shell
#include "Arduino.h"
#include <WiFi.h>

const char* ssid     = "my_ssid";
const char* password = "my_password";

void connectWifi() {
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println("******************************************************");
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
```

## 时钟同步
```shell
#include "Arduino.h"
#include <time.h>
#include <sntp.h>

const char* ntpServer1 = "pool.ntp.org";
const char* ntpServer2 = "time.nist.gov";
const long  gmtOffset_sec = 8 * 60 * 60;
const int   daylightOffset_sec = 0;
const char* time_zone = "CET-1CEST,M3.5.0,M10.5.0/3";

// 打印时间
void printLocalTime() {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)) {
    Serial.println("No time available (yet)");
    return;
  }
  Serial.println(&timeinfo, "%Y-%m-%d %H:%M:%S");
}

// Callback function (get's called when time adjusts via NTP)
void timeavailable(struct timeval *t) {
  Serial.println("Got time adjustment from NTP!");
  printLocalTime();
}

void setTime() {
  sntp_set_time_sync_notification_cb(timeavailable);
  sntp_servermode_dhcp(1);
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1, ntpServer2);
}
```

## mqtt

```shell
#include "Arduino.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>

// mqtt
const char* mqtt_server = "example.emqxsl.cn";
const int mqtt_port = 8883;
const char* mqtt_username = "mqtt_username";
const char* mqtt_password = "mqtt_password";

const char* mqtt_client_id = "esp32/sn";
const char* mqtt_push = "device/esp32/sn";
const char* mqtt_subscribe = "client/esp32/sn";

// 此 ca 已经公开：https://docs.emqx.com/zh/cloud/latest/connect_to_deployments/esp32.html
const char* ca_cert= \
"-----BEGIN CERTIFICATE-----\n" \
"MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\n" \
"MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\n" \
"d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\n" \
"QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\n" \
"MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\n" \
"b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n" \
"9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\n" \
"CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\n" \
"nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n" \
"43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\n" \
"T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\n" \
"gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\n" \
"BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\n" \
"TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\n" \
"DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\n" \
"hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n" \
"06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\n" \
"PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\n" \
"YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\n" \
"CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=" \
"-----END CERTIFICATE-----\n";
// WiFiClient espClient;
WiFiClientSecure espClient;
PubSubClient mqttClient(espClient);

// mqtt 消息接收
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void setMqtt() {
  espClient.setCACert(ca_cert);
  mqttClient.setKeepAlive(120);
  mqttClient.setServer(mqtt_server, mqtt_port);
  mqttClient.setCallback(callback);
}

// mqtt 连接/重连
void reconnectMqtt() {
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (mqttClient.connect(mqtt_client_id, mqtt_username, mqtt_password)) {
      Serial.println("connected: 连接成功");
      mqttClient.subscribe(mqtt_subscribe);
      // 连接成功，推送消息
      mqttClient.publish(mqtt_push, "reconnected: mqtt connect success!");
    } else {
      int state = mqttClient.state();
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.print(" try again in 5 seconds: ");
      if (state == 1) {
        Serial.println("拒绝连接, 服务器不支持该客户端请求的 MQTT 协议");
      }
      if (state == 2) {
        Serial.println("拒绝连接, 客户端 ID 是正确的 UTF-8 字符串，但是不被服务器允许, 或者心跳时间间隔不满足平台要求");
      }
      if (state == 3) {
        Serial.println("拒绝连接, 网络连接已经建立，但是 MQTT 服务不可用");
      }
      if (state == 4) {
        Serial.println("拒绝连接, 在用户名或密码中的数据是错误格式的");
      }
      if (state == 5) {
        Serial.println("拒绝连接, 客户端的连接未被授权");
      }
      delay(5000);
    }
  }
}

/* 在uno 中要 loop
void loop() {
  delay(1000);
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
*/
```

## config.h

```shell
# include "Arduino.h"
#include <PubSubClient.h>

extern uint32_t chipId;
extern PubSubClient mqttClient;

void printBaseInfo();

void connectWifi();

void setTime();

void printLocalTime();

void setMqtt();

void reconnectMqtt();
```


## setup&loop

```shell
#include <time.h>
#include "config.h"

void setup() {
  // 设置串口
  Serial.begin(115200);
  while(!Serial){delay(100);}

  // printBaseInfo();
  // connectWifi();
  // setTime();
  // setMqtt();

  pinMode(led1, OUTPUT);
  digitalWrite(led1, HIGH);
}

void loop() {
  printLocalTime();
  delay(1000);
}
```