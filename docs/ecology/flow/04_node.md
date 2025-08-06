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


