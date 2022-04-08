# BeanPostProcessor

BeanPostProcessor是Spring IOC容器给我们提供的一个扩展接口。BeanPostProcessor接口定义了两个方法：
```java
public interface BeanPostProcessor {
    // 前置处理
    Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;
    // 后置处理
    Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;
}
```

Spring中Bean的整个生命周期：

参见：https://baijiahao.baidu.com/s?id=1714097330919712491

postProcessBeforeInitialization()方法与postProcessAfterInitialization()分别对应图中前置处理和后置处理两个步骤将执行的方法。这两个方法中都传入了bean对象实例的引用，为扩展容器的对象实例化过程提供了很大便利，在这儿几乎可以对传入的实例执行任何操作。

可以看到，Spring容器通过BeanPostProcessor给了我们一个机会对Spring管理的bean进行再加工，注解、AOP等功能的实现均大量使用了BeanPostProcessor。通过实现BeanPostProcessor的接口，在其中处理方法中判断bean对象上是否有自定义的一些注解，如果有，则可以对这个bean实例继续进行其他操作，这也是本例中使用该接口要实现的主要目的。