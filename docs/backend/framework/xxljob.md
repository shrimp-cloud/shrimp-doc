# XXL-Job

> XXL-JOB是一个分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。


## 集成


### 添加依赖

```xml
<dependency>
  <name>shrimp-cloud-xxljob</name>
  <description>shrimp-cloud-xxljob</description>
  <version>${lastVersion}</version>
</dependency>
```

### 配置

| 配置项                               | 必填 | 默认值                        | 描述                                                                    |
|-----------------------------------|----|----------------------------|-----------------------------------------------------------------------|
| xxl.job.admin.addresses           | 否  | Empty                      | 如调度中心集群部署存在多个地址则用逗号分隔。执行器将会使用该地址进行"执行器心跳注册"和"任务结果回调"；为空则关闭自动注册        |
| xxl.job.admin.accessToken         | 否  | Empty                      | 调度中心通讯TOKEN [选填]：非空时启用                                                |
| xxl.job.admin.timeout             | 否  | 3                          | 调度中心通讯超时时间[选填]，单位秒；默认3s                                               |
| xxl.job.executor.appname          | 否  | ${spring.application.name} | 执行器心跳注册分组依据；为空则关闭自动注册                                                 |
| xxl.job.executor.address          | 否  | -                          | 优先使用该配置作为注册地址，为空时使用内嵌服务 ”IP:PORT“ 作为注册地址。从而更灵活的支持容器类型执行器动态IP和动态映射端口问题 |
| xxl.job.executor.ip               | 否  | -                          | 默认为空表示自动获取IP，多网卡时可手动设置指定IP                                            |
| xxl.job.executor.port             | 否  | 9999                       | 小于等于0则自动获取；默认端口为9999                                                  |
| xxl.job.executor.logpath          | 否  | ./xxl-job/jobhandler       | 需要对该路径拥有读写权限；为空则使用默认路径                                                |
| xxl.job.executor.logretentiondays | 否  | 30                         | 过期日志自动清理, 限制值大于等于3时生效; 否则, 如-1, 关闭自动清理功能                              |



## 使用



### 客户端实现一个任务

```java
package com.example.job;

import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import org.springframework.stereotype.Component;

@Component
public class XxlJobDemo {

    @XxlJob("demoJobHandler")
    public void demoJobHandler() {
        XxlJobHelper.log("XXL-JOB, Hello World.");
    }

}
```


