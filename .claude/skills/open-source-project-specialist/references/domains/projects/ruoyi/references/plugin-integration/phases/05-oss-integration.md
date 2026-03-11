# 阶段05：MinIO/OSS文件存储集成

## 目标
将 RuoYi 的默认本地磁盘文件存储替换为 MinIO 对象存储，以实现分布式、可扩展的文件管理。

## 先决条件
- MinIO服务器正在运行（默认端口9000，控制台端口9001）
- 为应用程序创建的 MinIO 存储桶
- 默认文件上传工作的 RuoYi-Vue 项目

## 执行步骤

### 第1步：添加MinIO依赖

❌ **错误的做法**：使用过时的 MinIO SDK 版本，不兼容 OkHttp。
```xml
<!-- Wrong: old version causes OkHttp conflicts with SpringBoot -->
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>3.0.10</version>
</dependency>
```

✅ **正确方法**：使用 MinIO SDK 8.x `ruoyi-common/pom.xml`.
```xml
<!-- Minio distributed file storage -->
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.2.1</version>
</dependency>
```

⚠️ **陷阱**：MinIO SDK 8.x 需要 OkHttp 4.x。如果 SpringBoot 管理 OkHttp 3.x，请添加显式 OkHttp 4.x 依赖项或使用 `<dependencyManagement>` 覆盖版本。

### 步骤 2：配置 MinIO 连接属性

❌ **错误方法**：直接在 Java 代码中硬编码 MinIO 凭证。
```java
// Wrong: credentials in source code
MinioClient client = MinioClient.builder()
    .endpoint("http://localhost:9000")
    .credentials("minioadmin", "minioadmin")
    .build();
```

✅ **正确的方法**：外部化配置 `application.yml`.
```yaml
# application.yml - MinIO configuration
minio:
  url: http://localhost:9000
  accessKey: minioadmin
  secretKey: minioadmin
  bucketName: ruoyi
```

创造 `MinioConfig.java` 配置豆：
```java
@Configuration
public class MinioConfig {
    @Value("${minio.url}")
    private String url;
    @Value("${minio.accessKey}")
    private String accessKey;
    @Value("${minio.secretKey}")
    private String secretKey;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
            .endpoint(url)
            .credentials(accessKey, secretKey)
            .build();
    }
}
```

⚠️ **陷阱**：如果 MinIO 在反向代理后面运行， `url` 必须包含代理路径（例如，`http://domain.com/minio`）。如果文件需要直接 URL 访问，还要确保存储桶的访问策略允许公共读取。

### 步骤3：创建上传端点并切换文件上传

❌ **错误做法**：修改现有的 `/common/upload` 端点使用MinIO，破坏本地上传用户。
```java
// Wrong: overwriting the default upload method
@PostMapping("/common/upload")
public AjaxResult uploadFile(MultipartFile file) {
    // Changed to MinIO -- breaks projects still using local storage
}
```

✅ **正确方法**：在现有端点旁边添加一个单独的 MinIO 上传端点。
```java
@PostMapping("/common/uploadMinio")
public AjaxResult uploadFileMinio(MultipartFile file) throws Exception {
    try {
        String fileName = FileUploadUtils.uploadMinio(file);
        AjaxResult ajax = AjaxResult.success();
        ajax.put("url", fileName);
        ajax.put("fileName", fileName);
        ajax.put("newFileName", FileUtils.getName(fileName));
        ajax.put("originalFilename", file.getOriginalFilename());
        return ajax;
    } catch (Exception e) {
        return AjaxResult.error(e.getMessage());
    }
}
```

更新前端上传组件操作 URL：
```javascript
// In Vue component, change upload action
// From: action="/common/upload"
// To:   action="/common/uploadMinio"
// Also remove baseUrl prefix since MinIO returns full URL
```

⚠️ **陷阱**：MinIO 存储桶在第一次上传之前必须存在。如果 `bucketName: ruoyi` 不存在，上传抛出 `ErrorResponseException`。通过 MinIO 控制台或 SDK 创建存储桶： `minioClient.makeBucket(MakeBucketArgs.builder().bucket("ruoyi").build())`.

## 完成标准
- 添加了 MinIO 依赖项并 `MinioConfig` 已创建豆子
- 上传端点 `/common/uploadMinio` 返回 MinIO 对象 URL
- 前端组件可以从 MinIO 上传和显示文件
- 现存的 `/common/upload` 本地存储仍然可以作为备用存储
- 文件保留在 MinIO 存储桶中，并可通过 URL 访问

## 下一步
-> [07-springboot3-upgrade.md](./07-springboot3-upgrade.md)
