# Access Token

## Access Token
> API 通信的token校验机制

参考：https://blog.csdn.net/CSDN_WYL2016/article/details/124872582


## 安全措施

### timestamp
> timestamp 请求方的时间戳，在服务端，校验此时间戳，超过5分钟的请求，可以直接德育。可以用来防止同一个请求参数被无限期的使用

### nonce

> nonce值是一个由接口请求方生成的随机数，在有需要的场景中，可以用它来实现请求一次性有效，也就是说同样的请求参数只能使用一次，这样可以避免接口重放攻击

> 接口请求方每次请求都会随机生成一个不重复的nonce值，接口提供方可以使用一个存储容器（redis），每次先在容器中看看是否存在接口请求方发来的nonce值，
> 如果不存在则表明是第一次请求，则放行，并且把当前nonce值保存到容器中，> 这样，如果下次再使用同样的nonce来请求则容器中一定存在，那么就可以判定是无效请求了。
> timestamp 已经保证了请求有效期，此处缓存可以配置成 timestamp 有效期一致


### 其他安全机制

- 白名单
- 黑名单
- 限流、熔断、降级


## 功能设计

- 管理后台维护 access_token 信息，包含 app_id, app_secret 和附属相关信息
- app_id, app_secret 信息缓存至 app 中，在 GW, 或 Interceptor 中, 客户端请求过来，提取 access_token, 完成各种校验，最后放行
- 客户端，在请求服务端时，计算，并附加 access_token 信息