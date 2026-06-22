# SodaPost 项目指南

本文档供后续 Codex/AI 会话快速接手项目使用，作用范围为整个仓库。开始工作时先阅读本文；只有任务涉及的区域才需要继续打开源码，不要每次重新遍历 `.next/`、`node_modules/`、`.vercel/` 等生成目录。

## 项目概览

SodaPost 是面向全球电商卖家的中国采购服务网站。公开站点介绍服务、品类、价格与案例，并提供采购需求表单；私有后台用于查看、筛选、导出和更新客户询盘。

- 框架：Next.js 16 App Router、React 19、TypeScript（strict）
- 样式：Tailwind CSS 4、shadcn/ui（base-nova）、Base UI、Lucide
- 动效：Framer Motion
- 数据：Neon/Postgres
- 文件：Vercel Blob
- 包管理器：pnpm
- 路径别名：`@/*` 指向 `src/*`

## 快速开始与验证

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm start
```

仓库目前没有自动化测试脚本。代码修改至少运行 `pnpm lint`；涉及路由、服务端代码、构建配置或跨组件改动时同时运行 `pnpm build`。涉及 UI 或表单交互时，还应在浏览器检查对应页面、移动端布局和控制台错误。

## 目录地图

```text
src/
├─ app/
│  ├─ page.tsx                    首页
│  ├─ services/                   服务介绍
│  ├─ how-it-works/               采购流程
│  ├─ product-categories/         产品品类
│  ├─ pricing/                    定价
│  ├─ case-studies/               案例
│  ├─ about/                      关于
│  ├─ contact/                    联系方式与简版询盘表单
│  ├─ sourcing-request/           完整询盘表单
│  ├─ api/sourcing-requests/      询盘提交 API
│  ├─ admin/                      受保护后台及更新 Server Action
│  ├─ admin/login/                后台登录及登录 Server Action
│  ├─ layout.tsx                  全局 Navbar/Footer/i18n/WhatsApp
│  └─ globals.css                 Tailwind 主题与全局视觉样式
├─ components/
│  ├─ ui/                         shadcn/ui 基础组件
│  ├─ sourcing-request-form.tsx   前台 multipart 表单
│  ├─ admin-lead-table.tsx        后台筛选、编辑、CSV 导出
│  └─ ...                         导航、区块、卡片及品牌组件
└─ lib/
   ├─ i18n.tsx                    全站客户端多语言字典与 Context
   ├─ site-data.ts                英文基准数据、图标、选项和状态
   ├─ sourcing-requests.ts        建表、CRUD 与 Blob 上传（仅服务端）
   ├─ admin-auth.ts               密码校验和签名 Cookie（仅服务端）
   ├─ leads.ts                    询盘领域类型
   └─ utils.ts                    className 合并工具
public/images/                    运行时静态图片
.env.local.example               环境变量模板
README.md                        产品与部署概述
```

## 关键数据流

### 询盘提交

`/pricing` 的四个方案使用稳定值跳转到 `/sourcing-request?plan=<value>`；完整采购需求页会校验该参数并自动预选对应的服务方案和价格。方案值入库时保持英文稳定值，展示时使用当前语言的 `pricingPlans` 文案。

1. `SourcingRequestForm` 在浏览器校验图片，并通过 `/api/sourcing-requests/upload` 获取短期令牌后直传 Vercel Blob，绕过 Vercel Function 4.5 MB 请求体限制。
2. 图片只允许 image MIME，最大 8 MB，保存到公开访问的 `sourcing-requests/<request-id>/...` 路径。
3. 表单删除文件本体后，用小型 `FormData` POST 到 `/api/sourcing-requests`；Route Handler 重新校验必填字段、邮箱、稳定选项和 Blob metadata。
4. 询盘写入 Postgres 的 `sourcing_requests` 表；首次读写会执行 `CREATE TABLE IF NOT EXISTS`。入库失败时会清理已验证的 Blob。
5. 编号格式为 `SP-<timestamp>-<8位UUID片段>`。

修改表单字段时必须同步检查：表单控件、API 必填字段、`SourcingLead` 类型、建表 SQL、INSERT、行映射和后台详情/CSV。当前实现没有正式 migration 系统；新增列必须像 `service_plan` 一样显式执行幂等 `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`，不能只修改 `CREATE TABLE IF NOT EXISTS`。

### 后台与鉴权

- `/admin` 使用 `force-dynamic`，读取真实数据库数据。
- `/admin/login` 校验共享的 `ADMIN_PASSWORD`。
- 成功登录后设置 HMAC-SHA256 签名的 httpOnly Cookie `sodapost_admin_session`，有效期 7 天，SameSite=Lax，生产环境启用 Secure。
- 所有后台写操作必须在服务端调用 `requireAdminSession()`，不能只依赖前端页面保护。
- 状态的唯一有效集合来自 `site-data.ts` 的 `statusOptions`。

### 多语言

- 支持 `en`、`zh`、`vi`、`ms`、`fil`、`th`，选择保存在 localStorage 的 `sodapost_locale`。
- 英文 `en` 字典定义完整结构，其他语言应保持相同结构；部分语言通过 `...en` 回退。
- 页面普遍是客户端组件，通过 `useI18n()` 获取文案。
- 品类、平台和状态写入数据库/API 时使用稳定的英文值，仅展示时通过 `labelCategory`、`labelPlatform`、`labelStatus` 本地化。不要把持久化值直接改成翻译文本。
- 首页服务图标通过数组下标把 `t.services` 与 `site-data.ts` 的服务定义配对；增删或排序时两边必须同步。
- 新增用户可见文案时，应补入字典，不要只在单个页面硬编码；后台鉴权错误等纯服务端信息可保留英文。

## 环境变量

本地从 `.env.local.example` 创建 `.env.local`：

```dotenv
DATABASE_URL="postgresql://..."
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
ADMIN_PASSWORD="..."
ADMIN_SESSION_SECRET="..."
```

不要提交、输出或覆盖 `.env.local` 中的真实值。没有数据库和 Blob 凭据时，纯展示页面仍可开发，但询盘提交和后台数据功能无法完整验证。

## 实现约定

- 默认使用 Server Component；仅在需要状态、浏览器 API、Context 或交互时添加 `"use client"`。当前公开页面因 i18n Context 多为客户端组件。
- 数据库、Blob、Cookie 和密钥逻辑必须留在服务端文件；`sourcing-requests.ts` 与 `admin-auth.ts` 已使用 `server-only`。
- 优先复用 `src/components/ui/` 和现有区块/卡片组件，className 用 `cn()` 合并。
- 保持当前视觉语言：Geist、slate 中性色、品牌橙 `#f26f21`、小圆角、轻阴影和半透明面板；响应式从移动端开始。
- 静态图片放入 `public/images/` 并用 `next/image`；源码引用使用 `/images/<name>`。
- 不要编辑 `.next/`、`node_modules/`、`.vercel/` 或 `next-env.d.ts` 等生成内容。
- 修改前先看 `git status --short`，保留用户已有的未提交改动，不顺手清理任务范围外文件。
- 如果架构、命令、环境变量、路由或关键数据流发生变化，同步更新本文和必要的 `README.md`。

## 当前已知边界

- WhatsApp 悬浮按钮仍使用占位号码，上线前要替换 `src/components/whatsapp-floating-button.tsx` 中的 `wa.me` 链接。
- Blob 使用 public access；后台虽然受保护，但拿到原始 Blob URL 的人仍可能直接访问图片。
- 尚未集成邮件通知、CRM、供应商门户、多管理员账号和审计历史。
- 数据库 schema 依赖运行时自动建表，复杂 schema 变更前应先引入 migration 方案。

## 按任务定位文件

- 改全站文案/翻译：先看 `src/lib/i18n.tsx`，再看消费该字段的页面或组件。
- 改服务、品类、价格、案例、平台或状态：`src/lib/site-data.ts` + `src/lib/i18n.tsx`。
- 改询盘字段或校验：`sourcing-request-form.tsx` → API route → `leads.ts` → `sourcing-requests.ts` → `admin-lead-table.tsx`。
- 改后台登录/权限：`src/lib/admin-auth.ts`、`src/app/admin/login/`、`src/app/admin/actions.ts`。
- 改全站外观：`src/app/globals.css`、`src/app/layout.tsx`、共用组件；避免在多个页面重复样式。
- 改联系方式：`src/app/contact/page.tsx`、`src/components/whatsapp-floating-button.tsx`，并核对对应翻译和 `public/images/whatsapp-qr-code.jpg`。
