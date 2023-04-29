# 路径类/资源获取

## 获取 Class 所在的包路径
```java
Object.class.getProtectionDomain().getCodeSource().getLocation().getFile();
```

##
## 使用 ClassLoader 查询资源文件
```java
Enumeration<URL> urls = ClassLoader.getSystemResources("path from resources to file");
    while (urls.hasMoreElements()) {
        String file = urls.nextElement().getFile();
        if (file.contains("name")) {
            System.out.println(file);
            break;
        }
    }
```