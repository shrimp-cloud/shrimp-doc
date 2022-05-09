# ApplicationListener

## 监听事件
- ApplicationContext事件机制是观察者设计模式的实现，通过ApplicationEvent类和ApplicationListener接口，可以实现ApplicationContext事件处理。
- 如果容器中有一个ApplicationListener Bean，每当ApplicationContext发布ApplicationEvent时，ApplicationListener Bean将自动被触发。这种事件机制都必须需要程序显示的触发。
- 其中spring有一些内置的事件，当完成某种操作时会发出某些事件动作。比如监听ContextRefreshedEvent事件，当所有的bean都初始化完成并被成功装载后会触发该事件，实现ApplicationListener<ContextRefreshedEvent>接口可以收到监听动作，然后可以写自己的逻辑。
- 同样事件可以自定义、监听也可以自定义，完全根据自己的业务逻辑来处理
  

## Spring内置事件&描述

### ContextRefreshedEvent
ApplicationContext 被初始化或刷新时，该事件被发布。这也可以在 ConfigurableApplicationContext接口中使用 refresh() 方法来发生。此处的初始化是指：所有的Bean被成功装载，后处理Bean被检测并激活，所有Singleton Bean 被预实例化，ApplicationContext容器已就绪可用

### ContextStartedEvent
当使用 ConfigurableApplicationContext （ApplicationContext子接口）接口中的 start() 方法启动 ApplicationContext 时，该事件被发布。你可以调查你的数据库，或者你可以在接受到这个事件后重启任何停止的应用程序。

### ContextStoppedEvent
当使用 ConfigurableApplicationContext 接口中的 stop() 停止 ApplicationContext 时，发布这个事件。你可以在接受到这个事件后做必要的清理的工作。

### ContextClosedEvent
当使用 ConfigurableApplicationContext 接口中的 close() 方法关闭 ApplicationContext 时，该事件被发布。一个已关闭的上下文到达生命周期末端；它不能被刷新或重启。

### RequestHandledEvent
这是一个 web-specific 事件，告诉所有 bean HTTP 请求已经被服务。只能应用于使用DispatcherServlet的Web应用。在使用Spring作为前端的MVC控制器时，当Spring处理用户请求结束后，系统会自动触发该事件。

### 事件发布片段
在 AbstractApplicationContext 内，存在发布事件的代码
```java
package org.springframework.context.support;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.DefaultResourceLoader;

public abstract class AbstractApplicationContext extends DefaultResourceLoader implements ConfigurableApplicationContext {
    
    protected void finishRefresh() {
        this.clearResourceCaches();
        this.initLifecycleProcessor();
        this.getLifecycleProcessor().onRefresh();
        this.publishEvent((ApplicationEvent)(new ContextRefreshedEvent(this)));
        LiveBeansView.registerApplicationContext(this);
    }
}
```

### 事件ContextRefreshedEvent
此事件需要使用@Component注册成为bean才能执行
```java
@Component
public class TestApplicationListener implements ApplicationListener<ContextRefreshedEvent>{
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //todo:一些处理逻辑
    }
}
```

### 事件ApplicationEnvironmentPreparedEvent
事件ApplicationEnvironmentPreparedEvent是在环境准备时的事件，不能使用注册为 bean 的方式注册为事件，故需要自行注册

事件注册：spring.factories
```properties
org.springframework.context.ApplicationListener=com.your.pkg.CustomApplicationEnvironmentPreparedEvent
```

事件监听
```java
package com.your.pkg;

import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;

public class CustomApplicationEnvironmentPreparedEvent implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {
    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        // 逻辑
    }
}
```

