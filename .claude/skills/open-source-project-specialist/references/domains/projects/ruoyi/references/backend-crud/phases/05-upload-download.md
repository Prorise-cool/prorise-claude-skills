# 阶段05：文件上传和下载

## 目标
文件上传通过 `el-upload` 通过以下方式存储在服务器上 `/common/upload`，下载链接触发浏览器文件保存。

## 先决条件
- 进出口工作按 [03-导入-导出.md](./03-import-export.md)
- 文件存储路径配置在 `application.yml` (`ruoyi.profile`)

## 执行步骤

### 第 1 步：使用 Auth 标头配置 el-upload 组件

❌ **错误的方法**：使用 `el-upload` 没有授权标头。
```html
<!-- Wrong: no headers prop, server returns 401 -->
<el-upload
  :action="upload.url"
  :on-success="handleFileSuccess">
  <el-button size="small" type="primary">Upload</el-button>
</el-upload>
```

✅ **正确做法**：设置 `headers` 使用不记名令牌并配置所有事件处理程序。
```html
<el-upload
  ref="upload"
  :limit="1"
  accept=".jpg, .png"
  :action="upload.url"
  :headers="upload.headers"
  :file-list="upload.fileList"
  :on-progress="handleFileUploadProgress"
  :on-success="handleFileSuccess"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">Select File</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success"
    :loading="upload.isUploading" @click="submitUpload">Upload</el-button>
  <div slot="tip" class="el-upload__tip">jpg/png only, max 500kb</div>
</el-upload>
```

⚠️ **陷阱**：省略 `:headers="upload.headers"` 导致每个上传请求失败并返回 401。令牌必须在组件创建时获取，而不是作为静态字符串。

### 步骤2：定义上传数据并导入getToken

❌ **错误的方法**：对令牌字符串进行硬编码。
```javascript
// Wrong: hardcoded token expires, no dynamic refresh
upload: {
  headers: { Authorization: "Bearer abc123..." },
  url: "/common/upload"
}
```

✅ **正确方法**：使用 `getToken()` 对于动态令牌和 `VUE_APP_BASE_API` 对于 URL 前缀。
```javascript
import { getToken } from "@/utils/auth";

data() {
  return {
    upload: {
      isUploading: false,
      headers: { Authorization: "Bearer " + getToken() },
      url: process.env.VUE_APP_BASE_API + "/common/upload",
      fileList: []
    }
  };
}
```

⚠️ **陷阱**：如果用户会话在长表单编辑期间过期，则在组件安装时捕获的令牌将变得无效。考虑刷新令牌 `beforeUpload` 对于长期存在的形式。

### 第3步：处理上传事件和表单绑定

❌ **错误的方法**：在新建/编辑操作时不清除文件列表。
```javascript
// Wrong: stale files from previous edit appear in the upload component
handleAdd() {
  this.reset();
  this.open = true;
}
```

✅ **正确方法**：明确 `fileList` 添加时，在编辑时填充它。
```javascript
handleAdd() {
  this.reset();
  this.upload.fileList = [];
  this.open = true;
},
handleUpdate(row) {
  this.reset();
  // Show existing file in the upload list
  this.upload.fileList = [{ name: row.fileName, url: row.filePath }];
  this.open = true;
},
submitUpload() {
  this.$refs.upload.submit();
},
handleFileUploadProgress(event, file, fileList) {
  this.upload.isUploading = true;
},
handleFileSuccess(response, file, fileList) {
  this.upload.isUploading = false;
  this.form.filePath = response.url;
  this.msgSuccess(response.msg);
}
```

⚠️ **陷阱**： `response.url` 由返回 `/common/upload` 是相对路径（例如， `/profile/upload/2024/01/01/file.png`）。将此路径存储在数据库中。为了显示，前端代理或 Nginx 必须映射 `/profile` 到实际存储目录。

### 第四步：实现文件下载

❌ **错误的方法**：直接在新选项卡中打开文件 URL（对于不可浏览器查看的类型失败）。
```javascript
// Wrong: PDFs and images open in browser instead of downloading
handleDownload(row) {
  window.open(row.filePath);
}
```

✅ **正确方法**：创建一个临时的 `<a>` 元素与 `download` 属性。
```javascript
handleDownload(row) {
  var name = row.fileName;
  var url = row.filePath;
  var suffix = url.substring(url.lastIndexOf("."), url.length);
  const a = document.createElement("a");
  a.setAttribute("download", name + suffix);
  a.setAttribute("target", "_blank");
  a.setAttribute("href", url);
  a.click();
}
```

⚠️ **陷阱**：跨源文件 URL 忽略 `download` 大多数浏览器中的属性。该文件必须从同一源或通过后端代理端点提供，才能触发真正的下载。

## 完成标准
- 文件上传完成并收到 200 响应 `response.url` 存储在表单中
- 可通过存储的 URL 路径访问上传的文件
- 下载按钮触发浏览器保存对话框并使用正确的文件名

## 下一步
-> [07-数据验证.md](./07-data-validation.md)
