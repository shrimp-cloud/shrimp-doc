# JVM

### jvm 相关命令

#### jmap
手动触发 full gc
```shell
jmap -histo:live pid
```

dump 全量 heap: 
```shell
jmap -dump:format=b,file=~/heapdump.hprof pid
```

dump 全量 heap:
```shell
jmap -dump:live,format=b,file=~/heapdump.hprof pid
```


