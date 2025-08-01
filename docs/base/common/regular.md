# 常用正则集合

> 正则表达式（Regular Expression，简称“regex”或“regexp”）是一种用来匹配字符串中字符模式的工具。


## 特殊字符含义

| 特殊字符  | 描述                              |
|:------|:--------------------------------|
| .     | 除换行符之外的任意单个字符                   |
| *     | 前面的子表达式零次或多次                    |
| +     | 前面的子表达式一次或多次                    |
| ?     | 前面的子表达式零次或一次                    |
| ^     | 输入字符串的开始位置                      |
| $     | 输入字符串的结束位置                      |
| {n}   | 前面的子表达式必须恰好出现 n 次置              |
| [abc] | 字符集，表示匹配方括号内的任意一个字符             |
| \d    | 匹配一个数字字符，等价于 [0-9]              |
| \w    | 匹配包括下划线的任何单词字符。等价于 [A-Za-z0-9_] |
| \s    | 空白字符                            |


## 正则断言

> 正则断言（Assertions）是正则表达式中用于指定匹配位置或条件的特殊语法，它们本身不消耗字符（即不匹配实际的文本内容），而是对匹配的位置或周围环境进行检查。断言确保了匹配必须满足特定的上下文条件。

| 类型     | 示例                 | 说明                                                                                     |
|:-------|:-------------------|:---------------------------------------------------------------------------------------|
| 正向先行断言 | Windows(?=10\|11)  | 匹配 "Windows"，但仅当它后面紧跟着 "10" 或 "11" 时。例如，在 "Windows10" 中匹配 "Windows"，但在 "Windows7" 中不匹配 |
| 负向先行断言 | Windows(?!10\|11)  | 匹配 "Windows"，但仅当它后面不跟着 "10" 或 "11" 时。例如，在 "Windows10" 中不匹配 "Windows"，但在 "Windows7" 中匹配 |
| 正向后行断言 | (?<=10\|11)Windows | 匹配 "Windows"，但仅当它前面紧跟着 "10" 或 "11" 时。例如，在 "10Windows" 中匹配 "Windows"，但在 "7Windows" 中不匹配 |
| 负向后行断言 | (?<!10\|11)Windows | 匹配 "Windows"，但仅当它前面不跟着 "10" 或 "11" 时。例如，在 "10Windows" 中不匹配 "Windows"，但在 "7Windows" 中匹配 |
| 零宽断言   | (?=...)            | 匹配 ...。例如，(?=a) 匹配任何位置的 "a"                                                            |
| 单词边界   | \bcat\b            | 匹配独立的单词 "cat"，但不匹配 "category" 中的 "cat" 或 "educate" 中的 "cat"                            |
| 非单词边界  | \Bcat\B            | 匹配 "cat" 前后都必须是单词字符的位置，例如 "educate" 中的 "cat"                                           |
| 行首     | ^Hello             | 匹配以 "Hello" 开头的行或字符串                                                                   |
| 行尾     | world$             | 匹配以 "world" 结尾的行或字符串                                                                   |


## 正则分组

> 正则表达式中的分组（Grouping）是一种将多个字符或子模式组合在一起，作为一个整体进行处理的机制。它使用圆括号 () 来实现。

| 类型    | 示例           | 说明                                                              |
|:------|:-------------|:----------------------------------------------------------------|
| 捕获组   | `(...)`        | 创建一个捕获组，并返回匹配到的文本。例如，(...) 创建一个捕获组，并返回匹配到的文本                    |
| 非 捕获组 | `(?:...)`      | 创建一个非捕获组，不返回匹配到的文本。例如，(?:...)                                   |
| 命名捕获组 | `(?<name>...)` | 创建一个命名的分组，并返回匹配到的文本。例如，`(?<name>...) `创建一个名为 "name" 的分组，并返回匹配到的文本 |

替换引用： 替换引用 `$n` 或 `$<name>` 在替换字符串中引用第 n 个捕获组或命名捕获组的内容

---

# 正则使用案例


## JS 正则使用方法
```javascript
const mobileReg = /^1[3|4|5|7|8]\d{9}$/;
const mobile = '13838381438'
if(!mobileReg.test(mobile)){
    console.log('请正确填写手机号!');
    return;
}
```

```javascript
// console中，两行 ：
var patt = /e/;
patt.test("The best things in life are free!");
// console中，一行:
/e/.test("The best things in life are free!")
```


## VUE 表单验证正则
```javascript
const rules = ref({
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "邮箱地址不能为空", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
  ],
  mobile: [
    { required: true, message: "手机号码不能为空", trigger: "blur" },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
  ],
});
```


## Java 正则
```java
package com.wkclz.common.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 匹配是否为合法字符
 */
public class RegularUtil {

    private static final Pattern IS_LEGAL_CHAR = Pattern.compile("^[0-9a-zA-Z_]{1,}$");

    public static boolean isLegalChar(String str){
        if (StringUtils.isBlank(str)) {
            return false;
        }
        str = str.trim();
        Matcher matcher = IS_LEGAL_CHAR.matcher(str);
        return matcher.matches();
    }
}

```



## 常用正则

- 内容识别

| 类型  | 正则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|:----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 邮箱  | `\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 手机号 | `^(13[0-9]\|14[579]\|15[0-3,5-9]\|16[6]\|17[0135678]\|18[0-9]\|19[89])\d{8}$`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| IP  | `(?=(\b\|\D))(((\d{1,2})\|(1\d{1,2})\|(2[0-4]\d)\|(25[0-5]))\.){3}((\d{1,2})\|(1\d{1,2})\|(2[0-4]\d)\|(25[0-5]))(?=(\b\|\D))`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 域名  | `^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 日期  | `((^((1[8-9]\d{2})\|([2-9]\d{3}))([-\/\._])(10\|12\|0?[13578])([-\/\._])(3[01]\|[12][0-9]\|0?[1-9])$)\|(^((1[8-9]\d{2})\|([2-9]\d{3}))([-\/\._])(11\|0?[469])([-\/\._])(30\|[12][0-9]\|0?[1-9])$)\|(^((1[8-9]\d{2})\|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]\|1[0-9]\|0?[1-9])$)\|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)\|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)\|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)\|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)\|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)\|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)\|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)\|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))` |
| HTML 标签 | `<(\S*?)[^>]*>.*?</\1>\|<.*? />`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

- 匹配特定字符串

| 正则               | 说明                       |
|:-----------------|:-------------------------|
| `^[A-Za-z]+$`    | 匹配由26个英文字母组成的字符串         |
| `^[A-Z]+$`       | 匹配由26个英文字母的大写组成的字符串      |
| `^[a-z]+$`       | 匹配由26个英文字母的小写组成的字符串      |
| `^[A-Za-z0-9]+$` | 匹配由数字和26个英文字母组成的字符串      |
| `^\w+$`          | 匹配由数字、26个英文字母或者下划线组成的字符串 |
| `\u4e00-\u9fa5`  | 中文                       |
| `^\x00-\xff`     | 双字节字符                    |
| `\n\s*\r`        | 空白行                      |




- 匹配特定数字

| 正则                                                 | 说明                            |
|:---------------------------------------------------|:------------------------------|
| `^[1-9]\d*$`                                       | 匹配正整数                         |
| `^-[1-9]\d*$`                                      | 匹配负整数                         |
| `^-?[1-9]\d*$`                                     | 匹配整数                          |
| `^[1-9]\d*\|0$`                                    | 匹配非负整数（正整数 + 0） 【有bug,参照后第二个】 |
| `^-[1-9]\d*\|0$`                                   | 匹配非正整数（负整数 + 0）               |
| `^([1-9][0-9]*\|0)$`                               | 匹配非负整数（正整数 + 0）               |
| `^\d+(\.{0,1}\d+){0,1}$`                           | 非负数【0，正整数，正小数】                |
| `-?[0-9]+.?[0-9]+`                                 | 识别小数【正负】                      |
| `[0-9]+.?[0-9]+`                                   | 识别小数【正】                       |
| `^[1-9]\d*\.\d*\|0\.\d*[1-9]\d*$`                  | 匹配正浮点数                        |
| `^-([1-9]\d*\.\d*\|0\.\d*[1-9]\d*)$`               | 匹配负浮点数                        |
| `^-?([1-9]\d*\.\d*\|0\.\d*[1-9]\d*\|0?\.0+\|0)$`   | 匹配浮点数                         |
| `^[1-9]\d*\.\d*\|0\.\d*[1-9]\d*\|0?\.0+\|0$`       | 匹配非负浮点数（正浮点数 + 0）             |
| `^(-([1-9]\d*\.\d*\|0\.\d*[1-9]\d*))\|0?\.0+\|0$ ` | 匹配非正浮点数（负浮点数 + 0）             |

