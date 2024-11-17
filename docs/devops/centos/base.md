# 基础命令

## 目录操作

- cd 日常操作

| 命令       | 含义                                |
|----------|-----------------------------------|
| `cd `    | Change Directory，cd后直接回车，回到用户主目录  |
| `cd ~`   | 回到用户主目录，等同于 cd 直接回车               |
| `cd /`   | 切换到系统根目录                          |
| `cd ..`  | 切换到父目录                            |
| `cd ../` | 切换到父目录, 同上                        |
| `pwd`    | Print Working Directory，显示目前所在的目录 |

- ls 日常操作

| 命令      | 含义                                     |
|---------|----------------------------------------|
| `ls`    | 查看当前目录下的所有目录文件                         |
| `ls -a` | 查看当前目录下的所有目录文件 , 包括隐藏文件                |
| `ls -l` | 查看当前目录下所有目录文件的详细信息(文件创建的时间，文件权限，文件的类型) |
| `ll`    | 等同于 `ls -l, 大多数情况下支持简写命令，若不支持，可以自行扩展别名 |

- 目录，文件操作

| 命令      | 示例                   | 含义                                                      |
|---------|----------------------|---------------------------------------------------------|
| `mkdir` | `mkdir abc`          | 创建名字为 abc 的目录                                           |
| `rm`    | `rm aaa.txt`         | <span style="color: red">【删除需谨慎】</span>删除名称为 aaa.txt 的文件 |
| `rm`    | `rm -rf abc`         | <span style="color: red">【删除需谨慎】</span>-r 递归，-f 强制(不出现删除提示)，递归方式强制删除目录                  |
| `cp`    | `cp aaa.txt bbb.txt` | 复制，将 aaa.txt 复制为 bbb.txt, 复制时可加上路径，即复制到新的位置             |
| `cp`    | `cp -r abc efg`      | 将 abc 目录，以递归方式复制为 efg                                   |
| `mv`    | `mv aaa.txt bbb.txt` | 修改名称，移动, 将 aaa.txt 重命名为 bbb.txt, 若位置不同，即为移动             |


注意：
1. 以 . 点前头的文件名，目录名，为隐藏文件/目录
2. Linux 中的目录，即 Windows 中的文件夹
3. 路径：文件 / 目录的位置，称之为路径
4. 相对路径：不以 / 开头，相对于当前位置的相对位置
5. 绝对路径：以 / 开关，相对于系统根目录的位置

## 文本操作

> Linux 基本的文本操作

| 命令   | 示例                                         | 含义                               |
|------|--------------------------------------------|----------------------------------|
| cat  | cat file                                   | concatenate, 获取文件内容。在文件很大时会刷屏    |
| head | head filename                              | 显示文件的前10行 (默认前10行)               |
| head | head -20 filename                          | 显示文件的前20行                        |
| tail | tail filename                              | 显示文件的最后10行 (默认后10行)              |
| tail | tail -20 filename                          | 显示文件的最后20行                       |
| tail | tail -20f filename                         | 显示文件的最后20行,若文件有新内容，会一直更新，适合看动态日志 |
| nl   | nl file                                    | 显示带有行号的文件                        |
| grep | cat file &#124; grep keyword               | 过滤显示文件的内容                        |
| sed  | sed s/mysql/MySQL/g filename               | 将文件中的mysql替换成MySQL               |
| sed  | sed s/mysql/MySQL/g filename > newfilename | 将文件中的mysql替换成MySQL,并写到新文件        |
| more | more file                                  | 每次显示文件的一页，并允许分页                  |
| less | less file                                  | 与more命令类似, 快捷键比 more 更实用         |


## vim

> vim 是一款文本编辑器，在 Linux 中，只要是纯文本的文件，都可以使用 vim 进行编辑。
> vi 与 vim 的差别： vi 是 Linux 自带的编辑器，但功能比 vim 弱。所以正常情况下不讨论 vi, 只讨论 vim

### 安装
```shell
yum install vim -y
```

### 写不下去了，[这里](https://www.runoob.com/linux/linux-vim.html)太全了。。