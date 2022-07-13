# IocBeamLifeCycle

> 此文集中了 IoC 与 Bean 的生命周期。可更好的掌握 Springboot 的启动的销毁的过程，更利于复用 Spring 的勾子完成一些特定的任务。

### 生命周期示例
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Configuration
public class LifeCycleDemo implements InitializingBean, DisposableBean, BeanPostProcessor {

    private static final Logger logger = LoggerFactory.getLogger(LifeCycleDemo.class);

    @PostConstruct
    public void postConstruct() {
        // 启动前全局执行一次
        logger.info("1. postConstruct");
    }

    @Override
    public void afterPropertiesSet() {
        // 当前 bean 初始化后执行一次
        logger.info("2. afterPropertiesSet");
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // 每个 bean 都会执行一次
        logger.info("3. postProcessBeforeInitialization: {}, {}",bean.getClass().getName() ,beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        // 每个 bean 都会执行一次
        logger.info("4. postProcessAfterInitialization: {}, {}",bean.getClass().getName() ,beanName);
        return bean;
    }

    @PreDestroy
    public void preDestroy() {
        // 销毁 jvm 前执行一次
        logger.info("5. LifeCycleDemo.preDestroy");
    }

    @Override
    public void destroy() {
        // 销毁当前 bean 前执行一次
        logger.info("6. LifeCycleDemo.destroy");
    }

}
```