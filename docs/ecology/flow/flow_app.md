# 应用接入流程

> 应用接入流程，指应用系统通过 Camunda 的API, 进行流程的维护和使用的过程。此处使用了 openfeign 组件来简化 API 接口的调用。


## 依赖 openfeign

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

## 添加配置项

```yaml
feign:
  client:
    config:
      # 注意，要改成自己的 camunda 服务地址
      url: http://localhost:8080/engine-rest
      # 超时时间，单位毫秒
      timeout: 30000
      # 用户名
      username: camunda_username
      # 密码
      password: camunda_password

```

- 此处的配置使用了 camunda-platform-7-rest-client-spring-boot-starter 的配置空间。但由于这个 starter 有太多的不完善，故全面舍弃了，全部使用 openfeign 来实现。


## Feign 示例代码

```java
// Feign
package com.example.flow.feign;

import com.example.flow.config.CamundaConfig;
import com.example.flow.pojo.camunda.DeploymentEntity;
import com.example.flow.pojo.camunda.ProcessDefinitionEntity;
import com.example.flow.pojo.camunda.ProcessDefinitionXmlEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@FeignClient(
    name = "camundaRepositoryFeign",
    url = "${feign.client.config.default.url:http://localhost:8080/engine-rest}",
    configuration = CamundaConfig.class
)
public interface CamundaRepositoryFeign {

    /**
     * 获取流程定义列表
     */
    @GetMapping("/process-definition")
    List<ProcessDefinitionEntity> processDefinitionList(@RequestParam(required = false) Map<String, Object> queryParams);

    // 其他接口省略
}

// CamundaConfig


```

## 示例 CamundaConfig




##
