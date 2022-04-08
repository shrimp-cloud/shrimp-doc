# ApplicationListener

在IOC的容器的启动过程，当所有的bean都已经处理完成之后，spring ioc容器会有一个发布事件的动作。从 AbstractApplicationContext 的源码中就可以看出：

```java
protected void finishRefresh() {
    // Initialize lifecycle processor for this context.
    initLifecycleProcessor();
    // Propagate refresh to lifecycle processor first.
    getLifecycleProcessor().onRefresh();
    // Publish the final event.
    publishEvent(new ContextRefreshedEvent(this));
    // Participate in LiveBeansView MBean, if active.
    LiveBeansView.registerApplicationContext(this);
}
```

因此当所有的bean都初始化完成并被成功装载后会触发ContextRefreshedEvent事件。

ApplicationListener是spring中用来监听事件（ApplicationEvent）的传递，每个实现了ApplicationListener接口的bean都会收到ApplicationEvent对象的通知，每个ApplicationListener可根据事件类型只接收处理自己感兴趣的事件，因此利用实现ApplicationListener的接口可以收到监听ContextRefreshedEvent动作，然后可以写自己的一些处理逻辑，比如初始化环境，准备测试数据、加载一些数据到内存等等。用法如下：

```java
@Component
public class TestApplicationListener  implements ApplicationListener<ContextRefreshedEvent>{
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //todo:一些处理逻辑
    }
}
```