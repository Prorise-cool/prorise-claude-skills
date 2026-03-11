# 批量抓取文档

> 抓取时间: 2026-03-05 09:43
> 总页面: 10 | 成功: 10 | 失败: 0

---

## 目录

1. [介绍 | RuoYi](#介绍-ruoyi)
2. [快速了解 | RuoYi](#快速了解-ruoyi)
3. [环境部署 | RuoYi](#环境部署-ruoyi)
4. [项目介绍 | RuoYi](#项目介绍-ruoyi)
5. [后台手册 | RuoYi](#后台手册-ruoyi)
6. [前端手册 | RuoYi](#前端手册-ruoyi)
7. [组件文档 | RuoYi](#组件文档-ruoyi)
8. [插件集成 | RuoYi](#插件集成-ruoyi)
9. [项目扩展 | RuoYi](#项目扩展-ruoyi)
10. [常见问题 | RuoYi](#常见问题-ruoyi)

---
## 介绍 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/

## [#](https://doc.ruoyi.vip/ruoyi-vue/#%E4%BB%8B%E7%BB%8D) 介绍

## RuoYi-Vue

基于SpringBoot、Spring Security、Jwt、Vue的前后端分离的后台管理系统

[![](https://img.shields.io/github/license/mashape/apistatus.svg)](http://www.ruoyi.vip/) [![](https://gitee.com/y_project/RuoYi-Vue/badge/star.svg?theme=dark)](https://gitee.com/y_project/RuoYi-Vue) [![](https://img.shields.io/badge/RuoYi-v3.9.1-brightgreen.svg)](http://www.ruoyi.vip/)

提示

一直想做一款后台管理系统，看了很多优秀的开源项目但是发现没有合适的。于是利用空闲休息时间开始自己写了一套后台系统。如此有了若依。

如需不分离版本，请移步 [RuoYi (opens new window)](https://gitee.com/y_project/RuoYi) `(保持同步更新)`，如需其他版本，请移步 [项目扩展 (opens new window)](https://doc.ruoyi.vip/ruoyi-vue/document/xmkz.html) `(不定时更新)`

**RuoYi-Vue** 是一个 Java EE 企业级快速开发平台，基于经典技术组合（Spring Boot、Spring Security、MyBatis、Jwt、Vue），内置模块如：部门管理、角色用户、菜单及按钮授权、数据权限、系统参数、日志管理、通知公告、代码生成等。在线定时任务配置，支持集群，支持多数据源，支持分布式事务等。

**在线体验**

- 若依官网：[http://ruoyi.vip (opens new window)](http://ruoyi.vip/)
- 演示地址：[http://vue.ruoyi.vip (opens new window)](http://vue.ruoyi.vip/)
- 代码下载：[https://gitee.com/y\_project/RuoYi-Vue (opens new window)](https://gitee.com/y_project/RuoYi-Vue)

**源码下载**

前端 `Element UI(vue 2.x)` + `Element-Plus(vue 3.x)` + `TypeScript` 并行开发维护

| 名称                    | 说明                     | 地址                                                            |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| RuoYi-Vue2            | Vue2 Element UI VueCli | https\://gitee.com/y\_project/RuoYi-Vue/tree/master/ruoyi-ui  |
| RuoYi-Vue3            | Vue3 Element Plus Vite | https\://gitcode.com/yangzongzhuan/RuoYi-Vue3                 |
| RuoYi-Vue3-TypeScript | RuoYi-Vue3 TypeScript  | https\://gitcode.com/yangzongzhuan/RuoYi-Vue3/tree/typescript |

后端 `Spring Boot 2.x（jdk8）`和`Spring Boot 3.x（jdk17+）`双版本同步开发维护

| 名称                 | 说明                 | 地址                                                       |
| ------------------ | ------------------ | -------------------------------------------------------- |
| RuoYi-Vue-Boot-2.x | SpringBoot2 jdk8   | https\://gitee.com/y\_project/RuoYi-Vue                  |
| RuoYi-Vue-Boot-3.x | SpringBoot3 jdk17+ | https\://gitee.com/y\_project/RuoYi-Vue/tree/springboot3 |

上述版本均可混用搭配，例如：后端`RuoYi-Boot-2.x`版本搭配前端`RuoYi-Vue3`。

**系统需求**

- JDK >= 1.8
- MySQL >= 5.7
- Maven >= 3.0
- Node >= 12
- Redis >= 3

**技术交流群（[RuoYi-Vue (opens new window)](https://gitee.com/y_project/RuoYi-Vue)前后端分离版本）**

- ~~937441（1群）~~、~~887144332（2群）~~、~~180251782（3群）~~、~~104180207（4群）~~、~~186866453（5群）~~、~~201396349（6群）~~、~~101456076（7群）~~、~~101539465（8群）~~、~~264312783（9群）~~、~~167385320（10群）~~、~~104748341（11群）~~、~~160110482（12群）~~、~~170801498（13群）~~、~~108482800（14群）~~、~~101046199（15群）~~、~~136919097（16群）~~、~~143961921（17群）~~、~~174951577（18群）~~、~~161281055（19群）~~、~~138988063（20群）~~、~~151450850（21群）~~、~~224622315（22群）~~、~~287842588（23群）~~、~~187944233（24群）~~、~~228578329（25群）~~、~~191164766（26群）~~、~~174569686（27群）~~、127358632（28群）

---

## 快速了解 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/kslj.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/kslj.html#%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3) 快速了解

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/kslj.html#%E9%A1%B9%E7%9B%AE%E7%AE%80%E4%BB%8B) 项目简介

RuoYi-Vue是一款基于SpringBoot+Vue的前后端分离极速后台开发框架。

- RuoYi 官网地址：[http://ruoyi.vip (opens new window)](http://ruoyi.vip/)
- RuoYi 在线文档：[http://doc.ruoyi.vip/ruoyi-vue (opens new window)](http://doc.ruoyi.vip/ruoyi-vue)
- RuoYi 在线演示：[http://vue.ruoyi.vip (opens new window)](http://vue.ruoyi.vip/)
- RuoYi 源码下载：[https://gitee.com/y\_project/RuoYi-Vue (opens new window)](https://gitee.com/y_project/RuoYi-Vue)
- RuoYi 在线提问：[https://gitee.com/y\_project/RuoYi-Vue/issues (opens new window)](https://gitee.com/y_project/RuoYi-Vue/issues)
- QQ 群号： 937441、887144332、180251782、104180207、186866453、201396349、101456076、101539465、264312783、167385320、104748341、160110482、170801498、108482800、101046199、136919097、143961921、174951577、161281055、138988063、151450850、224622315、287842588、187944233、228578329、191164766、174569686、127358632

RuoYi-Vue 是一个 Java EE 企业级快速开发平台，基于经典技术组合（Spring Boot、Spring Security、MyBatis、Jwt、Vue），内置模块如：部门管理、角色用户、菜单及按钮授权、数据权限、系统参数、日志管理、通知公告、代码生成等。在线定时任务配置；支持集群，支持多数据源，支持分布式事务。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/kslj.html#%E4%B8%BB%E8%A6%81%E7%89%B9%E6%80%A7) 主要特性

- 完全响应式布局（支持电脑、平板、手机等所有主流设备）
- 强大的一键生成功能（包括控制器、模型、视图、菜单等）
- 支持多数据源，简单配置即可实现切换。
- 支持按钮及数据权限，可自定义部门数据权限。
- 对常用js插件进行二次封装，使js代码变得简洁，更加易维护
- 完善的XSS防范及脚本过滤，彻底杜绝XSS攻击
- Maven多项目依赖，模块及插件分项目，尽量松耦合，方便模块升级、增减模块。
- 国际化支持，服务端及客户端支持
- 完善的日志记录体系简单注解即可实现
- 支持服务监控，数据监控，缓存监控功能。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/kslj.html#%E6%8A%80%E6%9C%AF%E9%80%89%E5%9E%8B) 技术选型

**1、系统环境**

- Java EE 8
- Servlet 3.0
- Apache Maven 3

**2、主框架**

- Spring Boot 2.2.x
- Spring Framework 5.2.x
- Spring Security 5.2.x

**3、持久层**

- Apache MyBatis 3.5.x
- Hibernate Validation 6.0.x
- Alibaba Druid 1.2.x

**4、视图层**

- Vue 2.6.x
- Axios 0.21.x
- Element 2.15.x

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/kslj.html#%E5%86%85%E7%BD%AE%E5%8A%9F%E8%83%BD) 内置功能

- 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
- 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
- 岗位管理：配置系统用户所属担任职务。
- 菜单管理：配置系统菜单，操作权限，按钮权限标识等。
- 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
- 字典管理：对系统中经常使用的一些较为固定的数据进行维护。
- 参数管理：对系统动态配置常用参数。
- 通知公告：系统通知公告信息发布维护。
- 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
- 登录日志：系统登录日志记录查询包含登录异常。
- 在线用户：当前系统中活跃用户状态监控。
- 定时任务：在线（添加、修改、删除)任务调度包含执行结果日志。
- 代码生成：前后端代码的生成（java、html、xml、sql)支持CRUD下载 。
- 系统接口：根据业务代码自动生成相关的api接口文档。
- 服务监控：监视当前系统CPU、内存、磁盘、堆栈等相关信息。
- 缓存监控：对系统的缓存信息查询，命令统计等。
- 在线构建器：拖动表单元素生成相应的Vue代码。
- 连接池监视：监视当期系统数据库连接池状态，可进行分析SQL找出系统性能瓶颈。

---

## 环境部署 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2) 环境部署

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C) 准备工作

```
JDK >= 1.8 (推荐1.8版本)
Mysql >= 5.7.0 (推荐5.7版本)
Redis >= 3.0
Maven >= 3.0
Node >= 12
```

1\
2\
3\
4\
5

提示

前端安装完node后，最好设置下淘宝的镜像源，不建议使用cnpm（可能会出现奇怪的问题）

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E8%BF%90%E8%A1%8C%E7%B3%BB%E7%BB%9F) 运行系统

前往`Gitee`下载页面([https://gitee.com/y\_project/RuoYi-Vue (opens new window)](https://gitee.com/y_project/RuoYi-Vue))下载解压到工作目录

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%90%8E%E7%AB%AF%E8%BF%90%E8%A1%8C) 后端运行

1、导入到`Eclipse`，菜单 `File` -> `Import`，然后选择 `Maven` -> `Existing Maven Projects`，点击 `Next`> 按钮，选择工作目录，然后点击 `Finish` 按钮，即可成功导入。\
`Eclipse`会自动加载`Maven`依赖包，初次加载会比较慢（根据自身网络情况而定）\
2、创建数据库`ry-vue`并导入数据脚本`ry_2021xxxx.sql`，`quartz.sql`\
3、打开项目运行`com.ruoyi.RuoYiApplication.java`，出现如下图表示启动成功。

```
(♥◠‿◠)ﾉﾞ  若依启动成功   ლ(´ڡ`ლ)ﾞ  
 .-------.       ____     __        
 |  _ _   \      \   \   /  /    
 | ( ' )  |       \  _. /  '       
 |(_ o _) /        _( )_ .'         
 | (_,_).' __  ___(_ o _)'          
 |  |\ \  |  ||   |(_,_)'         
 |  | \ `'   /|   `-'  /           
 |  |  \    /  \      /           
 ''-'   `'-'    `-..-'    
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%89%8D%E7%AB%AF%E8%BF%90%E8%A1%8C) 前端运行

```
# 进入项目目录
cd ruoyi-ui

# 安装依赖
npm install

# 强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。
npm install --registry=https://registry.npmmirror.com

# 本地开发 启动项目
npm run dev
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

4、打开浏览器，输入：([http://localhost:80 (opens new window)](http://localhost/)) 默认账户/密码 `admin/admin123`）\
若能正确展示登录页面，并能成功登录，菜单及页面展示正常，则表明环境搭建成功

建议使用`Git`克隆，因为克隆的方式可以和`RuoYi-Vue`随时保持更新同步。使用`Git`命令克隆

```
git clone https://gitee.com/y_project/RuoYi-Vue.git
```

1

如需要使用`SpringBoot3`，`JDK17+`版本，使用`Git`命令切换，代码和`RuoYi-Vue`保持更新同步。

```
git checkout springboot3
```

1

提示

因为本项目是前后端完全分离的，所以需要前后端都单独启动好，才能进行访问。\
前端安装完node后，最好设置下淘宝的镜像源，不建议使用cnpm（可能会出现奇怪的问题）

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%BF%85%E8%A6%81%E9%85%8D%E7%BD%AE) 必要配置

- 修改数据库连接，编辑`resources`目录下的`application-druid.yml`

```
# 数据源配置
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            # 主库数据源
            master:
                url: 数据库地址
                username: 数据库账号
                password: 数据库密码
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

- 修改服务器配置，`编辑resources目录下的application.yml`

```
# 开发环境配置
server:
  # 服务器的HTTP端口，默认为80
  port: 端口
  servlet:
    # 应用的访问路径
    context-path: /应用路径
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E9%83%A8%E7%BD%B2%E7%B3%BB%E7%BB%9F) 部署系统

提示

因为本项目是前后端完全分离的，所以需要前后端都单独部署好，才能进行访问。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%90%8E%E7%AB%AF%E9%83%A8%E7%BD%B2) 后端部署

- 打包工程文件

在`ruoyi`项目的`bin`目录下执行`package.bat`打包Web工程，生成war/jar包文件。\
然后会在项目下生成`target`文件夹包含`war`或`jar`

提示

多模块版本会生成在`ruoyi/ruoyi-admin`模块下`target`文件夹

- 部署工程文件

1、jar部署方式\
使用命令行执行：`java –jar ruoyi.jar` 或者执行脚本：`ruoyi/bin/run.bat`

2、war部署方式\
`ruoyi/pom.xml`中的`packaging`修改为`war`，放入`tomcat`服务器`webapps`

```
   <packaging>war</packaging>
```

1

提示

多模块版本在`ruoyi/ruoyi-admin`模块下修改`pom.xml`

- `SpringBoot`去除内嵌`Tomcat`（PS：此步骤不重要，因为不排除也能在容器中部署`war`）

```
<!-- 多模块排除内置tomcat -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
	<exclusions>
		<exclusion>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-tomcat</artifactId>
		</exclusion>
	</exclusions>
</dependency>
		
<!-- 单应用排除内置tomcat -->		
<exclusions>
	<exclusion>
		<artifactId>spring-boot-starter-tomcat</artifactId>
		<groupId>org.springframework.boot</groupId>
	</exclusion>
</exclusions>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%89%8D%E7%AB%AF%E9%83%A8%E7%BD%B2) 前端部署

当项目开发完毕，只需要运行一行命令就可以打包你的应用

```
# 打包正式环境
npm run build:prod

# 打包预发布环境
npm run build:stage
```

1\
2\
3\
4\
5

构建打包成功之后，会在根目录生成 `dist` 文件夹，里面就是构建打包好的文件，通常是 `***.js` 、`***.css`、`index.html` 等静态文件。

通常情况下 `dist` 文件夹的静态文件发布到你的 nginx 或者静态服务器即可，其中的 `index.html` 是后台服务的入口页面。

publicPath 提示

部署时改变页面js 和 css 静态引入路径 ,只需修改 `vue.config.js` 文件资源路径即可。

```
publicPath: './' //请根据自己路径来配置更改
```

1

```
export default new Router({
  mode: 'hash', // hash模式
})
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 环境变量

所有测试环境或者正式环境变量的配置都在 [.env.development (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/.env.development)等 `.env.xxxx`文件中。

它们都会通过 `webpack.DefinePlugin` 插件注入到全局。

环境变量必须以`VUE_APP_`为开头。如:`VUE_APP_API`、`VUE_APP_TITLE`

你在代码中可以通过如下方式获取:

```
console.log(process.env.VUE_APP_xxxx)
```

1

扩展阅读：[《Vue CLI - 环境变量和模式》 (opens new window)](https://cli.vuejs.org/zh/guide/mode-and-env.html)

注意

环境配置修改后，需要重新运行才会生效

\

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#tomcat%E9%85%8D%E7%BD%AE) Tomcat配置

修改`server.xml`，`Host`节点下添加

```
<Context docBase="" path="/" reloadable="true" source=""/>
```

1

`dist`目录的文件夹下新建`WEB-INF`文件夹，并在里面添加`web.xml`文件

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
        http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
        version="3.1" metadata-complete="true">
     <display-name>Router for Tomcat</display-name>
     <error-page>
        <error-code>404</error-code>
        <location>/index.html</location>
    </error-page>
</web-app>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#nginx%E9%85%8D%E7%BD%AE) Nginx配置

```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
		charset utf-8;

		location / {
            root   /home/ruoyi/projects/ruoyi-ui;
			try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
		
		location /prod-api/ {
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}

		# springdoc proxy
		location ~ ^/v3/api-docs/(.*) {
			proxy_pass http://localhost:8080/v3/api-docs/$1;
		}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42

建议开启Gzip压缩

在`http`配置中加入如下代码对全局的资源进行压缩，可以减少文件体积和加快网页访问速度。

```
# 开启gzip压缩
gzip on;
# 不压缩临界值，大于1K的才压缩，一般不用改
gzip_min_length 1k;
# 压缩缓冲区
gzip_buffers 16 64K;
# 压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
gzip_http_version 1.1;
# 压缩级别，1-10，数字越大压缩的越好，时间也越长
gzip_comp_level 5;
# 进行压缩的文件类型
gzip_types text/plain application/x-javascript text/css application/xml application/javascript;
# 跟Squid等缓存服务有关，on的话会在Header里增加"Vary: Accept-Encoding"
gzip_vary on;
# IE6对Gzip不怎么友好，不给它Gzip了
gzip_disable "MSIE [1-6]\.";
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

同时建议开启解压缩静态文件 [如何使用Gzip解压缩静态文件](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BD%BF%E7%94%A8Gzip%E8%A7%A3%E5%8E%8B%E7%BC%A9%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6)

\

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98) 常见问题

1. 如果使用`Mac`需要修改`application.yml`文件路径`profile`
2. 如果使用`Linux` 提示表不存在，设置大小写敏感配置在`/etc/my.cnf`添加`lower_case_table_names=1`，重启MYSQL服务
3. 如果提示当前权限不足，无法写入文件请检查`application.yml`中的`profile`路径或`logback.xml`中的`log.path`路径是否有可读可写操作权限

如遇到无法解决的问题请到[Issues (opens new window)](https://gitee.com/y_project/RuoYi-Vue/issues)反馈，会不定时进行解答。

---

## 项目介绍 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D) 项目介绍

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84) 文件结构

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E5%90%8E%E7%AB%AF%E7%BB%93%E6%9E%84) 后端结构

```
com.ruoyi     
├── common            // 工具类
│       └── annotation                    // 自定义注解
│       └── config                        // 全局配置
│       └── constant                      // 通用常量
│       └── core                          // 核心控制
│       └── enums                         // 通用枚举
│       └── exception                     // 通用异常
│       └── filter                        // 过滤器处理
│       └── utils                         // 通用类处理
├── framework         // 框架核心
│       └── aspectj                       // 注解实现
│       └── config                        // 系统配置
│       └── datasource                    // 数据权限
│       └── interceptor                   // 拦截器
│       └── manager                       // 异步处理
│       └── security                      // 权限控制
│       └── web                           // 前端控制
├── ruoyi-generator   // 代码生成（可移除）
├── ruoyi-quartz      // 定时任务（可移除）
├── ruoyi-system      // 系统代码
├── ruoyi-admin       // 后台服务
├── ruoyi-xxxxxx      // 其他模块
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E5%89%8D%E7%AB%AF%E7%BB%93%E6%9E%84) 前端结构

```
├── build                      // 构建相关  
├── bin                        // 执行脚本
├── public                     // 公共文件
│   ├── favicon.ico            // favicon图标
│   └── index.html             // html模板
│   └── robots.txt             // 反爬虫
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── layout                 // 布局
│   ├── plugins                // 通用方法
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── utils                  // 全局公用方法
│   ├── views                  // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   ├── permission.js          // 权限管理
│   └── settings.js            // 系统配置
├── .editorconfig              // 编码格式
├── .env.development           // 开发环境配置
├── .env.production            // 生产环境配置
├── .env.staging               // 测试环境配置
├── .eslintignore              // 忽略语法检查
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── babel.config.js            // babel.config.js
├── package.json               // package.json
└── vue.config.js              // vue.config.js
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6) 配置文件

通用配置 `application.yml`

```
# 项目相关配置
ruoyi:
  # 名称
  name: RuoYi
  # 版本
  version: 3.3.0
  # 版权年份
  copyrightYear: 2021
  # 实例演示开关
  demoEnabled: true
  # 文件路径 示例（ Windows配置D:/ruoyi/uploadPath，Linux配置 /home/ruoyi/uploadPath）
  profile: D:/ruoyi/uploadPath
  # 获取ip地址开关
  addressEnabled: false
  # 验证码类型 math 数组计算 char 字符验证
  captchaType: math

# 开发环境配置
server:
  # 服务器的HTTP端口，默认为8080
  port: 8080
  servlet:
    # 应用的访问路径
    context-path: /
  tomcat:
    # tomcat的URI编码
    uri-encoding: UTF-8
    # tomcat最大线程数，默认为200
    max-threads: 800
    # Tomcat启动初始化的线程数，默认值25
    min-spare-threads: 30

# 日志配置
logging:
  level:
    com.ruoyi: debug
    org.springframework: warn

# Spring配置
spring:
  # 资源信息
  messages:
    # 国际化资源文件路径
    basename: i18n/messages
  profiles: 
    active: druid
  # 文件上传
  servlet:
     multipart:
       # 单个文件大小
       max-file-size:  10MB
       # 设置总上传的文件大小
       max-request-size:  20MB
  # 服务模块
  devtools:
    restart:
      # 热部署开关
      enabled: true
  # redis 配置
  redis:
    # 地址
    host: localhost
    # 端口，默认为6379
    port: 6379
    # 数据库索引
    database: 0
    # 密码
    password: 
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 0
        # 连接池中的最大空闲连接
        max-idle: 8
        # 连接池的最大数据库连接数
        max-active: 8
        # #连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms

# token配置
token:
    # 令牌自定义标识
    header: Authorization
    # 令牌密钥
    secret: abcdefghijklmnopqrstuvwxyz
    # 令牌有效期（默认30分钟）
    expireTime: 30
  
# MyBatis配置
mybatis:
    # 搜索指定包别名
    typeAliasesPackage: com.ruoyi.**.domain
    # 配置mapper的扫描，找到所有的mapper.xml映射文件
    mapperLocations: classpath*:mapper/**/*Mapper.xml
    # 加载全局的配置文件
    configLocation: classpath:mybatis/mybatis-config.xml

# PageHelper分页插件
pagehelper: 
  helperDialect: mysql
  reasonable: true
  supportMethodsArguments: true
  params: count=countSql 

# Swagger配置
swagger:
  # 是否开启swagger
  enabled: true
  # 请求前缀
  pathMapping: /dev-api

# 防止XSS攻击
xss: 
  # 过滤开关
  enabled: true
  # 排除链接（多个用逗号分隔）
  excludes: /system/notice/*
  # 匹配链接
  urlPatterns: /system/*,/monitor/*,/tool/*
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121

数据源配置 `application-druid.yml`

```
# 数据源配置
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            # 主库数据源
            master:
                url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: password
            # 从库数据源
            slave:
                # 从数据源开关/默认关闭
                enabled: false
                url: 
                username: 
                password: 
            # 初始连接数
            initialSize: 5
            # 最小连接池数量
            minIdle: 10
            # 最大连接池数量
            maxActive: 20
            # 配置获取连接等待超时的时间
            maxWait: 60000
            # 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
            timeBetweenEvictionRunsMillis: 60000
            # 配置一个连接在池中最小生存的时间，单位是毫秒
            minEvictableIdleTimeMillis: 300000
            # 配置一个连接在池中最大生存的时间，单位是毫秒
            maxEvictableIdleTimeMillis: 900000
            # 配置检测连接是否有效
            validationQuery: SELECT 1 FROM DUAL
            testWhileIdle: true
            testOnBorrow: false
            testOnReturn: false
            webStatFilter: 
                enabled: true
            statViewServlet:
                enabled: true
                # 设置白名单，不填则允许所有访问
                allow:
                url-pattern: /druid/*
                # 控制台管理用户名和密码
                login-username: 
                login-password: 
            filter:
                stat:
                    enabled: true
                    # 慢SQL记录
                    log-slow-sql: true
                    slow-sql-millis: 1000
                    merge-sql: true
                wall:
                    config:
                        multi-statement-allow: true
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57

代码生成配置 `generator.yml`

```
# 代码生成
gen: 
  # 作者
  author: ruoyi
  # 默认生成包路径 system 需改成自己的模块名称 如 system monitor tool
  packageName: com.ruoyi.system
  # 自动去除表前缀，默认是false
  autoRemovePre: false
  # 表前缀（生成类名不会包含表前缀，多个用逗号分隔）
  tablePrefix: sys_
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF) 核心技术

TIP

- 前端技术栈 ES6、vue、vuex、vue-router、vue-cli、axios、element-ui
- 后端技术栈 SpringBoot、MyBatis、Spring Security、Jwt

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E5%90%8E%E7%AB%AF%E6%8A%80%E6%9C%AF) 后端技术

#### [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#springboot%E6%A1%86%E6%9E%B6) SpringBoot框架

1、介绍\
`Spring Boot`是一款开箱即用框架，提供各种默认配置来简化项目配置。让我们的`Spring`应用变的更轻量化、更快的入门。 在主程序执行`main`函数就可以运行。你也可以打包你的应用为`jar`并通过使用`java -jar`来运行你的Web应用。它遵循"约定优先于配置"的原则， 使用`SpringBoot`只需很少的配置，大部分的时候直接使用默认的配置即可。同时可以与`Spring Cloud`的微服务无缝结合。

提示

`Spring Boot2.x`版本环境要求必须是`jdk8`或以上版本，服务器`Tomcat8`或以上版本

2、优点

- 使编码变得简单： 推荐使用注解。
- 使配置变得简单： 自动配置、快速集成新技术能力 没有冗余代码生成和XML配置的要求
- 使部署变得简单： 内嵌Tomcat、Jetty、Undertow等web容器，无需以war包形式部署
- 使监控变得简单： 提供运行时的应用监控
- 使集成变得简单： 对主流开发框架的无配置集成。
- 使开发变得简单： 极大地提高了开发快速构建项目、部署效率。

#### [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#spring-security%E5%AE%89%E5%85%A8%E6%8E%A7%E5%88%B6) Spring Security安全控制

1、介绍\
`Spring Security`是一个能够为基于`Spring`的企业应用系统提供声明式的安全访问控制解决方案的安全框架。

2、功能\
`Authentication` 认证，就是用户登录\
`Authorization` 授权，判断用户拥有什么权限，可以访问什么资源\
安全防护，跨站脚本攻击，`session`攻击等\
非常容易结合`Spring`进行使用

3、`Spring Security`与`Shiro`的区别

> 相同点

1、认证功能\
2、授权功能\
3、加密功能\
4、会话管理\
5、缓存支持\
6、rememberMe功能\
....

> 不同点

优点：

1、Spring Security基于Spring开发，项目如果使用Spring作为基础，配合Spring Security做权限更加方便。而Shiro需要和Spring进行整合开发\
2、Spring Security功能比Shiro更加丰富，例如安全防护方面\
3、Spring Security社区资源相对比Shiro更加丰富

缺点：

1）Shiro的配置和使用比较简单，Spring Security上手复杂些\
2）Shiro依赖性低，不需要依赖任何框架和容器，可以独立运行。Spring Security依赖Spring容器

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/xmjs.html#%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF) 前端技术

- npm：node.js的包管理工具，用于统一管理我们前端项目中需要用到的包、插件、工具、命令等，便于开发和维护。
- ES6：Javascript的新版本，ECMAScript6的简称。利用ES6我们可以简化我们的JS代码，同时利用其提供的强大功能来快速实现JS逻辑。
- vue-cli：Vue的脚手架工具，用于自动生成Vue项目的目录及文件。
- vue-router： Vue提供的前端路由工具，利用其我们实现页面的路由控制，局部刷新及按需加载，构建单页应用，实现前后端分离。
- vuex：Vue提供的状态管理工具，用于统一管理我们项目中各种数据的交互和重用，存储我们需要用到数据对象。
- element-ui：基于MVVM框架Vue开源出来的一套前端ui组件。

---

## 后台手册 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%90%8E%E5%8F%B0%E6%89%8B%E5%86%8C) 后台手册

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%88%86%E9%A1%B5%E5%AE%9E%E7%8E%B0) 分页实现

- 前端基于`element`封装的分页组件 [pagination (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/components/Pagination)
- 后端基于`mybatis`的轻量级分页插件[pageHelper (opens new window)](https://github.com/pagehelper/Mybatis-PageHelper)

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%89%8D%E7%AB%AF%E8%B0%83%E7%94%A8%E5%AE%9E%E7%8E%B0) 前端调用实现

1、前端定义分页流程

```
// 一般在查询参数中定义分页变量
queryParams: {
  pageNum: 1,
  pageSize: 10
},

// 页面添加分页组件，传入分页变量
<pagination
  v-show="total>0"
  :total="total"
  :page.sync="queryParams.pageNum"
  :limit.sync="queryParams.pageSize"
  @pagination="getList"
/>

// 调用后台方法，传入参数 获取结果
listUser(this.queryParams).then(response => {
    this.userList = response.rows;
    this.total = response.total;
  }
);
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%90%8E%E5%8F%B0%E9%80%BB%E8%BE%91%E5%AE%9E%E7%8E%B0) 后台逻辑实现

[参考后台逻辑实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%90%8E%E5%8F%B0%E9%80%BB%E8%BE%91%E5%AE%9E%E7%8E%B0)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%AF%BC%E5%85%A5%E5%AF%BC%E5%87%BA) 导入导出

在实际开发中经常需要使用导入导出功能来加快数据的操作。在项目中可以使用注解来完成此项功能。 在需要被导入导出的实体类属性添加`@Excel`注解，目前支持参数如下：

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E6%B3%A8%E8%A7%A3%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E) 注解参数说明

| 参数                    | 类型        | 默认值                             | 描述                                              |
| --------------------- | --------- | ------------------------------- | ----------------------------------------------- |
| sort                  | int       | Integer.MAX\_VALUE              | 导出时在excel中排序，值越小越靠前                             |
| name                  | String    | 空                               | 导出到Excel中的名字                                    |
| dateFormat            | String    | 空                               | 日期格式, 如: yyyy-MM-dd                             |
| dictType              | String    | 空                               | 如果是字典类型，请设置字典的type值 (如: sys\_user\_sex)         |
| readConverterExp      | String    | 空                               | 读取内容转表达式 (如: 0=男,1=女,2=未知)                      |
| separator             | String    | ,                               | 分隔符，读取字符串组内容                                    |
| scale                 | int       | -1                              | BigDecimal 精度 默认:-1(默认不开启BigDecimal格式化)         |
| roundingMode          | int       | BigDecimal.ROUND\_HALF\_EVEN    | BigDecimal 舍入规则 默认:BigDecimal.ROUND\_HALF\_EVEN |
| celltype              | Enum      | Type.STRING                     | 导出类型（0数字 1字符串 2图片）                              |
| height                | String    | 14                              | 导出时在excel中每个列的高度 单位为字符                          |
| width                 | String    | 16                              | 导出时在excel中每个列的宽 单位为字符                           |
| suffix                | String    | 空                               | 文字后缀,如% 90 变成90%                                |
| defaultValue          | String    | 空                               | 当值为空时,字段的默认值                                    |
| prompt                | String    | 空                               | 提示信息                                            |
| wrapText              | boolean   | false                           | 是否允许内容换行                                        |
| combo                 | String    | Null                            | 设置只能选择不能输入的列内容                                  |
| comboReadDict         | boolean   | false                           | 是否从字典读数据到combo,默认不读取,如读取需要设置dictType注解.         |
| headerBackgroundColor | Enum      | IndexedColors.GREY\_50\_PERCENT | 导出列头背景色IndexedColors.XXXX                       |
| headerColor           | Enum      | IndexedColors.WHITE             | 导出列头字体颜色IndexedColors.XXXX                      |
| backgroundColor       | Enum      | IndexedColors.WHITE             | 导出单元格背景色IndexedColors.XXXX                      |
| color                 | Enum      | IndexedColors.BLACK             | 导出单元格字体颜色IndexedColors.XXXX                     |
| targetAttr            | String    | 空                               | 另一个类中的属性名称,支持多级获取,以小数点隔开                        |
| isStatistics          | boolean   | false                           | 是否自动统计数据,在最后追加一行统计数据总和                          |
| type                  | Enum      | Type.ALL                        | 字段类型（0：导出导入；1：仅导出；2：仅导入）                        |
| align                 | Enum      | HorizontalAlignment.CENTER      | 导出对齐方式HorizontalAlignment.XXXX                  |
| handler               | Class     | ExcelHandlerAdapter.class       | 自定义数据处理器                                        |
| args                  | String\[] | {}                              | 自定义数据处理器参数                                      |

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%AF%BC%E5%87%BA%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B) 导出实现流程

1、添加导出按钮事件

```
<el-col :span="1.5">
  <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['system:user:export']">导出</el-button>
</el-col>
```

1\
2\
3

2、前端调用方法（参考如下）

```
// 查询参数 queryParams
queryParams: {
  pageNum: 1,
  pageSize: 10,
  userName: undefined
},

/** 导出按钮操作 */
handleExport() {
  this.download('system/user/export', {
	...this.queryParams
  }, `user_${new Date().getTime()}.xlsx`)
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

3、在实体变量上添加@Excel注解

```
@Excel(name = "用户序号", prompt = "用户编号")
private Long userId;

@Excel(name = "用户名称")
private String userName;
	
@Excel(name = "用户性别", readConverterExp = "0=男,1=女,2=未知")
private String sex;

@Excel(name = "用户头像", cellType = ColumnType.IMAGE)
private String avatar;

@Excel(name = "帐号状态", dictType = "sys_normal_disable")
private String status;

@Excel(name = "最后登陆时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
private Date loginDate;
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17

4、在Controller添加导出方法

```
@Log(title = "用户管理", businessType = BusinessType.EXPORT)
@PreAuthorize("@ss.hasPermi('system:user:export')")
@GetMapping("/export")
public AjaxResult export(SysUser user)
{
	List<SysUser> list = userService.selectUserList(user);
	ExcelUtil<SysUser> util = new ExcelUtil<SysUser>(SysUser.class);
	return util.exportExcel(list, "用户数据");
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%AF%BC%E5%85%A5%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B) 导入实现流程

1、添加导入前端代码

```
<!-- 用户导入对话框 -->
<el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
  <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers" :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
	<i class="el-icon-upload"></i>
	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	<div class="el-upload__tip text-center" slot="tip">
	  <div class="el-upload__tip" slot="tip">
		<el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
	  </div>
	  <span>仅允许导入xls、xlsx格式文件。</span>
	  <el-link type="primary" :underline="false" style="font-size: 12px; vertical-align: baseline" @click="importTemplate">下载模板</el-link>
	</div>
  </el-upload>
  <div slot="footer" class="dialog-footer">
	<el-button type="primary" @click="submitFileForm">确 定</el-button>
	<el-button @click="upload.open = false">取 消</el-button>
  </div>
</el-dialog>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18

2、添加导入按钮事件

```
<el-col :span="1.5">
  <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport" v-hasPermi="['system:user:import']">导入</el-button>
</el-col>
```

1\
2\
3

3、前端调用方法（参考如下）

```
import { getToken } from "@/utils/auth";

// 用户导入参数
upload: {
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: process.env.VUE_APP_BASE_API + "/system/user/importData"
},

/** 导入按钮操作 */
handleImport() {
  this.upload.title = "用户导入"
  this.upload.open = true
},
/** 下载模板操作 */
importTemplate() {
  this.download('system/user/importTemplate', {
  }, `user_template_${new Date().getTime()}.xlsx`)
},
// 文件上传中处理
handleFileUploadProgress(event, file, fileList) {
  this.upload.isUploading = true
},
// 文件上传成功处理
handleFileSuccess(response, file, fileList) {
  this.upload.open = false
  this.upload.isUploading = false
  this.$refs.upload.clearFiles()
  this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true })
  this.getList()
},
// 提交上传文件
submitFileForm() {
  this.$refs.upload.submit()
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44

4、在实体变量上添加@Excel注解，默认为导出导入，也可以单独设置仅导入Type.IMPORT

```
@Excel(name = "用户序号")
private Long id;

@Excel(name = "部门编号", type = Type.IMPORT)
private Long deptId;

@Excel(name = "用户名称")
private String userName;

/** 导出部门多个对象 */
@Excels({
	@Excel(name = "部门名称", targetAttr = "deptName", type = Type.EXPORT),
	@Excel(name = "部门负责人", targetAttr = "leader", type = Type.EXPORT)
})
private SysDept dept;

/** 导出部门单个对象 */
@Excel(name = "部门名称", targetAttr = "deptName", type = Type.EXPORT)
private SysDept dept;
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19

5、在Controller添加导入方法，updateSupport属性为是否存在则覆盖（可选）

```
@Log(title = "用户管理", businessType = BusinessType.IMPORT)
@PostMapping("/importData")
public AjaxResult importData(MultipartFile file, boolean updateSupport) throws Exception
{
	ExcelUtil<SysUser> util = new ExcelUtil<SysUser>(SysUser.class);
	List<SysUser> userList = util.importExcel(file.getInputStream());
	LoginUser loginUser = tokenService.getLoginUser(ServletUtils.getRequest());
	String operName = loginUser.getUsername();
	String message = userService.importUser(userList, updateSupport, operName);
	return AjaxResult.success(message);
}

@GetMapping("/importTemplate")
public AjaxResult importTemplate()
{
	ExcelUtil<SysUser> util = new ExcelUtil<SysUser>(SysUser.class);
	return util.importTemplateExcel("用户数据");
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18

提示

也可以直接到main运行此方法测试。

```
InputStream is = new FileInputStream(new File("D:\\test.xlsx"));
ExcelUtil<Entity> util = new ExcelUtil<Entity>(Entity.class);
List<Entity> userList = util.importExcel(is);
```

1\
2\
3

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%87%E9%A2%98%E4%BF%A1%E6%81%AF) 自定义标题信息

[参考自定义标题信息](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%87%E9%A2%98%E4%BF%A1%E6%81%AF)

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E5%99%A8) 自定义数据处理器

[参考自定义数据处理器](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E5%99%A8)

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%98%BE%E7%A4%BA%E5%B1%9E%E6%80%A7%E5%88%97) 自定义显示属性列

[参考自定义显示属性列](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%98%BE%E7%A4%BA%E5%B1%9E%E6%80%A7%E5%88%97)

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%9A%90%E8%97%8F%E5%B1%9E%E6%80%A7%E5%88%97) 自定义隐藏属性列

[参考自定义隐藏属性列](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%9A%90%E8%97%8F%E5%B1%9E%E6%80%A7%E5%88%97)

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%AF%BC%E5%87%BA%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AD%90%E5%88%97%E8%A1%A8) 导出对象的子列表

[参考导出对象的子列表](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%AF%BC%E5%87%BA%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AD%90%E5%88%97%E8%A1%A8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD) 上传下载

首先创建一张上传文件的表，例如：

```
drop table if exists sys_file_info;
create table sys_file_info (
  file_id           int(11)          not null auto_increment       comment '文件id',
  file_name         varchar(50)      default ''                    comment '文件名称',
  file_path         varchar(255)     default ''                    comment '文件路径',
  primary key (file_id)
) engine=innodb auto_increment=1 default charset=utf8 comment = '文件信息表';
```

1\
2\
3\
4\
5\
6\
7

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E4%B8%8A%E4%BC%A0%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B) 上传实现流程

1、`el-input`修改成`el-upload`

```
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
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" :loading="upload.isUploading" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

2、引入获取`token`

```
import { getToken } from "@/utils/auth";
```

1

3、`data`中添加属性

```
// 上传参数
upload: {
  // 是否禁用上传
  isUploading: false,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: process.env.VUE_APP_BASE_API + "/common/upload",
  // 上传的文件列表
  fileList: []
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

4、新增和修改操作对应处理`fileList`参数

```
handleAdd() {
  ...
  this.upload.fileList = [];
}

handleUpdate(row) {
  ...
  this.upload.fileList = [{ name: this.form.fileName, url: this.form.filePath }];
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9

5、添加对应事件

```
// 文件提交处理
submitUpload() {
  this.$refs.upload.submit();
},
// 文件上传中处理
handleFileUploadProgress(event, file, fileList) {
  this.upload.isUploading = true;
},
// 文件上传成功处理
handleFileSuccess(response, file, fileList) {
  this.upload.isUploading = false;
  this.form.filePath = response.url;
  this.msgSuccess(response.msg);
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E4%B8%8B%E8%BD%BD%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B) 下载实现流程

1、添加对应按钮和事件

```
<el-button
  size="mini"
  type="text"
  icon="el-icon-edit"
  @click="handleDownload(scope.row)"
>下载</el-button>
```

1\
2\
3\
4\
5\
6

2、实现文件下载

```
// 文件下载处理
handleDownload(row) {
  var name = row.fileName;
  var url = row.filePath;
  var suffix = url.substring(url.lastIndexOf("."), url.length);
  const a = document.createElement('a')
  a.setAttribute('download', name + suffix)
  a.setAttribute('target', '_blank')
  a.setAttribute('href', url)
  a.click()
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E6%9D%83%E9%99%90%E6%B3%A8%E8%A7%A3) 权限注解

`Spring Security`提供了`Spring EL`表达式，允许我们在定义接口访问的方法上面添加注解，来控制访问权限。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E6%9D%83%E9%99%90%E6%96%B9%E6%B3%95) 权限方法

`@PreAuthorize`注解用于配置接口要求用户拥有某些权限才可访问，它拥有如下方法

| 方法          | 参数     | 描述                          |
| ----------- | ------ | --------------------------- |
| hasPermi    | String | 验证用户是否具备某权限                 |
| lacksPermi  | String | 验证用户是否不具备某权限，与 hasPermi逻辑相反 |
| hasAnyPermi | String | 验证用户是否具有以下任意一个权限            |
| hasRole     | String | 判断用户是否拥有某个角色                |
| lacksRole   | String | 验证用户是否不具备某角色，与 isRole逻辑相反   |
| hasAnyRoles | String | 验证用户是否具有以下任意一个角色，多个逗号分隔     |

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B) 使用示例

其中`@ss`代表的是[PermissionService (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-framework/src/main/java/com/ruoyi/framework/web/service/PermissionService.java)服务，对每个接口拦截并调用`PermissionService`的对应方法判断接口调用者的权限。

1. 数据权限示例。

```
// 符合system:user:list权限要求
@PreAuthorize("@ss.hasPermi('system:user:list')")

// 不符合system:user:list权限要求
@PreAuthorize("@ss.lacksPermi('system:user:list')")

// 符合system:user:add或system:user:edit权限要求即可
@PreAuthorize("@ss.hasAnyPermi('system:user:add,system:user:edit')")
```

1\
2\
3\
4\
5\
6\
7\
8

**编程式判断是否有资源权限**

```
if (SecurityUtils.hasPermi("sys:user:edit"))
{
    System.out.println("当前用户有编辑用户权限");
}
```

1\
2\
3\
4

2. 角色权限示例。

```
// 属于user角色
@PreAuthorize("@ss.hasRole('user')")

// 不属于user角色
@PreAuthorize("@ss.lacksRole('user')")

// 属于user或者admin之一
@PreAuthorize("@ss.hasAnyRoles('user,admin')")
```

1\
2\
3\
4\
5\
6\
7\
8

**编程式判断是否有角色权限**

```
if (SecurityUtils.hasRole("admin"))
{
    System.out.println("当前用户有admin角色权限");
}
```

1\
2\
3\
4

权限提示

超级管理员拥有所有权限，不受权限约束。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%85%AC%E5%BC%80%E6%8E%A5%E5%8F%A3) 公开接口

如果有些接口是不需要验证权限可以公开访问的，这个时候就需要我们给接口放行。

使用注解方式，只需要在`Controller`的类或方法上加入`@Anonymous`该注解即可

```
// @PreAuthorize("@ss.xxxx('....')") 注释或删除掉原有的权限注解
@Anonymous
@GetMapping("/list")
public List<SysXxxx> list(SysXxxx xxxx)
{
    return xxxxList;
}
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E4%BA%8B%E5%8A%A1%E7%AE%A1%E7%90%86) 事务管理

[参考事务管理实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E4%BA%8B%E5%8A%A1%E7%AE%A1%E7%90%86)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86) 异常处理

[参考异常处理实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%8F%82%E6%95%B0%E9%AA%8C%E8%AF%81) 参数验证

[参考参数验证](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%8F%82%E6%95%B0%E9%AA%8C%E8%AF%81)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E6%95%B0%E6%8D%AE%E8%84%B1%E6%95%8F) 数据脱敏

[参考数据脱敏](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E6%95%B0%E6%8D%AE%E8%84%B1%E6%95%8F)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E7%B3%BB%E7%BB%9F%E6%97%A5%E5%BF%97) 系统日志

[参考系统日志实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E7%B3%BB%E7%BB%9F%E6%97%A5%E5%BF%97)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90) 数据权限

[参考数据权限实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90) 多数据源

[参考多数据源实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E4%BB%A3%E7%A0%81%E7%94%9F%E6%88%90) 代码生成

[参考代码生成实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E4%BB%A3%E7%A0%81%E7%94%9F%E6%88%90)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1) 定时任务

[参考定时任务实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3) 系统接口

[参考系统接口实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E9%98%B2%E9%87%8D%E5%A4%8D%E6%8F%90%E4%BA%A4) 防重复提交

[防重复提交实现](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E9%98%B2%E9%87%8D%E5%A4%8D%E6%8F%90%E4%BA%A4)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%9B%BD%E9%99%85%E5%8C%96%E6%94%AF%E6%8C%81) 国际化支持

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%90%8E%E5%8F%B0%E5%9B%BD%E9%99%85%E5%8C%96%E6%B5%81%E7%A8%8B) 后台国际化流程

前置参考 [后台国际化流程](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E5%90%8E%E5%8F%B0%E5%9B%BD%E9%99%85%E5%8C%96%E6%B5%81%E7%A8%8B)

在`SysLoginController.java`新增修改语言方法

```
@GetMapping("/changeLanguage")
public AjaxResult changeLanguage(String lang)
{
	return AjaxResult.success();
}
```

1\
2\
3\
4\
5

在`SecurityConfig.java`允许匿名访问此方法

```
.antMatchers("/changeLanguage").permitAll()
```

1

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E5%89%8D%E7%AB%AF%E5%9B%BD%E9%99%85%E5%8C%96%E6%B5%81%E7%A8%8B) 前端国际化流程

1、`package.json`中`dependencies`节点添加`vue-i18n`

```
"vue-i18n": "7.3.2",
```

1

2、`src`目录下创建lang目录，存放国际化文件\
此处包含三个文件，分别是 `index.js` `zh.js` `en.js`

```
// index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en_US: {
    ...enLocale,
    ...elementEnLocale
  },
  zh_CN: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // 设置语言 选项 en | zh
  locale: Cookies.get('language') || 'zh_CN',
  // 设置文本内容
  messages
})

export default i18n
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30

```
// zh.js
export default {
  login: {
    title: '若依后台管理系统',
    logIn: '登录',
    username: '账号',
    password: '密码',
	code: '验证码',
    rememberMe: '记住密码'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24

```
// en.js
export default {
  login: {
    title: 'RuoYi Login Form',
    logIn: 'Login in',
    username: 'Username',
    password: 'Password',
	code: 'Code',
    rememberMe: 'Remember Me'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24

3、在`src/main.js`中增量添加i18n

```
import i18n from './lang'

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: Cookies.get('size') || 'medium'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17

4、在`src/store/getters.js`中添加language

```
language: state => state.app.language,
```

1

5、在`src/store/modules/app.js`中增量添加i18n

```
const state = {
  language: Cookies.get('language') || 'en'
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

6、在`src/components/LangSelect/index.vue`中创建汉化组件

```
<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh_CN'" command="zh_CN">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en_US'" command="en_US">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { changeLanguage } from "@/api/login";

export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(value) {
      this.$i18n.locale = value
      this.$store.dispatch('app/setLanguage', value)
      this.$message({ message: '设置语言成功', type: 'success' })
      changeLanguage(value).then(response => {
        window.location.reload();
      });
    }
  }
}
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38

7、在`login.js`新增修改语言方法

```
// 修改语言
export function changeLanguage(lang){
  return request({
    url: '/changeLanguage',
    method: 'get',
    headers: {
      isToken: false,
    },
    params: {
      lang: lang
    }
  })
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

8、登录页面汉化

```
<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ $t('login.title') }}</h3>
      <lang-select class="set-language" />
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          :placeholder="$t('login.username')"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          :placeholder="$t('login.password')"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          :placeholder="$t('login.code')"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">{{ $t('login.rememberMe') }}</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">{{ $t('login.logIn') }}</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  components: { LangSelect },
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139\
140\
141\
142\
143\
144\
145\
146\
147\
148\
149\
150\
151\
152\
153\
154\
155\
156\
157\
158\
159\
160\
161\
162\
163\
164\
165\
166\
167\
168\
169\
170\
171\
172\
173\
174\
175\
176\
177\
178\
179\
180\
181\
182\
183\
184\
185\
186\
187\
188\
189\
190\
191\
192\
193\
194\
195\
196\
197\
198\
199\
200\
201\
202\
203\
204\
205\
206\
207\
208\
209\
210\
211\
212\
213\
214\
215\
216\
217\
218\
219\
220\
221\
222

```
普通文本使用方式： {{ $t('login.title') }}
标签内使用方式：   :placeholder="$t('login.password')"
js内使用方式       this.$t('login.user.password.not.match')
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/htsc.html#%E6%96%B0%E5%BB%BA%E5%AD%90%E6%A8%A1%E5%9D%97) 新建子模块

[参考新建子模块](https://doc.ruoyi.vip/ruoyi/document/htsc.html#%E6%96%B0%E5%BB%BA%E5%AD%90%E6%A8%A1%E5%9D%97)

---

## 前端手册 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%89%8D%E7%AB%AF%E6%89%8B%E5%86%8C) 前端手册

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E9%80%9A%E7%94%A8%E6%96%B9%E6%B3%95) 通用方法

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#tab%E5%AF%B9%E8%B1%A1) $tab对象

`$tab`对象用于做页签操作、刷新页签、关闭页签、打开页签、修改页签等，它定义在`plugins/tab.js`文件中，它有如下方法

- 打开页签

```
this.$tab.openPage("用户管理", "/system/user");

this.$tab.openPage("用户管理", "/system/user").then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5

- 修改页签

```
const obj = Object.assign({}, this.$route, { title: "自定义标题" }) 
this.$tab.updatePage(obj);

this.$tab.updatePage(obj).then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5\
6

- 关闭页签

```
// 关闭当前tab页签，打开新页签
const obj = { path: "/system/user" };
this.$tab.closeOpenPage(obj);

// 关闭当前页签，回到首页
this.$tab.closePage();

// 关闭指定页签
const obj = { path: "/system/user", name: "User" };
this.$tab.closePage(obj);

this.$tab.closePage(obj).then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

- 刷新页签

```
// 刷新当前页签
this.$tab.refreshPage();

// 刷新指定页签
const obj = { path: "/system/user", name: "User" };
this.$tab.refreshPage(obj);

this.$tab.refreshPage(obj).then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

- 关闭所有页签

```
this.$tab.closeAllPage();

this.$tab.closeAllPage().then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5

- 关闭左侧页签

```
this.$tab.closeLeftPage();

const obj = { path: "/system/user", name: "User" };
this.$tab.closeLeftPage(obj);

this.$tab.closeLeftPage(obj).then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5\
6\
7\
8

- 关闭右侧页签

```
this.$tab.closeRightPage();

const obj = { path: "/system/user", name: "User" };
this.$tab.closeRightPage(obj);

this.$tab.closeRightPage(obj).then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5\
6\
7\
8

- 关闭其他tab页签

```
this.$tab.closeOtherPage();

const obj = { path: "/system/user", name: "User" };
this.$tab.closeOtherPage(obj);

this.$tab.closeOtherPage(obj).then(() => {
  // 执行结束的逻辑
})
```

1\
2\
3\
4\
5\
6\
7\
8

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#modal%E5%AF%B9%E8%B1%A1) $modal对象

`$modal`对象用于做消息提示、通知提示、对话框提醒、二次确认、遮罩等，它定义在`plugins/modal.js`文件中，它有如下方法

- 提供成功、警告和错误等反馈信息

```
this.$modal.msg("默认反馈");
this.$modal.msgError("错误反馈");
this.$modal.msgSuccess("成功反馈");
this.$modal.msgWarning("警告反馈");
```

1\
2\
3\
4

- 提供成功、警告和错误等提示信息

```
this.$modal.alert("默认提示");
this.$modal.alertError("错误提示");
this.$modal.alertSuccess("成功提示");
this.$modal.alertWarning("警告提示");
```

1\
2\
3\
4

- 提供成功、警告和错误等通知信息

```
this.$modal.notify("默认通知");
this.$modal.notifyError("错误通知");
this.$modal.notifySuccess("成功通知");
this.$modal.notifyWarning("警告通知");
```

1\
2\
3\
4

- 提供确认窗体信息

```
this.$modal.confirm('确认信息').then(function() {
  ...
}).then(() => {
  ...
}).catch(() => {});
```

1\
2\
3\
4\
5

- 提供遮罩层信息

```
// 打开遮罩层
this.$modal.loading("正在导出数据，请稍后...");

// 关闭遮罩层
this.$modal.closeLoading();
```

1\
2\
3\
4\
5

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#auth%E5%AF%B9%E8%B1%A1) $auth对象

`$auth`对象用于验证用户是否拥有某（些）权限或角色，它定义在`plugins/auth.js`文件中，它有如下方法

- 验证用户权限

```
// 验证用户是否具备某权限
this.$auth.hasPermi("system:user:add");
// 验证用户是否含有指定权限，只需包含其中一个
this.$auth.hasPermiOr(["system:user:add", "system:user:update"]);
// 验证用户是否含有指定权限，必须全部拥有
this.$auth.hasPermiAnd(["system:user:add", "system:user:update"]);
```

1\
2\
3\
4\
5\
6

- 验证用户角色

```
// 验证用户是否具备某角色
this.$auth.hasRole("admin");
// 验证用户是否含有指定角色，只需包含其中一个
this.$auth.hasRoleOr(["admin", "common"]);
// 验证用户是否含有指定角色，必须全部拥有
this.$auth.hasRoleAnd(["admin", "common"]);
```

1\
2\
3\
4\
5\
6

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#cache%E5%AF%B9%E8%B1%A1) $cache对象

`$cache`对象用于处理缓存。我们并不建议您直接使用`sessionStorage`或`localStorage`，因为项目的缓存策略可能发生变化，通过`$cache`对象做一层调用代理则是一个不错的选择。`$cache`提供`session`和`local`两种级别的缓存，如下：

| 对象名称    | 缓存类型                     |
| ------- | ------------------------ |
| session | 会话级缓存，通过sessionStorage实现 |
| local   | 本地级缓存，通过localStorage实现   |

**示例**

```
// local 普通值
this.$cache.local.set('key', 'local value')
console.log(this.$cache.local.get('key')) // 输出'local value'

// session 普通值
this.$cache.session.set('key', 'session value')
console.log(this.$cache.session.get('key')) // 输出'session value'

// local JSON值
this.$cache.local.setJSON('jsonKey', { localProp: 1 })
console.log(this.$cache.local.getJSON('jsonKey')) // 输出'{localProp: 1}'

// session JSON值
this.$cache.session.setJSON('jsonKey', { sessionProp: 1 })
console.log(this.$cache.session.getJSON('jsonKey')) // 输出'{sessionProp: 1}'

// 删除值
this.$cache.local.remove('key')
this.$cache.session.remove('key')
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#download%E5%AF%B9%E8%B1%A1) $download对象

`$download`对象用于文件下载，它定义在`plugins/download.js`文件中，它有如下方法

- 根据名称下载`download`路径下的文件

```
const name = "be756b96-c8b5-46c4-ab67-02e988973090.xlsx";
const isDelete = true;

// 默认下载方法
this.$download.name(name);

// 下载完成后是否删除文件
this.$download.name(name, isDelete);
```

1\
2\
3\
4\
5\
6\
7\
8

- 根据名称下载`upload`路径下的文件

```
const resource = "/profile/upload/2021/09/27/be756b96-c8b5-46c4-ab67-02e988973090.png";

// 默认方法
this.$download.resource(resource);
```

1\
2\
3\
4

- 根据请求地址下载`zip`包

```
const url = "/tool/gen/batchGenCode?tables=" + tableNames;
const name = "ruoyi";

// 默认方法
this.$download.zip(url, name);
```

1\
2\
3\
4\
5

- 更多文件下载操作

```
// 自定义文本保存
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
this.$download.saveAs(blob, "hello world.txt");

// 自定义文件保存
var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
this.$download.saveAs(file);

// 自定义data数据保存
const blob = new Blob([data], { type: 'text/plain;charset=utf-8' })
this.$download.saveAs(blob, name)

// 根据地址保存文件
this.$download.saveAs("https://ruoyi.vip/images/logo.png", "logo.jpg");
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83) 开发规范

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%96%B0%E5%A2%9E-view) 新增 view

在 [@/views (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/views) 文件下 创建对应的文件夹，一般性一个路由对应一个文件， 该模块下的功能就建议在本文件夹下创建一个新文件夹，各个功能模块维护自己的`utils`或`components`组件。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%96%B0%E5%A2%9E-api) 新增 api

在 [@/api (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/api) 文件夹下创建本模块对应的 api 服务。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%96%B0%E5%A2%9E%E7%BB%84%E4%BB%B6) 新增组件

在全局的 [@/components (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/components) 写一些全局的组件，如富文本，各种搜索组件，封装的分页组件等等能被公用的组件。 每个页面或者模块特定的业务组件则会写在当前 [@/views (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/views) 下面。\
如：`@/views/system/user/components/xxx.vue`。这样拆分大大减轻了维护成本。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%96%B0%E5%A2%9E%E6%A0%B7%E5%BC%8F) 新增样式

页面的样式和组件是一个道理，全局的 [@/style (opens new window)](https://gitee.com/y_project/RuoYi-Cloud/tree/master/ruoyi-ui/src/assets/styles) 放置一下全局公用的样式，每一个页面的样式就写在当前 `views`下面，请记住加上`scoped` 就只会作用在当前组件内了，避免造成全局的样式污染。

```
/* 编译前 */
.example {
  color: red;
}

/* 编译后 */
.example[_v-f3f3eg9] {
  color: red;
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E8%AF%B7%E6%B1%82%E6%B5%81%E7%A8%8B) 请求流程

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E4%BA%A4%E4%BA%92%E6%B5%81%E7%A8%8B) 交互流程

一个完整的前端 UI 交互到服务端处理流程是这样的：

1. UI 组件交互操作；
2. 调用统一管理的 api service 请求函数；
3. 使用封装的 request.js 发送请求；
4. 获取服务端返回；
5. 更新 data；

为了方便管理维护，统一的请求处理都放在 [@/src/api (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/api) 文件夹中，并且一般按照 model 维度进行拆分文件，如：

```
api/
  system/
    user.js
    role.js
  monitor/
    operlog.js
	logininfor.js
  ...
```

1\
2\
3\
4\
5\
6\
7\
8

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E8%AF%B7%E6%B1%82%E7%A4%BA%E4%BE%8B) 请求示例

```
// api/system/user.js
import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// views/system/user/index.vue
import { listUser } from "@/api/system/user";

export default {
  data() {
    userList: null,
    loading: true
  },
  methods: {
    getList() {
      this.loading = true
      listUser().then(response => {
        this.userList = response.rows
        this.loading = false
      })
    }
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30

提示

如果有不同的`baseURL`，直接通过覆盖的方式，让它具有不同的`baseURL`。

```
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query,
    baseURL: process.env.BASE_API
  })
}
```

1\
2\
3\
4\
5\
6\
7\
8

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%BC%95%E5%85%A5%E4%BE%9D%E8%B5%96) 引入依赖

除了 element-ui 组件以及脚手架内置的业务组件，有时我们还需要引入其他外部组件，这里以引入 [vue-count-to (opens new window)](https://github.com/PanJiaChen/vue-countTo) 为例进行介绍。

在终端输入下面的命令完成安装：

```
$ npm install vue-count-to --save
```

1

> 加上 `--save` 参数会自动添加依赖到 package.json 中去。

\

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E8%B7%AF%E7%94%B1%E4%BD%BF%E7%94%A8) 路由使用

框架的核心是通过路由自动生成对应导航，所以除了路由的基本配置，还需要了解框架提供了哪些配置项。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE) 路由配置

```
// 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
query: '{"id": 1, "name": "ry"}'     // 访问路由的默认传递参数
roles: ['admin', 'common']           // 访问路由的角色权限
permissions: ['a:a:a', 'b:b:b']      // 访问路由的菜单权限
 
meta: {
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29

**普通示例**

```
{
  path: '/system/test',
  component: Layout,
  redirect: 'noRedirect',
  hidden: false,
  alwaysShow: true,
  meta: { title: '系统管理', icon : "system" },
  children: [{
    path: 'index',
    component: (resolve) => require(['@/views/index'], resolve),
    name: 'Test',
    meta: {
      title: '测试管理',
      icon: 'user'
    }
  }]
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17

**外链示例**

```
{
  path: 'http://ruoyi.vip',
  meta: { title: '若依官网', icon : "guide" }
}
```

1\
2\
3\
4

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E9%9D%99%E6%80%81%E8%B7%AF%E7%94%B1) 静态路由

代表那些不需要动态判断权限的路由，如登录页、404、等通用页面，在[@/router/index.js (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/router/index.js)配置对应的公共路由。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1) 动态路由

代表那些需要根据用户动态判断权限并通过`addRoutes`动态添加的页面，在[@/store/modules/permission.js (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/store/modules/permission.js)加载后端接口路由配置。

提示

- 动态路由可以在系统管理-菜单管理进行新增和修改操作，前端加载会自动请求接口获取菜单信息并转换成前端对应的路由。
- 动态路由在生产环境下会默认使用路由懒加载，实现方式参考`loadView`方法的判断。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95) 常用方法

想要跳转到不同的页面，使用`router.push`方法

```
this.$router.push({ path: "/system/user" });
```

1

跳转页面并设置请求参数，使用`query`属性

```
this.$router.push({ path: "/system/user", query: {id: "1", name: "若依"} });
```

1

更多使用可以参考[vue-router (opens new window)](https://router.vuejs.org/zh)官方文档。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8) 组件使用

vue 注册组件的两种方式

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%B1%80%E9%83%A8%E6%B3%A8%E5%86%8C) 局部注册

在对应页使用`components`注册组件。

```
<template>
  <count-to :startVal='startVal' :endVal='endVal' :duration='3000'></count-to>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  data () {
    return {
      startVal: 0,
      endVal: 2020
    }
  }
}
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C) 全局注册

在 [@/main.js (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/main.js) 文件下注册组件。

```
import countTo from 'vue-count-to'
Vue.component('countTo', countTo)
```

1\
2

```
<template>
  <count-to :startVal='startVal' :endVal='endVal' :duration='3000'></count-to>
</template>
```

1\
2\
3

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%88%9B%E5%BB%BA%E4%BD%BF%E7%94%A8) 创建使用

可以通过创建一个后缀名为`vue`的文件，在通过`components`进行注册即可。

**例如定义一个`a.vue`文件**

```
<!-- 子组件 -->
<template>
  <div>这是a组件</div>
</template>
```

1\
2\
3\
4

**在其他组件中导入并注册**

```
<!-- 父组件 -->
<template>
  <div style="text-align: center; font-size: 20px">
    测试页面
    <testa></testa>
  </div>
</template>

<script>
import a from "./a";
export default {
  components: { testa: a }
};
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1) 组件通信

**通过`props`来接收外界传递到组件内部的值**

```
<!-- 父组件 -->
<template>
  <div style="text-align: center; font-size: 20px">
    测试页面
    <testa :name="name"></testa>
  </div>
</template>

<script>
import a from "./a";
export default {
  components: { testa: a },
  data() {
    return {
      name: "若依"
    };
  },
};
</script>

<!-- 子组件 -->
<template>
  <div>这是a组件 name:{{ name }}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
  }
};
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35

**使用`$emit`监听子组件触发的事件**

```
<!-- 父组件 -->
<template>
  <div style="text-align: center; font-size: 20px">
    测试页面
    <testa :name="name" @ok="ok"></testa>
    子组件传来的值 : {{ message }}
  </div>
</template>

<script>
import a from "./a";
export default {
  components: { testa: a },
  data() {
    return {
      name: "若依",
      message: ""
    };
  },
  methods: {
    ok(message) {
      this.message = message;
    },
  },
};
</script>

<!-- 子组件 -->
<template>
  <div>
    这是a组件 name:{{ name }}
    <button @click="click">发送</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      message: "我是来自子组件的消息"
    };
  },
  methods: {
    click() {
      this.$emit("ok", this.message);
    },
  },
};
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55

\

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%9D%83%E9%99%90%E4%BD%BF%E7%94%A8) 权限使用

封装了一个指令权限，能简单快速的实现按钮级别的权限判断。[v-permission (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/directive/permission)

**使用权限字符串 v-hasPermi**

```
// 单个
<el-button v-hasPermi="['system:user:add']">存在权限字符串才能看到</el-button>
// 多个
<el-button v-hasPermi="['system:user:add', 'system:user:edit']">包含权限字符串才能看到</el-button>
```

1\
2\
3\
4

**使用角色字符串 v-hasRole**

```
// 单个
<el-button v-hasRole="['admin']">管理员才能看到</el-button>
// 多个
<el-button v-hasRole="['role1', 'role2']">包含角色才能看到</el-button>
```

1\
2\
3\
4

提示

在某些情况下，它是不适合使用v-hasPermi，如元素标签组件，只能通过手动设置v-if。 可以使用全局权限判断函数，用法和指令 v-hasPermi 类似。

```
<template>
  <el-tabs>
    <el-tab-pane v-if="checkPermi(['system:user:add'])" label="用户管理" name="user">用户管理</el-tab-pane>
    <el-tab-pane v-if="checkPermi(['system:user:add', 'system:user:edit'])" label="参数管理" name="menu">参数管理</el-tab-pane>
    <el-tab-pane v-if="checkRole(['admin'])" label="角色管理" name="role">角色管理</el-tab-pane>
    <el-tab-pane v-if="checkRole(['admin','common'])" label="定时任务" name="job">定时任务</el-tab-pane>
   </el-tabs>
</template>

<script>
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数

export default{
   methods: {
    checkPermi,
    checkRole
  }
}
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19

前端有了鉴权后端还需要鉴权吗？

前端的鉴权只是一个辅助功能，对于专业人员这些限制都是可以轻松绕过的，为保证服务器安全，无论前端是否进行了权限校验，后端接口都需要对会话请求再次进行权限校验！

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%A4%9A%E7%BA%A7%E7%9B%AE%E5%BD%95) 多级目录

如果你的路由是多级目录，有三级路由嵌套的情况下，还需要手动在二级目录的根文件下添加一个 `<router-view>`。

如：[@/views/system/log/index.vue (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/views/system/log/index.vue)，原则上有多少级路由嵌套就需要多少个`<router-view>`。

![](https://foruda.gitee.com/images/1688696511764283878/7f127b83_1151004.png)

\

提示

最新版本多级目录已经支持自动配置组件，无需添加`<router-view>`。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E9%A1%B5%E7%AD%BE%E7%BC%93%E5%AD%98) 页签缓存

由于目前 `keep-alive` 和 `router-view` 是强耦合的，而且查看文档和源码不难发现 `keep-alive` 的 [include (opens new window)](https://cn.vuejs.org/v2/api/#keep-alive) 默认是优先匹配组件的 **name** ，所以在编写路由 router 和路由对应的 view component 的时候一定要确保 两者的 name 是完全一致的。(切记 name 命名时候尽量保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)

**DEMO:**

```
//router 路由声明
{
  path: 'config',
  component: ()=>import('@/views/system/config/index'),
  name: 'Config',
  meta: { title: '参数设置', icon: 'edit' }
}
```

1\
2\
3\
4\
5\
6\
7

```
//路由对应的view  system/config/index
export default {
  name: 'Config'
}
```

1\
2\
3\
4

一定要保证两者的名字相同，切记写重或者写错。默认如果不写 name 就不会被缓存，详情见[issue (opens new window)](https://github.com/vuejs/vue/issues/6938#issuecomment-345728620)。

提示

在系统管理-菜单管理-可以配置菜单页签是否缓存，默认为缓存

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E4%BD%BF%E7%94%A8%E5%9B%BE%E6%A0%87) 使用图标

全局 Svg Icon 图标组件。

默认在 [@/icons/index.js (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/assets/icons/index.js) 中注册到全局中，可以在项目中任意地方使用。所以图标均可在 [@/icons/svg (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/assets/icons/svg)。可自行添加或者删除图标，所以图标都会被自动导入，无需手动操作。

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F) 使用方式

```
<!-- icon-class 为 icon 的名字; class-name 为 icon 自定义 class-->
<svg-icon icon-class="password"  class-name='custom-class' />
```

1\
2

### [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E6%94%B9%E5%8F%98%E9%A2%9C%E8%89%B2) 改变颜色

`svg-icon` 默认会读取其父级的 color `fill: currentColor;`

你可以改变父级的`color`或者直接改变`fill`的颜色即可。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E4%BD%BF%E7%94%A8%E5%AD%97%E5%85%B8) 使用字典

字典管理是用来维护数据类型的数据，如下拉框、单选按钮、复选框、树选择的数据，方便系统管理员维护。主要功能包括：字典分类管理、字典数据管理。

**大于`3.7.0`版本使用如下方法**

1、main.js中引入全局变量和方法（已有）

```
import DictData from '@/components/DictData'
DictData.install()
```

1\
2

2、加载数据字典，可以是多个。

```
export default {
  dicts: ['字典类型'],
  ...
...
```

1\
2\
3\
4

3、读取数据字典

```
<el-option
  v-for="dict in dict.type.字典类型"
  :key="dict.value"
  :label="dict.label"
  :value="dict.value"
/>
```

1\
2\
3\
4\
5\
6

4、翻译数据字典

```
// 字典标签组件翻译
<el-table-column label="名称" align="center" prop="name">
  <template slot-scope="scope">
    <dict-tag :options="dict.type.字典类型" :value="scope.row.name"/>
  </template>
</el-table-column>

// 自定义方法翻译
{{ xxxxFormat(form) }}

xxxxFormat(row, column) {
  return this.selectDictLabel(this.dict.type.字典类型, row.name);
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

5、其他类型

```
const sys_user_sex = ref([
   { value: '1', label: '男', elTagType: 'success', elTagClass: '' },
   { value: '2', label: '女', elTagType: 'danger', elTagClass: '' }
])
```

1\
2\
3\
4

```
// 单个
<dict-tag :options="sys_user_sex" value="1"></dict-tag>
// 多个
<dict-tag :options="sys_user_sex" value="1,2"></dict-tag>
// 自定义分隔符
<dict-tag :options="sys_user_sex" value="0;1" separator=";"></dict-tag>
// 数组
<dict-tag :options="sys_user_sex" :value="[1,2]"></dict-tag>
// 是否当未找到匹配的数据时，显示原值value
<dict-tag :options="sys_user_sex" :value="[1,2,3,4,5]" :show-value="false"></dict-tag>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

**小于`3.7.0`版本使用如下方法**

1、main.js中引入全局变量和方法（已有）

```
import { getDicts } from "@/api/system/dict/data";
Vue.prototype.getDicts = getDicts
```

1\
2

2、加载数据字典

```
export default {
  data() {
    return {
      xxxxxOptions: [],
      .....
...

created() {
  this.getDicts("字典类型").then(response => {
    this.xxxxxOptions = response.data;
  });
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12

3、读取数据字典

```
<el-option
  v-for="dict in xxxxxOptions"
  :key="dict.dictValue"
  :label="dict.dictLabel"
  :value="dict.dictValue"
/>
```

1\
2\
3\
4\
5\
6

4、翻译数据字典

```
// 字典标签组件翻译
<el-table-column label="名称" align="center" prop="name">
  <template slot-scope="scope">
    <dict-tag :options="xxxxxOptions" :value="scope.row.name"/>
  </template>
</el-table-column>

// 自定义方法翻译
{{ xxxxFormat(form) }}

xxxxFormat(row, column) {
  return this.selectDictLabel(this.xxxxxOptions, row.name);
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E4%BD%BF%E7%94%A8%E5%8F%82%E6%95%B0) 使用参数

参数设置是提供开发人员、实施人员的动态系统配置参数，不需要去频繁修改后台配置文件，也无需重启服务器即可生效。

1、main.js中引入全局变量和方法（已有）

```
import { getConfigKey } from "@/api/system/config";
Vue.prototype.getConfigKey = getConfigKey
```

1\
2

2、页面使用参数

```
this.getConfigKey("参数键名").then(response => {
  this.xxxxx = response.msg;
});
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86) 异常处理

`@/utils/request.js` 是基于 `axios` 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。 如果有自定义错误码可以在`errorCode.js`中设置对应`key` `value`值。

```
import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams } from "@/utils/ruoyi";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      })
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename) {
  return service.post(url, params, {
    transformRequest: [(params) => {
      return tansParams(params)
    }],
    responseType: 'blob'
  }).then((data) => {
    const content = data
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}

export default service
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109

提示

如果有些不需要传递token的请求，可以设置`headers`中的属性`isToken`为`false`

```
export function login(username, password, code, uuid) {
  return request({
    url: 'xxxx',
    headers: {
      isToken: false,
      // 可以自定义 Authorization
	  // 'Authorization': 'Basic d2ViOg=='
    },
    method: 'get'
  })
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%BA%94%E7%94%A8%E8%B7%AF%E5%BE%84) 应用路径

有些特殊情况需要部署到子路径下，例如：`https://www.ruoyi.vip/admin`，可以按照下面流程修改。

1、修改`vue.config.js`中的`publicPath`属性

```
publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/admin/",
```

1

2、修改`router/index.js`，添加一行`base`属性

```
export default new Router({
  base: "/admin",
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
```

1\
2\
3\
4\
5\
6

3、`/index`路由添加获取子路径`/admin`

修改`layout/components/Navbar.vue`中的`location.href`

```
location.href = '/admin/index';
```

1

修改`utils/request.js`中的`location.href`

```
location.href = '/admin/index';
```

1

4、修改`nginx`配置

```
location /admin {
	alias   /home/ruoyi/projects/ruoyi-ui;
	try_files $uri $uri/ /admin/index.html;
	index  index.html index.htm;
}
```

1\
2\
3\
4\
5

打开浏览器，输入：`https://www.ruoyi.vip/admin` 能正常访问和刷新表示成功。

RuoYi-Vue3 应用路径修改方式

1、修改`vite.config.js`中的`base`属性

```
base: VITE_APP_ENV === 'production' ? '/admin/' : '/admin/',
```

1

2、修改`router/index.js`，`createWebHistory`添加`/admin`子路径

```
const router = createRouter({
  history: createWebHistory('/admin'),
  ....
});
```

1\
2\
3\
4

以上主要是针对`RuoYi-Vue3`修改的不同点，后续步骤流程和上述应用路径一致。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#%E5%86%85%E5%AE%B9%E5%A4%8D%E5%88%B6) 内容复制

如果要使用复制功能可以使用指令`v-clipboard`，示例代码。

```
<el-button
  v-clipboard:copy="content"
  v-clipboard:success="copySuccess"
  v-clipboard:error="copyFailed"
>复制</el-button>
```

1\
2\
3\
4\
5

| 参数                  | 说明       |
| ------------------- | -------- |
| v-clipboard:copy    | 需要复制的内容  |
| v-clipboard:cat     | 需要剪贴的内容  |
| v-clipboard:success | 复制成功处理函数 |
| clipboard:error     | 复制失败处理函数 |

---

## 组件文档 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E7%BB%84%E4%BB%B6%E6%96%87%E6%A1%A3) 组件文档

系统使用到的相关组件

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%9F%BA%E7%A1%80%E6%A1%86%E6%9E%B6%E7%BB%84%E4%BB%B6) 基础框架组件

[element-ui (opens new window)](https://github.com/ElemeFE/element)

[vue-element-admin (opens new window)](https://github.com/PanJiaChen/vue-element-admin)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E6%A0%91%E5%BD%A2%E9%80%89%E6%8B%A9%E7%BB%84%E4%BB%B6) 树形选择组件

[vue-treeselect (opens new window)](https://github.com/riophae/vue-treeselect)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8) 富文本编辑器

[quill (opens new window)](https://github.com/quilljs/quill)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E8%A1%A8%E6%A0%BC%E5%88%86%E9%A1%B5%E7%BB%84%E4%BB%B6) 表格分页组件

[pagination (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/components/Pagination/index.vue)

| 参数         | 类型      | 默认值                                     | 描述             |
| ---------- | ------- | --------------------------------------- | -------------- |
| total      | Number  | 空                                       | 总条目数           |
| page       | Number  | 1                                       | 初始化加载页数        |
| limit      | Number  | 20                                      | 每页的记录行数        |
| pageSizes  | Array   | \[10, 20, 30, 50]                       | 可供选择的每页的行数     |
| pagerCount | Number  | 5                                       | 设置最大页码按钮数      |
| layout     | String  | total, sizes, prev, pager, next, jumper | 组件布局，子组件名用逗号分隔 |
| background | Boolean | true                                    | 是否为分页按钮添加背景色   |
| autoScroll | Boolean | true                                    | 自动滚动到顶部        |
| hidden     | Boolean | false                                   | 是否显示分页         |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6) 富文本组件

[editor (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/components/Editor/index.vue)

| 参数        | 类型      | 默认值   | 描述                     |
| --------- | ------- | ----- | ---------------------- |
| value     | String  | 空     | 编辑器的内容                 |
| height    | Number  | Null  | 编辑器的高度                 |
| minHeight | Number  | Null  | 最小高度                   |
| readOnly  | Boolean | false | 是否只读                   |
| fileSize  | Number  | 5     | 上传文件大小限制(MB)           |
| type      | String  | url   | 图片保存类型（base64编码、url地址） |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%B7%A5%E5%85%B7%E6%A0%8F%E5%8F%B3%E4%BE%A7%E7%BB%84%E4%BB%B6) 工具栏右侧组件

[right-toolbar (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/components/RightToolbar/index.vue)

| 参数              | 类型      | 默认值      | 描述                             |
| --------------- | ------- | -------- | ------------------------------ |
| showSearch      | Boolean | true     | 是否显示检索条件                       |
| columns         | Array   | 空        | 显隐列信息                          |
| search          | Boolean | true     | 是否显示检索图标                       |
| showColumnsType | String  | checkbox | 显隐列类型（transfer穿梭框、checkbox复选框） |
| gutter          | Number  | 10       | 右外边距                           |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0%E7%BB%84%E4%BB%B6) 图片上传组件

[image-upload (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/components/ImageUpload)

| 参数        | 类型            | 默认值                                  | 描述                              |
| --------- | ------------- | ------------------------------------ | ------------------------------- |
| value     | String, Array | 空                                    | 图片上传的值                          |
| action    | String        | /common/upload                       | 上传接口地址                          |
| data      | Object        | 空                                    | 上传携带的参数                         |
| limit     | Number        | 5                                    | 图片数量限制                          |
| fileSize  | Number        | 5                                    | 大小限制(MB)                        |
| fileType  | Array         | \["doc", "xls", "ppt", "txt", "pdf"] | 文件类型, 例如\['png', 'jpg', 'jpeg'] |
| isShowTip | Boolean       | true                                 | 是否显示提示信息                        |
| disabled  | Boolean       | false                                | 禁用组件（仅查看图片）                     |
| drag      | Boolean       | true                                 | 拖动排序                            |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%9B%BE%E7%89%87%E9%A2%84%E8%A7%88%E7%BB%84%E4%BB%B6) 图片预览组件

[image-preview (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/components/ImagePreview)

| 参数     | 类型             | 默认值 | 描述   |
| ------ | -------------- | --- | ---- |
| src    | String         | 空   | 预览地址 |
| width  | Number, String | 空   | 预览宽度 |
| height | Number, String | 空   | 预览高度 |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E7%BB%84%E4%BB%B6) 文件上传组件

[file-upload (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/components/FileUpload)

| 参数        | 类型            | 默认值                                  | 描述                             |
| --------- | ------------- | ------------------------------------ | ------------------------------ |
| value     | String, Array | 空                                    | 文件上传的值                         |
| action    | String        | /common/upload                       | 上传接口地址                         |
| data      | Object        | 空                                    | 上传携带的参数                        |
| limit     | Number        | 5                                    | 上传数量限制                         |
| fileSize  | Number        | 5                                    | 大小限制(MB)                       |
| fileType  | Array         | \["doc", "xls", "ppt", "txt", "pdf"] | 文件类型, 例如\['xls', 'doc', 'pdf'] |
| isShowTip | Boolean       | true                                 | 是否显示提示信息                       |
| disabled  | Boolean       | false                                | 禁用组件（仅查看文件）                    |
| drag      | Boolean       | true                                 | 拖动排序                           |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E8%A1%A8%E5%8D%95%E8%AE%BE%E8%AE%A1%E7%BB%84%E4%BB%B6) 表单设计组件

[form-generator (opens new window)](https://github.com/JakHuang/form-generator)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8%E7%BB%84%E4%BB%B6) 数据字典组件

[dict-tag (opens new window)](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/components/DictTag)

| 参数        | 类型                    | 默认值  | 描述                    |
| --------- | --------------------- | ---- | --------------------- |
| options   | Array                 | null | 字典数据                  |
| value     | Number, String, Array | 空    | 当前的值                  |
| showValue | Boolean               | true | 是否未找到匹配的数据时，显示原始value |
| separator | String                | ,    | 分隔符                   |

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E5%88%86%E5%89%B2%E9%9D%A2%E6%9D%BF%E7%BB%84%E4%BB%B6) 分割面板组件

[splitpanes (opens new window)](https://github.com/antoniandre/splitpanes)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/zjwd.html#%E4%BB%BB%E5%8A%A1%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%BB%84%E4%BB%B6) 任务表达式组件

[vue-crontab (opens new window)](https://github.com/small-stone/vCrontab)

---

## 插件集成 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E6%8F%92%E4%BB%B6%E9%9B%86%E6%88%90) 插件集成

为了让开发者更加方便和快速的满足需求，提供了各种插件集成实现方案。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90docker%E5%AE%9E%E7%8E%B0%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2) 集成docker实现一键部署

`Docker`是一个虚拟环境容器，可以将你的开发环境、代码、配置文件等一并打包到这个容器中，最终只需要一个命令即可打包发布应用到任意平台中。

1、安装docker

```
yum install https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

1\
2\
3\
4\
5

2、检查`docker`和`docker-compose`是否安装成功

```
docker version
docker-compose --version
```

1\
2

3、文件授权

```
chmod +x /usr/local/bin/docker-compose
```

1

4、下载若依docker插件，上传到自己的服务器目录

插件相关脚本实现`ruoyi-vue/集成docker实现一键部署.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

- 其中`db目录`存放`ruoyi数据库脚本`
- 其中`jar目录`存放打包好的`jar应用文件`
- 其中`conf目录`存放`redis.conf`和`nginx.conf`配置
- 其中`html\dist目录`存放打包好的静态页面文件
- 数据库`mysql`地址需要修改成`ruoyi-mysql`
- 缓存`redis`地址需要修改成`ruoyi-redis`
- 数据库脚本头部需要添加`SET NAMES 'utf8';`（防止乱码）

5、启动docker

```
systemctl start docker
```

1

6、构建docker服务

```
docker-compose build
```

1

7、启动docker容器

```
docker-compose up -d
```

1

8、访问应用地址

打开浏览器，输入：([http://localhost:80 (opens new window)](http://localhost/))，若能正确展示页面，则表明环境搭建成功。

启动服务的容器`docker-compose up ruoyi-mysql ruoyi-server ruoyi-nginx ruoyi-redis`

停止服务的容器`docker-compose stop ruoyi-mysql ruoyi-server ruoyi-nginx ruoyi-redis`

时区设置

如果服务器的时区不正确，可以在`dockerfile`文件中添加`ENV TZ=Asia/Shanghai`

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E4%BD%BF%E7%94%A8postgresql%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93) 使用postgresql关系型数据库

若依（RuoYi-Vue）项目可以支持PostgreSQL数据库，以下是对项目切换到PostgreSQL关系型数据库迁移步骤、注意事项等多个维度进行补充说明。

1、`ruoyi-admin`文件`application.yml`，修改`pagehelper`配置

```
pagehelper:
  helperDialect: postgresql
  reasonable: true
  supportMethodsArguments: true
  params: count=countSql
```

1\
2\
3\
4\
5

2、`ruoyi-admin`文件`application-druid.yml`，修改`spirng.datasource`配置

```
# 更换的关键配置，其他保持不变
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: org.postgresql.Driver
        druid:
            # 主库数据源
            master:
                url: jdbc:postgresql://127.0.0.1:5432/ry-vue
                username: postgres
                password: postgres
            # 配置检测连接是否有效
            validationQuery: select version()
			....
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

3、`ruoyi-admin`的`pom.xml`依赖`mysql`替换为`postgresql`

```
<!-- PostgreSql驱动包 -->
<dependency>
	<groupId>org.postgresql</groupId>
	<artifactId>postgresql</artifactId>
</dependency>
```

1\
2\
3\
4\
5

4、语法相关的差异\
注意原`java`代码是不需要任何的修改，只需要替换`sql`脚本，和`xml`文件的语法差异，例如：时间`sysdate()`换成`now()`，批量操作的ID加变量`::bigint`

相关脚本和差异文件已经提供，可以直接下载后覆盖。`ruoyi-vue/使用postgresql数据库版本.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E5%8D%87%E7%BA%A7springboot%E5%88%B0%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC3-x) 升级springboot到最新版本3.x

`Spring Boot 3.x`要求使用`Java 17`或更高版本，所以需要确保项目使用的`Java`版本符合要求。

1、修改`pom.xml`文件，`version`版本根据实际情况配置最新。

```
<!-- java.version版本8更换为17 -->
<java.version>17</java.version>

<!-- 新增节点 -->
<mybatis-spring-boot.version>3.0.3</mybatis-spring-boot.version>
<mysql.version>8.2.0</mysql.version>
<jaxb-api.version>2.3.1</jaxb-api.version>
<jakarta.version>6.0.0</jakarta.version>
<springdoc.version>2.5.0</springdoc.version>
		
		
<!-- spring-boot版本2.5.15更换为3.3.0 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-dependencies</artifactId>
	<version>3.3.0</version>
	<type>pom</type>
	<scope>import</scope>
</dependency>

<!-- 新增四个配置依赖 -->
<dependency>
	<groupId>org.mybatis.spring.boot</groupId>
	<artifactId>mybatis-spring-boot-starter</artifactId>
	<version>${mybatis-spring-boot.version}</version>
</dependency>

<dependency>
	<groupId>com.mysql</groupId>
	<artifactId>mysql-connector-j</artifactId>
	<version>${mysql.version}</version>
</dependency>

<dependency>
	<groupId>javax.xml.bind</groupId>
	<artifactId>jaxb-api</artifactId>
	<version>${jaxb-api.version}</version>
</dependency>

<dependency>
	<groupId>jakarta.servlet</groupId>
	<artifactId>jakarta.servlet-api</artifactId>
	<version>${jakarta.version}</version>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44

2、修改`ruoyi-admin/pom.xml`文件`mysql`依赖。

```
<!-- Mysql驱动包 -->
<dependency>
	<groupId>com.mysql</groupId>
	<artifactId>mysql-connector-j</artifactId>
</dependency>
```

1\
2\
3\
4\
5

3、修改`ruoyi-common/pom.xml`文件`servlet`依赖为`jakarta`。

```
<!-- servlet包 -->
<dependency>
	<groupId>jakarta.servlet</groupId>
	<artifactId>jakarta.servlet-api</artifactId>
</dependency>
```

1\
2\
3\
4\
5

4、`Java EE`转`Jakarta EE`\
`Spring Boot 3.0`将所有底层依赖项从`Java EE`迁移到了`Jakarta EE`，会对一些使用了`Java EE`的方法造成影响，需要进行相应的修改和调整。

将`javax.xxxx`替换成`jakarta.xxxx`，例如

```
javax.annotation 替换成 jakarta.annotation
javax.servlet    替换成 jakarta.servlet
javax.validation 替换成 jakarta.validation
javax.xxxxxxxxxx 替换成 jakarta.xxxxxxxxxx
```

1\
2\
3\
4

注意代码生成模板`controller.java.vm`也需要换一下`javax`为`jakarta`。

但是有些原生方法是不需要去进行修改的，例如项目中的这几个方法，包不需要替换成`jakarta.xxxx`

```
import javax.imageio.ImageIO;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.sql.DataSource
```

1\
2\
3\
4\
5\
6\
7\
8

PS：如果嫌麻烦可以使用`idea`自带的转换功能

5、修改`PermitAllUrlProperties.java`，以支持`@Anonymous`注解`path_pattern_parser`解析方式。

```
package com.ruoyi.framework.config.properties;

@Configuration
public class PermitAllUrlProperties implements InitializingBean, ApplicationContextAware
{
    .........

    @Override
    public void afterPropertiesSet()
    {
        RequestMappingHandlerMapping mapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
        Map<RequestMappingInfo, HandlerMethod> map = mapping.getHandlerMethods();

        map.keySet().forEach(info -> {
            HandlerMethod handlerMethod = map.get(info);

            // 获取方法上边的注解 替代path variable 为 *
            Anonymous method = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Anonymous.class);
            Optional.ofNullable(method).ifPresent(anonymous -> Objects.requireNonNull(info.getPathPatternsCondition().getPatternValues()) //
                    .forEach(url -> urls.add(RegExUtils.replaceAll(url, PATTERN, ASTERISK))));

            // 获取类上边的注解, 替代path variable 为 *
            Anonymous controller = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Anonymous.class);
            Optional.ofNullable(controller).ifPresent(anonymous -> Objects.requireNonNull(info.getPathPatternsCondition().getPatternValues())
                    .forEach(url -> urls.add(RegExUtils.replaceAll(url, PATTERN, ASTERISK))));
        });
    }

    .........
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30

6、修改`SecurityConfig.java`，以支持`Spring Security6`新的配置方式。

```
package com.ruoyi.framework.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.filter.CorsFilter;
import com.ruoyi.framework.config.properties.PermitAllUrlProperties;
import com.ruoyi.framework.security.filter.JwtAuthenticationTokenFilter;
import com.ruoyi.framework.security.handle.AuthenticationEntryPointImpl;
import com.ruoyi.framework.security.handle.LogoutSuccessHandlerImpl;

/**
 * spring security配置
 * 
 * @author ruoyi
 */
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Configuration
public class SecurityConfig
{
    /**
     * 自定义用户认证逻辑
     */
    @Autowired
    private UserDetailsService userDetailsService;
    
    /**
     * 认证失败处理类
     */
    @Autowired
    private AuthenticationEntryPointImpl unauthorizedHandler;

    /**
     * 退出处理类
     */
    @Autowired
    private LogoutSuccessHandlerImpl logoutSuccessHandler;

    /**
     * token认证过滤器
     */
    @Autowired
    private JwtAuthenticationTokenFilter authenticationTokenFilter;
    
    /**
     * 跨域过滤器
     */
    @Autowired
    private CorsFilter corsFilter;

    /**
     * 允许匿名访问的地址
     */
    @Autowired
    private PermitAllUrlProperties permitAllUrl;

    /**
     * 身份验证实现
     */
    @Bean
    public AuthenticationManager authenticationManager()
    {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());
        return new ProviderManager(daoAuthenticationProvider);
    }

    /**
     * anyRequest          |   匹配所有请求路径
     * access              |   SpringEl表达式结果为true时可以访问
     * anonymous           |   匿名可以访问
     * denyAll             |   用户不能访问
     * fullyAuthenticated  |   用户完全认证可以访问（非remember-me下自动登录）
     * hasAnyAuthority     |   如果有参数，参数表示权限，则其中任何一个权限可以访问
     * hasAnyRole          |   如果有参数，参数表示角色，则其中任何一个角色可以访问
     * hasAuthority        |   如果有参数，参数表示权限，则其权限可以访问
     * hasIpAddress        |   如果有参数，参数表示IP地址，如果用户IP和参数匹配，则可以访问
     * hasRole             |   如果有参数，参数表示角色，则其角色可以访问
     * permitAll           |   用户可以任意访问
     * rememberMe          |   允许通过remember-me登录的用户访问
     * authenticated       |   用户登录后可访问
     */
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception
    {
        return httpSecurity
            // CSRF禁用，因为不使用session
            .csrf(csrf -> csrf.disable())
            // 禁用HTTP响应标头
            .headers((headersCustomizer) -> {
                headersCustomizer.cacheControl(cache -> cache.disable()).frameOptions(options -> options.sameOrigin());
            })
            // 认证失败处理类
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            // 基于token，所以不需要session
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // 注解标记允许匿名访问的url
            .authorizeHttpRequests((requests) -> {
                permitAllUrl.getUrls().forEach(url -> requests.requestMatchers(url).permitAll());
                // 对于登录login 注册register 验证码captchaImage 允许匿名访问
                requests.requestMatchers("/login", "/register", "/captchaImage").permitAll()
                    // 静态资源，可匿名访问
                    .requestMatchers(HttpMethod.GET, "/", "/*.html", "/**.html", "/**.css", "/**.js", "/profile/**").permitAll()
                    .requestMatchers("/swagger-ui.html", "/v3/api-docs/**", "/swagger-ui/**", "/druid/**").permitAll()
                    // 除上面外的所有请求全部需要鉴权认证
                    .anyRequest().authenticated();
            })
            // 添加Logout filter
            .logout(logout -> logout.logoutUrl("/logout").logoutSuccessHandler(logoutSuccessHandler))
            // 添加JWT filter
            .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class)
            // 添加CORS filter
            .addFilterBefore(corsFilter, JwtAuthenticationTokenFilter.class)
            .addFilterBefore(corsFilter, LogoutFilter.class)
            .build();
    }

    /**
     * 强散列哈希加密实现
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139

7、修改`application.yml`的`spring.redis`配置为`spring.data.redis`

```
spring:
  data:
    redis:
      ......
```

1\
2\
3\
4

8、到此就对`springboot3`做了全部的兼容，提供springboot3.x分支下载地址。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90ehcache%E5%AE%9E%E7%8E%B0%E6%9C%AC%E5%9C%B0%E7%BC%93%E5%AD%98%E5%88%87%E6%8D%A2) 集成ehcache实现本地缓存切换

目前的会话信息通过`redis`存储在服务器，可以很方便集群会话管理，但有些项目不大，就不想要去启动`redis`服务，就可以通过`ehcache`存储在本地。\
PS：`ehcache`主要兼容（`Spring Boot 2`版本），如果是`Spring Boot 3`版本请移步 [集成ehcache3实现本地缓存切换](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90ehcache3%E5%AE%9E%E7%8E%B0%E6%9C%AC%E5%9C%B0%E7%BC%93%E5%AD%98%E5%88%87%E6%8D%A2)

1、`pom.xml`文件添加`spring-cache`依赖。

```
<!-- SpringCache的依赖配置 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!-- Ehcache缓存管理器 -->
<dependency>
	<groupId>net.sf.ehcache</groupId>
	<artifactId>ehcache</artifactId>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

2、`ruoyi-common/pom.xml`文件添加`spring-cache`和`ehcache`依赖。

```
<!-- SpringCache的依赖配置 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!-- Ehcache缓存管理器 -->
<dependency>
	<groupId>net.sf.ehcache</groupId>
	<artifactId>ehcache</artifactId>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

3、`ruoyi-admin`文件`application.yml`，添加`cache`配置

```
spring:
  cache:
    # 指定缓存类型 ehcache 本地缓存 redis 缓存
    type: ehcache
    ehcache:
      config: classpath:ehcache.xml
    redis:
      # 指定存活时间（ms）
      time-to-live: 86400000
      # 指定前缀
      use-key-prefix: true
      # 是否缓存空值，可以防止缓存穿透
      cache-null-values: true
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

4、下载插件相关包和代码实现覆盖到工程中

提示

插件相关包和代码实现`ruoyi-vue/集成ehcache实现本地缓存切换.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

5、测试验证

关闭redis服务，启动ruoyi项目，测试登录和其他操作，如果想切换为redis，可以将类型`type: ehcache`设置为`type: redis`即可。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90ehcache3%E5%AE%9E%E7%8E%B0%E6%9C%AC%E5%9C%B0%E7%BC%93%E5%AD%98%E5%88%87%E6%8D%A2) 集成ehcache3实现本地缓存切换

用于（Spring Boot 3）版本集成 ehcache3 以替代 Redis 进行本地缓存，对于不需要 Redis 分布式特性的中小型项目，是理想的本地缓存选择。

1、`pom.xml`文件添加`spring-cache`依赖。

```
<!-- SpringCache的依赖配置 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
	<version>3.5.8</version>
</dependency>

<!-- Ehcache缓存管理器 -->
<dependency>
	<groupId>org.ehcache</groupId>
	<artifactId>ehcache</artifactId>
	<version>3.10.8</version>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

2、`ruoyi-common/pom.xml`文件添加`spring-cache`和`ehcache`依赖。

```
<!-- SpringCache的依赖配置 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!-- Ehcache缓存管理器 -->
<dependency>
	<groupId>org.ehcache</groupId>
	<artifactId>ehcache</artifactId>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

3、`ruoyi-admin`文件`application.yml`，添加`cache`配置

```
spring:
  cache:
    # 指定缓存类型 jcache 本地缓存 redis 缓存
    type: jcache
```

1\
2\
3\
4

4、下载插件相关包和代码实现覆盖到工程中

提示

插件相关包和代码实现`ruoyi-vue/集成ehcache3实现本地缓存切换.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

5、测试验证

关闭redis服务，启动ruoyi项目，测试登录和其他操作，如果想切换为redis，可以将类型`type: ehcache`设置为`type: redis`即可。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90websocket%E5%AE%9E%E7%8E%B0%E5%AE%9E%E6%97%B6%E9%80%9A%E4%BF%A1) 集成websocket实现实时通信

`WebSocket`是一种通信协议，可在单个`TCP`连接上进行全双工通信。`WebSocket`使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在`WebSocket API`中，浏览器和服务器只需要完成一次握手，两者之间就可以建立持久性的连接，并进行双向数据传输。

1、`ruoyi-framework/pom.xml`文件添加`websocket`依赖。

```
<!-- SpringBoot Websocket -->
<dependency>  
   <groupId>org.springframework.boot</groupId>  
   <artifactId>spring-boot-starter-websocket</artifactId>  
</dependency>
```

1\
2\
3\
4\
5

2、配置匿名访问（可选）

```
// 如果需要不登录也可以访问，需要在`SecurityConfig.java`中设置匿名访问
("/websocket/**").permitAll()
```

1\
2

3、下载插件相关包和代码实现覆盖到工程中

提示

插件相关包和代码实现`ruoyi-vue/集成websocket实现实时通信.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

4、测试验证

如果要测试验证可以把`websocket.vue`内容复制到`login.vue`，点击连接发送消息测试返回结果。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90electron%E5%AE%9E%E7%8E%B0%E6%A1%8C%E9%9D%A2%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F) 集成electron实现桌面应用程序

1、修改`package.json`文件，加入相关依赖和配置

```
{
  "name": "ruoyi",
  "version": "3.8.6",
  "description": "若依管理系统",
  "author": "若依",
  "license": "MIT",
  "main": "background.js",
  "scripts": {
    ....
    "electron:serve": "vue-cli-service electron:serve",
    "electron:build": "vue-cli-service electron:build",
    "electron:build:win32": "vue-cli-service electron:build --win --ia32",
    ....
  },
  ....
  "dependencies": {
    "....
    "electron-devtools-installer": "3.2.0",
    "electron-store": "8.1.0",
    "vue-cli-plugin-electron-builder": "2.1.1",
    ....
  },
  "devDependencies": {
    ....
    "electron": "26.2.0",
    ....
  },
  ....
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29

2、配置后端接口地址 修改`.env.production`文件`VUE_APP_BASE_API`属性

```
# 你自己的后端接口地址
VUE_APP_BASE_API = 'https://vue.ruoyi.vip/prod-api'
```

1\
2

3、在`ruoyi-ui/src`下新建`background.js`文件

```
'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const additionalData = { myKey: 'myValue' }
let myWindow = null
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

const gotTheLock = app.requestSingleInstanceLock(additionalData)
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS_DEVTOOLS)
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    createWindow()
  })

  // Exit cleanly on request from parent process in development mode.
  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit') {
          app.quit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93

4、调整部分代码，以便支持`electron`应用 修改`layout/components/Navbar.vue`和`utils/request.js`，把`location.href = '/index'`换成`this.$router.push('/login')`

```
this.$store.dispatch('LogOut').then(() => {
    this.$router.push('/login');
})
```

1\
2\
3

修改`router/index.js`，把`mode: history`换成`mode: 'hash'`

```
export default new Router({
  mode: 'hash',
  ...
})
```

1\
2\
3\
4

5、将项目中使用到的`cookie`替换成`localstorage`

[参考使用localstorage代替cookie](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BD%BF%E7%94%A8localstorage%E4%BB%A3%E6%9B%BFcookie)

6、使用`npm install`命令安装依赖

```
npm install --registry=https://registry.npmmirror.com
```

1

7、使用`npm run electron:build`命令进行打包

```
npm run electron:build
```

1

打包成功后会在`dist_electron`中生成了`exe`文件，点击安装即可。

如果安装失败，可以配置镜像地址后使用cnpm尝试单独安装electron相关依赖

```
# 配置electron镜像地址
npm config set registry https://registry.npmmirror.com/
npm config set electron_mirror="https://npmmirror.com/mirrors/electron/"
npm config set electron_builder_binaries_mirror="https://npmmirror.com/mirrors/electron-builder-binaries/"

# 安装 electron
cnpm install electron --save-dev

# 安装 electron 管理开发者工具
cnpm install electron-devtools-installer

# 安装 electron 持久化数据存储库
cnpm install electron-store

# 安装 electron 打包和构建
cnpm install vue-cli-plugin-electron-builder
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90atomikos%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1) 集成atomikos实现分布式事务

[参考集成atomikos实现分布式事务](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90atomikos%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90minio%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E6%96%87%E4%BB%B6%E5%AD%98%E5%82%A8) 集成minio实现分布式文件存储

框架默认存储使用的本地磁盘，对于一些文件较大较多且有数据备份、数据安全、分布式等等就满足不了我们的要求，对于这种情况我们可以集成`OSS`对象存储服务。 `minio`是目前`github`上`star`最多的数据存储框架。`minio`可以用来搭建分布式存储服务，可以很好的和机器学习相结合。

1、`ruoyi-common/pom.xml`文件添加`minio`依赖。

```
<!-- Minio 文件存储 -->
<dependency>
	<groupId>io.minio</groupId>
	<artifactId>minio</artifactId>
	<version>8.2.1</version>
</dependency>
```

1\
2\
3\
4\
5\
6

2、`ruoyi-admin`文件`application.yml`，添加`minio`配置

```
# Minio配置
minio:
  url: http://localhost:9000
  accessKey: minioadmin
  secretKey: minioadmin
  bucketName: ruoyi
```

1\
2\
3\
4\
5\
6

3、`CommonController.java`自定义`Minio`服务器上传请求

```
/**
 * 自定义 Minio 服务器上传请求
 */
@PostMapping("/uploadMinio")
public AjaxResult uploadFileMinio(MultipartFile file) throws Exception
{
	try
	{
		// 上传并返回新文件名称
		String fileName = FileUploadUtils.uploadMinio(file);
		AjaxResult ajax = AjaxResult.success();
		ajax.put("url", fileName);
		ajax.put("fileName", fileName);
		ajax.put("newFileName", FileUtils.getName(fileName));
		ajax.put("originalFilename", file.getOriginalFilename());
		return ajax;
	}
	catch (Exception e)
	{
		return AjaxResult.error(e.getMessage());
	}
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22

4、下载插件相关包和代码实现覆盖到工程中

提示

插件相关包和代码实现`ruoyi/集成minio实现分布式文件存储.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

5、测试验证文件存储的功能

代码测试可以将自己的`FileUploadUtils.upload`修改为`FileUploadUtils.uploadMinio`，返回值为文件的`url`路径。

页面测试可以修改组件`src/components/xxxxxx`的文件上传的路径`common/upload`修改为`common/uploadMinio`，然后去掉多余的代理路径`baseUrl`在上传测试验证结果。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90easy-es%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E5%85%A8%E6%96%87%E6%A3%80%E7%B4%A2) 集成easy-es实现分布式全文检索

[集成easy-es实现分布式全文检索](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90easy-es%E5%AE%9E%E7%8E%B0%E5%88%86%E5%B8%83%E5%BC%8F%E5%85%A8%E6%96%87%E6%A3%80%E7%B4%A2)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E4%BD%BF%E7%94%A8localstorage%E4%BB%A3%E6%9B%BFcookie) 使用localstorage代替cookie

[使用localstorage代替cookie](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BD%BF%E7%94%A8localstorage%E4%BB%A3%E6%9B%BFcookie)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E4%BD%BF%E7%94%A8undertow%E6%9D%A5%E6%9B%BF%E4%BB%A3tomcat%E5%AE%B9%E5%99%A8) 使用undertow来替代tomcat容器

[参考使用undertow来替代tomcat容器](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E4%BD%BF%E7%94%A8undertow%E6%9D%A5%E6%9B%BF%E4%BB%A3tomcat%E5%AE%B9%E5%99%A8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90actuator%E5%AE%9E%E7%8E%B0%E4%BC%98%E9%9B%85%E5%85%B3%E9%97%AD%E5%BA%94%E7%94%A8) 集成actuator实现优雅关闭应用

优雅停机主要应用在版本更新的时候，为了等待正在工作的线程全部执行完毕，然后再停止。我们可以使用`SpringBoot`提供的`Actuator`

1、`pom.xml`中引入`actuator`依赖

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

1\
2\
3\
4

2、配置文件中`endpoint`开启`shutdown`

```
management:
  endpoint:
    shutdown:
      enabled: true
  endpoints:
    web:
      exposure:
        include: "shutdown"
      base-path: /monitor
```

1\
2\
3\
4\
5\
6\
7\
8\
9

3、在`SecurityConfig`中设置`httpSecurity`配置匿名访问

```
.antMatchers("/monitor/shutdown").permitAll()
```

1

4、`Post`请求测试验证优雅停机 curl -X POST http\://localhost:8080/monitor/shutdown

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90aj-captcha%E5%AE%9E%E7%8E%B0%E6%BB%91%E5%9D%97%E9%AA%8C%E8%AF%81%E7%A0%81) 集成aj-captcha实现滑块验证码

集成以`AJ-Captcha`滑块验证码为例，不需要键盘手动输入，极大优化了传统验证码用户体验不佳的问题。目前对外提供两种类型的验证码，其中包含滑动拼图、文字点选。

1、`ruoyi-framework\pom.xml`添加依赖

```
<!-- 滑块验证码  -->
<dependency>
	<groupId>com.github.anji-plus</groupId>
	<artifactId>captcha-spring-boot-starter</artifactId>
	<version>1.2.7</version>
</dependency>

<!-- 原有的验证码kaptcha依赖不需要可以删除  -->
```

1\
2\
3\
4\
5\
6\
7\
8

2、修改`application.yml`，加入`aj-captcha`配置

```
# 滑块验证码
aj:
   captcha:
      # 缓存类型
      cache-type: redis
      # blockPuzzle 滑块 clickWord 文字点选  default默认两者都实例化
      type: blockPuzzle
      # 右下角显示字
      water-mark: ruoyi.vip
      # 校验滑动拼图允许误差偏移量(默认5像素)
      slip-offset: 5
      # aes加密坐标开启或者禁用(true|false)
      aes-status: true
      # 滑动干扰项(0/1/2)
      interference-options: 2
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15

同时在`ruoyi-admin\src\main\resources\META-INF\services`下创建com.anji.captcha.service.CaptchaCacheService文件同时设置文件内容为

```
com.ruoyi.framework.web.service.CaptchaRedisService
```

1

3、在SecurityConfig中设置httpSecurity配置匿名访问

```
.antMatchers("/login", "/captcha/get", "/captcha/check").permitAll()
```

1

4、修改相关类

移除原先不需要的类

`ruoyi-admin\com\ruoyi\web\controller\common\CaptchaController.java`\
`ruoyi-framework\com\ruoyi\framework\config\CaptchaConfig.java`\
`ruoyi-framework\com\ruoyi\framework\config\KaptchaTextCreator.java`

修改`ruoyi-admin\com\ruoyi\web\controller\system\SysLoginController.java`

```
/**
 * 登录方法
 * 
 * @param loginBody 登录信息
 * @return 结果
 */
@PostMapping("/login")
public AjaxResult login(@RequestBody LoginBody loginBody)
{
	AjaxResult ajax = AjaxResult.success();
	// 生成令牌
	String token = loginService.login(loginBody.getUsername(), loginBody.getPassword(), loginBody.getCode());
	ajax.put(Constants.TOKEN, token);
	return ajax;
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15

修改`ruoyi-framework\com\ruoyi\framework\web\service\SysLoginService.java`

```
package com.ruoyi.framework.web.service;

....

/**
 * 登录校验方法
 * 
 * @author ruoyi
 */
@Component
public class SysLoginService
{
    ....

    @Autowired
    @Lazy
    private CaptchaService captchaService;

    /**
     * 登录验证
     * 
     * @param username 用户名
     * @param password 密码
     * @param code 验证码
     * @param uuid 唯一标识
     * @return 结果
     */
    public String login(String username, String password, String code)
    {
        // 验证码校验
        validateCaptcha(username, code);
        ....
    }

    /**
     * 校验验证码
     * 
     * @param username 用户名
     * @param code 验证码
     * @param uuid 唯一标识
     * @return 结果
     */
    public void validateCaptcha(String username, String code)
    {
        CaptchaVO captchaVO = new CaptchaVO();
        captchaVO.setCaptchaVerification(code);
        ResponseModel response = captchaService.verification(captchaVO);
        if (!response.isSuccess())
        {
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constants.LOGIN_FAIL, MessageUtils.message("user.jcaptcha.error")));
            throw new CaptchaException();
        }
    }

    ....
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56

新增 `ruoyi-framework\com\ruoyi\framework\web\service\CaptchaRedisService.java`

```
package com.ruoyi.framework.web.service;

import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import com.anji.captcha.service.CaptchaCacheService;

/**
 * 自定义redis验证码缓存实现类
 * 
 * @author ruoyi
 */
public class CaptchaRedisService implements CaptchaCacheService
{
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void set(String key, String value, long expiresInSeconds)
    {
        stringRedisTemplate.opsForValue().set(key, value, expiresInSeconds, TimeUnit.SECONDS);
    }

    @Override
    public boolean exists(String key)
    {
        return stringRedisTemplate.hasKey(key);
    }

    @Override
    public void delete(String key)
    {
        stringRedisTemplate.delete(key);
    }

    @Override
    public String get(String key)
    {
        return stringRedisTemplate.opsForValue().get(key);
    }

    @Override
    public Long increment(String key, long val)
    {
        return stringRedisTemplate.opsForValue().increment(key, val);
    }

    @Override
    public String type()
    {
        return "redis";
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53

5、添加滑动验证码插件到ruoyi-ui

下载前端插件相关包和代码实现`ruoyi-vue/集成滑动验证码.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90sharding-jdbc%E5%AE%9E%E7%8E%B0%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8) 集成sharding-jdbc实现分库分表

[参考集成sharding-jdbc实现分库分表](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90sharding-jdbc%E5%AE%9E%E7%8E%B0%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90just-auth%E5%AE%9E%E7%8E%B0%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8E%88%E6%9D%83%E7%99%BB%E5%BD%95) 集成just-auth实现第三方授权登录

对于一些想使用第三方平台授权登录可以使用`JustAuth`，支持Github、Gitee、微博、钉钉、百度、Coding、腾讯云开发者平台、OSChina、支付宝、QQ、微信、淘宝、Google、Facebook、抖音、领英、小米、微软、今日头条、Teambition、StackOverflow、Pinterest、人人、华为、企业微信、酷家乐、Gitlab、美团、饿了么和推特等第三方平台的授权登录。

1、`ruoyi-common\pom.xml`模块添加整合依赖

```
<!-- 第三方授权登录 -->
<dependency>
	<groupId>me.zhyd.oauth</groupId>
	<artifactId>JustAuth</artifactId>
	<version>1.15.6</version>
</dependency>

<!-- HttpClient -->
<dependency>
	<groupId>org.apache.httpcomponents</groupId>
	<artifactId>httpclient</artifactId>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12

2、在SecurityConfig中设置httpSecurity配置匿名访问

```
.antMatchers("/system/auth/binding/*", "/system/auth/social-login/*").permitAll()
```

1

3、新建第三方登录授权表

```
-- ----------------------------
-- 第三方授权表
-- ----------------------------
DROP TABLE IF EXISTS sys_auth_user;
CREATE TABLE sys_auth_user (
  auth_id           BIGINT(20)      NOT NULL AUTO_INCREMENT    COMMENT '授权ID',
  uuid              VARCHAR(500)    NOT NULL                   COMMENT '第三方平台用户唯一ID',
  user_id           BIGINT(20)      NOT NULL                   COMMENT '系统用户ID',
  user_name         VARCHAR(30)     NOT NULL                   COMMENT '登录账号',
  nick_name         VARCHAR(30)     DEFAULT ''                 COMMENT '用户昵称',
  avatar            VARCHAR(500)    DEFAULT ''                 COMMENT '头像地址',
  email             VARCHAR(255)    DEFAULT ''                 COMMENT '用户邮箱',
  source            VARCHAR(255)    DEFAULT ''                 COMMENT '用户来源',
  create_time       DATETIME                                   COMMENT '创建时间',
  PRIMARY KEY (auth_id)
) ENGINE=INNODB AUTO_INCREMENT=100 COMMENT = '第三方授权表';
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

4、下载插件相关包和代码实现覆盖到工程中

提示

下载前端插件相关包和代码实现`ruoyi-vue/集成JustAuth实现第三方授权登录.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

5、测试登录页面第三方授权登录，个人中心授权及取消功能是否正常使用。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90watermark%E5%AE%9E%E7%8E%B0%E9%A1%B5%E9%9D%A2%E6%B7%BB%E5%8A%A0%E6%B0%B4%E5%8D%B0) 集成watermark实现页面添加水印

在网站浏览中，常常需要网页水印，以便防止用户截图或录屏暴露敏感信息后，方便追踪用户来源。

1、在`package.json`文件`dependencies`节点增加`watermark-dom`依赖。

```
"watermark-dom": "2.3.0"
```

1

2、在`AppMain.vue`文件引入水印模块，示例如下：

```
import watermark from "watermark-dom";

export default {
  name: "AppMain",
  mounted() {
    // 加载水印
    const username = this.$store.state.user.name;
    watermark.load({ watermark_txt: username + "水印" });
  },
  computed: {
    .....
  }
};
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

3、访问页面，检查页面水印是否显示。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90mybatisplus%E5%AE%9E%E7%8E%B0mybatis%E5%A2%9E%E5%BC%BA) 集成mybatisplus实现mybatis增强

`Mybatis-Plus`是在`Mybatis`的基础上进行扩展，只做增强不做改变，可以兼容`Mybatis`原生的特性。同时支持通用CRUD操作、多种主键策略、分页、性能分析、全局拦截等。极大帮助我们简化开发工作。

1、`ruoyi-common\pom.xml`模块添加整合依赖

ruoyi-springboot2/用mybatis-plus-boot-starter依赖

```
<!-- ruoyi-springboot2 / mybatis-plus 配置 -->
<dependency>
	<groupId>com.baomidou</groupId>
	<artifactId>mybatis-plus-boot-starter</artifactId>
	<version>3.5.1</version>
</dependency>
```

1\
2\
3\
4\
5\
6

ruoyi-springboot3/用mybatis-plus-spring-boot3-starter依赖

```
<!-- ruoyi-springboot3 / mybatis-plus 配置 -->
<dependency>
	<groupId>org.mybatis</groupId>
	<artifactId>mybatis</artifactId>
	<version>3.5.16</version>
</dependency>

<dependency>
	<groupId>com.baomidou</groupId>
	<artifactId>mybatis-plus-spring-boot3-starter</artifactId>
	<version>3.5.10</version>
</dependency>

<dependency>
	<groupId>com.baomidou</groupId>
	<artifactId>mybatis-plus-jsqlparser</artifactId>
	<version>3.5.10</version>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18

如其他`version`不同导致的报错，注意`mybatis-plus`与`mybatis`版本之间的冲突。

2、`ruoyi-admin`文件`application.yml`，修改mybatis配置为mybatis-plus

```
# MyBatis Plus配置
mybatis-plus:
  # 搜索指定包别名
  typeAliasesPackage: com.ruoyi.**.domain
  # 配置mapper的扫描，找到所有的mapper.xml映射文件
  mapperLocations: classpath*:mapper/**/*Mapper.xml
  # 加载全局的配置文件
  configLocation: classpath:mybatis/mybatis-config.xml
```

1\
2\
3\
4\
5\
6\
7\
8

3、添加`Mybatis Plus`配置`MybatisPlusConfig.java`。 **PS：原来的`MyBatisConfig.java`需要删除掉**

```
package com.ruoyi.framework.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.BlockAttackInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Mybatis Plus 配置
 * 
 * @author ruoyi
 */
@EnableTransactionManagement(proxyTargetClass = true)
@Configuration
public class MybatisPlusConfig
{
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor()
    {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 分页插件
        interceptor.addInnerInterceptor(paginationInnerInterceptor());
        // 乐观锁插件
        interceptor.addInnerInterceptor(optimisticLockerInnerInterceptor());
        // 阻断插件
        interceptor.addInnerInterceptor(blockAttackInnerInterceptor());
        return interceptor;
    }

    /**
     * 分页插件，自动识别数据库类型 https://baomidou.com/guide/interceptor-pagination.html
     */
    public PaginationInnerInterceptor paginationInnerInterceptor()
    {
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor();
        // 设置数据库类型为mysql
        paginationInnerInterceptor.setDbType(DbType.MYSQL);
        // 设置最大单页限制数量，默认 500 条，-1 不受限制
        paginationInnerInterceptor.setMaxLimit(-1L);
        return paginationInnerInterceptor;
    }

    /**
     * 乐观锁插件 https://baomidou.com/guide/interceptor-optimistic-locker.html
     */
    public OptimisticLockerInnerInterceptor optimisticLockerInnerInterceptor()
    {
        return new OptimisticLockerInnerInterceptor();
    }

    /**
     * 如果是对全表的删除或更新操作，就会终止该操作 https://baomidou.com/guide/interceptor-block-attack.html
     */
    public BlockAttackInnerInterceptor blockAttackInnerInterceptor()
    {
        return new BlockAttackInnerInterceptor();
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62

4、添加测试表和菜单信息

```
drop table if exists sys_student;
create table sys_student (
  student_id           int(11)         auto_increment    comment '编号',
  student_name         varchar(30)     default ''        comment '学生名称',
  student_age          int(3)          default null      comment '年龄',
  student_hobby        varchar(30)     default ''        comment '爱好（0代码 1音乐 2电影）',
  student_sex          char(1)         default '0'       comment '性别（0男 1女 2未知）',
  student_status       char(1)         default '0'       comment '状态（0正常 1停用）',
  student_birthday     datetime                          comment '生日',
  primary key (student_id)
) engine=innodb auto_increment=1 comment = '学生信息表';

-- 菜单 sql
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('学生信息', '3', '1', 'student', 'system/student/index', 1, 0, 'c', '0', '0', 'system:student:list', '#', 'admin', sysdate(), '', null, '学生信息菜单');

-- 按钮父菜单id
select @parentid := last_insert_id();

-- 按钮 sql
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('学生信息查询', @parentid, '1',  '#', '', 1, 0, 'f', '0', '0', 'system:student:query',        '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('学生信息新增', @parentid, '2',  '#', '', 1, 0, 'f', '0', '0', 'system:student:add',          '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('学生信息修改', @parentid, '3',  '#', '', 1, 0, 'f', '0', '0', 'system:student:edit',         '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('学生信息删除', @parentid, '4',  '#', '', 1, 0, 'f', '0', '0', 'system:student:remove',       '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('学生信息导出', @parentid, '5',  '#', '', 1, 0, 'f', '0', '0', 'system:student:export',       '#', 'admin', sysdate(), '', null, '');
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34

5、新增测试代码验证 新增 **ruoyi-system\com\ruoyi\system\controller\SysStudentController.java**

```
package com.ruoyi.web.controller.system;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.system.domain.SysStudent;
import com.ruoyi.system.service.ISysStudentService;

/**
 * 学生信息Controller
 * 
 * @author ruoyi
 */
@RestController
@RequestMapping("/system/student")
public class SysStudentController extends BaseController
{
    @Autowired
    private ISysStudentService sysStudentService;

    /**
     * 查询学生信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:student:list')")
    @GetMapping("/list")
    public TableDataInfo list(SysStudent sysStudent)
    {
        startPage();
        List<SysStudent> list = sysStudentService.queryList(sysStudent);
        return getDataTable(list);
    }

    /**
     * 导出学生信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:student:export')")
    @Log(title = "学生信息", businessType = BusinessType.EXPORT)
    @GetMapping("/export")
    public AjaxResult export(SysStudent sysStudent)
    {
        List<SysStudent> list = sysStudentService.queryList(sysStudent);
        ExcelUtil<SysStudent> util = new ExcelUtil<SysStudent>(SysStudent.class);
        return util.exportExcel(list, "student");
    }

    /**
     * 获取学生信息详细信息
     */
    @PreAuthorize("@ss.hasPermi('system:student:query')")
    @GetMapping(value = "/{studentId}")
    public AjaxResult getInfo(@PathVariable("studentId") Long studentId)
    {
        return AjaxResult.success(sysStudentService.getById(studentId));
    }

    /**
     * 新增学生信息
     */
    @PreAuthorize("@ss.hasPermi('system:student:add')")
    @Log(title = "学生信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody SysStudent sysStudent)
    {
        return toAjax(sysStudentService.save(sysStudent));
    }

    /**
     * 修改学生信息
     */
    @PreAuthorize("@ss.hasPermi('system:student:edit')")
    @Log(title = "学生信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody SysStudent sysStudent)
    {
        return toAjax(sysStudentService.updateById(sysStudent));
    }

    /**
     * 删除学生信息
     */
    @PreAuthorize("@ss.hasPermi('system:student:remove')")
    @Log(title = "学生信息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{studentIds}")
    public AjaxResult remove(@PathVariable Long[] studentIds)
    {
        return toAjax(sysStudentService.removeByIds(Arrays.asList(studentIds)));
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103

新增 **ruoyi-system\com\ruoyi\system\domain\SysStudent.java**

```
package com.ruoyi.system.domain;

import java.io.Serializable;
import java.util.Date;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.ruoyi.common.annotation.Excel;

/**
 * 学生信息对象 sys_student
 * 
 * @author ruoyi
 */
@TableName(value = "sys_student")
public class SysStudent implements Serializable
{
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @TableId(type = IdType.AUTO)
    private Long studentId;

    /** 学生名称 */
    @Excel(name = "学生名称")
    private String studentName;

    /** 年龄 */
    @Excel(name = "年龄")
    private Integer studentAge;

    /** 爱好（0代码 1音乐 2电影） */
    @Excel(name = "爱好", readConverterExp = "0=代码,1=音乐,2=电影")
    private String studentHobby;

    /** 性别（0男 1女 2未知） */
    @Excel(name = "性别", readConverterExp = "0=男,1=女,2=未知")
    private String studentSex;

    /** 状态（0正常 1停用） */
    @Excel(name = "状态", readConverterExp = "0=正常,1=停用")
    private String studentStatus;

    /** 生日 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "生日", width = 30, dateFormat = "yyyy-MM-dd")
    private Date studentBirthday;

    public void setStudentId(Long studentId) 
    {
        this.studentId = studentId;
    }

    public Long getStudentId() 
    {
        return studentId;
    }
    public void setStudentName(String studentName) 
    {
        this.studentName = studentName;
    }

    public String getStudentName() 
    {
        return studentName;
    }
    public void setStudentAge(Integer studentAge) 
    {
        this.studentAge = studentAge;
    }

    public Integer getStudentAge() 
    {
        return studentAge;
    }
    public void setStudentHobby(String studentHobby) 
    {
        this.studentHobby = studentHobby;
    }

    public String getStudentHobby() 
    {
        return studentHobby;
    }
    public void setStudentSex(String studentSex) 
    {
        this.studentSex = studentSex;
    }

    public String getStudentSex() 
    {
        return studentSex;
    }
    public void setStudentStatus(String studentStatus) 
    {
        this.studentStatus = studentStatus;
    }

    public String getStudentStatus() 
    {
        return studentStatus;
    }
    public void setStudentBirthday(Date studentBirthday) 
    {
        this.studentBirthday = studentBirthday;
    }

    public Date getStudentBirthday() 
    {
        return studentBirthday;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("studentId", getStudentId())
            .append("studentName", getStudentName())
            .append("studentAge", getStudentAge())
            .append("studentHobby", getStudentHobby())
            .append("studentSex", getStudentSex())
            .append("studentStatus", getStudentStatus())
            .append("studentBirthday", getStudentBirthday())
            .toString();
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130

新增 **ruoyi-system\com\ruoyi\system\mapper\SysStudentMapper.java**

```
package com.ruoyi.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruoyi.system.domain.SysStudent;

/**
 * 学生信息Mapper接口
 * 
 * @author ruoyi
 */
public interface SysStudentMapper extends BaseMapper<SysStudent>
{

}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

新增 **ruoyi-system\com\ruoyi\system\service\ISysStudentService.java**

```
package com.ruoyi.system.service;

import java.util.List;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.system.domain.SysStudent;

/**
 * 学生信息Service接口
 * 
 * @author ruoyi
 */
public interface ISysStudentService extends IService<SysStudent>
{
    /**
     * 查询学生信息列表
     * 
     * @param sysStudent 学生信息
     * @return 学生信息集合
     */
    public List<SysStudent> queryList(SysStudent sysStudent);
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21

新增 **ruoyi-system\com\ruoyi\system\service\impl\SysStudentServiceImpl.java**

```
package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.SysStudent;
import com.ruoyi.system.mapper.SysStudentMapper;
import com.ruoyi.system.service.ISysStudentService;

/**
 * 学生信息Service业务层处理
 * 
 * @author ruoyi
 */
@Service
public class SysStudentServiceImpl extends ServiceImpl<SysStudentMapper, SysStudent> implements ISysStudentService
{
    @Override
    public List<SysStudent> queryList(SysStudent sysStudent)
    {
        // 注意：mybatis-plus lambda 模式不支持 eclipse 的编译器
        // LambdaQueryWrapper<SysStudent> queryWrapper = Wrappers.lambdaQuery();
        // queryWrapper.eq(SysStudent::getStudentName, sysStudent.getStudentName());
        QueryWrapper<SysStudent> queryWrapper = Wrappers.query();
        if (StringUtils.isNotEmpty(sysStudent.getStudentName()))
        {
            queryWrapper.eq("student_name", sysStudent.getStudentName());
        }
        if (StringUtils.isNotNull(sysStudent.getStudentAge()))
        {
            queryWrapper.eq("student_age", sysStudent.getStudentAge());
        }
        if (StringUtils.isNotEmpty(sysStudent.getStudentHobby()))
        {
            queryWrapper.eq("student_hobby", sysStudent.getStudentHobby());
        }
        return this.list(queryWrapper);
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42

新增 **ruoyi-ui\src\views\system\student\index.vue**

```
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生名称" prop="studentName">
        <el-input
          v-model="queryParams.studentName"
          placeholder="请输入学生名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="studentAge">
        <el-input
          v-model="queryParams.studentAge"
          placeholder="请输入年龄"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="爱好" prop="studentHobby">
        <el-input
          v-model="queryParams.studentHobby"
          placeholder="请输入爱好"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="studentSex">
        <el-select v-model="queryParams.studentSex" placeholder="请选择性别" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="studentStatus">
        <el-select v-model="queryParams.studentStatus" placeholder="请选择状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日" prop="studentBirthday">
        <el-date-picker clearable size="small"
          v-model="queryParams.studentBirthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生日">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:student:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:student:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:student:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:student:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="studentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="studentId" />
      <el-table-column label="学生名称" align="center" prop="studentName" />
      <el-table-column label="年龄" align="center" prop="studentAge" />
      <el-table-column label="爱好" align="center" prop="studentHobby" />
      <el-table-column label="性别" align="center" prop="studentSex" />
      <el-table-column label="状态" align="center" prop="studentStatus" />
      <el-table-column label="生日" align="center" prop="studentBirthday" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.studentBirthday, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:student:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:student:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改学生信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学生名称" prop="studentName">
          <el-input v-model="form.studentName" placeholder="请输入学生名称" />
        </el-form-item>
        <el-form-item label="年龄" prop="studentAge">
          <el-input v-model="form.studentAge" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="爱好" prop="studentHobby">
          <el-input v-model="form.studentHobby" placeholder="请输入爱好" />
        </el-form-item>
        <el-form-item label="性别" prop="studentSex">
          <el-select v-model="form.studentSex" placeholder="请选择性别">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.studentStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="studentBirthday">
          <el-date-picker clearable size="small"
            v-model="form.studentBirthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生日">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listStudent, getStudent, delStudent, addStudent, updateStudent, exportStudent } from "@/api/system/student";

export default {
  name: "Student",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 学生信息表格数据
      studentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentName: null,
        studentAge: null,
        studentHobby: null,
        studentSex: null,
        studentStatus: null,
        studentBirthday: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询学生信息列表 */
    getList() {
      this.loading = true;
      listStudent(this.queryParams).then(response => {
        this.studentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        studentId: null,
        studentName: null,
        studentAge: null,
        studentHobby: null,
        studentSex: null,
        studentStatus: "0",
        studentBirthday: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.studentId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加学生信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const studentId = row.studentId || this.ids
      getStudent(studentId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改学生信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.studentId != null) {
            updateStudent(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStudent(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const studentIds = row.studentId || this.ids;
      this.$confirm('是否确认删除学生信息编号为"' + studentIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStudent(studentIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有学生信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportStudent(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139\
140\
141\
142\
143\
144\
145\
146\
147\
148\
149\
150\
151\
152\
153\
154\
155\
156\
157\
158\
159\
160\
161\
162\
163\
164\
165\
166\
167\
168\
169\
170\
171\
172\
173\
174\
175\
176\
177\
178\
179\
180\
181\
182\
183\
184\
185\
186\
187\
188\
189\
190\
191\
192\
193\
194\
195\
196\
197\
198\
199\
200\
201\
202\
203\
204\
205\
206\
207\
208\
209\
210\
211\
212\
213\
214\
215\
216\
217\
218\
219\
220\
221\
222\
223\
224\
225\
226\
227\
228\
229\
230\
231\
232\
233\
234\
235\
236\
237\
238\
239\
240\
241\
242\
243\
244\
245\
246\
247\
248\
249\
250\
251\
252\
253\
254\
255\
256\
257\
258\
259\
260\
261\
262\
263\
264\
265\
266\
267\
268\
269\
270\
271\
272\
273\
274\
275\
276\
277\
278\
279\
280\
281\
282\
283\
284\
285\
286\
287\
288\
289\
290\
291\
292\
293\
294\
295\
296\
297\
298\
299\
300\
301\
302\
303\
304\
305\
306\
307\
308\
309\
310\
311\
312\
313\
314\
315\
316\
317\
318\
319\
320\
321\
322\
323\
324\
325\
326\
327\
328\
329\
330\
331\
332\
333\
334\
335\
336\
337\
338

新增 **ruoyi-ui\src\api\system\student.js**

```
import request from '@/utils/request'

// 查询学生信息列表
export function listStudent(query) {
  return request({
    url: '/system/student/list',
    method: 'get',
    params: query
  })
}

// 查询学生信息详细
export function getStudent(studentId) {
  return request({
    url: '/system/student/' + studentId,
    method: 'get'
  })
}

// 新增学生信息
export function addStudent(data) {
  return request({
    url: '/system/student',
    method: 'post',
    data: data
  })
}

// 修改学生信息
export function updateStudent(data) {
  return request({
    url: '/system/student',
    method: 'put',
    data: data
  })
}

// 删除学生信息
export function delStudent(studentId) {
  return request({
    url: '/system/student/' + studentId,
    method: 'delete'
  })
}

// 导出学生信息
export function exportStudent(query) {
  return request({
    url: '/system/student/export',
    method: 'get',
    params: query
  })
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53

6、登录系统测试学生菜单增删改查功能。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90easyexcel%E5%AE%9E%E7%8E%B0excel%E8%A1%A8%E6%A0%BC%E5%A2%9E%E5%BC%BA) 集成easyexcel实现excel表格增强

如果默认的`excel`注解已经满足不了你的需求，可以使用`excel`的增强解决方案`easyexcel`，它是阿里巴巴开源的一个`excel`处理框架，使用简单、功能特性多、以节省内存著称。

1、`ruoyi-common\pom.xml`模块添加整合依赖

```
<!-- easyexcel -->
<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>easyexcel</artifactId>
	<version>2.2.6</version>
</dependency>
```

1\
2\
3\
4\
5\
6

2、`ExcelUtil.java`新增`easyexcel`导出导入方法

```
import com.alibaba.excel.EasyExcel;

/**
 * 对excel表单默认第一个索引名转换成list（EasyExcel）
 * 
 * @param is 输入流
 * @return 转换后集合
 */
public List<T> importEasyExcel(InputStream is) throws Exception
{
	return EasyExcel.read(is).head(clazz).sheet().doReadSync();
}

/**
 * 对list数据源将其里面的数据导入到excel表单（EasyExcel）
 * 
 * @param list 导出数据集合
 * @param sheetName 工作表的名称
 * @return 结果
 */
public void exportEasyExcel(HttpServletResponse response, List<T> list, String sheetName)
{
	try
	{
		EasyExcel.write(response.getOutputStream(), clazz).sheet(sheetName).doWrite(list);
	}
	catch (IOException e)
	{
		log.error("导出EasyExcel异常{}", e.getMessage());
	}
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31

3、模拟测试，以操作日志为例，修改相关类。

**SysOperlogController.java**改为`exportEasyExcel`

```
@Log(title = "操作日志", businessType = BusinessType.EXPORT)
@PreAuthorize("@ss.hasPermi('monitor:operlog:export')")
@PostMapping("/export")
public void export(HttpServletResponse response, SysOperLog operLog)
{
	List<SysOperLog> list = operLogService.selectOperLogList(operLog);
	ExcelUtil<SysOperLog> util = new ExcelUtil<SysOperLog>(SysOperLog.class);
	util.exportEasyExcel(response, list, "操作日志");
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9

**SysOperLog.java**修改为`@ExcelProperty`注解

```
package com.ruoyi.system.domain;

import java.util.Date;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.alibaba.excel.annotation.ExcelIgnoreUnannotated;
import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.format.DateTimeFormat;
import com.alibaba.excel.annotation.write.style.ColumnWidth;
import com.alibaba.excel.annotation.write.style.HeadFontStyle;
import com.alibaba.excel.annotation.write.style.HeadRowHeight;
import com.ruoyi.common.core.domain.BaseEntity;
import com.ruoyi.system.domain.read.BusiTypeStringNumberConverter;
import com.ruoyi.system.domain.read.OperTypeConverter;
import com.ruoyi.system.domain.read.StatusConverter;

/**
 * 操作日志记录表 oper_log
 * 
 * @author ruoyi
 */
@ExcelIgnoreUnannotated
@ColumnWidth(16)
@HeadRowHeight(14)
@HeadFontStyle(fontHeightInPoints = 11)
public class SysOperLog extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 日志主键 */
    @ExcelProperty(value = "操作序号")
    private Long operId;

    /** 操作模块 */
    @ExcelProperty(value = "操作模块")
    private String title;

    /** 业务类型（0其它 1新增 2修改 3删除） */
    @ExcelProperty(value = "业务类型", converter = BusiTypeStringNumberConverter.class)
    private Integer businessType;

    /** 业务类型数组 */
    private Integer[] businessTypes;

    /** 请求方法 */
    @ExcelProperty(value = "请求方法")
    private String method;

    /** 请求方式 */
    @ExcelProperty(value = "请求方式")
    private String requestMethod;

    /** 操作类别（0其它 1后台用户 2手机端用户） */
    @ExcelProperty(value = "操作类别", converter = OperTypeConverter.class)
    private Integer operatorType;

    /** 操作人员 */
    @ExcelProperty(value = "操作人员")
    private String operName;

    /** 部门名称 */
    @ExcelProperty(value = "部门名称")
    private String deptName;

    /** 请求url */
    @ExcelProperty(value = "请求地址")
    private String operUrl;

    /** 操作地址 */
    @ExcelProperty(value = "操作地址")
    private String operIp;

    /** 操作地点 */
    @ExcelProperty(value = "操作地点")
    private String operLocation;

    /** 请求参数 */
    @ExcelProperty(value = "请求参数")
    private String operParam;

    /** 返回参数 */
    @ExcelProperty(value = "返回参数")
    private String jsonResult;

    /** 操作状态（0正常 1异常） */
    @ExcelProperty(value = "状态", converter = StatusConverter.class)
    private Integer status;

    /** 错误消息 */
    @ExcelProperty(value = "错误消息")
    private String errorMsg;

    /** 操作时间 */
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    @ExcelProperty(value = "操作时间")
    private Date operTime;

    public Long getOperId()
    {
        return operId;
    }

    public void setOperId(Long operId)
    {
        this.operId = operId;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public Integer getBusinessType()
    {
        return businessType;
    }

    public void setBusinessType(Integer businessType)
    {
        this.businessType = businessType;
    }

    public Integer[] getBusinessTypes()
    {
        return businessTypes;
    }

    public void setBusinessTypes(Integer[] businessTypes)
    {
        this.businessTypes = businessTypes;
    }

    public String getMethod()
    {
        return method;
    }

    public void setMethod(String method)
    {
        this.method = method;
    }

    public String getRequestMethod()
    {
        return requestMethod;
    }

    public void setRequestMethod(String requestMethod)
    {
        this.requestMethod = requestMethod;
    }

    public Integer getOperatorType()
    {
        return operatorType;
    }

    public void setOperatorType(Integer operatorType)
    {
        this.operatorType = operatorType;
    }

    public String getOperName()
    {
        return operName;
    }

    public void setOperName(String operName)
    {
        this.operName = operName;
    }

    public String getDeptName()
    {
        return deptName;
    }

    public void setDeptName(String deptName)
    {
        this.deptName = deptName;
    }

    public String getOperUrl()
    {
        return operUrl;
    }

    public void setOperUrl(String operUrl)
    {
        this.operUrl = operUrl;
    }

    public String getOperIp()
    {
        return operIp;
    }

    public void setOperIp(String operIp)
    {
        this.operIp = operIp;
    }

    public String getOperLocation()
    {
        return operLocation;
    }

    public void setOperLocation(String operLocation)
    {
        this.operLocation = operLocation;
    }

    public String getOperParam()
    {
        return operParam;
    }

    public void setOperParam(String operParam)
    {
        this.operParam = operParam;
    }

    public String getJsonResult()
    {
        return jsonResult;
    }

    public void setJsonResult(String jsonResult)
    {
        this.jsonResult = jsonResult;
    }

    public Integer getStatus()
    {
        return status;
    }

    public void setStatus(Integer status)
    {
        this.status = status;
    }

    public String getErrorMsg()
    {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg)
    {
        this.errorMsg = errorMsg;
    }

    public Date getOperTime()
    {
        return operTime;
    }

    public void setOperTime(Date operTime)
    {
        this.operTime = operTime;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("operId", getOperId())
            .append("title", getTitle())
            .append("businessType", getBusinessType())
            .append("businessTypes", getBusinessTypes())
            .append("method", getMethod())
            .append("requestMethod", getRequestMethod())
            .append("operatorType", getOperatorType())
            .append("operName", getOperName())
            .append("deptName", getDeptName())
            .append("operUrl", getOperUrl())
            .append("operIp", getOperIp())
            .append("operLocation", getOperLocation())
            .append("operParam", getOperParam())
            .append("status", getStatus())
            .append("errorMsg", getErrorMsg())
            .append("operTime", getOperTime())
            .toString();
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139\
140\
141\
142\
143\
144\
145\
146\
147\
148\
149\
150\
151\
152\
153\
154\
155\
156\
157\
158\
159\
160\
161\
162\
163\
164\
165\
166\
167\
168\
169\
170\
171\
172\
173\
174\
175\
176\
177\
178\
179\
180\
181\
182\
183\
184\
185\
186\
187\
188\
189\
190\
191\
192\
193\
194\
195\
196\
197\
198\
199\
200\
201\
202\
203\
204\
205\
206\
207\
208\
209\
210\
211\
212\
213\
214\
215\
216\
217\
218\
219\
220\
221\
222\
223\
224\
225\
226\
227\
228\
229\
230\
231\
232\
233\
234\
235\
236\
237\
238\
239\
240\
241\
242\
243\
244\
245\
246\
247\
248\
249\
250\
251\
252\
253\
254\
255\
256\
257\
258\
259\
260\
261\
262\
263\
264\
265\
266\
267\
268\
269\
270\
271\
272\
273\
274\
275\
276\
277\
278\
279\
280\
281\
282\
283\
284\
285\
286\
287\
288\
289

添加字符串翻译内容

**ruoyi-system\com\ruoyi\system\domain\read\BusiTypeStringNumberConverter.java**

```
package com.ruoyi.system.domain.read;

import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.enums.CellDataTypeEnum;
import com.alibaba.excel.metadata.CellData;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.property.ExcelContentProperty;

/**
 * 业务类型字符串处理
 *
 * @author ruoyi
 */
@SuppressWarnings("rawtypes")
public class BusiTypeStringNumberConverter implements Converter<Integer>
{
    @Override
    public Class supportJavaTypeKey()
    {
        return Integer.class;
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey()
    {
        return CellDataTypeEnum.STRING;
    }

    @Override
    public Integer convertToJavaData(CellData cellData, ExcelContentProperty contentProperty,
            GlobalConfiguration globalConfiguration)
    {
        Integer value = 0;
        String str = cellData.getStringValue();
        if ("新增".equals(str))
        {
            value = 1;
        }
        else if ("修改".equals(str))
        {
            value = 2;
        }
        else if ("删除".equals(str))
        {
            value = 3;
        }
        else if ("授权".equals(str))
        {
            value = 4;
        }
        else if ("导出".equals(str))
        {
            value = 5;
        }
        else if ("导入".equals(str))
        {
            value = 6;
        }
        else if ("强退".equals(str))
        {
            value = 7;
        }
        else if ("生成代码".equals(str))
        {
            value = 8;
        }
        else if ("清空数据".equals(str))
        {
            value = 9;
        }
        return value;
    }

    @Override
    public CellData convertToExcelData(Integer value, ExcelContentProperty contentProperty,
            GlobalConfiguration globalConfiguration)
    {
        String str = "其他";
        if (1 == value)
        {
            str = "新增";
        }
        else if (2 == value)
        {
            str = "修改";
        }
        else if (3 == value)
        {
            str = "删除";
        }
        else if (4 == value)
        {
            str = "授权";
        }
        else if (5 == value)
        {
            str = "导出";
        }
        else if (6 == value)
        {
            str = "导入";
        }
        else if (7 == value)
        {
            str = "强退";
        }
        else if (8 == value)
        {
            str = "生成代码";
        }
        else if (9 == value)
        {
            str = "清空数据";
        }
        return new CellData(str);
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117

**ruoyi-system\com\ruoyi\system\domain\read\OperTypeConverter.java**

```
package com.ruoyi.system.domain.read;

import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.enums.CellDataTypeEnum;
import com.alibaba.excel.metadata.CellData;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.property.ExcelContentProperty;

/**
 * 操作类别字符串处理
 *
 * @author ruoyi
 */
@SuppressWarnings("rawtypes")
public class OperTypeConverter implements Converter<Integer>
{
    @Override
    public Class supportJavaTypeKey()
    {
        return Integer.class;
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey()
    {
        return CellDataTypeEnum.STRING;
    }

    @Override
    public Integer convertToJavaData(CellData cellData, ExcelContentProperty contentProperty,
            GlobalConfiguration globalConfiguration)
    {
        Integer value = 0;
        String str = cellData.getStringValue();
        if ("后台用户".equals(str))
        {
            value = 1;
        }
        else if ("手机端用户".equals(str))
        {
            value = 2;
        }
        return value;
    }

    @Override
    public CellData convertToExcelData(Integer value, ExcelContentProperty contentProperty,
            GlobalConfiguration globalConfiguration)
    {
        String str = "其他";
        if (1 == value)
        {
            str = "后台用户";
        }
        else if (2 == value)
        {
            str = "手机端用户";
        }
        return new CellData(str);
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61

**ruoyi-system\com\ruoyi\system\domain\read\StatusConverter.java**

```
package com.ruoyi.system.domain.read;

import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.enums.CellDataTypeEnum;
import com.alibaba.excel.metadata.CellData;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.property.ExcelContentProperty;

/**
 * 状态字符串处理
 *
 * @author ruoyi
 */
@SuppressWarnings("rawtypes")
public class StatusConverter implements Converter<Integer>
{
    @Override
    public Class supportJavaTypeKey()
    {
        return Integer.class;
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey()
    {
        return CellDataTypeEnum.STRING;
    }

    @Override
    public CellData convertToExcelData(Integer value, ExcelContentProperty contentProperty,
            GlobalConfiguration globalConfiguration)
    {
        return new CellData(0 == value ? "正常" : "异常");
    }

    @Override
    public Integer convertToJavaData(CellData cellData, ExcelContentProperty contentProperty,
            GlobalConfiguration globalConfiguration) throws Exception
    {
        return "正常".equals(cellData.getStringValue()) ? 0 : 1;
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42

4、登录系统，进入系统管理-日志管理-操作日志-执行导出功能

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90knife4j%E5%AE%9E%E7%8E%B0swagger%E6%96%87%E6%A1%A3%E5%A2%9E%E5%BC%BA) 集成knife4j实现swagger文档增强

如果不习惯使用`swagger`可以使用`前端UI`的增强解决方案`knife4j`，对比`swagger`相比有以下优势，友好界面，离线文档，接口排序，安全控制，在线调试，文档清晰，注解增强，容易上手。

1、`ruoyi-admin\pom.xml`模块添加整合依赖

ruoyi-springboot2/swagger版本 用knife4j-spring-boot-starter依赖

```
<!-- ruoyi-springboot2 / swagger knife4j 配置 -->
<dependency>
	<groupId>com.github.xiaoymin</groupId>
	<artifactId>knife4j-spring-boot-starter</artifactId>
	<version>3.0.3</version>
</dependency>
```

1\
2\
3\
4\
5\
6

ruoyi-springboot3/springdoc版本 用knife4j-openapi3-jakarta-spring-boot-starter依赖

```
<!-- ruoyi-springboot3 / springdoc knife4j 配置 -->
<dependency>
	<groupId>com.github.xiaoymin</groupId>
	<artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
	<version>4.4.0</version>
</dependency>
```

1\
2\
3\
4\
5\
6

`knife4j`简单配置

```
knife4j:
  enable: true
  production: false
  basic:
    enable: false
    username: ruoyi
    password: 123456
  setting:
    swagger-model-name: 实体类列表
```

1\
2\
3\
4\
5\
6\
7\
8\
9

配置静态资源`/webjars/**, /doc.html`匿名访问

```
.requestMatchers("/webjars/**", "/doc.html").permitAll()
```

1

2、修改`ry-ui\views\tool\swagger\index.vue`跳转地址

```
src: process.env.VUE_APP_BASE_API + "/doc.html",
```

1

3、登录系统，访问菜单系统工具/系统接口，出现如下图表示成功。

![knife4j](https://foruda.gitee.com/images/1688696549616838031/e93b634f_1151004.png)

提示

引用`knife4j-spring-boot-starter`依赖，项目中的`swagger`依赖可以删除。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90redisson%E5%AE%9E%E7%8E%B0redis%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81) 集成redisson实现redis分布式锁

`Redisson`是`Redis`官方推荐的`Java`版的`Redis`客户端。它提供的功能非常多，也非常强大，此处我们只用它的分布式锁功能。

1、引入依赖

```
<!-- Redisson 锁功能 -->
<dependency>
	<groupId>org.redisson</groupId>
	<artifactId>redisson-spring-boot-starter</artifactId>
	<version>3.16.2</version>
</dependency>
```

1\
2\
3\
4\
5\
6

2、添加工具类`RedisLock.java`

```
package com.ruoyi.common.core.redis;

import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.concurrent.TimeUnit;

/**
 * redis锁工具类
 *
 * @author ruoyi
 */
@Component
public class RedisLock
{
    @Autowired
    private RedissonClient redissonClient;

    /**
     * 获取锁
     *
     * @param lockKey 锁实例key
     * @return 锁信息
     */
    public RLock getRLock(String lockKey)
    {
        return redissonClient.getLock(lockKey);
    }

    /**
     * 加锁
     * 
     * @param lockKey 锁实例key
     * @return 锁信息
     */
    public RLock lock(String lockKey)
    {
        RLock lock = getRLock(lockKey);
        lock.lock();
        return lock;
    }

    /**
     * 加锁
     * 
     * @param lockKey 锁实例key
     * @param leaseTime 上锁后自动释放锁时间
     * @return true=成功；false=失败
     */
    public Boolean tryLock(String lockKey, long leaseTime)
    {
        return tryLock(lockKey, 0, leaseTime, TimeUnit.SECONDS);
    }

    /**
     * 加锁
     * 
     * @param lockKey 锁实例key
     * @param leaseTime 上锁后自动释放锁时间
     * @param unit 时间颗粒度
     * @return true=加锁成功；false=加锁失败
     */
    public Boolean tryLock(String lockKey, long leaseTime, TimeUnit unit)
    {
        return tryLock(lockKey, 0, leaseTime, unit);
    }

    /**
     * 加锁
     * 
     * @param lockKey 锁实例key
     * @param waitTime 最多等待时间
     * @param leaseTime 上锁后自动释放锁时间
     * @param unit 时间颗粒度
     * @return true=加锁成功；false=加锁失败
     */
    public Boolean tryLock(String lockKey, long waitTime, long leaseTime, TimeUnit unit)
    {
        RLock rLock = getRLock(lockKey);
        boolean tryLock = false;
        try
        {
            tryLock = rLock.tryLock(waitTime, leaseTime, unit);
        }
        catch (InterruptedException e)
        {
            return false;
        }
        return tryLock;
    }

    /**
     * 释放锁
     * 
     * @param lockKey 锁实例key
     */
    public void unlock(String lockKey)
    {
        RLock lock = getRLock(lockKey);
        lock.unlock();
    }

    /**
     * 释放锁
     * 
     * @param lock 锁信息
     */
    public void unlock(RLock lock)
    {
        lock.unlock();
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113

3、新增配置`RedissonConfig.java`

```
package com.ruoyi.framework.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * redisson配置
 * 
 * @author ruoyi
 */
@Configuration
public class RedissonConfig
{
    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private String port;

    @Value("${spring.redis.password}")
    private String password;

    @Bean(destroyMethod = "shutdown")
    @ConditionalOnMissingBean(RedissonClient.class)
    public RedissonClient redissonClient()
    {
        Config config = new Config();
        config.useSingleServer().setAddress("redis://" + host + ":" + port); // 更多.set
        return Redisson.create(config);
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36

4、使用方式

```
@Autowired
private RedisLock redisLock;

// lockKey 锁实例key waitTime 最多等待时间 leaseTime 上锁后自动释放锁时间  unit 时间颗粒度
redisLock.lock(lockKey);
redisLock.tryLock(lockKey, leaseTime);
redisLock.tryLock(lockKey, leaseTime, unit);
redisLock.tryLock(lockKey, waitTime, leaseTime, unit);
redisLock.unlock(lockKey);
redisLock.unlock(lock);
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90ip2region%E5%AE%9E%E7%8E%B0%E7%A6%BB%E7%BA%BFip%E5%9C%B0%E5%9D%80%E5%AE%9A%E4%BD%8D) 集成ip2region实现离线IP地址定位

离线IP地址定位库主要用于内网或想减少对外访问`http`带来的资源消耗。`（代码已兼容支持jar包部署）`

1、引入依赖

```
<!-- 离线IP地址定位库 -->
<dependency>
	<groupId>org.lionsoul</groupId>
	<artifactId>ip2region</artifactId>
	<version>1.7.2</version>
</dependency>
```

1\
2\
3\
4\
5\
6

2、添加工具类`RegionUtil.java`

```
package com.ruoyi.common.utils;

import java.io.File;
import java.io.InputStream;
import java.lang.reflect.Method;
import org.apache.commons.io.FileUtils;
import org.lionsoul.ip2region.DataBlock;
import org.lionsoul.ip2region.DbConfig;
import org.lionsoul.ip2region.DbSearcher;
import org.lionsoul.ip2region.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

/**
 * 根据ip离线查询地址
 *
 * @author ruoyi
 */
public class RegionUtil
{
    private static final Logger log = LoggerFactory.getLogger(RegionUtil.class);

    private static final String JAVA_TEMP_DIR = "java.io.tmpdir";

    static DbConfig config = null;
    static DbSearcher searcher = null;

    /**
     * 初始化IP库
     */
    static
    {
        try
        {
            // 因为jar无法读取文件,复制创建临时文件
            String dbPath = RegionUtil.class.getResource("/ip2region/ip2region.db").getPath();
            File file = new File(dbPath);
            if (!file.exists())
            {
                String tmpDir = System.getProperties().getProperty(JAVA_TEMP_DIR);
                dbPath = tmpDir + "ip2region.db";
                file = new File(dbPath);
                ClassPathResource cpr = new ClassPathResource("ip2region" + File.separator + "ip2region.db");
                InputStream resourceAsStream = cpr.getInputStream();
                if (resourceAsStream != null)
                {
                    FileUtils.copyInputStreamToFile(resourceAsStream, file);
                }
            }
            config = new DbConfig();
            searcher = new DbSearcher(config, dbPath);
            log.info("bean [{}]", config);
            log.info("bean [{}]", searcher);
        }
        catch (Exception e)
        {
            log.error("init ip region error:{}", e);
        }
    }

    /**
     * 解析IP
     *
     * @param ip
     * @return
     */
    public static String getRegion(String ip)
    {
        try
        {
            // db
            if (searcher == null || StringUtils.isEmpty(ip))
            {
                log.error("DbSearcher is null");
                return StringUtils.EMPTY;
            }
            long startTime = System.currentTimeMillis();
            // 查询算法
            int algorithm = DbSearcher.MEMORY_ALGORITYM;
            Method method = null;
            switch (algorithm)
            {
                case DbSearcher.BTREE_ALGORITHM:
                    method = searcher.getClass().getMethod("btreeSearch", String.class);
                    break;
                case DbSearcher.BINARY_ALGORITHM:
                    method = searcher.getClass().getMethod("binarySearch", String.class);
                    break;
                case DbSearcher.MEMORY_ALGORITYM:
                    method = searcher.getClass().getMethod("memorySearch", String.class);
                    break;
            }

            DataBlock dataBlock = null;
            if (Util.isIpAddress(ip) == false)
            {
                log.warn("warning: Invalid ip address");
            }
            dataBlock = (DataBlock) method.invoke(searcher, ip);
            String result = dataBlock.getRegion();
            long endTime = System.currentTimeMillis();
            log.debug("region use time[{}] result[{}]", endTime - startTime, result);
            return result;

        }
        catch (Exception e)
        {
            log.error("error:{}", e);
        }
        return StringUtils.EMPTY;
    }

}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114

3、修改`AddressUtils.java`

```
package com.ruoyi.common.utils.ip;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ruoyi.common.config.RuoYiConfig;
import com.ruoyi.common.utils.RegionUtil;
import com.ruoyi.common.utils.StringUtils;

/**
 * 获取地址类
 * 
 * @author ruoyi
 */
public class AddressUtils
{
    private static final Logger log = LoggerFactory.getLogger(AddressUtils.class);

    // 未知地址
    public static final String UNKNOWN = "XX XX";

    public static String getRealAddressByIP(String ip)
    {
        String address = UNKNOWN;
        // 内网不查询
        if (IpUtils.internalIp(ip))
        {
            return "内网IP";
        }
        if (RuoYiConfig.isAddressEnabled())
        {
            try
            {
                String rspStr = RegionUtil.getRegion(ip);
                if (StringUtils.isEmpty(rspStr))
                {
                    log.error("获取地理位置异常 {}", ip);
                    return UNKNOWN;
                }
                String[] obj = rspStr.split("\\|");
                String region = obj[2];
                String city = obj[3];

                return String.format("%s %s", region, city);
            }
            catch (Exception e)
            {
                log.error("获取地理位置异常 {}", e);
            }
        }
        return address;
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52

4、添加离线IP地址库插件

下载前端插件相关包和代码实现`ruoyi/集成ip2region离线地址定位.zip`

链接: https\://pan.baidu.com/s/1y1g8NkelRT\_pS0fIbmyP8g 提取码: mjs7

5、添加离线IP地址库

在`src/main/resources`下新建`ip2region`复制文件`ip2region.db`到目录下。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90jsencrypt%E5%AE%9E%E7%8E%B0%E5%AF%86%E7%A0%81%E5%8A%A0%E5%AF%86%E4%BC%A0%E8%BE%93%E6%96%B9%E5%BC%8F) 集成jsencrypt实现密码加密传输方式

目前登录接口密码是明文传输，如果安全性有要求，可以调整成加密方式传输。参考如下

1、修改前端`login.js`对密码进行`rsa`加密。

```
import { encrypt } from '@/utils/jsencrypt'

export function login(username, password, code, uuid) {
  password = encrypt(password);
  .........
}
```

1\
2\
3\
4\
5\
6

2、工具类`sign`包下添加`RsaUtils.java`，用于`RSA`加密解密。

```
package com.ruoyi.common.utils.sign;

import org.apache.commons.codec.binary.Base64;
import javax.crypto.Cipher;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

/**
 * RSA加密解密
 * 
 * @author ruoyi
 **/
public class RsaUtils
{
    // Rsa 私钥
    public static String privateKey = "MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY"
            + "7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN"
            + "PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA"
            + "kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow"
            + "cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv"
            + "DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh"
            + "YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3" 
            + "UP8iWi1Qw0Y=";

    /**
     * 私钥解密
     *
     * @param privateKeyString 私钥
     * @param text 待解密的文本
     * @return 解密后的文本
     */
    public static String decryptByPrivateKey(String text) throws Exception
    {
        return decryptByPrivateKey(privateKey, text);
    }

    /**
     * 公钥解密
     *
     * @param publicKeyString 公钥
     * @param text 待解密的信息
     * @return 解密后的文本
     */
    public static String decryptByPublicKey(String publicKeyString, String text) throws Exception
    {
        X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(Base64.decodeBase64(publicKeyString));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] result = cipher.doFinal(Base64.decodeBase64(text));
        return new String(result);
    }

    /**
     * 私钥加密
     *
     * @param privateKeyString 私钥
     * @param text 待加密的信息
     * @return 加密后的文本
     */
    public static String encryptByPrivateKey(String privateKeyString, String text) throws Exception
    {
        PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKeyString));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        byte[] result = cipher.doFinal(text.getBytes());
        return Base64.encodeBase64String(result);
    }

    /**
     * 私钥解密
     *
     * @param privateKeyString 私钥
     * @param text 待解密的文本
     * @return 解密后的文本
     */
    public static String decryptByPrivateKey(String privateKeyString, String text) throws Exception
    {
        PKCS8EncodedKeySpec pkcs8EncodedKeySpec5 = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKeyString));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec5);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] result = cipher.doFinal(Base64.decodeBase64(text));
        return new String(result);
    }

    /**
     * 公钥加密
     *
     * @param publicKeyString 公钥
     * @param text 待加密的文本
     * @return 加密后的文本
     */
    public static String encryptByPublicKey(String publicKeyString, String text) throws Exception
    {
        X509EncodedKeySpec x509EncodedKeySpec2 = new X509EncodedKeySpec(Base64.decodeBase64(publicKeyString));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec2);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] result = cipher.doFinal(text.getBytes());
        return Base64.encodeBase64String(result);
    }

    /**
     * 构建RSA密钥对
     *
     * @return 生成后的公私钥信息
     */
    public static RsaKeyPair generateKeyPair() throws NoSuchAlgorithmException
    {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(1024);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyPair.getPrivate();
        String publicKeyString = Base64.encodeBase64String(rsaPublicKey.getEncoded());
        String privateKeyString = Base64.encodeBase64String(rsaPrivateKey.getEncoded());
        return new RsaKeyPair(publicKeyString, privateKeyString);
    }

    /**
     * RSA密钥对对象
     */
    public static class RsaKeyPair
    {
        private final String publicKey;
        private final String privateKey;

        public RsaKeyPair(String publicKey, String privateKey)
        {
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }

        public String getPublicKey()
        {
            return publicKey;
        }

        public String getPrivateKey()
        {
            return privateKey;
        }
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139\
140\
141\
142\
143\
144\
145\
146\
147\
148\
149\
150\
151\
152\
153

3、登录方法`SysLoginController.java`，对密码进行`rsa`解密。

```
// 关键代码 RsaUtils.decryptByPrivateKey(password)
@PostMapping("/login")
public AjaxResult login(@RequestBody LoginBody loginBody)
{
	AjaxResult ajax = AjaxResult.success();
	// 生成令牌
	String token = loginService.login(loginBody.getUsername(),
			RsaUtils.decryptByPrivateKey(loginBody.getPassword()), loginBody.getCode(), loginBody.getUuid());
	ajax.put(Constants.TOKEN, token);
	return ajax;
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

访问 [http://localhost/login (opens new window)](http://localhost/login) 登录页面。提交时检查密码是否为加密传输，且后台也能正常解密。

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90httpclient%E5%AE%9E%E7%8E%B0http%E6%8E%A5%E5%8F%A3%E5%A2%9E%E5%BC%BA) 集成httpclient实现http接口增强

[参考集成httpclient实现http接口增强](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90httpclient%E5%AE%9E%E7%8E%B0http%E6%8E%A5%E5%8F%A3%E5%A2%9E%E5%BC%BA)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90druid%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%86%E7%A0%81%E5%8A%A0%E5%AF%86%E5%8A%9F%E8%83%BD) 集成druid实现数据库密码加密功能

[参考集成druid实现数据库密码加密功能](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90druid%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%86%E7%A0%81%E5%8A%A0%E5%AF%86%E5%8A%9F%E8%83%BD)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90browscap%E8%AF%BB%E5%8F%96%E6%B5%8F%E8%A7%88%E5%99%A8%E7%94%A8%E6%88%B7%E4%BB%A3%E7%90%86) 集成browscap读取浏览器用户代理

[参考集成browscap读取浏览器用户代理](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90browscap%E8%AF%BB%E5%8F%96%E6%B5%8F%E8%A7%88%E5%99%A8%E7%94%A8%E6%88%B7%E4%BB%A3%E7%90%86)

## [#](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90dynamic-datasource%E5%AE%9E%E7%8E%B0%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90%E5%A2%9E%E5%BC%BA) 集成dynamic-datasource实现多数据源增强

[参考集成dynamic-datasource实现多数据源增强](https://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90dynamic-datasource%E5%AE%9E%E7%8E%B0%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90%E5%A2%9E%E5%BC%BA)

---

## 项目扩展 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/document/xmkz.html

RuoYi-Vue-SpringBoot3 RuoYi-Vue的SpringBoot3版本 https\://gitee.com/y\_project/RuoYi-Vue/tree/springboot3 RuoYi-Vue3 RuoYi-Vue的前端（Vue3 Element Plus Vite）版本 https\://gitcode.com/yangzongzhuan/RuoYi-Vue3 RuoYi-Vue3-TypeScript RuoYi-Vue3的TypeScript版本 https\://gitcode.com/yangzongzhuan/RuoYi-Vue3/tree/typescript RuoYi-App RuoYi-Vue的移动端版本 https\://gitee.com/y\_project/RuoYi-App RuoYi-Vue-fast RuoYi-Vue单应用版本 https\://gitcode.com/yangzongzhuan/RuoYi-Vue-fast RuoYi-Vue-Oracle RuoYi-Vue的Oracle版本 https\://gitcode.com/yangzongzhuan/RuoYi-Vue-Oracle RuoYi-Vue-Activiti 集成Activiti 6.x工作流版本 https\://gitee.com/smell2/ruoyi-vue-activiti RuoYi-Vue-Process 闲鹿工作流版本 https\://gitee.com/calvinhwang123/RuoYi-Vue-Process RuoYi-Vue-Flowable 集成Flowable 6.x工作流版本 https\://gitee.com/tony2y/RuoYi-flowable RuoYi-Vue-Antdv RuoYi-Vue的纯前端Antdv版本 https\://gitee.com/fuzui/RuoYi-Antdv RuoYi-Vue-Vben RuoYi-Vue的纯前端Vben版本 https\://gitee.com/dapppp/RuoYi-Vben RuoYi-AiDex-Sharp RuoYi-Vue的纯前端Antdv版本，重点进行了UI升级美化等 https\://gitee.com/big-hedgehog/aidex-sharp RuoYi-Vue-Sqlserver RuoYi-Vue的Sqlserver版本，集成CAS、P6spy等 https\://gitee.com/MaShangYouLi/RuoYi-Vue-SQLServer-C RuoYi-Vue-Sqlserver RuoYi-Vue的Sqlserver版本 https\://gitee.com/wpp011/RuoYi-Vue-SQLServer RuoYi-Vue-Sqlserver RuoYi-Vue的Sqlserver版本 https\://gitee.com/Sxile/RuoYi-Vue-Sqlserver RuoYi-Vue-NET RuoYi-Vue的.NET版本 https\://gitee.com/wdyday/RuoYi.Net RuoYi-Vue-NET RuoYi-Vue的.NET5版本 https\://gitee.com/izory/ZrAdminNetCore RuoYi-Vue3-NET RuoYi-Vue3的.NET6版本 https\://gitee.com/ccnetcore/yi RuoYi-Vue3-NET RuoYi-Vue3的.NET版本 https\://gitee.com/mrwangRefreshing/IM.Easy RuoYi-Vue-Nest RuoYi-Vue的nestjs版本 https\://github.com/q986171791/RuoYi-Nest RuoYi-Vue-nestjs RuoYi-Vue的nestjs版本 https\://gitee.com/tao-zhi/nest-admin RuoYi-Vue-Eggjs RuoYi-Vue的Eggjs版本 https\://github.com/undsky/RuoYi-Eggjs RuoYi-Vue-prisma RuoYi-Vue的prisma版本 https\://github.com/87789771/meimei-nestjs-admin RuoYi-Vue-Nodejs RuoYi-Vue的Nodejs版本，使用Midway框架，TypeORM等 https\://gitee.com/ruirui-study/ruoyi\_nodejs\_open RuoYi-Vue-Angular RuoYi-Vue的Angular版本，使用ng-zorro组件库 https\://gitee.com/littleccmx/ruoyi-angular RuoYi-Vue-React RuoYi-Vue的React版本 https\://gitee.com/whiteshader/ruoyi-react RuoYi-Vue-React RuoYi-Vue的React版本 https\://github.com/oakhole/RuoYi-React RuoYi-Nest-React RuoYi-Vue的nestjs版本，前端使用React https\://github.com/PanamaHat123/Ruoyi-Nest-React RuoYi-Vue-FastAPI RuoYi-Vue的FastAPI版本 https\://gitee.com/insistence2022/RuoYi-Vue-FastAPI RuoYi-Vue3-FastAPI RuoYi-Vue3的FastAPI版本 https\://gitee.com/insistence2022/RuoYi-Vue3-FastAPI RuoYi-Vue-fastapi RuoYi-Vue的接口统一管理平台 https\://gitee.com/kjwl/fastapi RuoYi-Vue-Rust RuoYi-Vue的Rust版本 https\://github.com/mengyou658/actix\_admin RuoYi-Vue-Rust RuoYi-Vue的Rust版本 https\://gitee.com/wizount/ruoyi-rust RuoYi-Vue-Rust RuoYi-Vue3的Rust版本 https\://gitee.com/witgg2001/rust-ruoyi RuoYi-Vue-Rust RuoYi-Vue3的Rust版本 https\://gitee.com/rustdev/ruoyi-rust RuoYi-Geek-SpringBoot3 集成SpringBoot3、MybatisPlus、支付模块、第三方认证等 https\://gitee.com/geek-xd/ruoyi-geek-springboot3 RuoYi-SpringBoot3-Pro 基于SpringBoot3、三级等保支持、AI、低代码、加密保护等 https\://github.com/undsky/RuoYi-SpringBoot3-Pro RuoYi-Vue-Plus 集成Mybatis-Plus、Hutool、OSS存储、分布式锁等组件 https\://gitee.com/dromara/RuoYi-Vue-Plus RuoYi-Vue-Plus RuoYi-Vue的腾讯开源框架TDesign UI框架 https\://gitee.com/zhangmrit/RuoYi-Vue-Plus RuoYi-heqy-Plus RuoYi-Vue的前端美化、集成大屏、Flowable工作流，持续更新 https\://gitee.com/heqy65552335/ruoyi-plus RuoYi-Vue-TDesign RuoYi-Vue的腾讯开源框架TDesign UI框架 https\://gitee.com/yixiacoco/ruoyi-tdesign RuoYi-Vue-NaiveUI RuoYi-Vue的Naive UI框架，二次封装常用组件 https\://gitee.com/Ginyi/ginyi-spring-vue RuoYi-Vue-lmw RuoYi-Vue的ui美化版本，重点进行前端重构 https\://gitee.com/codelm/ruoyi-vue3-lmw RuoYi-Vue-lmw-ts RuoYi-Vue的ts+ui美化版本，重点进行前端重构 https\://gitee.com/codelm/ruoyi-vue3-lmw-ts RuoYi-Vue-bear RuoYi-Vue的Antdv+Vue3+UI美化版本，表格组件重构 https\://gitee.com/javaxiaobear\_admin/bear-jia-vue3 RuoYi-Vue-AutoEE RuoYi-Vue的Vite、ant-design-vue3版本 https\://gitee.com/Double\_AutoEE/AutoEE RuoYi-Vue-BaiZe RuoYi-Vue的pgsql版本 集成MP、SaToken、MagicApi 对接微信等 https\://gitee.com/chaoscat/BaiZe-Vue-fast RuoYi-Vue-Flex 集成MyBatis-Flex、JDK17、Sa-Token、PowerJob等组件 https\://gitee.com/dataprince/ruoyi-flex RuoYi-Vue-Deepseek 集成dify、ollama实现带有知识库的AI对话等功能 https\://gitee.com/chi-hao0806/deepseek RuoYi-Vue-Deepseek 集成AI模块（Ollama+Deepseek大模型）使用SpringBoot3版本 https\://gitee.com/ouyang-rifeng/ruo-yi-spring-boot3 RuoYi-Vue-UUID 集成Mybatis-Plus、Sa-Token、PowerJob等组件 https\://gitee.com/qibutian/ruoyi-my-batis-plus-uuid RuoYi-Vue-Super 集成Websocket、Flowable、Xdh-Map、可视化开发等组件 https\://gitee.com/rainsuper/RuoYi-Vue-Super RuoYi-Vue-Source 集成Flowable、Websocket、报表、支付等组件的零代码版本 https\://gitee.com/open-source-byte/source-vue RuoYi-Vue-Nocode 集成Activiti7、Mongodb、Form-Making等组件的零代码版本 https\://gitee.com/atlus/ruoyi-vue-nocode RuoYi-Vue-Activiti 集成Activiti7工作流版本、VxeTable、网盘等功能 https\://gitee.com/huacaicaicai/Cauliflower-activiti RuoYi-Vue-AntFlow 集成Activiti、仿钉钉流程审批钉企业级工作流平台 https\://gitee.com/ldhnet/AntFlow-Vue3 RuoYi-Vue-Flowable 基于RuoYi-Vue + flowable 的工作流管理平台 https\://gitee.com/tangwenzhaoaini/RuoYi-Vue-flowable RuoYi-langchain4j 基于RuoYi-Vue + langchain4j实现的AI智能体项目 https\://gitee.com/zjwan461/ruoyi-langchain4j RuoYi-Vue-Plus-Activiti 集成的activiti工作流版本 https\://gitee.com/sgs98/RuoYi-Vue-Plus-Activiti RuoYi-Vue-Plus-Flowable 集成的flowable工作流版本 https\://gitee.com/KonBAI-Q/ruoyi-flowable-plus RuoYi-Vue-Plus-Flowable 集成的flowable工作流版本 https\://gitee.com/nbacheng/ruoyi-nbcio RuoYi-Vue-FlyFlow 集成的flowable类钉钉飞书工作流版本 https\://gitee.com/junyue/flyflow/tree/springboot3-ruoyi RuoYi-Vue-mate 集成的AntFlow钉钉风格低代码工作流版本 https\://gitee.com/ruoyimate/ruoyimate RuoYi-Vue-FlowLong 集成的flowlong工作流、SaToken、mybatisplus-plus等组件 https\://gitee.com/a-crud-boy/boot-java RuoYi-Vue-vuefrom 简搭云与RuoYi的集成版本，支持可视化表单设计、打印、大屏等 https\://gitee.com/liuyaping007/vuefrom1.1.0 RuoYi-JFlow 驰骋工作流引擎与RuoYi的集成版 https\://gitee.com/opencc/RuoYi-JFlow RuoYi-Vue-YuXi 集成Sa-Token、magic-api、Hutool 等组件 https\://gitee.com/histoneUp/yu-xi-admin RuoYi-Vue-Tool 实现低代码功能、页面水印，支持功能号动态建立业务等功能 https\://gitee.com/xinjiangwangwei/ruoyi-tool RuoYi-Vue-LZ 集成Mybatis-Plus、lombok、数据批量插入、优化代码生成等 https\://github.com/SpringSunYY/LZ-RuoYi RuoYi-Vue-S 集成Mybatis-Plus、多租户、动态数据权限、OSS云存储等组件 https\://gitee.com/sunseagear/RuoYi-Vue-S RuoYi-Vue-Dynamic 基于RuoYi-Vue的动态数据源+xml刷新 https\://gitee.com/zheyuan1997/dynamic RuoYi-Vue-Tenant 基于RuoYi-Vue的多租户管理平台 https\://gitee.com/tangwenzhaoaini/ruo-yi-vue-tenant RuoYi-Vue-MultiTenant RuoYi-Vue的多租户版本 https\://gitee.com/leslie8195/ruo-yi-vue-multi-tenant RuoYi-Vue-SaToken RuoYi-Vue的SaToken版本 https\://gitee.com/wangming123456/ruoyi-satoken RuoYi-Vue3-Ts RuoYi-Vue3的Ts版本 https\://gitee.com/lyforvue/ruoyi\_vue3\_ts RuoYi-Vue3-Ts RuoYi-Vue3的Ts版本 https\://github.com/zzh948498/RuoYi-Vue3-ts RuoYi-Vue3-xxl-job RuoYi-Vue3的xxl-job管理后台版本 https\://github.com/wkclz/xxl-job-ruoyi-vue3 RuoYi-Vue-Mobile RuoYi-Vue的移动端Uniapp版本，集成uView2.0+u-charts等组件 https\://gitee.com/yinm/RuoYi-Mobile RuoYi-Vue-Uniapp RuoYi-Vue的移动端Uniapp版本 https\://gitee.com/big-hedgehog/ruoyi-uniapp RuoYi-Vue-Flutter RuoYi-Vue的移动端Flutter版本 https\://github.com/420136525/ruoyi\_flutter\_app RuoYi-Vue-Uniapp RuoYi-Vue的移动端Uniapp版本包括权限认证、字典翻译等 https\://gitee.com/\_q494000616q\_/ruoyi-uniapp RuoYi-Mybatis-Plus-Join RuoYi-Vue的Mybatis-Plus-Join，集成权限框架Sa-Token https\://gitee.com/Duke\_yzl/RuoYi-Vue RuoYi-R2dbc RuoYi-Vue的R2dbc版本 https\://gitee.com/sn-yang/ruoyi-webflux-r2dbc-vue3 RuoYi-Vue-Hibernate RuoYi-Vue的Hibernate版本 https\://gitee.com/inprise80/ruoyi-vue-hibernate2 RuoYi-Sqlite RuoYi-Vue的Sqlite版本 https\://gitee.com/lucky\_\_jie/RuoYi-Sqlite RuoYi-Sqlite RuoYi-Vue的Sqlite版本 https\://gitee.com/tianyv/ruoyi-sqlite3 RuoYi-Vue-Sqlite-NoRedis RuoYi-Vue的Sqlite+Caffeine的纯单机版本 https\://gitee.com/hanchers/ruoyi-vue-sqlite-no-redis RuoYi-Jpa RuoYi-Vue的jpa版本 https\://gitee.com/bright-sword-40/ruoyi-jpa RuoYi-KingBase RuoYi-Vue的金仓数据库版本 https\://github.com/Tomcat-plugins/RuoYiKingBase RuoYi-dameng RuoYi-Vue的达梦DM8的版本 https\://gitee.com/azun/ruoyi-dameng RuoYi-hgdb RuoYi-Vue的瀚高数据库版本 https\://gitee.com/ruralqiu/ruo-yi-vue-hgdb-master RuoYi-shentong RuoYi-Vue的神通数据库版本 https\://gitee.com/xgzh-boom/ruo-yi-vue-shentong RuoYi-firebird RuoYi-Vue的火鸟数据库版本 https\://gitee.com/avatarwx/ruoyi-vue-firebird RuoYi-doris RuoYi-Vue的Doris分布式数据库版本 https\://gitee.com/avatarwx/ruoyi-vue-doris RuoYi-metaee RuoYi-Vue + MybatisPlus + dynamic-datasource + Knife4j等 https\://gitee.com/metaee/metaee-boot RuoYi-Mybatis-Plus RuoYi-Vue + MybatisPlus 纯净版、项目全栈脚手架 https\://gitee.com/tellsea/ruoyi-vue-plus RuoYi-Mybatis-Plus RuoYi-Vue + MybatisPlus + Lombok + 国产数据库适配 https\://gitee.com/sou100/ruoyi-mybatis-plus RuoYi-Fast-Mybatis-Plus RuoYi-Vue-fast + MybatisPlus 纯净版、lombok简化代码 https\://gitee.com/zhu\_rongyin/Ruoyi-vue-fast-mybatis-plus RuoYi-Vue-Plus-Sqlserver RuoYi-Vue + MybatisPlus + Sqlserver版本 https\://gitee.com/qu\_bing/ruoyi-vue-plus-sqlserver RuoYi-Vue-Plus-Tdengine RuoYi-Vue + MybatisPlus + Tdengine版本 https\://gitee.com/zhangbg/ruoyi-plus-tdengine RuoYi-Vue-FluentMyBatis RuoYi-Vue版，集成Fluent-Mybatis，适配代码生成器 https\://lemonbx.coding.net/public/ruoyi/ruoyi-vue-fluentmybatis/git RuoYi-Vue-tkmapper RuoYi-Vue的tk.mapper版本 https\://gitee.com/caiwl\_admin/ruoyi-vue-tkmapper RuoYi-Vue-Nway-JDBC RuoYi-Vue的Nway-JDBC版本 https\://gitee.com/nway/RuoYi-Vue/tree/nway RuoYi-Vue-Nutz RuoYi-Vue的Nutz框架版本 https\://github.com/TomYule/ruoyi-vue-nutz RuoYi-Vue-PostgreSQL 集成PostgreSQL关系型数据库版本（提取码：gf8k） https\://pan.baidu.com/s/1KJC8GJPYOs\_sY1giLdHs-g?pwd=gf8k RuoYi-Vue-Postgresql-Electron RuoYi-Vue的Postgresql的桌面版，要集成了web桌面打印 https\://gitee.com/suxia2/ruo-yi-vue-postgresql-electron RuoYi-Vue-Postgresql RuoYi-Vue的Postgresql版本 https\://gitee.com/suxia2/RuoYi-Vue-Postgresql RuoYi-Vue-Postgresql RuoYi-Vue的Postgresql版本 https\://gitee.com/cheenmo/ruoyi-vue-pg RuoYi-Vue-Postgresql RuoYi-Vue的Postgresql版本 https\://github.com/Chever-John/RuoYi-Vue-PostgreSQL RuoYi-Vue-KingBase RuoYi-Vue的金仓数据库版本 https\://gitee.com/ccbclz/ruo-yi-vue-kingbase RuoYi-Vue-Solon 基于若依Solon框架版本，集成Sa-Token、MyBatis-Flex等组件 https\://gitee.com/min290/warm-sun RuoYi-Vue-Python 基于若依Python语言版本 https\://gitee.com/mengyinggitee/sanic-vue-admin RuoYi-Vue-django 基于若依Python语言版本 https\://github.com/miloira/ruoyi-vue-django RuoYi-Vue-Flask 基于若依Python语言版本 https\://gitee.com/shaw-lee/ruoyi-vue-flask RuoYi-Vue-Python 基于若依Python语言版本 https\://gitee.com/liqianglog/django-vue-admin/tree/v1.1.2 RuoYi-Go 基于RuoYi-Vue3，后端用Go(Go+Iris+Gorm) https\://github.com/Kun-GitHub/RuoYi-Go RuoYi-Vue-Go 基于若依Go语言版本 https\://gitee.com/tiger1103/gfast/tree/os-v2 RuoYi-Vue-Go 基于若依Go语言版本（Gin+Gorm+golang） https\://github.com/mengxiangyu996/ruoyi-go RuoYi-golang 基于RuoYi-Vue2，后端用golang版本 https\://gitee.com/xinjiangwangwei/golang-admin RuoYi-Vue3-Go 基于RuoYi-Vue3的Go语言版本 https\://gitee.com/smell2/BaiZe RuoYi-Vue3-go-kratos 基于RuoYi-Vue的go-kratos版本 https\://github.com/ut1221/micro-go RuoYi-Vue3-vuecli 基于RuoYi-Vue3的vue-cli版本 https\://gitee.com/cicada-singing/ruoyi-vue3-cli RuoYi-Vue-egg 基于RuoYi-Vue的egg框架版本 https\://gitee.com/zhumingmark/ruoyi-egg RuoYi-Vue-XxlJob 基于RuoYi-Vue的xxl-job定时任务版本 https\://gitee.com/chenlq618/RuoYi-Vue-Xxl-Job RuoYi-Vue-Cluster 集成netty、redisson实现分布式作业 https\://gitee.com/rcddup/RuoYi-Vue/tree/RuoYi-Vue-Cluster RuoYi-Vue-wind 集成Mybatis-Plus、shardingsphere、lombok等组件 https\://gitee.com/zhangmrit/RuoYi-Vue RuoYi-Vue-Ks 集成Mybatis-Plus、knife4j、Hutool、lombok等组件 https\://gitee.com/xieke90/RuoYi-Vue-Ks RuoYi-Vue-Mybatis-plus 集成Mybatis-Plus、EasyCaptcha、lombok及模块调整 https\://gitee.com/nottyjay/ruoyi-vue-mybatis-plus RuoYi-Vue-BeetlSql 集成Lombok+BeetlSql3.X+Undertow https\://gitee.com/JavaLionLi/RuoYi-Vue-BeetlSql RuoYi-Vue-Keycloak 集成了keycloak单点登录功能 https\://gitee.com/greetings\_gitee/RuoYiVueKeycloak RuoYi-Vue3-Cas 集成了RuoYi-Vue3 + CAS5.3.16单点登录功能 https\://gitee.com/mikulove666/ruoyi-vue-cas RuoYi-Vue-Cas 集成了spring-security-cas单点登录功能 https\://gitee.com/ggxforever/RuoYi-Vue-cas RuoYi-Vue-scan 基于若依的扫码登录系统 https\://gitee.com/ccc1216/ruoyi-vue-scan RuoYi-Vue-Kotlin 集成RuoYi-Vue的Kotlin版本 https\://gitee.com/gongzhengfeng/ruoyi-vue-kotlin RuoYi-Vue-Gradle 集成Gradle + Kotlin版本 https\://gitee.com/yizems/RuoYi-Vue/tree/gradle-kotlin RuoYi-Vue-Node 采用Midwayjs框架研发Node服务端体验 https\://gitee.com/TsMask/mask\_api\_midwayjs RuoYi-Vue-OpenNGX 借鉴nginx，用Linux C实现了若依后端，前端保持不变 https\://github.com/wk410225/OpenNGX RuoYi-Antdv-Flowable-plus 美化Antv + MybatisPlus + Flowable版本 https\://gitee.com/lwq8886666/ruo-yi-antdv-flowable-plus RuoYi-Vue-UUID RuoYi-Vue修改主键为UUID版本 https\://gitee.com/allen056/ruo-yi-vue-uuid RuoYi-Vue\_EMQX 集成emqx鉴权与登录，提供API管理emqx用户和规则 https\://gitee.com/zangsheng/EmqxExpand RuoYi-Vue-Consul 基于RuoYi-Vue的Consul微服务版本 https\://gitee.com/zlxls/Ruoyi-Consul-Cloud RuoYi-Vue-OAuth2 基于RuoYi-Vue-SpringBoot3版本集成OAuth2单点登录 https\://gitee.com/zm-zpp/ruoyi-vue3 RuoYi-Vue\_Oauth2 集成Oauth2.0实现登录，认证授权 https\://pan.baidu.com/s/1OVgEAe9mwBc6kkKHxX8ZCA（提取码: c475） RuoYi-Vue-Atomikos 集成atomikos分布式事务 https\://gitee.com/zsiyang/ruoyi-vue-atomikos RuoYi-Vue-Report 集成数据大屏、地图示例（热力图、区域图、检索等） https\://gitee.com/greenant/Ruoyi-vue-Report RuoYi-dataroom 集成Dataroom 、G2Plot、Echarts图表、大屏设计器等 https\://gitee.com/jonehoo/Siwu-IoT-Views RuoYi-Vue-BigData 基于若依数据中台、集成Datax-web、datax-cloud等组件 https\://gitee.com/a\_calm\_mind\_is\_like\_water/RuoShui-BigData RuoYi-Vue-Process 基于闲鹿工作流版本的扩展 https\://gitee.com/laya1989/ruo-yi-vue-process-3.4.0 RuoYi-Vue-YunaiV 集成文件服务、apollo、监控、分布式锁等组件 https\://github.com/YunaiV/ruoyi-vue-pro RuoYi-Vue-Swagger 集成Swagger-bootstrap-ui，支持代码生成Api... https\://gitee.com/juniorRay/ruoyi-vue-swagger RuoYi-Vue-GoogleTotp 集成google authenticator，支持角色树形模式... https\://gitee.com/richardgong1987/RuoYi-baby RuoYi-Vue-expand 集成Ureport2、积木报表、雪花主键 https\://gitee.com/magb/ruoyi-vue-expand RuoYi-Vue-AVue 基于若依的AVue注解模版页面渲染 https\://github.com/liukaixiong/RuoYi-AVue-Plus RuoYi-Vue-JFinal 集成JFinal作为web框架 https\://gitee.com/ycss/habit RuoYi-Vue-mqtt 集成mqtt作为消息队列 https\://github.com/gujiniCY/ruoyi-vue-mqtt RuoYi-hh-vue 集成Satoken、MybatisPlus、MybatisFlex、多租户，自研工作流 https\://gitee.com/min290/hh-vue RuoYi-Vue-Websocket 基于若依整合websocket实现聊天室，消息铃铛信息推送功能 https\://gitee.com/chen\_peng\_wei/ruoyi-vue-websocket RuoYi-Vue-Picture 基于若依整合图库项目、图像分析处理、即梦AI集成等 https\://github.com/SpringSunYY/LZ-Picture RuoYi-mymx2 基于若依核心工具包、自动配置、多租户 https\://gitee.com/mymx2/RuoYi-Vue RuoYi-Vue-style 基于若依改造模块层次、数据传输校验，mapstruct对象转换等 https\://gitee.com/todostyle/style-vue RuoYi-Tellsea 基于若依的Java全栈脚手架 https\://gitee.com/tellsea/project-system RuoYi-Vue-uniapp-wx 基于若依后台管理系统的微信小程序 https\://gitee.com/rahman/AbuCoder-RuoYi-Vue-uniapp-wx RuoYi-Vue-wechat-mp 集成公众号模板，微信网页授权认证 https\://gitee.com/suimu/ruoyi-wechat-mp RuoYi-Vue-DocHub 基于RuoYi-Vue的在线写作平台，支持多种文档类型编辑或分享 https\://gitee.com/Ning310975876/ruo-yi-vue-docHub RuoYi-Vue-Wvp 基于RuoYi-Vue的流媒体平台 https\://gitee.com/xiaochemgzi/RuoYi-Wvp RuoYi-Vue-Blog 基于RuoYi-Vue的博客网站 https\://gitee.com/Ning310975876/ruo-yi-vue-blog RuoYi-Vue-KMS 基于RuoYi-Vue的知识管理系统 https\://gitee.com/chenzuheng001/ruo-yi-vue-kms-backup RuoYi-Vue-MES 基于RuoYi-Vue的MES生产执行管理系统 https\://gitee.com/kutangguo/ktg-mes RuoYi-Vue-CMS 基于RuoYi-Vue的CMS内容管理系统 https\://gitee.com/liweiyi/RuoYi-Vue-CMS RuoYi-Vue-OA 基于RuoYi-Vue的OA企业级系统，开箱即用，页面美观实用。 https\://gitee.com/OpenJJ/ruoyi-vue-oa RuoYi-Vue-OA 基于RuoYi-Vue的OA办公系统，整合flowable实现工作流 https\://gitee.com/sjz\_zy/zy-oa RuoYi-Vue-OA 基于RuoYi-Vue的OA企业费控管理系统，整合flowable实现工作流 https\://gitee.com/lu\_qw/officeProcess RuoYi-Vue-netdisk 基于RuoYi-Vue的在线网盘系统 https\://gitee.com/hongmaple/netdisk RuoYi-Shenbao-iot 基于RuoYi-Vue的开源物联网基础平台 https\://gitee.com/jinanchang/Shenbao-iot RuoYi-openlinks-iot 基于RuoYi-Vue的开源物联网基础平台 https\://gitee.com/open-links-group/openlinks RuoYi-thinglinks-community 基于RuoYi-Vue的开源物联网基础平台 https\://gitee.com/chinachentao/thinglinks-community RuoYi-examination 基于RuoYi-Vue的开源考试管理系统 https\://github.com/qnsdt/examination-system RuoYi-attendance 基于RuoYi-Vue的学生考勤管理系统 https\://github.com/yeshuang2/student-attendance-management RuoYi-student-SAMS 基于RuoYi-Vue的学生考勤管理系统 https\://gitee.com/han-cheese/student-attendence-management-system RuoYi-Vue-certificate 基于RuoYi-Vue3+Ts的证书信息管理系统 https\://gitee.com/binyuling/ruoyi-vue3-ts-springboot-certificate-management RuoYi-electronic-signature 基于RuoYi-Vue的电子签章系统 https\://gitee.com/xiaoyuer0/electronic-signature-system RuoYi-link-wechat 基于若依的人工智能的企业微信SCRM https\://gitee.com/LinkWeChat/link-wechat RuoYi-V-IM 基于若依超轻量级聊天软件 https\://gitee.com/lele-666/V-IM RuoYi-transport 基于若依的物流转运小程序 https\://gitee.com/hongmaple/transport ruoyi-report 基于若依自定义报表功能平台 https\://gitee.com/k\_star/ruoyi-report RuoYi-easy-report 基于若依在线Web报表工具平台 https\://gitee.com/devzwd/easy-report RuoYi-wx 基于若依微信管理平台 https\://gitee.com/joolun/JooLun-wx RuoYi-ks 基于若依进销库存系统 https\://gitee.com/KrityCat/ks-inventory-system RuoYi-aibot 基于若依的智能AI机器人 https\://gitee.com/icode-community/aibot RuoYi-assets 基于若依的资产和设备管理系统 https\://gitee.com/51tech/assets RuoYi-wxopen 基于若依的微信服务商平台 https\://gitee.com/mxiaoguang/wxopen RuoYi-kwswitch 基于若依的智能开关平台 https\://gitee.com/kerwincui/kwswitch RuoYi-ewem 基于若依的溯源防伪系统 https\://gitee.com/qrcode\_project/ewem RuoYi-zhunian 基于若依的支付系统 https\://gitee.com/zhunian/smart-pay-plus-vue RuoYi-wumei 基于若依的智能家居系统 https\://gitee.com/kerwincui/wumei-smart RuoYi-tanhuihuang 基于若依的电影视频系统 https\://gitee.com/tanhuihuang/ruoyi-media RuoYi-cms-video 基于若依的电影视频网站 https\://gitee.com/sun-gongzhu/sun-cms-video RuoYi-forum 基于简单的易扩展的论坛平台 https\://gitee.com/e-wenxin/forum RuoYi-knowledgegraph 基于若依的可视化知识图谱 https\://gitee.com/liaoquefei/knowledgegraph RuoYi-opensource-circle 基于若依的社区圈子含商城购物 https\://gitee.com/liunian04/opensource-circle RuoYi-sun-uniapp-quanzi 基于若依的社交搭子论坛小程序 https\://gitee.com/sun-gongzhu/sun-uniapp-quanzi RuoYi-smart-agriculture 基于若依的智慧农业物联网平台 https\://gitee.com/nealtsiao/frog-smart-agriculture RuoYi-tutor 基于若依的家教一体化平台 https\://github.com/zty-f/Tutor RuoYi-mall 基于若依的电商管理系统 https\://gitee.com/zccbbg/RuoYi-Mall RuoYi-Wms 基于若依的仓库管理系统 https\://gitee.com/zccbbg/wms-ruoyi RuoYi-erp 基于若依的进销存管理系统 https\://gitee.com/zccbbg/ruoyi-erp-service RuoYi-payshop 基于若依的多商户商城管理系统 https\://gitee.com/JiaGou-XiaoGe/payshop RuoYi-shop 基于若依和litemall的商城后台融合项目 https\://gitee.com/hgl168918/ruoyi-shop RuoYi-crm 基于若依的多租户CRM系统 https\://gitee.com/jundee/RuoyiCRM RuoYi-erp 基于若依的ERP系统 https\://github.com/Quart233/ruoyi-erp RuoYi-ems 基于若依的能源管理系统 https\://gitee.com/cloudpulse/cp-ems-ruoyi RuoYi-tms 基于若依的大宗物流运输系统 https\://gitee.com/wzy0424/tms RuoYi-mes 基于若依的生产工单管理系统 https\://gitee.com/cloudpulse/cp-mes-ruoyi RuoYi-zhaoxinpms 基于若依的智慧物业系统 https\://gitee.com/fanhuibin1/zhaoxinpms RuoYi-community 基于若依的智慧社区系统 https\://gitee.com/hebei-zhiyu-network/community-web RuoYi-huohuzhihui 基于若依的智慧园区一卡通 https\://gitee.com/huohuzhihui/ykt RuoYi-manager 基于若依的内部管理软件 https\://gitee.com/jetlion-software/zs-manager RuoYi-campus 基于若依的校园信息墙项目 https\://github.com/oddfar/campus RuoYi-octopus 基于若依的高校教学综合平台 https\://github.com/hongmaple/octopus RuoYi-student 基于若依的智慧校园系统 https\://github.com/Beisheng8888/student RuoYi-WJ-ONE 整合RuoYi-MES、RuoYi-CRM、RuoYi-Flowable等系统于一体 https\://gitee.com/vulcanw/wj-mes RuoYi-Vue-SmsLogin 集成短信登录功能 https\://github.com/chougui123/RuoYi-Vue-SmsLogin RuoYi-fastbuild-factory 若依框架包名修改器 https\://gitee.com/yinm/fastbuild-factory RuoYi-common-tools 若依框架包名修改器 https\://gitee.com/lpf\_project/common-tools

---

## 常见问题 | RuoYi

**URL**: https://doc.ruoyi.vip/ruoyi-vue/other/faq.html

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98) 常见问题

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%96%B0%E5%A2%9E%E7%B3%BB%E7%BB%9F%E5%9B%BE%E6%A0%87) 如何新增系统图标

如果你没有在本项目 [Icon (opens new window)](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui/src/assets/icons/svg) 中找到需要的图标，可以到 [iconfont.cn (opens new window)](http://iconfont.cn/) 上选择并生成自己的业务图标库，再进行使用。或者其它 svg 图标网站，下载 svg 并放到文件夹之中就可以了。

下载完成之后将下载好的 .svg 文件放入 `@/icons/svg` 文件夹下之后就会自动导入。

**使用方式**

```
<svg-icon icon-class="password" /> // icon-class 为 icon 的名字
```

1

提示

菜单图标会自动引入`@/icons/svg`，放入此文件夹中图标就可以选择了

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%B8%8D%E7%99%BB%E5%BD%95%E7%9B%B4%E6%8E%A5%E8%AE%BF%E9%97%AE) 如何不登录直接访问

方法1：在`SecurityConfig.java`中设置`httpSecurity`配置匿名访问

```
// 使用 permitAll() 方法所有人都能访问，包括带上 token 访问
.antMatchers("/admins/**").permitAll()

// 使用 anonymous() 所有人都能访问，但是带上 token 访问后会报错
.antMatchers("/admins/**").anonymous()
```

1\
2\
3\
4\
5

方法2：在对应的方法或类上面使用`@Anonymous`注解。

```
// 类上定义匿名注解，作用于所有的方法
@Anonymous
@RestController
@RequestMapping("/system/xxxx")
public class SysXxxxController extends BaseController
{
}

// 方法定义匿名注解，作用于单独的方法
@Anonymous
@GetMapping("/list")
public List<SysXxxx> list(SysXxxx xxxx)
{
    return xxxxList;
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15

警告

匿名访问的方法上面`@PreAuthorize`权限注解也需要去掉，因为已经使用匿名访问了，权限自然也不需要去验证了。

前端不登录如何直接访问

如果是前端页面可以在`src/permission.js`配置`whiteList`属性白名单即可。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%8D%A2%E9%A1%B9%E7%9B%AE%E5%8C%85%E8%B7%AF%E5%BE%84) 如何更换项目包路径

[参考如何更换项目包路径](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%8D%A2%E9%A1%B9%E7%9B%AE%E5%8C%85%E8%B7%AF%E5%BE%84)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%B8%9A%E5%8A%A1%E6%A8%A1%E5%9D%97%E8%AE%BF%E9%97%AE%E5%87%BA%E7%8E%B0404) 业务模块访问出现404

[参考业务模块访问出现404](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E4%B8%9A%E5%8A%A1%E6%A8%A1%E5%9D%97%E8%AE%BF%E9%97%AE%E5%87%BA%E7%8E%B0404)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90) 如何使用多数据源

[参考如何使用多数据源](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%8D%A2%E4%B8%BB%E9%A2%98%E7%9A%AE%E8%82%A4) 如何更换主题皮肤

默认的主题都是深色主题，如果需要其他主题可以做如下配置。

1、点击顶部最右侧个人中心头像，选择布局设置，选择`主题风格设置`。（局部设置）

2、在`ruoyi-ui\src\settings.js`，设置侧边栏主题`sideTheme`为`theme-xxxx`。（全局设置）

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%A7%BB%E9%99%A4%E6%88%96%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A6%96%E9%A1%B5) 移除或自定义首页

默认登录是指向`index`首页仪表盘。如果想移除或修改，可以参考以下步骤。

1、打开`router/index.js`文件，找到首页路由配置并将改为自定义页面：

```
// {
//   path: '',
//   component: Layout,
//   redirect: 'index',
//   children: [
//     {
//       path: 'index',
//       component: () => import('@/views/index'),
//       name: 'Index',
//       meta: { title: '首页', icon: 'dashboard', affix: true }
//     }
//   ]
// },

{
    path: '',
    component: Layout,
    redirect: '/system/user',
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19

2、修改`login.vue`文件，去掉`redirect`参数

```
// this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
this.$router.push({ path: "/" }).catch(()=>{});
```

1\
2

3、打开`Breadcrumb/index.vue`文件，删除或注释首页判断代码

```
//  // 判断是否为首页
//  if (!this.isDashboard(matched[0])) {
//    matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched)
//  }
```

1\
2\
3\
4

4、修改`TagsView/index.vue`文件，对最后一个标签限制删除

```
closeSelectedTag(view) {
  if (this.visitedViews.length == 1) {
	  this.$modal.msgWarning("当前为最后一个页签，不允许删除。");
	  return;
  }
  ....
},
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%8A%A8%E6%80%81%E8%8F%9C%E5%8D%95) 如何实现动态菜单

有时候经常会需要将系统的某个菜单打开多个相同的明细页，大多数据情况是配置在`router/index.js`中实现，如下

```
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14

如果遇到需要经常修改的情况，那么就不宜直接写死静态路由，这个时候我们就可以在菜单管理中配置动态路由。

针对上述的情况，我们可以在菜单管理中新增配置以实现动态路由的效果。 其中关键属性，路由名称为`Data`，路由地址为`dict-data/index/:dictId(\d+)`，组件路径为`system/dict/data`，达到的效果是和上述静态路由配置是一致的。

![routeName](https://foruda.gitee.com/images/1741229999993707101/c31ff4a9_1151004.png)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E6%A8%AA%E5%90%91%E8%8F%9C%E5%8D%95) 如何使用横向菜单

默认的导航菜单都是在左侧，如果需要横向导航菜单可以做如下配置。

1、点击顶部最右侧个人中心头像，选择布局设置，开启`TopNav`。（局部设置）

2、在`ruoyi-ui\src\settings.js`，设置是否显示顶部导航`topNav`为`true`。（全局设置）

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3%E8%AE%BF%E9%97%AE%E5%87%BA%E7%8E%B0401) 系统接口访问出现401

在测试系统接口中可能存在一些接口用到用户信息或权限验证，此时需要添加全局的`token`参数。如图

![swagger](https://foruda.gitee.com/images/1688696351704540413/6f76493b_1151004.png)

`token`是在登录成功后返回的，可以在浏览器通过F12查看`Network`中的请求地址，对应参数`Authorization`。复制截图内容到`swagger`全局`Authorization`属性`value`参数中，点击`Authorize`，以后每次访问接口会携带此`token`信息。

![swagger](https://foruda.gitee.com/images/1688696383797212390/e245cf87_1151004.png)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%8D%A2%E5%90%8E%E7%AB%AF%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80) 如何更换后端请求地址

在`vue.config.js`中，修改`target`值为对应的的后端接口地址。

```
devServer: {
  ...,
  proxy: {
    [process.env.VUE_APP_BASE_API]: {
      target: `http://localhost:8080`,
      ...
    }
  },
  ...
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

RuoYi-Vue3版本更换方式

在`vite.config.js`中，修改`target`值为对应的的后端接口地址。

```
server: {
  ...,
  proxy: {
	'/dev-api': {
	  target: 'http://localhost:8080',
	  ...
	}
  }
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%90%AF%E5%8A%A8%E9%A1%B9%E7%9B%AEhttps%E5%8D%8F%E8%AE%AE) 如何启动项目https协议

通常情况下，在启动本地项目时，默认都是`http`协议，但是有时候测试网站要求我们的协议是`https`，那么可以配置`vue.config.js`中的`devServer`,让其在启动项目的时候，默认是https协议。

```
module.exports = {
    ......
	devServer: {
	  https: true,
	  ......
	},
}
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E4%BF%A1%E6%81%AF) 如何获取用户登录信息

1. 第一种方法

```
// 获取当前的用户名称
String username = SecurityUtils.getUsername();
```

1\
2

2、缓存获取当前用户信息

```
@Autowired
private TokenService tokenService;
	
LoginUser loginUser = tokenService.getLoginUser();
// 获取当前的用户名称
String username = loginUser.getUsername();
```

1\
2\
3\
4\
5\
6

3、vue中获取当前用户信息

```
// 获取用户名和用户ID
const userid = this.$store.state.user.id;
const username = this.$store.state.user.name;
```

1\
2\
3

RuoYi-Vue3版本获取方式

```
import useUserStore from '@/store/modules/user'

const userid = useUserStore().id;
const username = useUserStore().name;
```

1\
2\
3\
4

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%8F%90%E7%A4%BA%E6%82%A8%E6%B2%A1%E6%9C%89%E6%95%B0%E6%8D%AE%E7%9A%84%E6%9D%83%E9%99%90) 提示您没有数据的权限

这种情况都属于权限标识配置不对在`菜单管理`配置好权限标识（菜单&按钮）

1. 确认此用户是否已经配置角色
2. 确认此角色是否已经配置菜单权限
3. 确认此菜单权限标识是否和后台代码一致

- 例如参数配置查询权限\
  1、后台`Controller`配置`@PreAuthorize("@ss.hasPermi('system:config:query')")`注解\
  2、前端`菜单管理/参数设置/参数查询`权限字符应为`system:config:query`权限

注：如果是角色权限，应在前端`角色管理`配置对应角色的权限字符，后台使用`@PreAuthorize("@ss.hasRole('admin')")`注解

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E8%8F%9C%E5%8D%95%E9%A1%B5%E7%AD%BE) 如何创建新的菜单页签

Vue设置路由跳转的两种方法

一、路由跳转`router.push`

```
// 字符串
router.push('apple')
// 对象
router.push({path:'apple'})
// 命名路由
router.push({name: 'applename'})
//直接路由带查询参数query，地址栏变成 /apple?color=red
router.push({path: 'apple', query: {color: 'red' }})
// 命名路由带查询参数query，地址栏变成/apple?color=red
router.push({name: 'applename', query: {color: 'red' }})
//直接路由带路由参数params，params 不生效，如果提供了 path，params 会被忽略
router.push({path:'applename', params:{ color: 'red' }})
// 命名路由带路由参数params，地址栏是/apple/red
router.push({name:'applename', params:{ color: 'red' }})
// 其他方式
this.$router.push({ path: "/system/user" });
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

二、动态赋值`<router-link :to="...">`，`to`里的值可以是一个字符串路径，或者一个描述地址的对象。例如：

```
// 字符串
<router-link to="apple"> to apple</router-link>
// 对象
<router-link :to="{path:'apple'}"> to apple</router-link>
// 命名路由
<router-link :to="{name: 'applename'}"> to apple</router-link>
//直接路由带查询参数query，地址栏变成 /apple?color=red
<router-link :to="{path: 'apple', query: {color: 'red' }}"> to apple</router-link>
// 命名路由带查询参数query，地址栏变成/apple?color=red
<router-link :to="{name: 'applename', query: {color: 'red' }}"> to apple</router-link>
//直接路由带路由参数params，params 不生效，如果提供了 path，params 会被忽略
<router-link :to="{path: 'apple', params: { color: 'red' }}"> to apple</router-link>
// 命名路由带路由参数params，地址栏是/apple/red
<router-link :to="{name: 'applename', params: { color: 'red' }}"> to apple</router-link>
// 其他方式
<router-link :to="'/system/user/' + scope.row.userId" class="link-type">
  <span>{{ scope.row.userId }}</span>
</router-link>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2%E6%90%BA%E5%B8%A6%E5%8F%82%E6%95%B0) 如何登录页面携带参数

有时候在未登录时需要访问需要登录的资源，并且需要在登录成功后传递请求参数。

```
// Vue2 版本的请求方式
http://localhost/system/user?id=123456&version=387
```

1\
2

```
// Vue3 版本的请求方式
http://localhost/login?redirect=system/user&id=123456&version=387
```

1\
2

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1%E4%BC%A0%E5%8F%82) 如何手动配置路由传参

第一种：使用`path`来匹配路由，然后通过`query`来传递参数，这种情况下`query`传递的参数会显示在`url`后面会跟`?id=`

```
this.$router.push({
    path: '/user/profile',
    query: {
      id: id
    }
})
```

1\
2\
3\
4\
5\
6

获取参数方式：`this.$route.query.id`

第二种：使用`name`来匹配路由，使用`params`传参，可以在路由的`path`里加参数。

```
this.$router.push({
    name: 'UserProfile',
    params: {
      id: id
    }
})
```

1\
2\
3\
4\
5\
6

获取参数方式：`this.$route.params.id`

第三种：直接让路由携带参数跳转

```
this.$router.push({
  path: '/user/profile/:id(\\d+)'
})
```

1\
2\
3

获取参数方式：`this.$route.params.id`

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%8F%9C%E5%8D%95%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1%E4%BC%A0%E5%8F%82) 如何菜单配置路由传参

在菜单管理中选择菜单类型为菜单，填写对应的路由参数，如：`{"id": 1, "name": "ry"}`

在自己的组件中获取参数方式：`this.$route.query.id`，`this.$route.query.name`

外链可以通过原生方式设置

例如：http\://ruoyi.vip?id=1\&name=ry

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%8A%A8%E6%80%81%E4%BF%AE%E6%94%B9%E9%A1%B5%E7%AD%BE%E5%90%8D%E7%A7%B0) 如何动态修改页签名称

可以使用`tagsView/updateVisitedView`动态修改名称，示例如下。

```
const id = row.id;
const title = '自定义标题' 
const route = Object.assign({}, this.$route, { title: `${title}-${id}` }) 
this.$store.dispatch('tagsView/updateVisitedView', route)
```

1\
2\
3\
4

此时页签名称会被修改成`自定义标题-{id}`

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%B7%AF%E7%94%B1%E7%9A%84%E6%87%92%E5%8A%A0%E8%BD%BD) 如何实现路由的懒加载

在单页应用中，进入首页时，如果需要加载的内容过多，延时过长，不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。

静态路由懒加载方式，自定义在`router\index.js`

```
{
  path: '/xxxx',
  name: 'xxxx',
  component: () => import('@/views/xxxx')
}
```

1\
2\
3\
4\
5\
6

动态路由懒加载方式，在`store\modules\permission.js`修改成`import`方式

```
export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8

提示

使用`npm run build`命令打包后会在`dist\static\js`目录按模块生成对应的`js`文件。

PS：如果是其他的打包命令也需要懒加载，如`npm run build:stage`，则在对应的`.env.staging`新增`BABEL_ENV`属性指定`production`即可。

```
# 页面标题
VUE_APP_TITLE = 若依管理系统

BABEL_ENV = production

NODE_ENV = production

# 测试环境配置
ENV = 'staging'

# 若依管理系统/测试环境
VUE_APP_BASE_API = '/stage-api'
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%A1%A8%E6%A0%BC%E6%98%BE%E9%9A%90%E5%88%97) 如何使用表格显隐列

1、使用插件`right-toolbar`，设置需要显示/隐藏的列属性`columns`

```
<el-row :gutter="10" class="mb8">
  ....
  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
</el-row>
```

1\
2\
3\
4

2、定义显示列信息，支持两种格式（二选一）推荐对象格式

**列显隐（对象格式）**

```
// 列属性信息（对象格式）
columns: {
  userId: { label: '用户编号', visible: true },
  userName: { label: '用户名称', visible: true },
  nickName: { label: '用户昵称', visible: true },
  deptName: { label: '部门', visible: true },
  phonenumber: { label: '手机号码', visible: true }
},
```

1\
2\
3\
4\
5\
6\
7\
8

```
// 加入key属性 和v-if判断
<el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
  <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns.userId.visible" />
  <el-table-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns.userName.visible" :show-overflow-tooltip="true" />
  <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns.nickName.visible" :show-overflow-tooltip="true" />
  <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName" v-if="columns.deptName.visible" :show-overflow-tooltip="true" />
  <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns.phonenumber.visible" width="120" />
  ......
</el-table>
```

1\
2\
3\
4\
5\
6\
7\
8\
9

**列显隐（数组格式）**

```
// 列信息（数组格式）
columns: [
  { key: 0, label: `用户编号`, visible: true },
  { key: 1, label: `用户名称`, visible: true },
  { key: 2, label: `用户昵称`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true }
],
```

1\
2\
3\
4\
5\
6\
7\
8

```
// 加入key属性 和v-if判断
<el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="50" align="center" />
  <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
  <el-table-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
  <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" />
  <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
  <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120" />
  ......
</el-table>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BD%BF%E7%94%A8gzip%E8%A7%A3%E5%8E%8B%E7%BC%A9%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6) 使用Gzip解压缩静态文件

需要先完成上述的步骤 [环境部署-Nginx配置-开启Gzip压缩](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html#nginx%E9%85%8D%E7%BD%AE)

上述方案配置后由于`Nginx`的动态压缩是对每个请求先压缩再输出，这样造成虚拟机浪费了很多`CPU`。解决这个问题可以利用`nginx`的`http_gzip_static_module`模块，主要作用是对于需要压缩的文件，直接读取已经压缩好的文件(文件名为加`.gz`)，而不是动态压缩（消耗性能）。所以采用这个方案需要确保目录文件名有生成`.gz`（最新版本的配置打包默认都会生成`.gz`文件）

首先需要安装`nginx`的`http_gzip_static_module`模块

```
# 安装模块（如果存在其他模块,用空格分开 --with-xxx --with-xxx,防止覆盖）
./configure --with-http_gzip_static_module

# 编译
make & make install
```

1\
2\
3\
4\
5

查询安装配置信息是否包含`http_gzip_static_module`

```
./nginx -V

nginx version: nginx/1.8.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC) 
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --with-http_ssl_module --with-http_gzip_static_module
```

1\
2\
3\
4\
5\
6\
7

配置`nginx.conf`的`gzip_static`属性

```
server {
	listen       80;
	server_name vue.ruoyi.vip;
	# 开启解压缩静态文件
	gzip_static on;
	location / {
		root   /home/ruoyi/projects/ruoyi-ui;
		try_files $uri $uri/ /index.html;
		index index.html;
	}
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

开启`gzip_static`后，对于任何文件都会先查找是否有对应的`gz`文件。

重启`nginx`，使其生效

```
./nginx -s reload
```

1

测试解压缩静态文件是否成功

```
# 查询 nginx worker 进程的PID
ps ax | grep nginx

# 使用strace追踪是否请求.gz
strace -p 23558 2>&1 | grep gz

# 如果请求.gz的文件表示开启成功
open("/xxxx/static/css/chunk-171ca186.f59a1d86.css.gz", O_RDONLY|O_NONBLOCK) = 46
open("/xxxx/static/js/chunk-01ef53b6.a7928e48.js.gz", O_RDONLY|O_NONBLOCK) = 46
```

1\
2\
3\
4\
5\
6\
7\
8\
9

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%98%B2%E6%AD%A2%E8%AF%B7%E6%B1%82%E9%87%8D%E5%A4%8D%E6%8F%90%E4%BA%A4) 如何防止请求重复提交

后端可以通过`@RepeatSubmit`注解控制

```
/**
 * 在对应方法添加注解 @RepeatSubmit
 */
@RepeatSubmit
public AjaxResult edit()
```

1\
2\
3\
4\
5

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E6%B5%81%E9%87%8F%E9%99%90%E5%88%B6%E6%8E%A7%E5%88%B6) 如何进行流量限制控制

后端可以通过`@RateLimiter`注解控制

```
/**
 * 在对应方法添加注解 @RateLimiter
 */
@RateLimiter(count = 100, time = 60)
public AjaxResult edit()
```

1\
2\
3\
4\
5

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E6%BB%91%E5%9D%97%E9%AA%8C%E8%AF%81%E7%A0%81) 如何实现滑块验证码

[参考集成aj-captcha实现滑块验证码](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90aj-captcha%E5%AE%9E%E7%8E%B0%E6%BB%91%E5%9D%97%E9%AA%8C%E8%AF%81%E7%A0%81)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%BC%93%E5%AD%98%E5%AD%90%E9%A1%B5%E9%9D%A2%E9%A1%B5%E7%AD%BE) 如何缓存子页面页签

例如，字典管理，当我们打开多个子页签tab1和tab2，关闭tab2后，但是tab1缓存也被清空重置了，我们可以通过如下方法解决。

1、在`src\layout\components`下新建目录`KeepAlive`创建文件`index.js`

```
/**
 * 验证数据类型是否是正则
 * @param v
 * @returns {boolean}
 */
function isRegExp (v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

/**
 * 移除数组中指定的项
 * @param arr
 * @param item
 * @returns {*|{}|number|Array|*[]|[]|T[]}
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * 判断数据是否定义了
 * @param v
 * @returns {boolean}
 */
function isDef (v) {
  return v !== undefined && v !== null
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/**
 * 获取KeepAlive下的第一个子组件
 * @param children
 * @returns {*}
 */
function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/**
 * 匹配缓存的页面组件
 * @param pattern
 * @param name
 * @returns {boolean|*}
 */
function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

/**
 * 原先对于没有设置组件name值的，设置为路由的name
 * 现在我们直接取fullPath为name
 * @param {*} opts
 */
function getComponentName (opts) {
  // return (opts && opts.Ctor.options.name) || this.$route.name
  return this.$route.fullPath
}

/**
 * 删除缓存
 * @param keepAliveInstance
 * @param filter
 */
function pruneCache (keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  Object.keys(cache).forEach(key => {
    const cachedNode = cache[key]
    if (cachedNode) {
      if (key && !filter(key)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  })
}

/**
 * 删除缓存条目
 * @param cache
 * @param key
 * @param keys
 * @param current
 */
function pruneCacheEntry (cache, key, keys, current) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes = [String, RegExp, Array]

export default {
  name: 'KeepAlive',
  // abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    // Object.create(null)创建一个非常干净且高度可定制的对象
    // 新创建的对象除了自身属性外，原型链上没有任何属性，也就是说没有继承Object的任何东西
    this.cache = Object.create(null)
    this.keys = []
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  destroyed () {
    Object.keys(this.cache).forEach(key => {
      pruneCacheEntry(this.cache, key, this.keys)
    })
  },

  render () {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // 获取组件的名称，此处修改后取fullPath作为name
      const key = getComponentName.call(this, componentOptions)

      const { include, exclude } = this
      // 没有缓存的直接返回vnode
      if (
        // not included
        (include && (!key || !matches(include, key))) ||
        // excluded
        (exclude && key && matches(exclude, key))
      ) {
        return vnode
      }

      const { cache, keys } = this
      if (cache[key]) {
        // 取缓存中的实例作为vnode的实例
        vnode.componentInstance = cache[key].componentInstance
        // 将当前缓存的key设置为最新的，便于后面缓存的数量超了以后删除最老的
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // 移除最老的缓存
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139\
140\
141\
142\
143\
144\
145\
146\
147\
148\
149\
150\
151\
152\
153\
154\
155\
156\
157\
158\
159\
160\
161\
162\
163\
164\
165\
166\
167\
168\
169\
170\
171\
172\
173\
174\
175\
176\
177\
178\
179\
180\
181\
182\
183\
184\
185\
186

2、修改`src\layout\components\AppMain.vue`

```
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view v-if="!$route.meta.link" :key="key" />
      </keep-alive>
    </transition>
    <iframe-toggle />
  </section>
</template>

<script>
import iframeToggle from "./IframeToggle/index"
import keepAlive from './KeepAlive'

export default {
  name: 'AppMain',
  components: { iframeToggle, keepAlive },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
......省略style代码
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29

3、修改`src\layout\components\TagsView\index.vue`

```
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.fullPath"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.fullPath, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)"><i class="el-icon-refresh-right"></i> 刷新页面</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)"><i class="el-icon-close"></i> 关闭当前</li>
      <li @click="closeOthersTags"><i class="el-icon-circle-close"></i> 关闭其他</li>
      <li v-if="!isFirstView()" @click="closeLeftTags"><i class="el-icon-back"></i> 关闭左侧</li>
      <li v-if="!isLastView()" @click="closeRightTags"><i class="el-icon-right"></i> 关闭右侧</li>
      <li @click="closeAllTags(selectedTag)"><i class="el-icon-circle-close"></i> 全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    },
    theme() {
      return this.$store.state.settings.theme;
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.fullPath === this.$route.fullPath
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {};
      return {
        "background-color": this.theme,
        "border-color": this.theme
      };
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    isFirstView() {
      try {
        return this.selectedTag.fullPath === this.visitedViews[1].fullPath || this.selectedTag.fullPath === '/index'
      } catch (err) {
        return false
      }
    },
    isLastView() {
      try {
        return this.selectedTag.fullPath === this.visitedViews[this.visitedViews.length - 1].fullPath
      } catch (err) {
        return false
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: route.fullPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.fullPath)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        this.$store.dispatch('tagsView/addVisitedView', tag)
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
        if (this.$route.meta.link) {
          this.$store.dispatch('tagsView/addIframeView', this.$route)
        }
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.fullPath === this.$route.fullPath) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$tab.refreshPage(view);
      if (this.$route.meta.link) {
        this.$store.dispatch('tagsView/delIframeView', this.$route)
      }
    },
    closeSelectedTag(view) {
      this.$tab.closePage(view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeRightTags() {
      this.$tab.closeRightPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeLeftTags() {
      this.$tab.closeLeftPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag).catch(()=>{});
      this.$tab.closeOtherPage(this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$tab.closeAllPage().then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.fullPath === this.$route.fullPath)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>
......省略style代码
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120\
121\
122\
123\
124\
125\
126\
127\
128\
129\
130\
131\
132\
133\
134\
135\
136\
137\
138\
139\
140\
141\
142\
143\
144\
145\
146\
147\
148\
149\
150\
151\
152\
153\
154\
155\
156\
157\
158\
159\
160\
161\
162\
163\
164\
165\
166\
167\
168\
169\
170\
171\
172\
173\
174\
175\
176\
177\
178\
179\
180\
181\
182\
183\
184\
185\
186\
187\
188\
189\
190\
191\
192\
193\
194\
195\
196\
197\
198\
199\
200\
201\
202\
203\
204\
205\
206\
207\
208\
209\
210\
211\
212\
213\
214\
215\
216\
217\
218\
219\
220\
221\
222\
223\
224\
225\
226\
227\
228\
229\
230\
231\
232\
233\
234\
235\
236

4、修改`src\store\modules\tagsView.js`

```
const state = {
  visitedViews: [],
  cachedViews: [],
  iframeViews: []
}

const mutations = {
  ADD_IFRAME_VIEW: (state, view) => {
    if (state.iframeViews.some(v => v.fullPath === view.fullPath)) return
    state.iframeViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_VISITED_VIEW: (state, view) => {
    if (!view.fullPath || state.visitedViews.some(v => v.fullPath === view.fullPath)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.fullPath)) return
    if (view.meta && !view.meta.noCache) {
      state.cachedViews.push(view.fullPath)
    }
  },
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.fullPath === view.fullPath) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
    state.iframeViews = state.iframeViews.filter(item => item.fullPath !== view.fullPath)
  },
  DEL_IFRAME_VIEW: (state, view) => {
    state.iframeViews = state.iframeViews.filter(item => item.fullPath !== view.fullPath)
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.fullPath)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.fullPath === view.fullPath
    })
    state.iframeViews = state.iframeViews.filter(item => item.fullPath === view.fullPath)
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.fullPath)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      state.cachedViews = []
    }
  },
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
    state.iframeViews = []
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.fullPath === view.fullPath) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  DEL_RIGHT_VIEWS: (state, view) => {
    const index = state.visitedViews.findIndex(v => v.fullPath === view.fullPath)
    if (index === -1) {
      return
    }
    state.visitedViews = state.visitedViews.filter((item, idx) => {
      if (idx <= index || (item.meta && item.meta.affix)) {
        return true
      }
      const i = state.cachedViews.indexOf(item.fullPath)
      if (i > -1) {
        state.cachedViews.splice(i, 1)
      }
      if(item.meta.link) {
        const fi = state.iframeViews.findIndex(v => v.fullPath === item.fullPath)
        state.iframeViews.splice(fi, 1)
      }
      return false
    })
  },
  DEL_LEFT_VIEWS: (state, view) => {
    const index = state.visitedViews.findIndex(v => v.fullPath === view.fullPath)
    if (index === -1) {
      return
    }
    state.visitedViews = state.visitedViews.filter((item, idx) => {
      if (idx >= index || (item.meta && item.meta.affix)) {
        return true
      }
      const i = state.cachedViews.indexOf(item.fullPath)
      if (i > -1) {
        state.cachedViews.splice(i, 1)
      }
      if(item.meta.link) {
        const fi = state.iframeViews.findIndex(v => v.fullPath === item.fullPath)
        state.iframeViews.splice(fi, 1)
      }
      return false
    })
  }
}

....省略其他代码
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45\
46\
47\
48\
49\
50\
51\
52\
53\
54\
55\
56\
57\
58\
59\
60\
61\
62\
63\
64\
65\
66\
67\
68\
69\
70\
71\
72\
73\
74\
75\
76\
77\
78\
79\
80\
81\
82\
83\
84\
85\
86\
87\
88\
89\
90\
91\
92\
93\
94\
95\
96\
97\
98\
99\
100\
101\
102\
103\
104\
105\
106\
107\
108\
109\
110\
111\
112\
113\
114\
115\
116\
117\
118\
119\
120

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF) 异步处理获取用户信息

项目中可以通过`SecurityContextHolder.getContext().getAuthentication()`获取用户信息，例如

```
LoginUser loginUser = SecurityUtils.getLoginUser()
```

1

绝大多数情况下都是通过同步的方式来获取用户信息，如果通过异步获取还需要添加`AsyncConfigurerSupport`处理。

```
// 启动类上面添加，开启异步调用
@EnableAsync
// 方法上面添加，异步执行
@Async
```

1\
2\
3\
4

```
package com.ruoyi.framework.config;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.security.concurrent.DelegatingSecurityContextExecutorService;

@Configuration
public class AsyncConfig extends AsyncConfigurerSupport
{
    /**
     * 异步执行需要使用权限框架自带的包装线程池 保证权限信息的传递
     */
    @Override
    public Executor getAsyncExecutor()
    {
        return new DelegatingSecurityContextExecutorService(Executors.newFixedThreadPool(5));
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E5%90%8E%E7%AB%AF%E6%8E%A5%E5%8F%A3) 前端如何配置后端接口

对于特殊情况，需要直接调用后台接口或者指定域名可以修改`.env.production`文件`VUE_APP_BASE_API`属性

```
# 后端接口地址
VUE_APP_BASE_API = '//localhost:8080'
```

1\
2

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0%E6%88%90%E5%8A%9F%E4%B8%8D%E8%83%BD%E6%98%BE%E7%A4%BA) 图片上传成功不能显示

文件上传成功后，请求访问后台地址会根据`profile`进行匹配，需要自己配置`nginx`代理，参考如下。

```
location /profile/ {
    # 方式一：指向地址
    proxy_pass http://127.0.0.1:9999/profile/; 
}
```

1\
2\
3\
4

```
location /profile/
{
    # 方式二：指向目录，对应后台`application.yml`中的`profile`配置
    alias /home/ruoyi/uploadPath/;
}
```

1\
2\
3\
4\
5

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8A%E4%BC%A0%E5%9C%B0%E5%9D%80) 富文本自定义上传地址

需要设置`:uploadUrl`属性，指定上传地址。

```
<editor v-model="form.noticeContent" :min-height="192" :uploadUrl="uploadUrl" />

export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/common/upload",
}
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%98%BE%E7%A4%BAhtml%E5%86%85%E5%AE%B9) 富文本显示HTML内容

需要定义在`ql-container ql-snow/ql-editor`样式里面。

```
<div class="ql-container ql-snow">
  <div class="ql-editor" v-html="form.noticeContent"/>
</div>
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E5%9B%BE%E7%89%87%E5%A6%82%E4%BD%95%E6%8B%96%E6%8B%BD) 富文本图片如何拖拽

1、安装依赖

```
npm install quill-image-resize-module
```

1

2、在`vue.config.js`文件中新增以下代码

```
const webpack = require('webpack');
....

plugins: [
  ....
  new webpack.ProvidePlugin({
	'window.Quill': 'quill/dist/quill.js',
	'Quill': 'quill/dist/quill.js',
  })
],
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

3、修改富文本组件`src\components\Editor\index.vue`

```
....
....
<script>
....
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize);

export default {
  name: "Editor",
  data() {
    return {
      ....
      options: {
        ....
        modules: {
          ....
          //图片缩放
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
        },
        ....
      },
    };
  },
  ....
};
</script>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%A6%82%E4%BD%95%E9%BB%98%E8%AE%A4%E5%B1%95%E5%BC%80) 侧边栏如何默认展开

某些场景下，用户需要默认展开侧边栏的某些`sub-menu`，可以通过`default-openeds`来进行设置。

`layout\components\Sidebar\index.vue`

```
<el-menu
	:default-openeds="['/system', '/tool']"
	:default-active="activeMenu"
	:collapse="isCollapse"
	:background-color="settings.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg"
	:text-color="settings.sideTheme === 'theme-dark' ? variables.menuText : 'rgba(0,0,0,.65)'"
	:unique-opened="false"
	:active-text-color="settings.theme"
	:collapse-transition="false"
	mode="vertical"
    >
	<sidebar-item v-for="route in sidebarRouters" :key="route.path  + index" :item="route" :base-path="route.path" />
  </el-menu>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%B0%83%E6%95%B4%E5%B7%A6%E4%BE%A7%E8%8F%9C%E5%8D%95%E5%AE%BD%E5%BA%A6) 如何调整左侧菜单宽度

如果觉得左侧菜单宽度不够，可以进行调整。

在`ruoyi-ui\src\assets\styles\variables.scss`修改变量`$sideBarWidth: 200px;`

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%B7%A6%E4%BE%A7%E8%8F%9C%E5%8D%95%E5%A6%82%E4%BD%95%E9%BB%98%E8%AE%A4%E6%94%B6%E7%BC%A9) 左侧菜单如何默认收缩

在`ruoyi-ui\src\store\modules\app.js`修改变量`opened: false;`

```
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}
```

1\
2\
3\
4\
5\
6\
7\
8

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E8%8F%9C%E5%8D%95%E5%90%8D%E7%A7%B0%E8%BF%87%E9%95%BF%E6%98%BE%E7%A4%BA%E4%B8%8D%E5%85%A8) 菜单名称过长显示不全

菜单名称太长的话超出宽度部分会显示`...`，此时我们可以自己调整一下菜单的宽度或者设置一个`title`，这样鼠标移动上去显示完整的菜单名称。

在`layout\components\Sidebar\SidebarItem.vue`文件设置`:title`

```
<sidebar-item
  v-for="child in item.children"
  :key="child.path"
  :is-nest="true"
  :item="child"
  :title="child.meta.title"
  :base-path="resolvePath(child.path)"
  class="nest-menu"
/>
```

1\
2\
3\
4\
5\
6\
7\
8\
9

在`layout\components\Sidebar\Item.vue`文件设置`title={(title)}`

```
if (title) {
  vnodes.push(<span slot='title' title={(title)}>{(title)}</span>)
}
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E8%BF%9B%E5%85%A5%E9%A6%96%E9%A1%B5%E9%BB%98%E8%AE%A4%E8%AE%B0%E5%BF%86%E6%8E%A7%E5%88%B6%E5%8F%B0) 进入首页默认记忆控制台

例如用户退出后，下次登陆系统，能默认打开之前工作路径。

可以在`request.js`，修改`LogOut`

```
store.dispatch('LogOut').then(() => {
  location.href = '/index';
})
```

1\
2\
3

换成

```
store.dispatch('LogOut').then(() => {
  location.reload();
})
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AE%E6%8E%A5%E5%8F%A3%E7%9A%84%E8%B6%85%E6%97%B6%E6%97%B6%E9%97%B4) 如何设置接口的超时时间

**全局超时时间设置src/utils/request.js**

```
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 默认超时时间为10秒，可以自己定义默认的全局 timeout
  timeout: 10000
})
```

1\
2\
3\
4\
5

**针对某个单独接口设置超时时间**

```
// 在自己的接口里面单独加个`timeout`属性就行了
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get',
    timeout: 20000 // 20秒
  })
}
```

1\
2\
3\
4\
5\
6\
7\
8

**针对下载接口单独设置超时时间**

```
// 在自己的接口里面单独加个`timeout`属性就行了
handleExport() {
  this.download('system/xxxx/export', {
	...this.queryParams
  }, `xxxx_${new Date().getTime()}.xlsx`, { timeout: 30000 }) // 30秒
},
```

1\
2\
3\
4\
5\
6

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E9%BB%98%E8%AE%A4%E8%B7%B3%E8%BD%AC%E5%88%B0%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%AD%90%E8%8F%9C%E5%8D%95) 默认跳转到第一个子菜单

在开启`TopNav`时需要点击主菜单时，想默认跳转到第一个子菜单可以在`handleSelect`事件处理。

```
// 菜单选择事件
handleSelect(key, keyPath) {
  this.currentIndex = key;
  if (this.ishttp(key)) {
	// http(s):// 路径新窗口打开
	window.open(key, "_blank");
  } else if (key.indexOf("/redirect") !== -1) {
	// /redirect 路径内部打开
	this.$router.push({ path: key.replace("/redirect", "") });
  } else {
	// 显示左侧联动菜单
	this.activeRoutes(key);

	let myRoutes = [];
	if (this.childrenMenus && this.childrenMenus.length > 0) {
	  this.childrenMenus.map((item) => {
		if (key == item.parentPath || (key == "index" && "" == item.path)) {
		  myRoutes.push(item);
		}
	  });
	}
	setTimeout(() => {
	  if(myRoutes[0].path != this.$route.path) {
		this.$router.replace({
		  path: myRoutes[0].path
		})
	  } else {
		this.$router.replace({
		  path: '/index'
		})
	  }
	}, 100)
  }
},
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E5%9B%BE%E6%A0%87%E5%8A%A0%E8%BD%BD%E6%97%B6%E4%B9%B1%E7%A0%81) 生产环境图标加载时乱码

有一些小伙伴确实会出现这种情况，是因为`dart-sass`的问题，似乎这个作者现在也没打算解决。问题链接：[https://github.com/sass/dart-sass/issues/1219 (opens new window)](https://github.com/sass/dart-sass/issues/1219)

如遇见可以换成`node-sass`。

1、修改`package.json`（记得重新install）。

```
// 添加`node-sass`
"node-sass": "4.14.1",

// 移除`sass`
"sass": "1.32.0",
```

1\
2\
3\
4\
5

2、修改部分文件为`node-sass`语法

`::v-deep`替换成`/deep/`

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E8%A7%A3%E5%86%B3node-sass%E5%AE%89%E8%A3%85%E5%A4%B1%E8%B4%A5) 解决node-sass安装失败

`node-sass` 安装失败的原因 `npm` 安装 `node-sass` 依赖时，会从 `github.com` 上下载 `.node` 文件。由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。 这是使用 `sass` 的同学可能都会遇到的郁闷的问题。

解决方案就是使用其他源，或者使用工具下载，然后将安装源指定到本地。

**解决方法一：使用淘宝镜像源（推荐）**\
设置变量 sass\_binary\_site，指向淘宝镜像地址。示例

```
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

// 也可以设置系统环境变量的方式。示例
// linux、mac 下
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

// window 下
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ && npm install node-sass
```

1\
2\
3\
4\
5\
6\
7\
8

或者设置全局镜像源：

```
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

1

之后再涉及到 node-sass 的安装时就会从淘宝镜像下载。

**解决方法二：使用 cnpm**\
使用 cnpm 安装 node-sass 会默认从淘宝镜像源下载，也是一个办法：

```
cnpm install node-sass
```

1

**解决方法三：创建.npmrc文件**\
在项目根目录创建.npmrc文件，复制下面代码到该文件。

```
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
```

1\
2\
3

保存后 删除之前安装失败的包(第一次安装请跳过此步)

```
npm uninstall node-sass
```

1

重新安装

```
npm install node-sass
```

1

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7%E9%97%AE%E9%A2%98%E9%9C%80%E6%B1%82) 浏览器兼容性问题需求

本项目暂时没有兼容性需求，如有兼容性需求可自行使用 babel-polyfill。

```
// 下载依赖
npm install --save babel-polyfill
```

1\
2

在入口文件中引入

```
import 'babel-polyfill'
// 或者
require('babel-polyfill') //es6
```

1\
2\
3

在 webpack.config.js 中加入 babel-polyfill 到你的入口数组：

```
module.exports = {
  entry: ['babel-polyfill', './app/js']
}
```

1\
2\
3

具体可参考 [link (opens new window)](https://babeljs.io/docs/en/babel-polyfill/)

或者更简单暴力 [polyfill.io (opens new window)](https://cdn.polyfill.io/v3/) 使用它给的一个 cdn 地址，引入这段 js 之后它会自动判断游览器，加载缺少的那部分 polyfill,但国内速度肯能不行，大家可以自己搭 cdn。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%88%86%E6%9E%90%E6%9E%84%E5%BB%BA%E6%96%87%E4%BB%B6%E4%BD%93%E7%A7%AF) 如何分析构建文件体积

如果你的构建文件很大，你可以通过 `webpack-bundle-analyzer` 命令构建并分析依赖模块的体积分布，从而优化你的代码。

```
npm run preview -- --report
```

1

运行之后你就可以在 [http://localhost:9526/report.html (opens new window)](http://localhost:9526/report.html) 页面看到具体的体积分布

![](https://foruda.gitee.com/images/1688696417247105789/f938ab73_1151004.jpeg)

具体的优化可以参考 [Webpack 大法之 Code Splitting (opens new window)](https://zhuanlan.zhihu.com/p/26710831)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%A8%A1%E6%80%81%E6%A1%86%E7%82%B9%E5%87%BB%E7%A9%BA%E7%99%BD%E4%B8%8D%E6%B6%88%E5%A4%B1) 模态框点击空白不消失

设置属性`:close-on-click-modal="false"`

```
<el-dialog :close-on-click-modal="false"></el-dialog>
```

1

如果想全部设置可以在`main.js`中添加以下内容

```
Element.Dialog.props.closeOnClickModal.default = false
```

1

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%BB%99%E6%A8%A1%E6%80%81%E6%A1%86%E6%B7%BB%E5%8A%A0%E6%8B%96%E6%8B%BD) 如何给模态框添加拖拽

设置属性`v-dialogDrag`

```
<el-dialog v-dialogDrag></el-dialog>
```

1

WARNING

如果是`Vue3`版本，拖拽直接使用 `<el-dialog draggable></el-dialog>`

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%A8%A1%E6%80%81%E6%A1%86%E5%8F%AF%E6%8B%96%E5%8A%A8%E5%BC%B9%E7%AA%97%E5%AE%BD%E5%BA%A6) 模态框可拖动弹窗宽度

设置属性`v-dialogDragWidth`

```
<el-dialog v-dialogDragWidth></el-dialog>
```

1

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%A8%A1%E6%80%81%E6%A1%86%E5%8F%AF%E6%8B%96%E5%8A%A8%E5%BC%B9%E7%AA%97%E9%AB%98%E5%BA%A6) 模态框可拖动弹窗高度

设置属性`v-dialogDragHeight`

```
<el-dialog v-dialogDragHeight></el-dialog>
```

1

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%BB%99%E5%AD%97%E5%85%B8%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F) 如何给字典自定义样式

默认提供了`default`、`primary`、`success`、`info`、`warning`、`danger`这几种样式选择，但是有时候并不满足自己的样式需求，那么就可以自定义，参考如下示例流程。

1、我们先在`ruoyi.scss`自定义一个粉色样式

```
.el-tag.custom-pink {
    background-color: #ffeded;
    border-color: #ffdbdb;
    color: #ff66cc;
}
```

1\
2\
3\
4\
5

2、找到对应的数据字典，进入字典数据，新增时填写样式属性为`custom-pink`。

3、在对应的表格页面去实现字典，会根据值匹配加上`custom-pink`样式生效。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%BB%99%E8%A1%A8%E6%A0%BC%E8%87%AA%E9%80%82%E5%BA%94%E9%AB%98%E5%BA%A6) 如何给表格自适应高度

1、`el-table`增加`max-height`属性

```
<el-table :max-height="tableHeight">
```

1

2、`data`增加`tableHeight`变量

```
data() {
  return {
      // 表格高度
      tableHeight: 0,
	  ....
  }
};
```

1\
2\
3\
4\
5\
6\
7

3、`mounted`获取计算高度

```
mounted() {
  this.$nextTick(() => {
    // window.innerHeight 浏览器窗口的可见高度，下面的 220 是除了table最大高度的剩余空间。
    let height = window.innerHeight - this.$refs.queryForm.$el.offsetHeight - 220;
    this.tableHeight = height;
  })
},
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%BB%99%E8%A1%A8%E6%A0%BC%E8%AE%BE%E7%BD%AE%E5%9B%BA%E5%AE%9A%E5%88%97) 如何给表格设置固定列

在`el-table-column`对应列添加`fixed`参数，可选值`left`、`right`

```
<el-table-column label="编号" fixed="left">
<el-table-column label="操作" fixed="right">
```

1\
2

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E7%BB%99%E9%BB%98%E8%AE%A4%E7%9A%84%E8%A1%A8%E6%A0%BC%E5%8A%A0%E8%BE%B9%E6%A1%86) 如何给默认的表格加边框

`el-table` 加上 `border`

```
<el-table border :data="dataList"/>
```

1

如果想全部设置可以在`main.js`中添加以下内容

```
// 带有斑马纹
Element.Table.props.stripe = {
  default:true,
  type:Boolean
}

// 带有边框
Element.Table.props.border = {
  default:true,
  type:Boolean
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E8%A1%A8%E5%8D%95%E6%8C%89%E5%9B%9E%E8%BD%A6%E9%94%AE%E4%BC%9A%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2%E9%97%AE%E9%A2%98) 表单按回车键会刷新页面问题

原因：当表单只有一个输入框时，就会造成该现象。

解决：在`el-form`标签里加上`@submit.native.prevent`即可。

```
<!-- 在这里加 @submit.native.prevent -->
<el-form @submit.native.prevent/>
	<el-form-item>
		<el-input v-model="query"></el-input>
	</el-form-item>
</el-form>
```

1\
2\
3\
4\
5\
6

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%9C%A8%E8%A1%A8%E6%A0%BC%E4%B8%AD%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E9%A2%84%E8%A7%88) 如何在表格中实现图片预览

方式一：使用`img`预览组件

```
<el-table-column label="图片" align="center" prop="url">
    <template slot-scope="scope">
        <img :src="scope.row.url" alt="" style="width: 45px;height: 45px">
    </template>
</el-table-column>
```

1\
2\
3\
4\
5

方式二：使用`image-preview`预览组件（推荐）

```
<!-- 内链地址预览 -->
<el-table-column label="图片" align="center" prop="url" width="100">
  <template slot-scope="scope">
	  <image-preview :src="scope.row.url" :width="50" :height="50"/>
  </template>
</el-table-column>

<!-- 外链地址预览 -->
<el-table-column label="图片" align="center" prop="url" width="100">
  <image-preview src="http://ruoyi.vip/images/logo.png" />
</el-table-column>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11

提示

默认的`img`组件不会携带`VUE_APP_BASE_API`不能被代理，通过`image-preview`封装的预览组件会自动携带`VUE_APP_BASE_API`会被代理。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%BB%84%E4%BB%B6%E5%8D%B8%E8%BD%BD%E9%92%A9%E5%AD%90%E8%A7%A6%E5%8F%91%E6%96%B9%E6%A1%88) 组件卸载钩子触发方案

当一个组件在`<KeepAlive>`中被切换时，它的`activated`和`deactivated`生命周期钩子将被调用，用来替代`mounted`和`unmounted`。这适用于`<KeepAlive>`的直接子节点及其所有子孙节点。

所以我们页面组件在使用`keep-alive`缓存时，卸载就可以换成`activated`和`deactivated`，`Vue3`语法参考示例。

```
// activated 为 keep-alive 包含的组件再次渲染的时候触发
onActivated(() => {
  alert('onMounted');
})

// deactivated 为 keep-alive 包含的组件销毁的时候触发
onDeactivated(() => {
  alert('onBeforeUnmount');
})
```

1\
2\
3\
4\
5\
6\
7\
8\
9

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#nodejs%E7%89%88%E6%9C%AC%E8%BF%87%E9%AB%98%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88) nodejs版本过高解决方案

由于`nodejs`版本过高，可能会导致`vue-cli`项目运行报错。

- 解决方案1：每次启动项目前，输入配置命令：

```
set NODE_OPTIONS=--openssl-legacy-provider
```

1

- 解决方案2：修改`package.json`配置文件：

```
"dev": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve --open",
"build:prod": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build --report",
"build:stage": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build --mode staging",
"preview": "set NODE_OPTIONS=--openssl-legacy-provider && node build/index.js --preview",
```

1\
2\
3\
4

- 解决方案3：使用`nodejs`低版本：

```
https://pan.baidu.com/s/1E9J52g6uW_VFWY34fHL6zA 提取码: vneh

路径地址：微服务工具包/基础工具包/node-v14.16.1-x64.msi
```

1\
2\
3

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%8E%A7%E5%88%B6%E5%8F%B0debuger%E4%BD%8D%E7%BD%AE%E9%94%99%E8%AF%AF%E9%97%AE%E9%A2%98) 控制台debuger位置错误问题

`RuoYi-Vue3`中的`vite-plugin-vue-setup-extend`用于解决`vue3`下`script setup`语法糖下 ，手动设置组件`name`不方便的问题。可能会导致`vue`组件`debuger`时， 断点位置不正确问题，（直至0.4.0版本依旧有该问题）。

目前的解决方案如下： 1、`package.json`新增类型为`commonjs`

```
{
  "name": "ruoyi",
  "version": "3.8.6",
  "description": "若依管理系统",
  "author": "若依",
  "license": "MIT",
  "type": "commonjs",
}
```

1\
2\
3\
4\
5\
6\
7\
8

2、`vite-plugin-vue-setup-extend`替换为`unplugin-vue-setup-extend-plus`

```
"unplugin-vue-setup-extend-plus": "1.0.0"
```

1

3、`vite\plugins\setup-extend.js`修改为`unplugin-vue-setup-extend-plus/vite`

```
import setupExtend from 'unplugin-vue-setup-extend-plus/vite'

export default function createSetupExtend() {
    return setupExtend({})
}
```

1\
2\
3\
4\
5

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BD%BF%E7%94%A8localstorage%E4%BB%A3%E6%9B%BFcookie) 使用localStorage代替cookie

对于一些特殊情况或需求，项目不需要`cookie`，那么我们可以使用`localStorage`来代替。

1、`package.json`删除`cookie`的相关依赖`"js-cookie": "3.0.1",`

`main.js`、`store/modules/app.js`、`utils/auth.js`、`login.vue`文件，删除导入的`import Cookies from 'js-cookie'`

2、`main.js`的`Cookies.get`更换为`localStorage.getItem`

```
Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium' // set element-ui default size
})
```

1\
2\
3

3、`utils/auth.js`更换`Cookies`相关方法为`localStorage`

```
const TokenKey = 'Admin-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

4、`store/modules/app.js`更换`Cookies`相关方法为`localStorage`

```
const state = {
  sidebar: {
    opened: localStorage.getItem('sidebarStatus') ? !!+localStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false,
    hide: false
  },
  device: 'desktop',
  size: localStorage.getItem('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.hide) {
      return false;
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    localStorage.setItem('size', size)
  },
  SET_SIDEBAR_HIDE: (state, status) => {
    state.sidebar.hide = status
  }
}
....
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40

5、`login.vue`更换`Cookies`相关方法为`localStorage`

```
....
getCookie() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const rememberMe = localStorage.getItem('rememberMe')
  this.loginForm = {
	username: username === null ? this.loginForm.username : username,
	password: password === null ? this.loginForm.password : decrypt(password),
	rememberMe: rememberMe === null ? false : Boolean(rememberMe)
  };
},
handleLogin() {
  this.$refs.loginForm.validate(valid => {
	if (valid) {
	  this.loading = true;
	  if (this.loginForm.rememberMe) {
		localStorage.setItem("username", this.loginForm.username);
		localStorage.setItem("password", encrypt(this.loginForm.password));
		localStorage.setItem('rememberMe', this.loginForm.rememberMe);
	  } else {
		localStorage.removeItem("username");
		localStorage.removeItem("password");
		localStorage.removeItem('rememberMe');
	  }
	  this.$store.dispatch("Login", this.loginForm).then(() => {
		this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
	  }).catch(() => {
		this.loading = false;
		if (this.captchaEnabled) {
		  this.getCode();
		}
	  });
	}
  });
}
....
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%94%AF%E6%8C%81%E5%A4%9A%E7%B1%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93) 如何支持多类型数据库

[参考如何支持多类型数据库](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E6%94%AF%E6%8C%81%E5%A4%9A%E7%B1%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%99%8D%E4%BD%8Emysql%E9%A9%B1%E5%8A%A8%E7%89%88%E6%9C%AC) 如何降低mysql驱动版本

[参考如何降低mysql驱动版本](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E9%99%8D%E4%BD%8Emysql%E9%A9%B1%E5%8A%A8%E7%89%88%E6%9C%AC)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AEtomcat%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97) 如何配置tomcat访问日志

[参考如何配置tomcat访问日志](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AEtomcat%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E9%A1%B9%E7%9B%AE%E8%AE%BF%E9%97%AE%E6%A0%B9%E8%B7%AF%E5%BE%84) 如何配置项目访问根路径

[参考如何配置项目访问根路径](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E9%A1%B9%E7%9B%AE%E8%AE%BF%E9%97%AE%E6%A0%B9%E8%B7%AF%E5%BE%84)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7%E5%88%9B%E5%BB%BA%E6%96%87%E4%BB%B6%E6%97%A0%E6%9D%83%E9%99%90) 普通用户创建文件无权限

[参考普通用户创建文件无权限](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7%E5%88%9B%E5%BB%BA%E6%96%87%E4%BB%B6%E6%97%A0%E6%9D%83%E9%99%90)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#swagger%E7%9A%84%E5%90%AF%E7%94%A8%E5%92%8C%E7%A6%81%E7%94%A8) Swagger的启用和禁用

[Swagger的启用和禁用](https://doc.ruoyi.vip/ruoyi/other/faq.html#Swagger%E7%9A%84%E5%90%AF%E7%94%A8%E5%92%8C%E7%A6%81%E7%94%A8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%B1%89%E5%8C%96%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3swagger) 如何汉化系统接口Swagger

[参考如何汉化系统接口Swagger](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E6%B1%89%E5%8C%96%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3swagger)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#swagger%E6%8E%A5%E5%8F%A3%E5%87%BA%E7%8E%B0%E8%BD%AC%E6%8D%A2%E9%94%99%E8%AF%AF) Swagger接口出现转换错误

[参考Swagger接口出现转换错误](https://doc.ruoyi.vip/ruoyi/other/faq.html#Swagger%E6%8E%A5%E5%8F%A3%E5%87%BA%E7%8E%B0%E8%BD%AC%E6%8D%A2%E9%94%99%E8%AF%AF)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%AF%BC%E5%87%BA%E6%95%B0%E6%8D%AE%E5%88%97%E8%A1%A8pdf%E6%A0%BC%E5%BC%8F) 如何导出数据列表PDF格式

[参考如何导出数据列表PDF格式](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E5%AF%BC%E5%87%BA%E6%95%B0%E6%8D%AE%E5%88%97%E8%A1%A8PDF%E6%A0%BC%E5%BC%8F)

前端文件对应方法修改文件名`xlsx`后缀为`pdf`

```
/** 导出按钮操作 */
handleExport() {
  this.download('xxxx/xxxx/export', {
	...this.queryParams
  }, `config_${new Date().getTime()}.pdf`)
}
```

1\
2\
3\
4\
5\
6

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95excel%E5%AF%BC%E5%87%BA%E6%97%B6%E6%B7%BB%E5%8A%A0%E6%B0%B4%E5%8D%B0) 如何Excel导出时添加水印

[参考如何Excel导出时添加水印](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95Excel%E5%AF%BC%E5%87%BA%E6%97%B6%E6%B7%BB%E5%8A%A0%E6%B0%B4%E5%8D%B0)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95excel%E5%AF%BC%E5%87%BA%E5%AD%90%E5%AF%B9%E8%B1%A1%E5%A4%9A%E4%B8%AA%E5%AD%97%E6%AE%B5) 如何Excel导出子对象多个字段

[参考如何Excel导出子对象多个字段](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95excel%E5%AF%BC%E5%87%BA%E5%AD%90%E5%AF%B9%E8%B1%A1%E5%A4%9A%E4%B8%AA%E5%AD%97%E6%AE%B5)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#tomcat%E9%83%A8%E7%BD%B2%E5%A4%9A%E4%B8%AAwar%E5%8C%85%E9%A1%B9%E7%9B%AE%E5%BC%82%E5%B8%B8) Tomcat部署多个War包项目异常

[参考Tomcat部署多个War包项目异常](https://doc.ruoyi.vip/ruoyi/other/faq.html#tomcat%E9%83%A8%E7%BD%B2%E5%A4%9A%E4%B8%AAwar%E5%8C%85%E9%A1%B9%E7%9B%AE%E5%BC%82%E5%B8%B8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#tomcat%E4%B8%B4%E6%97%B6%E7%9B%AE%E5%BD%95tmp%E6%8A%9B%E9%94%99%E8%AF%AF%E5%BC%82%E5%B8%B8) Tomcat临时目录tmp抛错误异常

[参考Tomcat临时目录tmp抛错误异常](https://doc.ruoyi.vip/ruoyi/other/faq.html#tomcat%E4%B8%B4%E6%97%B6%E7%9B%AE%E5%BD%95tmp%E6%8A%9B%E9%94%99%E8%AF%AF%E5%BC%82%E5%B8%B8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2%E9%85%8D%E7%BD%AE%E6%94%AF%E6%8C%81https%E8%AE%BF%E9%97%AE) 如何部署配置支持https访问

[参考如何部署配置支持https访问](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2%E9%85%8D%E7%BD%AE%E6%94%AF%E6%8C%81https%E8%AE%BF%E9%97%AE)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A2%AB%E8%BF%87%E6%BB%A4%E7%9A%84%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95) 特殊字符串被过滤的解决办法

[参考特殊字符串被过滤的解决办法](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%A2%AB%E8%BF%87%E6%BB%A4%E7%9A%84%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#linux%E7%B3%BB%E7%BB%9F%E9%AA%8C%E8%AF%81%E7%A0%81%E4%B9%B1%E7%A0%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95) Linux系统验证码乱码解决方法

[参考Linux系统验证码乱码解决方法](https://doc.ruoyi.vip/ruoyi/other/faq.html#linux%E7%B3%BB%E7%BB%9F%E9%AA%8C%E8%AF%81%E7%A0%81%E4%B9%B1%E7%A0%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%85%AC%E5%85%B1%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E6%B2%A1%E6%9C%89%E8%A2%AB%E6%89%A7%E8%A1%8C) 公共数据库定时任务没有被执行

[参考公共数据库定时任务没有被执行](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%85%AC%E5%85%B1%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E6%B2%A1%E6%9C%89%E8%A2%AB%E6%89%A7%E8%A1%8C)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86long%E7%B1%BB%E5%9E%8B%E7%B2%BE%E5%BA%A6%E4%B8%A2%E5%A4%B1%E9%97%AE%E9%A2%98) 如何处理Long类型精度丢失问题

[如何处理Long类型精度丢失问题](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86long%E7%B1%BB%E5%9E%8B%E7%B2%BE%E5%BA%A6%E4%B8%A2%E5%A4%B1%E9%97%AE%E9%A2%98)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9swagger%E9%BB%98%E8%AE%A4%E8%AE%BF%E9%97%AE%E5%9C%B0%E5%9D%80) 如何修改Swagger默认访问地址

由于采用的前后端分离模式，且前端`Swagger`使用的`iframe`打开页面。所以默认请求的是前端地址，然后前端通过代理转发到后端接口。对于特殊情况需要直接请求后端提供如下方案：

方案1：使用新窗口打开，不要用`iframe`打开。因为`swagger`默认是获取当前服务的地址。

方案2：在`SwaggerConfig`配置中`createRestApi`方法设置后端的地址。

```
return new Docket(DocumentationType.SWAGGER_2)
    ....
	// 后端地址
    .host("localhost:8080")
```

1\
2\
3\
4

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%BB%98%E8%AE%A4%E6%98%BE%E7%A4%BA%E9%A1%B6%E9%83%A8%E5%AF%BC%E8%88%AA%E6%A0%8F%E8%8F%9C%E5%8D%95) 如何默认显示顶部导航栏菜单

在`ruoyi-ui\src\settings.js`中设置`topNav`为`true`表示显示顶部导航，也可以在用户布局设置中开启`TopNav`后保存配置。

```
/**
* 是否显示顶部导航
*/
topNav: true,
```

1\
2\
3\
4

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E8%B6%85%E7%BA%A7%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95%E5%AF%86%E7%A0%81) 如何修改超级管理员登录密码

1、如果是自己知道超级管理员的密码且需要修改的情况。\
默认口令 `admin/admin123`，可以登录后在首页个人中心修改密码。

2、如果自己忘记了超级管理员的密码可以重新生成秘钥替换数据库密码。

```
public static void main(String[] args)
{
	System.out.println(SecurityUtils.encryptPassword("admin123"));
}
```

1\
2\
3\
4

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE%E7%9B%91%E6%8E%A7%E7%99%BB%E5%BD%95%E8%B4%A6%E6%88%B7%E5%AF%86%E7%A0%81) 如何修改数据监控登录账户密码

[参考如何修改数据监控登录账户密码](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE%E7%9B%91%E6%8E%A7%E7%99%BB%E5%BD%95%E8%B4%A6%E6%88%B7%E5%AF%86%E7%A0%81)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AE%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E7%BC%93%E5%AD%98%E8%B6%85%E6%97%B6%E6%97%B6%E9%97%B4) 如何设置用户登录缓存超时时间

找到`ruoyi-admin\src\main\resources`下面的`application.yml`配置文件

```
# token配置
token:
    # 令牌有效期（默认30分钟）
    expireTime: 30
```

1\
2\
3\
4

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%89%8D%E7%AB%AF%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4%E6%88%B3%E5%86%85%E5%AE%B9) 如何格式化前端日期时间戳内容

对应一些时间格式需要在前端进行格式化操作情况，解决方案如下

1、后端使用`JsonFormat`注解格式化日期，时间戳`yyyy-MM-dd HH:mm:ss`

```
/** 创建时间 */
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private Date time;
```

1\
2\
3

2、前端使用`parseTime`方法格式化日期，时间戳`{y}-{m}-{d} {h}:{i}:{s}`

```
<el-table-column label="创建时间" align="center" prop="createTime" width="160">
	<template slot-scope="scope">
	  <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
	</template>
</el-table-column>
```

1\
2\
3\
4\
5

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#redis%E7%BC%93%E5%AD%98lettuce%E6%9B%BF%E6%8D%A2%E6%88%90jedis) Redis缓存lettuce替换成jedis

在`springboot`中引入`spring-boot-starter-data-redis`依赖时，默认使用的时`lettuce`，有时可能我们不想使用`lettuce`而是使用`Jedis`来操作`redis`，这就需要我们在引入`spring-boot-starter-data-redis`依赖时做排除`lettuce`，操作如下：

1、在`ruoyi-common\pom.xml`手动添加`jedis`依赖，排除`lettuce`。

```
<!-- redis 缓存操作 -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
	<exclusions>
		<exclusion>
			<groupId>io.lettuce</groupId>
			<artifactId>lettuce-core</artifactId>
		</exclusion>
	</exclusions>
</dependency>

<dependency>
	<groupId>redis.clients</groupId>
	<artifactId>jedis</artifactId>
</dependency>
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16

2、在`application.yml`中替换配置，配置基本同上，只需要将lettuce换成jedis即可。

```
spring:
  redis:
    jedis:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 0
        # 连接池中的最大空闲连接
        max-idle: 8
        # 连接池的最大数据库连接数
        max-active: 8
        # #连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%99%BB%E5%BD%95%E9%A1%B5%E5%A6%82%E4%BD%95%E5%BC%80%E5%90%AF%E6%B3%A8%E5%86%8C%E7%94%A8%E6%88%B7%E5%8A%9F%E8%83%BD) 登录页如何开启注册用户功能

在菜单`参数设置`修改参数键名`sys.account.registerUser`设置`true`即可。默认为`false`关闭。

同时在前端`login.vue`页面需要设置属性`register`注册开关为`true`。

```
export default {
  name: "Login",
  data() {
    return {
      // 注册开关
      register: true,
	  .......
```

1\
2\
3\
4\
5\
6\
7

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2%E5%A6%82%E4%BD%95%E4%B8%8D%E6%98%BE%E7%A4%BA%E9%AA%8C%E8%AF%81%E7%A0%81) 登录页面如何不显示验证码

在菜单`参数设置`修改参数键名`sys.account.captchaEnabled`设置`false`即可。默认为`true`开启。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E9%99%90%E5%88%B6%E8%B4%A6%E6%88%B7%E4%B8%8D%E5%85%81%E8%AE%B8%E5%A4%9A%E7%BB%88%E7%AB%AF%E7%99%BB%E5%BD%95) 如何限制账户不允许多终端登录

这本来是一个可有可无的问题，不过经常有小伙伴有这样的需求。废话不多说，先来看同一用户不同终端限制登录的解决方法。方法很简单，大致思路就是做出userid与token（一个用户对应一个token，userid唯一）的键值对，存于缓存中。用于登录时判断用户是否在别的终端在线。详细实现代码如下：

1、`application.yml`新增一个配置`soloLogin`用于限制多终端同时登录。

```
# token配置
token:
    # 是否允许账户多终端同时登录（true允许 false不允许）
    soloLogin: false
```

1\
2\
3\
4

2、`Constants.java`新增一个常量`LOGIN_USERID_KEY`公用

```
/**
 * 登录用户编号 redis key
 */
public static final String LOGIN_USERID_KEY = "login_userid:";
```

1\
2\
3\
4

3、调整`TokenService.java`，存储&刷新缓存用户编号信息

```
// 是否允许账户多终端同时登录（true允许 false不允许）
@Value("${token.soloLogin}")
private boolean soloLogin;

/**
 * 删除用户身份信息
 */
public void delLoginUser(String token, Long userId)
{
	if (StringUtils.isNotEmpty(token))
	{
		String userKey = getTokenKey(token);
		redisCache.deleteObject(userKey);
	}
	if (!soloLogin && StringUtils.isNotNull(userId))
	{
		String userIdKey = getUserIdKey(userId);
		redisCache.deleteObject(userIdKey);
	}
}

/**
 * 刷新令牌有效期
 * 
 * @param loginUser 登录信息
 */
public void refreshToken(LoginUser loginUser)
{
	loginUser.setLoginTime(System.currentTimeMillis());
	loginUser.setExpireTime(loginUser.getLoginTime() + expireTime * MILLIS_MINUTE);
	// 根据uuid将loginUser缓存
	String userKey = getTokenKey(loginUser.getToken());
	redisCache.setCacheObject(userKey, loginUser, expireTime, TimeUnit.MINUTES);
	if (!soloLogin)
	{
		// 缓存用户唯一标识，防止同一帐号，同时登录
		String userIdKey = getUserIdKey(loginUser.getUser().getUserId());
		redisCache.setCacheObject(userIdKey, userKey, expireTime, TimeUnit.MINUTES);
	}
}

private String getUserIdKey(Long userId)
{
	return Constants.LOGIN_USERID_KEY + userId;
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36\
37\
38\
39\
40\
41\
42\
43\
44\
45

4、自定义退出处理类`LogoutSuccessHandlerImpl.java`清除缓存方法添加用户编号

```
// 删除用户缓存记录
tokenService.delLoginUser(loginUser.getToken(), loginUser.getUser().getUserId());
```

1\
2

5、登录方法`SysLoginService.java`，验证如果用户不允许多终端同时登录，清除缓存信息

```
// 是否允许账户多终端同时登录（true允许 false不允许）
@Value("${token.soloLogin}")
private boolean soloLogin;
	
if (!soloLogin)
{
	// 如果用户不允许多终端同时登录，清除缓存信息
	String userIdKey = Constants.LOGIN_USERID_KEY + loginUser.getUser().getUserId();
	String userKey = redisCache.getCacheObject(userIdKey);
	if (StringUtils.isNotEmpty(userKey))
	{
		redisCache.deleteObject(userIdKey);
		redisCache.deleteObject(userKey);
	}
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E9%83%A8%E7%BD%B2%E5%A4%9A%E4%B8%AA%E9%A1%B9%E7%9B%AE%E7%9A%84redis%E7%BC%93%E5%AD%98) 如何区分部署多个项目的Redis缓存

如果部署了多个若依系统，连接的是同一个`Redis`源时会导致`Key`值冲突，我们可以修改`Redis`默认的序列化值用于区分。

1、新增`RedisKeySerializer.java`序列化，添加`Key`前缀值。

```
@Component
public class RedisKeySerializer implements RedisSerializer<String>
{
    @Autowired
    private RuoYiConfig config;

    private final Charset charset;

    public RedisKeySerializer()
    {
        this(Charset.forName("UTF8"));
    }

    public RedisKeySerializer(Charset charset)
    {
        Assert.notNull(charset, "字符集不允许为NULL");
        this.charset = charset;
    }

    @Override
    public byte[] serialize(String string) throws SerializationException
    {
        // 通过项目名称ruoyi.name来定义Redis前缀，用于区分项目缓存
        if (StringUtils.isNotEmpty(config.getName()))
        {
            return new StringBuilder(config.getName()).append(":").append(string).toString().getBytes(charset);
        }
        return string.getBytes(charset);
    }

    @Override
    public String deserialize(byte[] bytes) throws SerializationException
    {
        return (bytes == null ? null : new String(bytes, charset));
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
26\
27\
28\
29\
30\
31\
32\
33\
34\
35\
36

2、修改`RedisConfig.java`，配置新的`RedisKeySerializer`。

```
@Bean
@SuppressWarnings(value = { "unchecked", "rawtypes" })
public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory, RedisKeySerializer redisKeySerializer)
{
	....

	// 使用StringRedisSerializer来序列化和反序列化redis的key值
    template.setKeySerializer(redisKeySerializer);
    template.setValueSerializer(serializer);

    // Hash的key也采用StringRedisSerializer的序列化方式
    template.setHashKeySerializer(redisKeySerializer);
    template.setHashValueSerializer(serializer);

	template.afterPropertiesSet();
	return template;
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17

3、修改`CacheController.java`，添加缓存`Key`前缀。

```
public static final String REDIS_NAME = "RuoYi:";

private final static List<SysCache> caches = new ArrayList<SysCache>();
{
	caches.add(new SysCache(REDIS_NAME + CacheConstants.LOGIN_TOKEN_KEY, "用户信息"));
	caches.add(new SysCache(REDIS_NAME + CacheConstants.SYS_CONFIG_KEY, "配置信息"));
	caches.add(new SysCache(REDIS_NAME + CacheConstants.SYS_DICT_KEY, "数据字典"));
	caches.add(new SysCache(REDIS_NAME + CacheConstants.CAPTCHA_CODE_KEY, "验证码"));
	caches.add(new SysCache(REDIS_NAME + CacheConstants.REPEAT_SUBMIT_KEY, "防重提交"));
	caches.add(new SysCache(REDIS_NAME + CacheConstants.RATE_LIMIT_KEY, "限流处理"));
	caches.add(new SysCache(REDIS_NAME + CacheConstants.PWD_ERR_CNT_KEY, "密码错误次数"));
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12

此时自定义配置`application.yml`中的`ruoyi.name`就会把所有`redis key`加上对应的前缀。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%89%8D%E7%AB%AF%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E5%A6%82%E4%BD%95%E6%95%B4%E5%90%88%E5%88%B0%E5%90%8E%E7%AB%AF%E8%AE%BF%E9%97%AE) 前端静态资源如何整合到后端访问

分离版本都是前端和后端单独部署的，但是有些特殊情况想把前端静态资源整合到后端。提供如下方案：

1、修改`ruoyi-ui`中的`.env.production`（二选一）

```
// 本机地址访问
VUE_APP_BASE_API = '/'
```

1\
2

```
// 任意地址访问
VUE_APP_BASE_API = '//localhost:8080'
```

1\
2

2、修改`ruoyi-ui`中的`router/index.js`，设置`mode`属性为`hash`

```
export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
```

1\
2\
3\
4\
5

3、执行`bin\build.bat`打包前端静态资源文件。

4、修改后端`resources`中的`application.yml`，添加`thymeleaf`模板引擎配置

```
spring:
  # 模板引擎
  thymeleaf:
    mode: HTML
    encoding: utf-8
    cache: false
```

1\
2\
3\
4\
5\
6

5、修改后端`ruoyi-admin/pom.xml`，增加`thymeleaf`模板引擎依赖

```
<!-- spring-boot-thymeleaf -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

1\
2\
3\
4\
5

6、修改后端`ResourcesConfig.java`中的addResourceHandlers，添加静态资源映射地址

```
/** 前端静态资源配置 */
registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
```

1\
2

7、修改后端`SecurityConfig.java`中的configure，添加允许访问的地址。

```
.antMatchers(
		HttpMethod.GET,
		"/*.html",
		"/**/*.html",
		"/**/*.css",
		"/**/*.js",
		"/static/**",
		"/",
		"/index"
).permitAll()
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10

8、后端新建访问控制处理`IndexController.java`设置对应访问页面。

```
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController
{
    // 系统首页
    @GetMapping(value = { "/", "/index", "/login" })
    public String index()
    {
        return "index";
    }
}
```

1\
2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13

9、整合前端`dist`静态资源文件到后端

- 后端`resources`下新建`templates`目录，复制静态页面`index.html`过来。
- 复制静态文件`static`到`resources`目录下。

10、启动测试访问地址

打开浏览器，输入：`http://localhost:8080` 能正常访问和登录表示成功。

注意

由于切换成了一个应用启动前后端，所以不需要通过代理跳转，前端组件如果用到`process.env.VUE_APP_BASE_API`可以进行删除。防止打包部署后访问不到后端。

例如：`process.env.VUE_APP_BASE_API + "/common/upload"` 换成 `"/common/upload"`，还有哪里用到了自己全局搜索一下删除。

如果嫌麻烦还有一种简单的方式，将`.env.production`的`VUE_APP_BASE_API`改成空字符串。 `VUE_APP_BASE_API = ''`，然后将`index.html`移动到`static`目录下，同时访问地址则变成 `http://localhost:8080/index.html`，另外`IndexController.java`可以删除。

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E4%BD%BF%E7%94%A8velocity%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E%E5%85%BC%E5%AE%B9-%E7%AC%A6%E5%8F%B7) 使用Velocity模板引擎兼容$符号

[使用Velocity模板引擎兼容$符号](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E4%BD%BF%E7%94%A8Velocity%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E%E5%85%BC%E5%AE%B9$%E7%AC%A6%E5%8F%B7)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%99%BB%E5%BD%95%E5%AF%86%E7%A0%81%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%8A%A0%E5%AF%86%E4%BC%A0%E8%BE%93%E6%96%B9%E5%BC%8F) 登录密码如何使用加密传输方式

[集成jsencrypt实现密码加密传输方式](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90jsencrypt%E5%AE%9E%E7%8E%B0%E5%AF%86%E7%A0%81%E5%8A%A0%E5%AF%86%E4%BC%A0%E8%BE%93%E6%96%B9%E5%BC%8F)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90%E4%BA%8B%E5%8A%A1%E7%9A%84%E4%B8%80%E8%87%B4%E6%80%A7) 如何解决多数据源事务的一致性

[参考如何解决多数据源事务的一致性](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%A4%9A%E6%95%B0%E6%8D%AE%E6%BA%90%E4%BA%8B%E5%8A%A1%E7%9A%84%E4%B8%80%E8%87%B4%E6%80%A7)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E7%99%BB%E5%BD%95%E5%87%BA%E7%8E%B0datatypeconverter%E5%BC%82%E5%B8%B8) 登录出现DatatypeConverter异常

错误提示：`Handler dispatch failed; nested exception is java.lang.NoClassDefFoundError: javax/xml/bind/DatatypeConverter`

由于`>= jdk9`中不再包含这个`jar`包，所以需要在`ruoyi-common\pom.xml`手动添加依赖。

```
<dependency>
	<groupId>javax.xml.bind</groupId>
	<artifactId>jaxb-api</artifactId>
	<version>2.3.1</version>
</dependency>
```

1\
2\
3\
4\
5

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%8C%BF%E5%90%8D%E6%B3%A8%E8%A7%A3%E5%90%AF%E5%8A%A8%E6%8A%A5%E9%94%99) 如何解决匿名注解启动报错

SpringBoot`2.6.0`默认是`ant_path_matcher`解析方式，但是`2.6.0`之后默认是`path_pattern_parser`解析方式。

所以导致读取注解类方法需要对应的调整，当前若依项目默认版本是`2.5.x`，如果使用大于`2.6.x`，需要将`info.getPatternsCondition().getPatterns()`修改为`info.getPathPatternsCondition().getPatternValues()`

```
// 获取方法上边的注解 替代path variable 为 *
Anonymous method = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Anonymous.class);
Optional.ofNullable(method).ifPresent(anonymous -> Objects.requireNonNull(info.getPathPatternsCondition().getPatternValues()) // 
		.forEach(url -> urls.add(RegExUtils.replaceAll(url, PATTERN, ASTERISK))));

// 获取类上边的注解, 替代path variable 为 *
Anonymous controller = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Anonymous.class);
Optional.ofNullable(controller).ifPresent(anonymous -> Objects.requireNonNull(info.getPathPatternsCondition().getPatternValues())
		.forEach(url -> urls.add(RegExUtils.replaceAll(url, PATTERN, ASTERISK))));
```

1\
2\
3\
4\
5\
6\
7\
8\
9

注意，如果通过配置修改了解析方式

```
# Spring配置
spring:
  mvc:
    pathmatch:
      matching-strategy: xxxx
```

1\
2\
3\
4\
5

处理映射匹配也需要对应的去修改 `ant_path_matcher` -> `info.getPatternsCondition().getPatterns()` `path_pattern_parser` -> `info.getPathPatternsCondition().getPatternValues()`

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E4%BC%98%E9%9B%85%E7%9A%84%E5%85%B3%E9%97%AD%E5%90%8E%E5%8F%B0%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1) 如何优雅的关闭后台系统服务

[参考集成actuator实现优雅关闭应用](https://doc.ruoyi.vip/ruoyi-vue/document/cjjc.html#%E9%9B%86%E6%88%90actuator%E5%AE%9E%E7%8E%B0%E4%BC%98%E9%9B%85%E5%85%B3%E9%97%AD%E5%BA%94%E7%94%A8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%AF%BC%E5%87%BA%E4%BD%BF%E7%94%A8%E4%B8%8B%E8%BD%BD%E6%8F%92%E4%BB%B6%E5%87%BA%E7%8E%B0%E5%BC%82%E5%B8%B8) 如何解决导出使用下载插件出现异常

[参考如何解决导出使用下载插件出现异常](https://doc.ruoyi.vip/ruoyi/other/faq.html#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%AF%BC%E5%87%BA%E4%BD%BF%E7%94%A8%E4%B8%8B%E8%BD%BD%E6%8F%92%E4%BB%B6%E5%87%BA%E7%8E%B0%E5%BC%82%E5%B8%B8)

## [#](https://doc.ruoyi.vip/ruoyi-vue/other/faq.html#%E6%9B%B4%E5%A4%9A%E9%A1%B9%E7%9B%AE%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E6%9F%A5%E8%AF%A2) 更多项目常见问题查询

分离版本问题和不分离版本大多数雷同。

[RuoYi不分离版本常见问题点我进入](https://doc.ruoyi.vip/ruoyi/other/faq.html)

---
