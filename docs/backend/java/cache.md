# 缓存

## 为什么要用缓存
1. 提高应用性能。获取某个数据，原来可能非常耗资源(CPU资源,IO资源,时间等)，用了缓存之后，可以非常快速的获取数据
2. 提高并发。节约了资源，同等资源情况下，服务可承载更多的请求。
3. 提高服务可靠性。服务的性能，并发都提高了。在同等业务场景下，服务将更稳定。

## 缓存问题
| 问题 | 描述                                                         | 解决方案                  |
|----|------------------------------------------------------------|-----------------------|
| 穿透 | 通过请求不存在于缓存和后端存储中的数据来使得所有请求都落到后端存储上，导致系统瘫痪。                 | 布隆过滤器, 缓存空值, 事件驱动缓存预热 |
| 击穿 | 在高并发访问下，某个热点数据失效后，大量请求同时涌入后端存储，导致后端存储负载增大、响应时间变慢，甚至瘫痪      | 锁,续期,事件驱动缓存预热         |
| 雪崩 | 因为某些原因导致缓存中大量的数据同时失效或过期，导致后续请求都落到后端存储上，从而引起系统负载暴增、性能下降甚至瘫痪 | 过期随机,事件驱动更新           |

从以上问题看，事件驱动更新似乎可以解决所有问题，但只针对数据量较小，数据全量缓存的场景，才适合事件驱动更新策略


## 缓存方案

| 缓存方式  | 数据量 | 数据使用频率 | 数据修改频率   |
|-------|-----|--------|----------|
| 堆     | 小   | 使用超量大  | 修改不频繁    |
| redis | 大   | 使用量大   | 修改频繁程度一般 |
| ES    | 超大  | 查询量大   | 修改频繁程度一般 |
| 不缓存   | -   | 使用量小   | 修改频繁     |

> 若事件驱动更新缓存策略做得好，只要数据量不大，可忽略数据修改频繁程度的影响。
> 缓存方案并不唯一，以上仅为部分方案。具体实施过程需要结合实际情况，制定更适合的缓存方案。

## Guava 缓存

### 创建缓存
```java
public class CacheDemo {
    private static final Cache<String, String> cache = CacheBuilder.newBuilder()
        // 设置并发级别, cache提供了设置并发级别的api，使得缓存支持并发的写入和读取。同ConcurrentHashMap类似Guava cache的并发也是通过分离锁实现。在一般情况下，将并发级别设置为服务器cpu核心数是一个比较不错的选择。
        .concurrencyLevel(4) // int concurrencyLevel
        // 设置初始容量: 我们在构建缓存时可以为缓存设置一个合理大小初始容量。由于Guava的缓存使用了分离锁的机制，扩容的代价非常昂贵。所以合理的初始容量能够减少缓存容器的扩容次数。
        .initialCapacity(10240) // int initialCapacity
        // 设置最大存储量：Guava Cache可以在构建缓存对象时指定缓存所能够存储的最大记录数量。当Cache中的记录数量达到最大值后再调用put方法向其中添加对象，Guava会先从当前缓存的对象记录中选择一条删除掉，腾出空间后再将新的对象存储到Cache中。
        .maximumSize(1024 * 1024L) // long maximumSize
        // Weight 需结合使用
        .maximumWeight(1024 * 1024 * 1024) // 设置最大容量为 1M
        .weigher(new Weigher<String, String>() {
            @Override
            public int weigh(String key, String value) {
                return key.getBytes().length + value.getBytes().length;
            }
        })
        /**
         * 在构建Cache对象时,可以通过CacheBuilder类的expireAfterAccess和expireAfterWrite两个方法为缓存中的对象指定过期时间，过期的对象将会被缓存自动删除。
         * 其中，expireAfterWrite方法指定对象被写入到缓存后多久过期，expireAfterAccess指定对象多久没有被访问后过期。
         * 可以同时用expireAfterAccess和expireAfterWrite方法指定过期时间，这时只要对象满足两者中的一个条件就会被自动过期删除。(有等验证) 
         * 一共4种，这里介绍2种，只不过是参数类型传的不同而已
         */
        // 设置写入多久的过期时间
        .expireAfterWrite(30, TimeUnit.MINUTES) // long duration, TimeUnit unit
        // 设置多久没被访问(读/写)的过期时间
        .expireAfterAccess(30, TimeUnit.MINUTES) // long duration, TimeUnit unit
        // 设置移除监听器: 可以为Cache对象添加一个移除监听器，这样当有缓存被删除时可以感知到这个事件。在RemovalListener写的是删除回调时的通知逻辑
        .removalListener(new RemovalListener<String, String>() {
            @Override
            public void onRemoval(RemovalNotification<String, String> notification) {
                System.out.println(notification.getKey()+"-"+notification.getValue()+" is remove");
            }
        })
        // 打开统计信息开关,可以对Cache的命中率、加载数据时间等信息进行统计。
        // 在构建Cache对象时，可以通过CacheBuilder的recordStats方法开启统计信息的开关。开关开启后Cache会自动对缓存的各种操作进行统计，调用Cache的stats方法可以查看统计后的信息。
        .recordStats()
        // 【默认】强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾回收器绝不会回收它。
        // 弱引用是一种比软引用更不稳定的引用方式，因为无论内存是否充足，弱引用对象都有可能被回收。
        .weakKeys() // 使用弱引用存储键
        .weakValues() // 使用弱引用存储值
        // 相对于强引用，软引用是一种不稳定的引用方式，如果一个对象具有软引用，当内存充足时，GC不会主动回收软引用对象, 使用软引用能防止内存泄露，增强程序的健壮性。但是一定要做好null检测。
        .softValues() // 使用软引用存储值    
        .build();
}
```

### 缓存操作
| 操作                                                | 含义                                                            |
|---------------------------------------------------|---------------------------------------------------------------|
| `cache.asMap();`                                  | 将缓存转换成1个ConcurrentMap                                         |
| `cache.cleanUp();`                                | 清空缓存                                                          |
| `cache.get(K key, Callable<? extends V> loader);` | 获取缓存，当缓存不存在时，则通Callable进行加载并返回。该操作是原子，会抛出ExecutionException异常 |
| `cache.getAllPresent(Iterable<?> keys);`          | 通过已存在的keys集合获取到一个固定长度的map集合                                   |
| `cache.getIfPresent(Object key);`                 | 获取一个缓存，如果该缓存不存在则返回一个null值                                     |
| `cache.invalidate(Object key);`                   | 通过key使value无效                                                 |
| `cache.invalidateAll();`                          | 使所有的value无效                                                   |
| `cache.invalidateAll(Iterable<?> keys);`          | 使keys集合中对应的value无效                                            |
| `cache.put(String key, Object value);`            | 向缓存中添加数据                                                      |
| `cache.putAll(Map<? extends K, ? extends V> m);`  | 向级存中添加Map集合                                                   |
| `cache.size();`                                   | 缓存大小                                                          |
| `cache.stats();`                                  | 查看缓存命中结果                                                      |

