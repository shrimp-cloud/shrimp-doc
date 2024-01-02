# JVM

## jps

> jdk提供的一个查看当前java进程的小工具

| 命令     | 用途                      |
|--------|-------------------------|
| jps -l | 输出完全的包名，应用主类名，jar的完全路径名 |
| jps -v | 输出jvm参数                 |


## jinfo

> JDK 自带的命令，可以用来查看正在运行的 java 应用程序的扩展参数，包括Java System属性和JVM命令行参数；也可以动态的修改正在运行的 JVM 一些参数

| 命令                             | 用途               | 示例                                                                                        |
|--------------------------------|------------------|-------------------------------------------------------------------------------------------|
| info pid                       | 查看jvm系统详细参数及环境变量 | info 1                                                                                    |
| info -flags pid                | 查看jvm非默认值参数      | info -flags 1                                                                             |
| jinfo -flag \<option\> pid     | 每个参数独立查看         | jinfo -flag MetaspaceSize 1                                                               |
| jinfo -flag \<name\>=\<value\> | 动态修改jvm参数        | `jinfo -flag +HeapDumpOnOutOfMemoryError 1` <br/> `jinfo -flag HeapDumpPath=/opt/dump/ 1` |


## jstat

> 查看进程的JVM的GC和堆内存使用情况

| 命令                     | 用途                     | 说明                     |
|------------------------|------------------------|------------------------|
| jstat -gc pid [刷新时间ms] | GC 详情                  | xxC 是容量，xxU是使用量,xxT是耗时 |
| jstat -class pid       | 查询加载卸载class的数量及所占空间耗时。 |                        |
| jstat -gcutil pid      | 查询进程内存各年龄代使用率          | M是metaspace            |


## jstack

> 线程栈工具

- `top -H -p <pid>` 该进程下最占用CPU资源的线程排序

| 命令         | 说明        |
|------------|-----------|
| jstack pid | 打印该进程的线程栈 |

## jmap

> JVM内存使用情况(实例数、class、占用)

| 命令                                          | 说明                           |
|---------------------------------------------|------------------------------|
| jmap -histo pid &#124; head -n 10           | 查看前10位                       |
| jmap -histo pid &#124; sort -k 2 -g -r      | 查看对象数最多的对象，按降序输出             |
| jmap -histo pid &#124; sort -k 3 -g -r      | 查看内存的对象，按降序输出                |
| jmap -histo:live pid                        | 手动触发 full gc                 |
| jmap -dump:format=b,file=文件名.hprof pid      | dump内存镜像到文件                  |
| jmap -dump:live,format=b,file=文件名.hprof pid | dump在生命周期内的内存镜像到文件(无法被GC的对象) |

## jcmd

| 命令                    | 含义                                    |
|-----------------------|---------------------------------------|
| jcmd -l               | 输出完全的包名，应用主类名，jar的完全路径名, 等同于 `jps -l` |
| jcmd pid help         | 列出该进程的可用命令                            |
| jcmd pid [option]     | 执行相关命令                                |
| jcmd pid GC.heap_info | 查看 GC 信息(更换 option 可查询更多信息)           |

