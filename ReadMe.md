# Hackathon Open Platform（黑客马拉松 开放平台）

本项目最初作为 [FCC 成都社区](https://freecodecamp-chengdu.github.io) 2017年初内部组织的【半程黑客马拉松】的演练项目而开发，旨在为 **Hackathon 爱好者**提供 活动发布、报名组队、参赛项目信息跟踪、原型版 demo 部署一条龙服务。



## 【原型设计】

https://github.com/FreeCodeCamp-Chengdu/HOP/milestone/1

活动组织者、参与者用 GitHub 登录，即可发布活动、报名组队。

队伍发起人先在 GitHub 创建一个代码库，并把队员加入仓库开发者，本平台即可读取到其他组员。

然后队长在仓库 issue 页创建 milestone，并把分工好的各项任务创建为其下的 issue，本平台便可显示该队伍开发进度。

开发结束后，活动组织者 提交部署项目代码的请求，本平台程序猿审核代码安全性后，即可允许自动执行 git clone + npm start（后期考虑用 Docker 隔离运行环境）。

## 【项目运行】

安装依赖:

```
npm install
```

运行项目:

```
npm start
```

打开浏览器输入 http://localhost:8000

## 【参考网址】

 - http://www.hackathon.io/
 - https://github.com/sahat/hackathon-starter
 - https://github.com/mikedeboer/node-github
 - https://github.com/pksunkara/octonode
 
 
