# AbstractRoutingDataSource

> 多数据源， 可以根据 AbstractRoutingDataSource 实现动态数据源切换

## 扩展AbstractRoutingDataSource
> 为实现多数据源，需要给 扩展AbstractRoutingDataSource 添加上操作数据源的方法。 
> 此处添加了 addDataSource 方法，在需要新数制源时，可向 resolvedDataSources 添加新数据源
> 不提供移除方法，resolvedDataSources 本质是一个 Map, 若有变更，替换就行
```java
package com.wkclz.mybatis.dynamicdb;

/**
 * 当前类，在全部 Override 父类之外，新增了：
 * addDataSource: 向数据源集合中添加新的数据源
 * getDataSource: 通过 lookupKey 获取数据源
 */
public abstract class AbstractShrimpRoutingDataSource extends AbstractRoutingDataSource {
    // 省略了 AbstractRoutingDataSource 中已经存在的 field 定义

    public void addDataSource(Object lookupKey, DataSource dataSource) {
        Assert.notNull(resolvedDataSources, "DataSource router not initialized");
        Assert.notNull(lookupKey, "router lookupKey can't be null");
        resolvedDataSources.put(lookupKey, dataSource);
    }

    public DataSource getDataSource(Object lookupKey) {
        Assert.notNull(resolvedDataSources, "DataSource router not initialized");
        Assert.notNull(lookupKey, "router lookupKey can't be null");
        return resolvedDataSources.get(lookupKey);
    }

    // 省略了 AbstractRoutingDataSource 中已经存在的方法
}

```


## 重写determineCurrentLookupKey
> 数据源切换的核心在于 determineCurrentLookupKey, 只要能重写他，就能在需要新数据源的时候注入数据源
```java
package com.wkclz.mybatis.dynamicdb;

import com.wkclz.common.exception.BizException;
import com.wkclz.mybatis.config.ShrimpMyBatisConfig;
import com.wkclz.spring.config.SpringContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 重写 determineCurrentLookupKey() 方法来实现数据源切换功能
 * 若数据源不存在，需要到 DataSourceFactory 获取
 */
public class DynamicDataSource extends AbstractShrimpRoutingDataSource {
    private static final Logger logger = LoggerFactory.getLogger(DynamicDataSource.class);

    // 已经初始化的，不再初始化了
    private Map<String, Long> hasCreateDataSource = new ConcurrentHashMap<>();

    protected Object determineCurrentLookupKey() {
        String key = DynamicDataSourceHolder.get();
        if (key == null) {
            return null;
        }
        logger.info("determineCurrentLookupKey: {}", key);

        // 存在，并在有效期内
        Long latest = hasCreateDataSource.get(key);
        long now = System.currentTimeMillis();
        ShrimpMyBatisConfig shrimpMyBatisConfig = SpringContextHolder.getBean(ShrimpMyBatisConfig.class);
        Integer cacheTime = shrimpMyBatisConfig.getDatasourceCacheSecond();
        if (latest != null && ((now - latest) < cacheTime * 60)) {
            return key;
        }

        synchronized (this) {
            latest = hasCreateDataSource.get(key);
            if (latest != null) {
                return key;
            }
            // 若想用多数据源，必需注入此工厂
            DynamicDataSourceFactory dynamicDataSourceFactory = SpringContextHolder.getBean(DynamicDataSourceFactory.class);
            if (dynamicDataSourceFactory == null) {
                throw BizException.error("please init dynamicDataSourceFactory before use dynamic dataSource");
            }
            DataSource dataSource = dynamicDataSourceFactory.createDataSource(key);
            addDataSource(key, dataSource);
            hasCreateDataSource.put(key, now);
            return key;
        }
    }
}
```


## 提供一个操作多数据源的线程变量
> 为了更简单的切换多数据源，使用线程变量来存储数据源的 key
```java
package com.wkclz.mybatis.dynamicdb;

/**
 * 实现对数据源的操作功能
 */
public class DynamicDataSourceHolder {
    
    private static final ThreadLocal<String> dataSourceHolder = new ThreadLocal<>();

    public static void set(String key) {
        dataSourceHolder.set(key);
    }

    public static String get() {
        return dataSourceHolder.get();
    }

    public static void clear() {
        dataSourceHolder.remove();
    }
    
}
```

## 数据源工厂 DataSourceFactory
> 为方便用户能自定义数据源实现，提供一个接口
```java
package com.wkclz.mybatis.dynamicdb;

import javax.sql.DataSource;

public interface DynamicDataSourceFactory {

    /**
     * 使用 key 加载自定义数据源
     */
    DataSource createDataSource(String key);

}
```

## 初始化数据源
> 提供多数据源的入口
```java
package com.wkclz.mybatis.dynamicdb;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.wkclz.common.utils.MapUtil;
import com.wkclz.mybatis.config.DefaultDataSourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Configuration
@ConditionalOnBean({DynamicDataSourceFactory.class})
public class DynamicDataSourceAutoConfig {

    private static final Logger logger = LoggerFactory.getLogger(DynamicDataSourceAutoConfig.class);

    @Autowired
    private DefaultDataSourceConfig defaultDataSourceConfig;

    // 必需定义为 Primary， 以使得 com.alibaba.druid.spring.boot.autoconfigur.DruidDataSourceAutoConfigure.dataSource() 失效
    @Bean
    @Primary
    public DynamicDataSource dynamicDataSource(DynamicDataSourceFactory dynamicDataSourceFactory) throws Exception {
        logger.info("dynamicData Source, load default dataSource...");
        DynamicDataSource dynamicDataSource = new DynamicDataSource();

        // 默认数据源
        Map<String, Object> map = MapUtil.obj2Map(defaultDataSourceConfig);
        DataSource dataSource = DruidDataSourceFactory.createDataSource(map);
        dynamicDataSource.setDefaultTargetDataSource(dataSource);

        // 动态数据源，只放一个 Map, 后续在使用时动态添加
        dynamicDataSource.setTargetDataSources(new ConcurrentHashMap<>());
        dynamicDataSource.afterPropertiesSet();
        return dynamicDataSource;
    }
}

```

## 定义获取默认数据源的配置类
> 为方便默认数据源的配置，已在 DynamicDataSourceAutoConfig 中自动配置。
> 您仍然可以通过 DynamicDataSourceFactory 开放接口的形式，让接入者自行初始化默认数据源
```java
package com.wkclz.mybatis.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class DefaultDataSourceConfig {
  @Value("${spring.datasource.name:default}")
  private volatile String name;
  @Value("${spring.datasource.username:}")
  private volatile String username;
  @Value("${spring.datasource.password:}")
  private volatile String password;
  @Value("${spring.datasource.url:}")
  private volatile String url;
  @Value("${spring.datasource.driverClassName:}")
  private volatile String driverClassName;
  @Value("${spring.datasource.druid.initialSize:0}")
  private volatile String initialSize;
  @Value("${spring.datasource.druid.maxActive:8}")
  private volatile String maxActive;
  @Value("${spring.datasource.druid.minIdle:0}")
  private volatile String minIdle;
  @Value("${spring.datasource.druid.maxIdle:8}")
  private volatile String maxIdle;
  @Value("${spring.datasource.druid.maxWait:-1}")
  private volatile String maxWait;
  @Value("${spring.datasource.druid.filters:stat,wall,log4j}")
  private volatile String filters;

}
```

## 清理线程 key
> 为保证在多线程， 因线程重用问题导致的串数据源，需要在适当的地方清理掉线程中的 key

- 使用 sqlSession 直接操作数据库，需要自行保证 key清理，或自行封装方法以便统一清理
- 在 mapper 中存在 @Mapper 的场景
```java
package com.wkclz.mybatis.aop;

import com.wkclz.mybatis.dynamicdb.DynamicDataSourceHolder;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DaoAop {
    private final String POINT_CUT = "@within(org.apache.ibatis.annotations.Mapper)";

    @Pointcut(POINT_CUT)
    public void pointCut() {
    }

    @Around(value = POINT_CUT)
    public Object doAroundAdvice(ProceedingJoinPoint point) throws Throwable {
        try {
            Object obj = point.proceed();
            return obj;
        } finally {
            DynamicDataSourceHolder.clear();
        }
    }
}

```



## 使用
> 此处简述使用此多数据源的方式

- 数据源获取配置
```java
package com.wkclz.demo.config;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.wkclz.mybatis.dynamicdb.DynamicDataSourceFactory;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Component
public class DynamicDataSourceInit implements DynamicDataSourceFactory {

    @SneakyThrows
    @Override
    public DataSource createDataSource(String key) {
        // 请自行根据 key 获取数据源配置
        // TODO 若再注入 bean 以获取连接信息，将会造成循环依赖风险。在已知无风险的情况下，需要避开循环依赖检查。可使用 SpringContextHolder
        Map map = new HashMap();
        return DruidDataSourceFactory.createDataSource(map);
    }

}
```

- 使用示例
```java
package com.wkclz.demo.rest.custom;

import com.wkclz.common.entity.Result;
import com.wkclz.mybatis.dynamicdb.DynamicDataSourceHolder;
import com.wkclz.mybatis.helper.MyBatisHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class TestRest {

    @GetMapping("/test/selectList")
    public Result testSelectList() {
        // 若需要使用其他数据源，请使用 DynamicDataSourceHolder 给线程设置 对应的 key
        DynamicDataSourceHolder.set("key");
        List<Map> maps = MyBatisHelper.selectList("select * from xxxx", new HashMap());
        return Result.data(maps);
    }

}

```

