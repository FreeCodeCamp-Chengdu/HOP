# Hackathon Open Platform（黑客马拉松 开放平台）

本项目最初作为 [FCC 成都社区](https://freecodecamp-chengdu.github.io) 2017年初内部组织的【半程黑客马拉松】的演练项目而开发，旨在为 **Hackathon 爱好者**提供 活动发布、报名组队、参赛项目信息跟踪、原型版 demo 部署一条龙服务。



## 【原型设计】

https://github.com/FreeCodeCamp-Chengdu/HOP/milestone/1

活动组织者、参与者用 GitHub 登录，即可发布活动、报名组队。

| GDN      | GitHub                     |
|:--------:|:--------------------------:|
| 黑客松平台 | Organization               |
| 黑客松活动 | Organization 一级 Team      |
| 参赛队    | Organization 二级 Team      |
| 参赛队员   | Organization 二级 Team 成员 |
| 参赛项目   | Organization 代码库         |

队长在仓库 issue 页创建 milestone，并把分工好的各项任务创建为其下的 issue，本平台便可显示该队伍开发进度。

开发结束后，活动组织者 提交部署项目代码的请求，本平台程序猿审核代码安全性后，即可允许自动执行 git clone + npm start（后期考虑用 Docker 隔离运行环境）。



## 【参与开发】


### （〇）本机运行

 1. [安装 LeanCloud 命令行工具](https://leancloud.cn/docs/leanengine_cli.html#hash1443149115)

 2. [登录 LeanCloud 账号](https://leancloud.cn/docs/leanengine_cli.html#hash964666)

 3. [关联 LeanCloud 应用](https://leancloud.cn/docs/leanengine_cli.html#hash963776493)

 4. 安装、启动命令：
```
npm install

lean up
```

Web 服务 URL —— http://localhost:3000/


### （一）前端架构

 - CSS 框架：[BootStrap v3.3+](http://v3.bootcss.com/)

 - 模块化规范：[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)

 - MVVM 引擎：[Vue v2.3+](http://cn.vuejs.org/)

 - CDN 服务：[BootCDN](http://www.bootcdn.cn/)（依赖库唯一来源，不要写在 `package.json` 中）


### （二）后端架构

 - HTTP 服务器：[Express.js](https://expressjs.com/zh-cn/)

 - 每个相关的[功能模块 Issue](https://github.com/FreeCodeCamp-Chengdu/HOP/labels/feature) 中都列出了所需接口的基本文档
   - [GitHub API](https://developer.github.com/v3/)
   - [HOP API](http://chengdu.freecodecamp.cn/HOP/)


### （三）编码规范

 - 缩进：**4 半角空格**
 - 行宽：**80 半角字符**
 - 留白：分隔符间一空格，较长语句间一空行
 - 语法：**ECMAScript 5**
 - API：HTML 5、CSS 3、ECMAScript 6



## 【参考网址】

 - http://www.hackathon.io/
 - https://www.hackerearth.com/
 - https://github.com/sahat/hackathon-starter
