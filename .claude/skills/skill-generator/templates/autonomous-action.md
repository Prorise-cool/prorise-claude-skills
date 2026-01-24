# Autonomous Action Template

自主模式动作文件的模板。

## 模板结构

```markdown
# Action: {{action_name}}

{{action_description}}

## Purpose

{{purpose}}

## Preconditions

{{preconditions_list}}

## Scripts

\`\`\`yaml
# 声明本动作使用的脚本（可选）
# - script-id        # 对应 scripts/script-id.py 或 .sh
\`\`\`

## Execution

\`\`\`javascript
async function execute(state) {
  {{execution_code}}

  // 调用脚本示例
  // const result = await ExecuteScript('script-id', { input: state.context.data });
  // if (!result.success) throw new Error(result.stderr);
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    {{state_updates}}
  }
};
\`\`\`

## Error Handling

| Error Type | Recovery |
|------------|----------|
{{error_handling_table}}

## Next Actions (Hints)

{{next_actions_hints}}
```

## 变量说明

| 变量 | 说明 |
|------|------|
| `{{action_name}}` | 动作名称 |
| `{{action_description}}` | 动作描述 |
| `{{purpose}}` | 详细目的 |
| `{{preconditions_list}}` | 前置条件列表 |
| `{{execution_code}}` | 执行代码 |
| `{{state_updates}}` | 状态更新 |
| `{{error_handling_table}}` | 错误处理表格 |
| `{{next_actions_hints}}` | 后续动作提示 |

## 动作类型模板

### 1. 初始化动作 (Init)

```markdown
# Action: Initialize

初始化 Skill 执行状态。

## Purpose

设置初始状态，准备执行环境。

## Preconditions

- [ ] state.status === 'pending'

## Execution

\`\`\`javascript
async function execute(state) {
  // 1. 创建工作目录
  Bash(\`mkdir -p "\${workDir}"\`);
  
  // 2. 初始化数据
  const initialData = {
    items: [],
    metadata: {}
  };
  
  // 3. 返回状态更新
  return {
    stateUpdates: {
      status: 'running',
      context: initialData
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    status: 'running',
    started_at: new Date().toISOString(),
    context: { /* 初始数据 */ }
  }
};
\`\`\`

## Next Actions

- 成功: 进入主处理循环
- 失败: action-abort
```

### 2. 列表动作 (List)

```markdown
# Action: List Items

显示当前项目列表。

## Purpose

展示所有项目供用户查看和选择。

## Preconditions

- [ ] state.status === 'running'

## Execution

\`\`\`javascript
async function execute(state) {
  const items = state.context.items || [];
  
  if (items.length === 0) {
    console.log('暂无项目');
  } else {
    console.log('项目列表:');
    items.forEach((item, i) => {
      console.log(\`\${i + 1}. \${item.name} - \${item.status}\`);
    });
  }
  
  return {
    stateUpdates: {
      last_action: 'list',
      current_view: 'list'
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    current_view: 'list',
    last_viewed_at: new Date().toISOString()
  }
};
\`\`\`

## Next Actions

- 用户选择创建: action-create
- 用户选择编辑: action-edit
- 用户退出: action-complete
```

### 3. 创建动作 (Create)

```markdown
# Action: Create Item

创建新项目。

## Purpose

引导用户创建新项目。

## Preconditions

- [ ] state.status === 'running'

## Execution

\`\`\`javascript
async function execute(state) {
  // 1. 收集信息
  const input = await AskUserQuestion({
    questions: [{
      question: "请输入项目名称：",
      header: "名称",
      multiSelect: false,
      options: [
        { label: "手动输入", description: "输入自定义名称" }
      ]
    }]
  });
  
  // 2. 创建项目
  const newItem = {
    id: Date.now().toString(),
    name: input["名称"],
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  // 3. 返回状态更新
  return {
    stateUpdates: {
      context: {
        ...state.context,
        items: [...(state.context.items || []), newItem]
      },
      last_created_id: newItem.id
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    'context.items': [...items, newItem],
    last_action: 'create',
    last_created_id: newItem.id
  }
};
\`\`\`

## Next Actions

- 继续创建: action-create
- 返回列表: action-list
```

### 4. 编辑动作 (Edit)

```markdown
# Action: Edit Item

编辑现有项目。

## Purpose

修改已存在的项目。

## Preconditions

- [ ] state.status === 'running'
- [ ] state.selected_item_id !== null

## Execution

\`\`\`javascript
async function execute(state) {
  const itemId = state.selected_item_id;
  const items = state.context.items || [];
  const item = items.find(i => i.id === itemId);
  
  if (!item) {
    throw new Error(\`Item not found: \${itemId}\`);
  }
  
  // 1. 显示当前值
  console.log(\`当前名称: \${item.name}\`);
  
  // 2. 收集新值
  const input = await AskUserQuestion({
    questions: [{
      question: "请输入新名称（留空保持不变）：",
      header: "新名称",
      multiSelect: false,
      options: [
        { label: "保持不变", description: \`当前: \${item.name}\` },
        { label: "手动输入", description: "输入新名称" }
      ]
    }]
  });
  
  // 3. 更新项目
  const updatedItems = items.map(i => 
    i.id === itemId 
      ? { ...i, name: input["新名称"] || i.name, updated_at: new Date().toISOString() }
      : i
  );
  
  return {
    stateUpdates: {
      context: { ...state.context, items: updatedItems },
      selected_item_id: null
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    'context.items': updatedItems,
    selected_item_id: null,
    last_action: 'edit'
  }
};
\`\`\`

## Next Actions

- 返回列表: action-list
```

### 5. 删除动作 (Delete)

```markdown
# Action: Delete Item

删除项目。

## Purpose

从列表中移除项目。

## Preconditions

- [ ] state.status === 'running'
- [ ] state.selected_item_id !== null

## Execution

\`\`\`javascript
async function execute(state) {
  const itemId = state.selected_item_id;
  const items = state.context.items || [];
  
  // 1. 确认删除
  const confirm = await AskUserQuestion({
    questions: [{
      question: "确认删除此项目？",
      header: "确认",
      multiSelect: false,
      options: [
        { label: "确认删除", description: "不可恢复" },
        { label: "取消", description: "返回列表" }
      ]
    }]
  });
  
  if (confirm["确认"] === "取消") {
    return { stateUpdates: { selected_item_id: null } };
  }
  
  // 2. 执行删除
  const updatedItems = items.filter(i => i.id !== itemId);
  
  return {
    stateUpdates: {
      context: { ...state.context, items: updatedItems },
      selected_item_id: null
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    'context.items': filteredItems,
    selected_item_id: null,
    last_action: 'delete'
  }
};
\`\`\`

## Next Actions

- 返回列表: action-list
```

### 6. 完成动作 (Complete)

```markdown
# Action: Complete

完成任务并退出。

## Purpose

保存最终状态，结束 Skill 执行。

## Preconditions

- [ ] state.status === 'running'

## Execution

\`\`\`javascript
async function execute(state) {
  // 1. 保存最终数据
  Write(\`\${workDir}/final-output.json\`, JSON.stringify(state.context, null, 2));
  
  // 2. 生成摘要
  const summary = {
    total_items: state.context.items?.length || 0,
    duration: Date.now() - new Date(state.started_at).getTime(),
    actions_executed: state.completed_actions.length
  };
  
  console.log('任务完成！');
  console.log(\`处理项目: \${summary.total_items}\`);
  console.log(\`执行动作: \${summary.actions_executed}\`);
  
  return {
    stateUpdates: {
      status: 'completed',
      summary: summary
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    status: 'completed',
    completed_at: new Date().toISOString(),
    summary: { /* 统计信息 */ }
  }
};
\`\`\`

## Next Actions

- 无（终止状态）
```

## 生成函数

```javascript
function generateAction(actionConfig, skillConfig) {
  return `# Action: ${actionConfig.name}

${actionConfig.description || `执行 ${actionConfig.name} 操作`}

## Purpose

${actionConfig.purpose || 'TODO: 描述此动作的详细目的'}

## Preconditions

${actionConfig.preconditions?.map(p => `- [ ] ${p}`).join('\n') || '- [ ] 无特殊前置条件'}

## Execution

\`\`\`javascript
async function execute(state) {
  // TODO: 实现动作逻辑
  
  return {
    stateUpdates: {
      completed_actions: [...state.completed_actions, '${actionConfig.id}']
    }
  };
}
\`\`\`

## State Updates

\`\`\`javascript
return {
  stateUpdates: {
    // TODO: 定义状态更新
${actionConfig.effects?.map(e => `    // Effect: ${e}`).join('\n') || ''}
  }
};
\`\`\`

## Error Handling

| Error Type | Recovery |
|------------|----------|
| 数据验证失败 | 返回错误，不更新状态 |
| 执行异常 | 记录错误，增加 error_count |

## Next Actions (Hints)

- 成功: 由编排器根据状态决定
- 失败: 重试或 action-abort
`;
}
```
