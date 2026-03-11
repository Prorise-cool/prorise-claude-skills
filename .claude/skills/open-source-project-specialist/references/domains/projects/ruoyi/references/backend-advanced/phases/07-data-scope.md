# 第 07 阶段：数据范围权限

## 目标
查询结果会根据用户的部门和基于角色的数据范围自动过滤 `@DataScope` 注解。

## 先决条件
- 任务调度配置为 [05-任务调度.md](./05-task-scheduling.md)
- 在角色管理中配置了数据范围规则的角色（全部/自定义/部门/部门及以下/仅限自身）

## 执行步骤

### 第 1 步：向服务方法添加 @DataScope 注解

❌ **错误的方法**：使用硬编码的部门检查手动过滤数据范围。
```java
// Wrong: hardcoded scope logic, ignores role-based data permissions
public List<SysUser> selectUserList(SysUser user) {
    Long deptId = SecurityUtils.getLoginUser().getDeptId();
    user.setDeptId(deptId);  // Only sees own department, no flexibility
    return userMapper.selectUserList(user);
}
```

✅ **正确方法**：使用 `@DataScope` Service 方法上带有别名映射的注释。
```java
@DataScope(deptAlias = "d", userAlias = "u")
public List<SysUser> selectUserList(SysUser user) {
    return userMapper.selectUserList(user);
}
```

该注解将 SQL 片段注入 `${params.dataScope}` 基于当前用户的角色数据范围设置。

⚠️ **陷阱**： `deptAlias` 和 `userAlias` 值必须与映射器 XML 中使用的表别名完全匹配。不匹配（例如， `deptAlias = "d"` 但 SQL 使用 `dept`) 在运行时导致 SQL 语法错误。

### 步骤 2：使用 dataScope 占位符配置 Mapper XML

❌ **错误的方法**：在没有 `${params.dataScope}` 占位符。
```xml
<!-- Wrong: no data scope filtering, all users see all data -->
<select id="selectUserList" resultMap="SysUserResult">
    SELECT u.user_id, u.user_name, d.dept_name
    FROM sys_user u
    LEFT JOIN sys_dept d ON u.dept_id = d.dept_id
    WHERE u.del_flag = '0'
</select>
```

✅ **正确方法**：追加 `${params.dataScope}` 在 WHERE 子句的末尾。
```xml
<select id="selectUserList" parameterType="SysUser" resultMap="SysUserResult">
    SELECT u.user_id, u.user_name, u.email, d.dept_name
    FROM sys_user u
    LEFT JOIN sys_dept d ON u.dept_id = d.dept_id
    WHERE u.del_flag = '0'
    <if test="userName != null and userName != ''">
        AND u.user_name LIKE concat('%', #{userName}, '%')
    </if>
    <!-- Data scope filter injected here by @DataScope AOP -->
    ${params.dataScope}
</select>
```

为具有“部门及以下”范围的角色生成的 SQL 为：
```sql
AND (d.dept_id IN (SELECT dept_id FROM sys_dept
     WHERE dept_id = 103 OR find_in_set(103, ancestors)))
```

⚠️ **陷阱**： `${params.dataScope}` 用途 `${}` （字符串替换），不是 `#{}` （准备好的声明）。这是故意的，因为它注入了 WHERE 子句片段。但是，该值是由框架在服务器端生成的，而不是根据用户输入生成的，因此 SQL 注入在这里不存在风险。

### 步骤 3：在管理面板中配置角色数据范围

❌ **错误方法**：将“所有数据”范围分配给每个角色。
```text
# Wrong: defeats the purpose of data scope entirely
Role: Department Manager -> Data Scope: All Data Permissions
```

✅ **正确方法**：在角色管理中为每个角色设置适当的范围。
```text
1. Navigate: System Management -> Role Management -> Edit Role
2. Set "Data Scope" dropdown:
   - All Data Permissions:       No filtering, sees everything
   - Custom Data Permissions:    Select specific departments manually
   - Department Data:            Only own department
   - Department and Below Data:  Own department + child departments
   - Self Data Only:             Only records created by the user
3. For "Custom", select departments from the tree picker
4. Save the role configuration
```

实体必须扩展 `BaseEntity` 它提供了 `params` 地图：
```java
public class SysUser extends BaseEntity {
    // BaseEntity already contains:
    // private Map<String, Object> params = new HashMap<>();
    // @DataScope sets params.put("dataScope", sqlFragment)
}
```

⚠️ **陷阱**：如果实体不扩展 `BaseEntity`， 这 `params` 地图丢失并且 `${params.dataScope}` 解析为空，不产生任何过滤。始终验证实体继承。

## 完成标准
- 具有“仅限部门”范围的用户只能看到其部门的数据
- 具有“仅限自身”范围的用户只能看到自己的记录
- 具有“所有数据”范围的管理员可以查看所有记录而不进行过滤
- 更改角色的数据范围会立即影响具有该角色的所有用户

## 下一步
-> [09-多数据源.md](./09-multi-datasource.md)
