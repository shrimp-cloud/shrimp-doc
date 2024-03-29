# 与或

---

## 前提

### 监控需求
> 监控逻辑需要对多组参数进行识别和判断，若判断出参数异常，需要做出响应。参数是提前可预知的，但判断条件是按场景进行的。故需要将判断逻辑变成可配置的形式，来做到灵活的配置规则，完成监控警告功能。

### 数学概念
> 与或非，是数学概念。我们可以用电路来实现与或非逻辑，也可以用代码实现。具体与或非的概念，请自行百度

### 设计思路
> 使用数学上的与或非逻辑，对监控数据做逻辑判断，完成数据的断言，为业务提供准确的，符合需求的结论。在监控需求中，按实际情况，同时也考虑到设计难度，将只使用简单的【与或】逻辑，完成功能设计。

---

## 示例

### 基础知识
1. 光照强度：光线传感器可测的参数。勒克司度（lux）。夏季在阳光直接照射下，光照强度可达6万～10万lx，没有太阳的室外0.1万～1万lx，夏天明朗的室内100～550lx，夜间满月下为0.2lx ，一般判断白天和晚上的阙值在2～30lx之间。
2. 声音强度：声音传感器可测的参数。分贝（dB）。耳语的音量大小大致为30dB,正常交谈的声音大致为60dB

### 需求示例
1. 仓库监控设备，晚上监控到大于30db噪声，或白天监控到大于 60db噪声时，向管理员发出一般警告。若声音达到100dB,将发出严重警告
2. 仓库安装了一个设备，可以采集光信号，和声音信号
3. 光信号，和声音信号，会抽样(取一段时间内的最大值)上报给系统
4. 系统需要判断：(((光线 >= 16lux) && (声音 > 60db)) || ((光线 < 16lux) && (声音 > 30db))) 条件成立时，向管理员发送警告


### 逻辑示例
1. 设备传感器收集信息：光线 light(lux),声音 sound(dB)
2. 数据上报并存储。
3. 数据判断：若 (((light >= 16lux) && (sound > 60db)) || ((light < 16lux) && (sound > 30db))) ，将发出警告
4. 警告以 短信/邮件/其他 方式发送给关心警告策略的人

---

## 功能设计

### 表设计
1. 警告规则主表：每一条数据代表一个警告规则
2. 警告规则明细表：二级的父子设计。所有一级规则为【或】，所有二级规则，和期对应的父规则，构成【与】
3. 角色规则关系表：借助RBAC授权规则，完成警告规则的灵活授权

### 功能设计
1. 警告规则增删改查(绑定到监控设备)
2. 警告规则明细增删改查。利用设备的监控参数，完成规则的配置
3. 数据接收与判断，在接收到监控数据时，按设计规则分析数据是否满足警告条件
4. 对满足警告条件的监控数据，向用户发出监控警告

### 细节设计
1. 警告规则在界面上要重现父子展示
2. 警告规则需要区分警告级别【严重的警告，通知会更急迫】
3. 帮忙想想，把功能设计得完美一些啊。。。