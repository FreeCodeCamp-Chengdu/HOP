# HOP 开发任务清单（MVP → 完整网站）

本文档用于把现有功能串联成可交付的网站，并将工作拆成可执行的任务列表。

- 当前工作分支：`feat/auth`
- 后端：已存在（前端以 API 集成为主）

---

## 0. 现状速览（基于代码盘点）

- 已有页面：`/`、`/activity`、`/activity/[name]`、`/activity/create`（受保护）
- 已有鉴权链路雏形：`pages/api/core.ts`（`githubOAuth2` + `jwtSigner` + `sessionGuard`）
- 已有会话模型：`models/User/Session.ts`（`getProfile()`、`signInWithGitHub()`、`signOut()`）
- 已有参赛/团队模型：`models/Activity/*`（`signOne()`、`team.joinTeam()` 等）

---

## 1. MVP 目标（验收口径）

### 1.1 参赛者旅程（MVP）

- 能浏览 hackathon 列表与详情
- 能完成 GitHub 登录
- 能在详情页报名（Join/Sign up）并能看到报名状态
- 能在「我的参赛」里看到自己报名的活动与状态

### 1.2 主办方旅程（MVP）

- 能完成 GitHub 登录
- 能创建 hackathon
- 创建成功后可跳转到该活动详情/管理入口
- 能在「我发起的」里看到自己创建的活动

---

## 2. 里程碑与任务清单

> 说明：每个任务包含「验收标准」与「主要影响范围」。

### Milestone A：鉴权与登录态（对应分支 `feat/auth`，优先做）

#### A1. 顶部导航增加“登录/退出/个人入口”

- 优先级：P0
- 验收标准：
  - 未登录：导航显示“使用 GitHub 登录”按钮
  - 已登录：显示用户头像/用户名 + “退出”按钮 + “个人中心”入口
  - 退出后：cookie 被清理（`token`/`JWT`）且 UI 回到未登录态
- 主要影响范围：
  - `components/layout/MainNavigation.*`
  - `models/User/Session.ts`

#### A2. 新增个人中心最小页面 `/me`

- 优先级：P0
- 验收标准：
  - 已登录访问 `/me`：展示用户基本信息（至少用户名、邮箱、头像）
  - 未登录访问 `/me`：引导登录（跳转或提示）
- 主要影响范围：
  - `pages/me.tsx`（新）或 `pages/user/me.tsx`（按现有结构定）
  - 复用 `sessionGuard` 或前端登录态判断

#### A3. 会话初始化：全站启动时拉取 profile（可缓存）

- 优先级：P0
- 验收标准：
  - 刷新页面后仍能正确恢复登录态
  - 如果 cookie 有 `JWT`，能拉到 `user/session` 并在导航展示
  - 如果 `JWT` 失效，能回到未登录态并提示一次即可
- 主要影响范围：
  - `pages/_app.tsx`
  - `models/User/Session.ts`

#### A4. 统一 401/403 体验（最小版本）

- 优先级：P1
- 验收标准：
  - API 返回 401：统一提示“需要登录”并提供跳转/按钮
  - 受保护页面：未登录时不出现白屏/静默失败
- 主要影响范围：
  - `models/User/Session.ts` 的 HTTPClient middleware（或公共 client）
  - 相关页面（`/activity/create`、未来的 `/me/*`）

#### A5. 环境变量与 OAuth 配置校验

- 优先级：P1
- 验收标准：
  - 缺少 `GITHUB_OAUTH_CLIENT_ID/SECRET` 时给出明确报错（开发期）
  - README 或 docs 中说明必须配置项
- 主要影响范围：
  - `pages/api/core.ts`
  - `README.md` 或本 docs

---

### Milestone B：参赛闭环（报名 → 状态 → 我的参赛）

#### B1. 详情页报名动作与状态刷新

- 优先级：P0
- 验收标准：
  - `/activity/[name]` 点击报名：调用 `activityStore.signOne(name)` 成功
  - 成功后页面状态刷新：能展示 pending/approved/rejected 等状态
  - 报名窗口期外：按钮不可点击或不显示（按现有逻辑）
- 主要影响范围：
  - `pages/activity/[name]/index.tsx`
  - `models/Activity/index.ts`

#### B2. 新增「我的参赛」页 `/me/registrations`

- 优先级：P0
- 验收标准：
  - 能列出当前用户的报名记录（至少活动名、状态、链接）
  - 空态友好（无报名时提示去活动列表）
- 主要影响范围：
  - `pages/me/registrations.tsx`（新）
  - 可能新增对应 model 方法（取决于后端已有 API）

#### B3. 团队相关：approved 后引导创建/加入队伍

- 优先级：P1
- 验收标准：
  - 状态 approved 且活动期间：显示“创建队伍”或“加入队伍”入口
  - 加入/退出队伍操作成功后能更新当前队伍状态
- 主要影响范围：
  - `pages/activity/[name]/index.tsx`
  - `models/Activity/Team.ts` + `components/Team/*`

---

### Milestone C：发起闭环（创建 → 我发起的 → 管理入口）

#### C1. 创建活动成功后的跳转与提示

- 优先级：P0
- 验收标准：
  - `/activity/create` 提交成功后：跳转到新活动详情 `/activity/[name]`（或管理页）
  - 失败时：展示具体错误原因（字段校验/权限等）
- 主要影响范围：
  - `components/Activity/ActivityEditor.tsx`
  - `models/Activity/index.ts`
  - `pages/activity/create.tsx`

#### C2. 新增「我发起的」页 `/me/hackathons`

- 优先级：P1
- 验收标准：
  - 能列出当前用户创建的活动
  - 每项可进入详情/管理入口
- 主要影响范围：
  - `pages/me/hackathons.tsx`（新）
  - 依赖后端是否提供“按用户过滤”的 API

#### C3. 最小管理入口（可先只读）

- 优先级：P2
- 验收标准：
  - 至少存在 `/activity/[name]/manage` 页面骨架
  - 受保护 + 权限校验（不是主办方则提示无权限）
- 主要影响范围：
  - `pages/activity/[name]/manage/*`（如不存在则新建）

---

## 3. 分支与 PR 拆分建议

- `feat/auth`（当前）：Milestone A（A1-A5）
- 后续建议按功能拆分：
  - `feat/registration-flow`：B1 + B2
  - `feat/team-flow`：B3
  - `feat/activity-create-flow`：C1
  - `feat/organizer-pages`：C2 + C3

---

## 4. 开发约定（最小）

- 任何受保护页面优先使用现有 `sessionGuard`（SSR）或统一的登录态保护组件。
- API_HOST：
  - 生产：`.env` 指向远端
  - 开发：如果不启动本地后端，请将 `.env.development` 改为远端或实现自动 fallback（后续可单独任务处理）。

---

## 5. 待确认（用于把任务变成“可直接开工”的更细粒度 issue）

- 后端是否已有：
  - “我的报名列表”接口？
  - “我发起的活动列表”接口？
  - 组织方/管理员权限字段如何判断？（roles 还是 organizerId）
