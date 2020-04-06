# JPATH

## 概述
> - [JSONPath](https://goessner.net/articles/JsonPath/)
> - JSON PATH， json 的路径。为了解决json key 中包含 点 (.) 的场景，jpath 与上面 SONPath 不完全相同。在项目中，使用 (/) 来元代 (.)。

## 来源
> JSON 横行当代，想抓取一些数据，需要做各种JSON识别，耗费大量精力。发现 XPath的　ｘｍｌ　路径表示方法非常实用，故模拟一套JPath.

## 表示
- 示例：  /root/*/more[2]/node.module/leaf
  - / 表示路径
  - \* 表示可以匹配任意内容，仅支持一级
  - [2] 表示若数据是数组，取第二个数
  - node.module 中的 (.), 需要识别为key， 而非路径层次

## 实现
- JSON PATH 实现:
  1. 获取 JSON 原始数据，使用 JPath 规则识别的路径配置为 key, 路径值为 value，形成一个 HashMap
  2. Map 使用 contains 进行键，值识别，获取精确的 JPath
  2. 按 JPath 的规则，遍历 JSONObject, 或者 LinkHasMap
  3. 若能获取到值，即JPath 成功表其内容
  4. 在数据库里面，对同一个值，配置多个 JPath, 更高效的识别具内容。
  
 ## 核心代
 [JPath](https://github.com/lz-cloud/lz-core/blob/release/3.1.0-SNAPSHOT/src/main/java/com/wkclz/core/util/JPathUtil.java)
  