# 阶段 01：代码生成器设置和配置

## 目标
配置RuoYi代码生成器（`generator.yml`）并了解生成工作流程入口点。

## 先决条件
- RuoYi-Vue项目连接数据库运行
- 已为业务模块创建数据库表
- 管理员帐户访问系统工具菜单

## 执行步骤

### 步骤1：配置generator.yml

❌ **错误的做法**：保留默认包名称并跳过表前缀配置。
```yaml
# Wrong: using default system package for custom modules
gen:
  author: ruoyi
  packageName: com.ruoyi.system
  autoRemovePre: false
  tablePrefix: sys_
```

✅ **正确方法**：设置作者、目标包，并为自定义模块启用前缀删除。
```yaml
# generator.yml - located in ruoyi-generator resources
gen:
  # Author name in generated code comments
  author: yourname
  # Target package - change to your module name
  packageName: com.ruoyi.business
  # Auto-remove table prefix from class names
  autoRemovePre: true
  # Table prefix to strip (comma-separated for multiple)
  tablePrefix: biz_,app_
```

⚠️ **陷阱**：设置 `autoRemovePre: true` 没有定义 `tablePrefix` 导致类名保留完整的表名前缀，产生类似的名称 `BizProduct` 而不是 `Product`.

### 第 2 步：访问代码生成器 UI

❌ **错误的做法**：手动创建Controller/Service/Mapper文件。
```java
// Wrong: writing boilerplate CRUD code manually
@RestController
@RequestMapping("/business/product")
public class BizProductController extends BaseController {
    // ... tedious manual CRUD code
}
```

✅ **正确方法**：通过系统工具菜单使用内置生成器。
```text
1. Login as admin
2. Navigate: System Tools -> Code Generation
3. Click "Import" button -> Select target tables from database
4. Edit generation config for each table:
   - Module Name: business (maps to ruoyi-business or sub-package)
   - Business Name: product (used for API path and component name)
   - Package Path: com.ruoyi.business
   - Function Name: Product Management (display name in menus)
5. Click "Preview" to verify, then "Generate" to download ZIP
```

⚠️ **陷阱**：导入未定义主键的表会导致生成器无提示地失败。始终确保 `PRIMARY KEY` 设置在目标表上。

### 第 3 步：将生成的代码应用到项目中

❌ **错误的方法**：将所有生成的文件提取到一个目录中。
```text
# Wrong: dumping everything into src/main/java root
unzip ruoyi.zip -d src/main/java/
```

✅ **正确方法**：将每个工件复制到指定位置。
```text
Generated ZIP structure:
main/
  java/com/ruoyi/business/
    controller/XxxController.java  -> ruoyi-admin/src/main/java/...
    domain/Xxx.java                -> ruoyi-system/src/main/java/...
    mapper/XxxMapper.java          -> ruoyi-system/src/main/java/...
    service/IXxxService.java       -> ruoyi-system/src/main/java/...
    service/impl/XxxServiceImpl.java -> ruoyi-system/src/main/java/...
  resources/mapper/business/
    XxxMapper.xml                  -> ruoyi-system/src/main/resources/...
vue/
  views/business/xxx/index.vue     -> ruoyi-ui/src/views/business/xxx/
  api/business/xxx.js              -> ruoyi-ui/src/api/business/
sql/
  xxxMenu.sql                      -> Execute in database for menu permissions
```

⚠️ **陷阱**：忘记执行生成的 SQL 文件会导致即使复制所有代码文件后新菜单也不可见。始终运行 `xxxMenu.sql` 第一的。

## 完成标准
- `generator.yml` 配置了正确的作者、包和表前缀
- 表已成功导入代码生成器
- 生成的代码在放置后编译没有错误
- 执行生成的 SQL 后菜单条目可见

## 下一步
-> [03-单表.md](./03-single-table.md)
