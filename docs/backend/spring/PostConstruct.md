# PostConstruct

> @PostContruct是Java自带的注解，在方法上加该注解会在项目启动的时候执行该方法，也可以理解为在spring容器初始化的时候执行该方法。

### 使用注意
此方法是在 spring容器初始化的时候执行，无法替代在初始化之前的一些过程

### 使用方法

```java
package com.your.pkg;

import javax.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class DemoPostConstruct {
    private static final Logger logger = LoggerFactory.getLogger(DemoPostConstruct.class);

    @PostConstruct
    public void init() {
        logger.info("执行了 PostConstruct");
    }

}

```