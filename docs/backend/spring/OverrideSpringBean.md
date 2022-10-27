# 覆盖SpringBean 的方法

> 有时候，是原来的 bean 有问题，有时候，是提供默认 bean 作为默认实现并让用户扩展。需求实际


### 同包同类名
- 方式简单粗暴，可以直接覆盖掉jar包中的类，spring项目会优先加载自定义的类。

### @Primary
- 该方法适用于接口实现类，自己创建一个原jar包接口的实现类，然后类上加上@Primary注解，spring则默认加载该类实例化出的Bean

### @Bean
- 若原来的 bean 使用了 @ConditionalOnMissingBean，如果你自己创建了一个一样的Bean，则原Bean就不创建了，达到覆盖效果

### BeanPostProcessor
- BeanPostProcessor
- BeanFactoryPostProcessor
- BeanDefinitionRegistryPostProcessor


```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
 
import java.util.Map;
 
/**
 * @author amdin
 */
@Component
public class MyBeanDefinitionRegistryPostProcessor implements BeanDefinitionRegistryPostProcessor {
 
    private Logger logger = LoggerFactory.getLogger(this.getClass());
 
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry beanDefinitionRegistry) throws BeansException {
        logger.info("bean 定义查看和修改...");
 
        String beanName = "myTestService";
 
        // 先移除原来的bean定义
        beanDefinitionRegistry.removeBeanDefinition(beanName);
 
        // 注册我们自己的bean定义
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.rootBeanDefinition(MyTestServiceIpml.class);
        // 如果有构造函数参数, 有几个构造函数的参数就设置几个  没有就不用设置
        beanDefinitionBuilder.addConstructorArgValue("构造参数1");
        beanDefinitionBuilder.addConstructorArgValue("构造参数2");
        beanDefinitionBuilder.addConstructorArgValue("构造参数3");
        // 设置 init方法 没有就不用设置
        beanDefinitionBuilder.setInitMethodName("init");
        // 设置 destory方法 没有就不用设置
        beanDefinitionBuilder.setDestroyMethodName("destory");
        // 将Bean 的定义注册到Spring环境
        beanDefinitionRegistry.registerBeanDefinition("myTestService", beanDefinitionBuilder.getBeanDefinition());
    }
 
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        // bean的名字为key, bean的实例为value
        Map<String, Object> beanMap = configurableListableBeanFactory.getBeansWithAnnotation(RestController.class);
        logger.info("所有 RestController 的bean {}", beanMap);
    }
}
```