# 文件服务

> 三方文件(对象存储) 服务接入

## 支持清单
- S3协议相关对象存储 (AWS S3, MinIO, 快快云)
- Aliyun OSS 对象存储


## 使用

### 添加依赖

```xml
<dependency>
    <groupId>com.wkclz.file</groupId>
    <artifactId>shrimp-cloud-file</artifactId>
    <version>${latest.version}</version>
</dependency>
```

### 添加S3配置

```text
shrimp:
  cloud:
    file:
      s3:
        region: region # 可不配置，若不配置将是默认的 region
        bucket: bucket
        endpoint: s3-endpoint
        bucket-domain: s3-domain # 可不配置，若不配置，将是默认的 domain
        access-key-id: access-key-id
        secret-key-secret: secret-key-secret
```


### 添加AliOSS配置

```text
shrimp:
  cloud:
    file:
      alioss:
        bucket: bucket
        endpoint: oss-endpoint
        bucket-domain: oss-domain
        access-key-id: access-key-id
        secret-key-secret: secret-key-secret
```


### 上传文件
```java
@RestController
public class TestRest {
    
    @Autowired
    private S3Api s3Api;

    @PostMapping("/public/file/upload")
    public Result fileUpload(@RequestParam("file") MultipartFile file, String busnessType){
        String dd = s3Api.upload(file, busnessType);
        return Result.data(dd);
    }
}


```


