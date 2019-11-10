
# 规范

## 接口参数
- 若接口不支持，忽略对应参数

参数名称 | 参数含意 | 类型 | 默认值
---|---|---|---
token | [header]用户token | String | NaN
isPage | 是否分页 | Integer | 1 
pageNo | 页码 | Integer | 1
pageSize | 每页数 | Integer | 10
orderBy | 排序字段 | String | id desc
timeFrom | 时间范围开始 | yyyy-MM-dd HH:mm:ss | NaN
timeTo | 时间范围结束 | yyyy-MM-dd HH:mm:ss | NaN
dateRangeType | 时间范围类型 | HOUR("时"),DAY("天"),YESTERDAY("周"),MONTH("月"),QUATER("季"), YEAR("年"); | NaN


# 接口的返回值
参数名称 | 参数值 | 参数含意
---|---|---
code |-1 | 系统错误，需要开发人员处理 
- | 0 | 业务提示，只需反馈给页面
- | 1 | 功能无异常，有业务状态返回
- | \>1 | 明确的系统错误代码，按具体的返回内容处理
requestTime | 请求时间 | 请求进入  controller 的时间
responeTime | 响应时间 | 请求在Controller 进行set 结果的时间
costTime | 时间消耗 | 在 Controller 内消耗的时间，单位为毫秒
data  | 详情 | 错误时为错误内容，提示时为用户提示，正常返回时为业务数据【无具体业务数据时返回 true】
==分页== | ==查询== | ==有返回== 
pageNo | Integer | 页码
pageSize | Integer | 每页数
totalPage | Integer | 总页码数
totalCount | Integer | 叫数据条数
rows | Array | 具体的业务数据



# 返回特殊 code 代码对应表

代码 | 提示语 | 说明
---|---|---
10001 | token 为空！ | 接口需要登录才能访问，header 要附带正确的 token
10002 | token 不正确或已失效！ | 接口需要登录才能访问,并且附带的 token 不正确或已失效
10003 | 非法传输 token！ | 将 token 放在了不合理的位置
10004 | 非法长度的 token！ | token 出现了其他干扰字符
10005 | token 签名效验失败！ | token 内容被修改
- | - | -
20001 | 用户登录环境改变！ | 用户终端改变，不再允许操作，需要重新登录
20002 | api url can not be cors | 接口地址不被允许使用
20003 | origin url can not be cors | 前端域名不被允许使用
- | - | -
30001 | 登录名或密码错误 | 防止用户猜测，用户名和密码错误都使用同一个提示
30002 | 图片验证码错误 | 图片验证码错误
30003 | 需要图片验证码 | 需要图片验证码
30004 | 短信验证码错误 | 短信验证码错误
- | - | -
40001 | 订单支付超时已自动取消，请重新下单！ | 订单超时
40002 | 订单已完成支付，请不要重复支付！ | 订单已支付
40003 | 订单状态异常，不能支付！ | 订单其他异常状态


# 规范推荐
- [阿里巴巴Java开发规约](https://github.com/alibaba/p3c)
- 已经包含 规范条例，ide 的检查插件

# 自定义规范
```
命名规范
```
- <span style="color:red">规范：命名规范</span><span style="color:orange">-强制执行</span>
- 说明：为解决sql语句查询命名冲突，java类命名含意不清晰问题，定义以下命名规范（方式）
  1. 确认sql查询，java类的主体。比如：user 用户【以下基于用户为主体的命名】
  2. 简单命名：主体内容命名采用简单命名，比如 id = 用户编号。name = 用户名称。status = 用户状态
  3. 完整命名：非主体内容命名采用完整命名，比如 school_id = 学校编号。school_name = 学校名称。school_status = 学校状态。
  4. 无法确认主体的sql查询，java类，全部采用完整命名，不允许出现 id, name, status 等命名方式。
  5. 表字段 为下划线规范，类为驼峰规范。两者已经实现自动转换
  6. 表名、字段名必须使用小写字母或数字，禁止出现数字开头，禁止两个下划线中间只出现数字，禁止使用驼峰命名
  7. 表名不使用复数名词
  8. 字段禁用官方保留字
  9. 唯一索引用 uk_字段名  ，普通索引用 idx_字段名
  10. 表名前应该加上前缀，一般为：业务名称_表的作用
  11. 日志表均以_log后缀
  12. 临时表要以tmp_前缀，以时间后缀 \
  备份表要以bak_前缀，以时间后缀


```
数据库字符集规范
```
- <span style="color:red">规范：数据库字符集规范</span><span style="color:orange">-强制执行</span>
- 说明：数据库字段字符集不一致，无法使用 = （等号）操作符，索引效果不理想。
  1. 数据库字符集全部统一使用 utf8_unicode_ci
  3. 在要求大小写敏感的一些地方，可选用 utf8_unicode_cs


```
数据库表设计规范
```
- <span style="color:red">规范：数据库表设计规范</span><span style="color:orange">-强制执行</span>
- 说明：为提高数据库运行效率，规范数据库表设计，特定义以下规范：
  1. 表必须定义主键，默认为ID，整型自增（如果有特殊情况，可商讨后自定义）
  2. 禁止使用外键，一切外键概念必须在应用层解决
  3. 多表中的相同列，必须保证列定义一致
  4. 每个表都要有
    - 排序（sort）
    - 可用状态（enable_flag）
    - 可用开始（enable_begin）
    - 可用结束（enable_end）
    - 创建时间（create_time）
    - 创建人（create_by）
    - 修改时间（update_time）
    - 修改人（update_by）
    - 备注（comments）
    - 版本号（version）\
    10个字段。具体字段设计可参考表cms_test，sort字段后的全部字段信息（包含sort字段）
  5. 小数类型用decimal（禁止使用float和double），如果存储的数据范围超过decimal的范围，建议将数据拆成整数和小数分开存储
  6. 如果存储的字符串长度几乎相等，使用char定长字符串类型
  7. 每个字段都要有明确的注释，当字段的定义有修改时，要及时修改注释信息
  8. varchar长度设计需要根据业务实际需要进行长度控制，禁止预留过长空间
  9. 需要join的字段，数据类型保持绝对一致；多表关联查询时，保证被关联的字段需要有索引


```
（最小化）数据传输原则
```
- <span style="color:red">原则：（最小化）数据传输原则</span><span style="color:orange">-强烈推荐</span>
- 说明：为系统系统的参数更简洁，更方便维护，制定以下推荐条例：
  1. 接口定义，参数需要尽可能的简洁。所有的参数都是必需参数。能后端获取的参数，不要让前端传。
  2. 接口参数定义，尽可能封装对象传输，不要包含不必要的参数。
  3. 自定义 sql 查询，结果集将只包含必要的数据。
  4. 接口参数返回，所有参数都需要是必要且不多余的。

```
最快收敛原则
```
- <span style="color:red">原则：最快收敛原则</span><span style="color:orange">-强烈推荐</span>
- 说明：为提高系统的性能，偷换数学的概念，结合编码学，创建了最快收敛原因：
  1. 前端（接口定义）聚合数据进行传输。如，批量删除，只应传一组id，调一次接口
  2. 需要调用其他服务模块，如果其他服务批量操作，应预先准备数据，进行一次调用
  3. 对数据库进行多次类似的操作，如果有批量操作接口，应预先准备数据，只对数据库进行一次操作
  4. sql 查询进行数据关联时，应找对 join 条件，使得进行关联的数据以最快的速度减少
  5. 数据返回时，尽可能聚合参数，尽可能减少数据的传输次数
  6. 如果可以做到以上的回忆收敛，可以不考虑 java 代码对数据的处理量。原因是：以上的调用过程都要经过 http 请求，或者磁盘的读写。而 java 的运行，会全部在内存中运行。效率不是同一个数量级


```
注入风险管理强制
```
- <span style="color:red">原则：注入风险管理强制</span><span style="color:orange">-强制</span>
- 说明：防止一切注入风险：
  1. 【重要】orderBy 中使用 ${}。必需使用 setOrderBy 传入，已经添加风险控制
  2. MBG 的 noValue，singleValue，betweenValue，listValue 注入风险：Example 的 Criteria 产生，无注入风险
  3. MBG 的 like 注入风险：like 前的由 Example 控制，后的为 #{}, 无注入风险
  4. 【重要】Custom 实现的 like 强制使用 AND column like concat("%",#{value},"%")
        
```
金钱的计算原则
```
- <span style="color:red"> 原则：单位精确到分。BigDecimal.ROUND_HALF_UP 原则</span><span style="color:orange">-强制执行</span>

> 前端：
 - 计算后的值，必需使用 toFixed(n)  函数进行处理。
 - 也可以使用：Math.round(parseFloat(price*100 * quantity))/100

> 后端：
 - 强制使用 BigDecimal，后端：bigDecimal.setScale(2,BigDecimal.ROUND_HALF_UP)

```
代码管理
```
- <span style="color:red">使用提示：代码管理</span><span style="color:orange">-强烈推荐</span>
- 说明：为防止版本管理上，代码会错误  merge 而被覆盖的问题，需要按照以下步骤进行操作：
    1. 把不需要提交的代码还原掉
    2. 把需要提交的代码提交到本地 【commit】
    3. 拉取 gitee 上的代码 【pull】
    4. 处理冲突【按照上面步骤操作，冲突将针对是最少的】
    5. 将代码推向 gitee 【push】


# 说明
- 所有需要验证权限的接口，都需要验证 token，需要在 header 中传值。
- 对于只能使用一次的 token, 请从临时 token 接口获取token。临时 token 只能获取一次，只能 ? 传参
- 后端确定前端为哪个站点，是通过 headers 里面的 Origin 获取的，可选在 ? 上附加此参数。如果需要区分 Origin，在 postman 上可以进行模拟
- 接口规范将在此文档补全，不另立文档，大家有什么建议，都可在讨论结果一致，后修改此文档。

