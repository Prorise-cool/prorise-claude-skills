---
name: ruoyi-framework
description: 使用 RuoYi-Vue 框架（SpringBoot + Spring Security + MyBatis + JWT + Vue）时应该使用此技能。它提供了环境设置、项目结构、后端 CRUD 开发、高级后端功能（权限、日志记录、调度、数据范围、多数据源）、前端开发（路由、请求处理、组件、i18n）、代码生成和插件集成（Docker、PostgreSQL、SpringBoot3、OSS）的指导。。由 RuoYi、ruoyi、PageHelper、@Excel、@PreAuthorize、@DataScope、@Log、ExcelUtil、AjaxResult、vue-element-admin、Element UI admin 等关键字触发。
---

<!-- AUTO-GENERATED-RESOURCE-MAP:START -->

### Resource Map

> 基准路径: `.claude/skills/open-source-project-specialist/references/domains/projects/ruoyi/`

```
ruoyi/
├── references/
│   ├── backend-advanced/
│   │   ├── phases/
│   │   │   ├── 01-permission-control.md
│   │   │   ├── 03-transaction-logging.md
│   │   │   ├── 05-task-scheduling.md
│   │   │   ├── 07-data-scope.md
│   │   │   └── 09-multi-datasource.md
│   │   └── best-practices.md
│   ├── backend-crud/
│   │   ├── phases/
│   │   │   ├── 01-pagination-query.md
│   │   │   ├── 03-import-export.md
│   │   │   ├── 05-upload-download.md
│   │   │   └── 07-data-validation.md
│   │   └── best-practices.md
│   ├── code-generation/
│   │   ├── phases/
│   │   │   ├── 01-generator-setup.md
│   │   │   ├── 03-single-table.md
│   │   │   ├── 05-tree-table.md
│   │   │   └── 07-sub-table.md
│   │   └── best-practices.md
│   ├── environment-setup/
│   │   ├── phases/
│   │   │   ├── 01-dev-environment.md
│   │   │   ├── 03-backend-deploy.md
│   │   │   ├── 05-frontend-deploy.md
│   │   │   └── 07-production-deploy.md
│   │   └── best-practices.md
│   ├── frontend-dev/
│   │   ├── phases/
│   │   │   ├── 01-routing-menu.md
│   │   │   ├── 03-request-auth.md
│   │   │   ├── 05-components-usage.md
│   │   │   └── 07-i18n-theming.md
│   │   └── best-practices.md
│   ├── plugin-integration/
│   │   ├── phases/
│   │   │   ├── 01-docker-deploy.md
│   │   │   ├── 03-database-switch.md
│   │   │   ├── 05-oss-integration.md
│   │   │   ├── 07-springboot3-upgrade.md
│   │   │   └── 09-monitoring-tools.md
│   │   └── best-practices.md
│   └── project-structure/
│       ├── phases/
│       │   ├── 01-backend-modules.md
│       │   ├── 03-frontend-structure.md
│       │   └── 05-config-management.md
│       └── best-practices.md
└── SKILL.md
```

<!-- AUTO-GENERATED-RESOURCE-MAP:END -->

# RuoYi-Vue框架开发指南

RuoYi-Vue是一个基于SpringBoot、Spring Security、MyBatis、JWT、Vue的Java EE企业快速开发平台。该技能提供了开发、扩展和部署 RuoYi-Vue 应用程序的程序知识。

## 何时使用此技能

该技能应在以下情况下触发：
- 设置或部署 RuoYi-Vue 项目（环境、Docker、Nginx）
- 了解RuoYi项目结构和配置文件
- 开发后端 CRUD 功能（分页、导入/导出、上传/下载、验证）
- 实现高级后端功能（权限控制、日志记录、调度、数据范围、多数据源）
- 开发前端页面（路由、请求流、组件、i18n、主题）
- 使用代码生成器进行单表、树表或子表 CRUD
- 集成插件（Docker、PostgreSQL、SpringBoot3升级、OSS、MyBatis-Plus）

## 系统要求

- JDK >= 1.8 (SpringBoot 2.x) 或 JDK >= 17 (SpringBoot 3.x)
- MySQL >= 5.7
- Maven >= 3.0
- 节点 >= 12
- 雷迪斯 >= 3

## 核心技术栈

- **后端**：SpringBoot 2.2.x、Spring Security 5.2.x、MyBatis 3.5.x、Druid 1.2.x、JWT
- **前端**：Vue 2.6.x、Element UI 2.15.x、Axios 0.21.x、Vuex、Vue 路由器

## 使用场景索引

| 设想 | 触发条件 | 进入阶段 |
|----------|-------------------|-------------|
| 环境设置 | 项目初始化、部署、Nginx配置、环境变量 | [01-开发环境.md](references/environment-setup/phases/01-dev-environment.md) |
| 项目结构 | 了解模块、配置文件、后端/前端目录布局 | [01-后端模块.md](references/project-structure/phases/01-backend-modules.md) |
| 后端增删改查 | 分页、Excel导入/导出、文件上传/下载、数据验证 | [01-分页查询.md](references/backend-crud/phases/01-pagination-query.md) |
| 后端高级 | 权限注释、事务/日志记录、计划任务、数据范围、多数据源 | [01-权限控制.md](references/backend-advanced/phases/01-permission-control.md) |
| 前端开发 | 路由、请求流、插件对象 ($tab/$modal/$auth)、组件、i18n | [01-路由菜单.md](references/frontend-dev/phases/01-routing-menu.md) |
| 代码生成 | 代码生成器设置，单表/树表/子表生成 | [01-生成器设置.md](references/code-generation/phases/01-generator-setup.md) |
| 插件集成 | Docker部署、数据库切换、OSS集成、SpringBoot3升级、监控 | [01-docker-deploy.md](references/plugin-integration/phases/01-docker-deploy.md) |
