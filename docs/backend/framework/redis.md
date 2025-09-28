# Redis

> 此模块基于 Redis, 扩展了一些对Redis的常规操作，以简化开发。


## 集成

### 添加依赖

```xml
<dependency>
    <groupId>com.wkclz.redis</groupId>
    <artifactId>shrimp-cloud-redis</artifactId>
    <version>${lastVersion}</version>
</dependency>
```

### 配置

- 参照 spring-boot-starter-data-redis 的官方配置即可

```
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password: pwd
    timeout: 3000
```



## 特性

### 序列化

- 已对 Redis 的 一些 key 和 value 做了定制的序列化配置，如下

```java
@Configuration
public class ResetRedisTemplateSerializer {
    @Autowired(required = false)
    public void setRedisTemplate(RedisTemplate redisTemplate) {
        RedisSerializer stringSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(stringSerializer);
        redisTemplate.setValueSerializer(stringSerializer);
        redisTemplate.setHashKeySerializer(stringSerializer);
        redisTemplate.setHashValueSerializer(stringSerializer);
    }
}
```


## 工具


### 日常使用

```java

@Component
public class CustomComponent {
    @Autowired
    private RedisTemplate redisTemplate;

    // redis 的其他操作
}
```


### Redis 锁

```java
package com.example.demo;
@Service
public class DemoService {
    @Resource
    private RedisLockHelper redisLockHelper;

    public void demo() {
        // 添加锁
        boolean rock = redisLockHelper.lock("key");
        if (rock) {
          System.out.println("成功获取锁");
        }
    }
}
```


### ID 生成器


```java
package com.example.demo;
@Service
public class DemoService {
    @Resource
    private RedisIdGenHelper redisIdGenHelper;
    public void demo() {
        // id 生成
        String id = redisIdGenHelper.nextShot();
        System.out.println(id);
    }
}
```


### Redis 消息队列

> 待完善

- 缓存更新通知
- 消峰填谷

