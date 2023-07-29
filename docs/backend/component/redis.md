# Redis

## 依赖
```xml
<dependency>
    <groupId>com.wkclz.redis</groupId>
    <artifactId>shrimp-cloud-redis</artifactId>
</dependency>
```

## 配置
```
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password: pwd
    timeout: 3000
```

## 使用
```java

@Component
public class CustomComponent {
    @Autowired
    private RedisTemplate redisTemplate;
    
    // redis 的其他操作
}
```
