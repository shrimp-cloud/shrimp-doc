# MQTT

> 封装通用 mqtt 组件，方便 mqtt 接入

## 使用

### 添加依赖
> 注意，此依赖在私有库。若有兴趣请联系 github账号邮件。
```xml
<dependency>
    <groupId>com.wkclz.mqtt</groupId>
    <artifactId>shrimp-cloud-mqtt</artifactId>
    <version>4.0.0-SNAPSHOT</version>
</dependency>
```

### 添加配置
```yaml
shrimp:
  cloud:
    mqtt:
      # 服务器作为 client接入的id前缀。后缀将是服务器IP
      client-id-prefix: server
      # mqtt 服务器域名或IP
      end-point: tcp://mqtt.server.domain.or.ip:1883
      # mqtt用户名
      username: username
      # mqtt密码
      password: password
        # 的我哥他 ssl 时，需要给定 ca 证书位置
      ca-path: /config/mqtt-server-ca.crt
```
Tops: 容器代理将会使用外部端口

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

import com.wkclz.common.entity.Result;
import com.wkclz.mqtt.client.MqttProducer;
import com.wkclz.mqtt.enums.Qos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MqttProducerDemo {

    @Autowired
    private MqttProducer mqttProducer;

    @GetMapping("/public/mqtt/produce/test")
    public Result mqttProduceTest() {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        mqttProducer.send("client/${model}/${devoceNo}", map, Qos.QOS_1);
        return Result.ok();
    }

}
```
### 监听系统事件
1. 开放服务器允许订阅系统主题
```shell
# vim etc/acl.conf
# 看着修改就好，不难，不说明了
```
2. 监听 topic: $SYS/# 这里包含很多事件，可以自行精细化监听来达到需求


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