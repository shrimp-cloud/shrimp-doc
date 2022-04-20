# MQTT

## 安装EMQX

> 官网：https://www.emqx.com/zh
> 安装包：https://www.emqx.io/zh/downloads
> 官方文档： https://www.emqx.io/docs/zh/v4.4/

### zip 解压方式安装
在这里选中了 ZIP 包解压使用的方式
```shell
wget https://www.emqx.com/zh/downloads/broker/4.4.1/emqx-4.4.1-otp24.1.5-3-el7-amd64.zip
unzip emqx-4.4.1-otp24.1.5-3-el7-amd64.zip
cd emqx
./bin/emqx start/stop/restart
# 修改控制台密码
./bin/emqx_ctl admins passwd admin adminPassword #(自行修改密码，重要！)
# 查看 emqx 启动的端口：
netstat -ntlp | grep emqx
```
- 本地连接使用 11883
- 非本地连接使用 18833

### 控制台
> http://127.0.0.1:18083 (用户名密码在安装之后使用 emqx_ctl设定) 
> 配置 nginx 转发以开发控制台

### 认证
- MySQL 认证：https://www.emqx.io/docs/zh/v4.4/advanced/auth-mysql.html#mysql-连接信息


## 使用

### 添加依赖
> 注意，此依赖在私有库。若有兴趣请联系 github账号邮件。
```xml
<dependency>
    <groupId>com.wkclz.mqtt</groupId>
    <artifactId>lz-mqtt-starter</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

### 添加配置
```yaml
lz:
  mqtt:
    client-id-prefix: server # 服务器作为 client接入的id前缀。后缀将是服务器IP
    end-point: tcp://mqtt.server.domain.or.ip:1883 # mqtt 服务器域名或IP
    username: username # mqtt用户名
    password: password # mqtt密码
```

### 监听主题消息
```java
package com.wkclz.your.pkg.mqtt;

import com.alibaba.fastjson.JSONObject;
import com.wkclz.mqtt.annotation.MqttController;
import com.wkclz.mqtt.annotation.MqttTopicMapping;
import com.wkclz.mqtt.bean.MqttHexMsg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@MqttController("your_parent_tpoic") // 父 topic
public class MqttConsumerDemo {

    private static final Logger logger = LoggerFactory.getLogger(MqttConsumerDemo.class);

    @MqttTopicMapping("sub_topic1") // 子topic
    public void acceptSubTopic1(MqttHexMsg msg) {
        logger.info("将接your_parent_tpoic/sub_topic1 的消息： {}", JSONObject.toJSONString(msg));
    }

    @MqttTopicMapping("/sub_topic2/testtest") // 子 topic 可以支持多级
    public void acceptSubTopic2(MqttHexMsg msg) {
        logger.info("将接your_parent_tpoic/sub_topic2/testtest 的消息： {}", JSONObject.toJSONString(msg));
    }

    @MqttTopicMapping // 默认匹配父 topic 下的所有子 topic, 但优先级比 指定子 topic 场景低。
    public void acceptAll(MqttHexMsg msg) {
        logger.info("接收对象 MqttHexMsg 为二（十六）进制数据，后续考虑其他格式的数据： {}", JSONObject.toJSONString(msg));

        logger.info("完整topic： {}", msg.getTopic());
        logger.info("父topic： {}", msg.getParentTopic());
        logger.info("子topic： {}", msg.getSubTopic());
        logger.info("qos： {}", msg.getQos());
        logger.info("byte数据： {}", msg.getPayload());

        logger.info("将接your_parent_tpoic/# 的所有消息： {}", JSONObject.toJSONString(msg));
    }

}
```

### 发送消息
```java
package com.wkclz.your.pkg.mqtt;

import com.wkclz.mqtt.bean.MqttHexMsg;
import com.wkclz.mqtt.client.MqttProducer;
import com.wkclz.mqtt.enums.Qos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 使用 rest 接口来写此 demo
public class MqttProducerDemo {

    @Autowired
    private MqttProducer mqttProducer;

    @GetMapping("/demo/mqtt/produce/test")
    public void acceptSubTopic1(MqttHexMsg msg) {
        // 相当简单，不过多解说了
        mqttProducer.send("target/topic", Qos.QOS_1 , "your_message".getBytes());
    }
    
}
```

## 组件封装

### 封装目的
- 使用方便。将多余的内容全部打包，不让业务过多的关心细节。真正的投身到业务开发。
- 防止关键代码被他人随意改变。
- 后续整体扩展功能简便，无需再为每个项目都重复修改代码。

### 实现思路

- 自定义注解MqttController，MqttTopicMapping
- 利用BeanPostProcessor，获得所有注解了MqttController的bean及其注解值，获得其所有注解了MqttTopicMapping的Method方法及其注解值，利用两者的注解值作为其key，分别将bean,Method为value放入不同的map中，记录所有注解了MqttController的注解值作为下一步需要订阅的Topic；
- 利用ApplicationListener在所有bean加载完成后使用实例化的mqConsumer来订阅所有需要订阅的Topic；
- 在mq订阅的处理方法中，根据消息的全Topic在上述步骤的map中获得其对应的bean和Method，同时根据 MqttController 的入参 来设置相关参数，使用method.invoke(owner, paramValues);实现方法的调用，来达到消息的处理分发。

## 交流

- 若对组件封装有兴趣，欢迎从下方的 【编辑此页面】找到文档 github 仓库，并通过 issue 与作者联系