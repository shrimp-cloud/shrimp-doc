# Camunda

> Camunda 是一个开源的工作流和业务流程管理平台，它帮助企业自动化其业务流程。无论是简单的手动任务还是复杂的、长期运行的业务流程，Camunda 都能够提供支持。

## 集成与部署

- 创建一个 Springboot 应用空壳
- 添加 camunda 相关依赖
- 为 camunda 添加配置信息
- 部署和启动 camunda
- 数据库表结构会在初次启动过程中自动创建。若数据库无权限创建，请在有权限的库启动后，手动转移数据库结构


### 依赖信息

以下只包含核心信息。其他信息请自行补全

- 依赖信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <properties>
        <java.version>21</java.version>
        <camunda.version>7.21.0</camunda.version>
    </properties>

    <dependencies>
        <!-- 流程引擎 -->
        <dependency>
            <groupId>org.camunda.bpm.springboot</groupId>
            <artifactId>camunda-bpm-spring-boot-starter</artifactId>
            <version>${camunda.version}</version>
        </dependency>
        <!-- Web管理平台 -->
        <dependency>
            <groupId>org.camunda.bpm.springboot</groupId>
            <artifactId>camunda-bpm-spring-boot-starter-rest</artifactId>
            <version>${camunda.version}</version>
        </dependency>
        <!-- 提供rest api操作接口包 -->
        <dependency>
            <groupId>org.camunda.bpm.springboot</groupId>
            <artifactId>camunda-bpm-spring-boot-starter-webapp</artifactId>
            <version>${camunda.version}</version>
        </dependency>
    </dependencies>
</project>
```

### 配置信息

```yaml
server:
  port: 8080

spring:
  config:
    activate:
      on-profile: dev
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://mysql.example.com:3306/camunda_demo
    username: db_username
    password: db_password
camunda:
  bpm:
    auto-deployment-enabled: true
    auto-deployment-locations: classpath*:bpmn/

    admin-user:
      # 用户名
      id: ${your_username}
      # 密码
      password: ${your_password}
      firstName: ${your_firstName}
    filter:
      create: All tasks

cas:
  sdk:
    # 流程回调应用的 app-id [请参照 auth]
    app-id: your_app_id
    # 流程回调应用的 app-secret [请参照 auth]
    app-secret: your_app_secret

flow:
  # 流程 task 回调应用地址
  server-url: http://localhost:8080
  process:
    # 流程 task 回调应用 URI
    callback-uri: /flow/callback

```


### 部署信息

- 此项目使用 docker 打包，再推送到 kubernetes 中进行部署。但部署在此处不作为重点，不再展开



### Service Task

> 由于 camunda 没有直接镶嵌在应用系统中，故流程的 Service Task 调用无法到达应用系统。此处定义了逻辑，用于转发 Service Task 的调用。

#### 方案

- 过程
  - shrimp-camunda 注册 bean: `commonDelegateService`
  - camunda 在操作 Service Task 时，调用 `commonDelegateService`
  - commonDelegateService 将请求封装，调用接口：`callback-uri`
  - 应用系统实现 `callback-uri`, 接收参数，对流程进行分发，最后返回 Response
  - `commonDelegateService` 接收 Response，将信息返回给 camunda

- callback-uri 调用鉴权
  - 使用了 cas 的 access token 方案
  - 应用系统逻辑分发：待定义


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

# BPMN


## BPMN 设计

| 节点名称      | 节点描述        |
|-----------|-------------|
| 发起        | 创建流程实例      |
| 撤回        | 撤销流程实例      |
| 废弃        | 删除流程实例      |
| 通过        | 通过流程实例      |
| 驳回        | 驳回流程实例      |
| 驳回上一步     | 驳回上一步       |
| 驳回起点      | 驳回起点        |
| 驳回任意节点    | 驳回任意节点      |
| 转办        | 转办流程实例      |
| 会签-并行     | 并行会签        |
| 会签-串行     | 串行会签        |
| 会签-竞争     | 竞争会签        |
| 会签结束-自动通过 | 会签结束自动通过    |
| 会签结束-返回当前 | 会签结束返回当前节点  |
| 结束        | 结束流程实例      |



# 流程节点设计


## 流程分支

```xml
  <bpmn:sequenceFlow id="自动生成ID" name="分支名称" sourceRef="Gateway_源" targetRef="Activity_目标">
    <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${key == 'value'}</bpmn:conditionExpression>
  </bpmn:sequenceFlow>
```

- 流程分支匹配成功，将走向相关分支
- 指定默认分支，在网关指定默认 sequenceFlow 的ID：`<bpmn:exclusiveGateway id="Gateway_ID" default="Flow_默认分支">`


## 审批人节点

- 添加审批人节点：`<bpmn:userTask id="自动生成的ID" name="审批节点说明" camunda:assignee="固定审批人">`
  - camunda:assignee: 业务系统中存在的用户作为审批人。此用户无需在 camunda 中进行配置。


## 服务任务

- 添加服务任务节点： `<bpmn:serviceTask id="自动生成的ID" name="节点名称" camunda:delegateExpression="${commonDelegateService}">`
  - camunda:delegateExpression: Camunda 服务的 Bean



- delegateExpression 示例
```java
package com.example.camunda.service;

@Slf4j
@Component("commonDelegateService")
public class CommonDelegateService implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) throws Exception {
        try {
            log.info("notice execution: {}", execution);
            // TODO 可以获取流程中的各项参数，用于业务逻辑
            // 可进一步调用应用系统完成业务逻辑
            // TODO 可以向流程中设置参数
            execution.setVariable("new_key", "new_value");
        } catch (Exception e) {
            log.error("Error occurred in CommonDelegateService execute method", e);
            throw e;
        }
    }
}
```


