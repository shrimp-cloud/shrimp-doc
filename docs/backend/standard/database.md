
# 数据库规范



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
  4. 每个表都要有基础字段，并放在业务字段之后
    - 排序（sort）
    - 创建时间（create_time）
    - 创建人（create_by）
    - 修改时间（update_time）
    - 修改人（update_by）
    - 备注（comments）
    - 版本号（version）\
    7个字段。具体字段设计可参考表demo_types，sort字段后的全部字段信息（包含sort字段）。
  5. 小数类型用decimal（禁止使用float和double），如果存储的数据范围超过decimal的范围，建议将数据拆成整数和小数分开存储
  6. 如果存储的字符串长度几乎相等，使用char定长字符串类型
  7. 每个字段都要有明确的注释，当字段的定义有修改时，要及时修改注释信息
  8. varchar长度设计需要根据业务实际需要进行长度控制，禁止预留过长空间
  9. 需要join的字段，数据类型保持绝对一致；多表关联查询时，保证被关联的字段需要有索引


```
注入风险管理强制
```
- <span style="color:red">原则：注入风险管理强制</span><span style="color:orange">-强制</span>
- 说明：防止一切注入风险：
    1. 【重要】orderBy 中使用 ${}。必需使用 setOrderBy 传入，已经添加风险控制
    2. MBG 的 noValue，singleValue，betweenValue，listValue 注入风险：Example 的 Criteria 产生，无注入风险
    3. MBG 的 like 注入风险：like 前的由 Example 控制，后的为 #{}, 无注入风险
    4. 【重要】Custom 实现的 like 强制使用 AND column like concat("%",#{value},"%")

