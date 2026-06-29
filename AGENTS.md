# SodaPost 项目指南

本文档供后续 Codex/AI 会话快速接手项目使用，作用范围为整个仓库。开始工作时先阅读本文；只有任务涉及的区域才需要继续打开源码，不要每次重新遍历 `.next/`、`node_modules/`、`.vercel/` 等生成目录。

## 项目概览

SodaPost 是面向全球电商卖家的中国采购服务网站。公开站点介绍服务、品类、价格与案例，并提供采购需求表单；私有后台用于查看详情、搜索筛选、导出、更新状态/备注以及批量删除客户询盘。

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
│  ├─ contact/                    联系方式与共用询盘表单
│  ├─ sourcing-request/           完整询盘表单
│  ├─ api/sourcing-requests/      询盘提交 API
│  ├─ api/admin/exports/          受鉴权保护的 CSV/Excel/Word/PDF 导出 API
│  ├─ admin/                      受保护后台及状态/备注/删除 Server Action
│  ├─ admin/login/                后台登录及登录 Server Action
│  ├─ icon.svg                    浏览器标签页橙色汽水图标
│  ├─ layout.tsx                  全局 Navbar/Footer/i18n/WhatsApp
│  └─ globals.css                 Tailwind 主题与全局视觉样式
├─ components/
│  ├─ ui/                         shadcn/ui 基础组件
│  ├─ sourcing-request-form.tsx   共用询盘表单、Blob 直传与成功弹窗
│  ├─ admin-lead-table.tsx        后台筛选、详情、编辑、批量删除、多格式导出
│  └─ ...                         导航、区块、卡片及品牌组件
└─ lib/
   ├─ i18n.tsx                    全站客户端多语言字典与 Context
   ├─ site-data.ts                英文基准数据、图标、选项和状态
   ├─ sourcing-requests.ts        建表、CRUD 与删除图片 Blob（仅服务端）
   ├─ sourcing-upload.ts          上传路径、文件名与 8 MB 上限规则
   ├─ admin-export.ts             CSV/Excel/Word/PDF 文件生成（仅服务端）
   ├─ admin-auth.ts               密码校验和签名 Cookie（仅服务端）
   ├─ leads.ts                    询盘领域类型
   └─ utils.ts                    className 合并工具
public/images/                    运行时静态图片
.env.local.example               环境变量模板
README.md                        产品与部署概述
```

## 关键数据流

### 询盘提交

`/contact` 和 `/sourcing-request` 共用 `SourcingRequestForm`。`/pricing` 的四个方案使用稳定值跳转到 `/sourcing-request?plan=<value>#sourcing-request-form`；完整采购需求页会校验该参数并自动预选对应的服务方案和价格。方案值入库时保持英文稳定值，展示时使用当前语言的 `pricingPlans` 文案。

1. `SourcingRequestForm` 在浏览器校验图片，并通过 `/api/sourcing-requests/upload` 获取短期令牌后直传 Vercel Blob，绕过 Vercel Function 4.5 MB 请求体限制。
2. 图片只允许 image MIME，最大 8 MB，保存到公开访问的 `sourcing-requests/<request-id>/...` 路径。
3. 表单删除文件本体后，用小型 `FormData` POST 到 `/api/sourcing-requests`；Route Handler 重新校验必填字段、邮箱、稳定选项和 Blob metadata。
4. 询盘写入 Postgres 的 `sourcing_requests` 表；首次读写会执行 `CREATE TABLE IF NOT EXISTS`。入库失败时会清理已验证的 Blob。
5. 编号格式为 `SP-<timestamp>-<8位UUID片段>`。
6. 提交期间禁用重复提交；成功后重置表单并显示本地化弹窗“提交成功，我们会尽快答复您”。

产品品类与采购服务必须分开维护：`/product-categories` 展示 Packaging Machines、Packaging Materials、Machine Parts & Consumables、E-commerce Products、Custom Packaging Products 五个产品组及其子类；采购需求表单的稳定下拉值来自 `sourcingProductCategoryOptions`，包含上述五类、Complete Production Line 和 Other。Sourcing Service 属于 Services 页面，不要放入 Product Categories 或产品品类下拉。

修改表单字段时必须同步检查：表单控件、API 必填字段、`SourcingLead` 类型、建表 SQL、INSERT、行映射、后台详情和全部导出格式。当前实现没有正式 migration 系统；新增列必须像 `service_plan` 一样显式执行幂等 `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`，不能只修改 `CREATE TABLE IF NOT EXISTS`。

### 后台与鉴权

- `/admin` 使用 `force-dynamic`，读取真实数据库数据。
- `/admin/login` 校验共享的 `ADMIN_PASSWORD`。
- 成功登录后设置 HMAC-SHA256 签名的 httpOnly Cookie `sodapost_admin_session`，有效期 7 天，SameSite=Lax，生产环境启用 Secure。
- 所有后台写操作必须在服务端调用 `requireAdminSession()`，不能只依赖前端页面保护。
- 状态的唯一有效集合来自 `site-data.ts` 的 `statusOptions`。
- 后台搜索范围包含联系人、公司、邮箱、市场、销售渠道、品类、描述和服务方案；状态筛选、详情弹窗及导出均基于真实数据，只导出当前筛选结果并包含参考图片 URL。
- `/api/admin/exports` 接收当前筛选结果并生成 CSV、Excel `.xlsx`、Word `.docx` 或 PDF；Route Handler 必须先调用 `requireAdminSession()`。输入最多 5,000 行、30 列、总计 400 万字符，并清理控制字符。
- Excel 使用冻结标题/表头、自动筛选、换行、适当列宽和可点击图片链接；Word/PDF 采用每条询盘一个标签-详情表，避免把 20 个字段挤进横向宽表。PDF 按字符切换中、英、日、韩、泰和扩展拉丁字体，字体文件通过 `next.config.ts` 的 tracing 配置打包；`pdfkit` 必须保持 `serverExternalPackages`，否则生产构建会丢失内置 AFM 文件。
- 状态采用本地乐观更新；备注在失焦时保存，失败时回滚并显示错误。备注服务端最大长度为 10,000 字符。
- 后台支持逐条勾选和“全选当前筛选结果”后批量删除，并在不可撤销的确认弹窗中显示数量。删除 Server Action 最多接受 500 个编号，必须校验会话、去重并验证询盘编号。
- 批量删除先删除数据库记录，再尽力清理对应的参考图片 Blob；Blob 清理失败会记录服务端错误，但不会恢复已删除的数据库记录。测试删除功能时只能使用明确创建的测试询盘，不能拿真实客户数据试验。
- Vercel 上修改 `ADMIN_PASSWORD` 后必须重新部署才会进入新的 Function 环境；生产、预览和开发环境的变量应按需分别同步。

### 多语言

- 支持 `en`、`zh`、`vi`、`ms`、`fil`、`th`、`ja`、`ko`，选择保存在 localStorage 的 `sodapost_locale`。
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

Vercel 环境变量按 Production、Preview、Development 分开管理。修改密码或其他服务端环境变量后，必须创建新部署；旧部署不会自动读取新值。当前生产别名为 `https://sodapost.vercel.app`。

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

- 联系邮箱、WhatsApp `wa.me` 链接和二维码目前分别位于联系页、悬浮按钮与静态图片中；修改联系方式时必须三处核对，避免信息不一致。
- Blob 使用 public access；后台虽然受保护，但拿到原始 Blob URL 的人仍可能直接访问图片。
- 尚未集成邮件通知、CRM、供应商门户、多管理员账号、删除恢复和审计历史。
- 数据库 schema 依赖运行时自动建表，复杂 schema 变更前应先引入 migration 方案。

## 按任务定位文件

- 改全站文案/翻译：先看 `src/lib/i18n.tsx`，再看消费该字段的页面或组件。
- 改服务、品类、价格、案例、平台或状态：`src/lib/site-data.ts` + `src/lib/i18n.tsx`。
- 改询盘字段或校验：`sourcing-request-form.tsx` → API route → `leads.ts` → `sourcing-requests.ts` → `admin-lead-table.tsx`。
- 改后台登录/权限：`src/lib/admin-auth.ts`、`src/app/admin/login/`、`src/app/admin/actions.ts`。
- 改后台列表、详情或批量删除：`src/components/admin-lead-table.tsx` → `src/app/admin/actions.ts` → `src/lib/sourcing-requests.ts`，并同步 `src/lib/i18n.tsx`。
- 改导出字段、格式或文件样式：`src/components/admin-lead-table.tsx` → `src/app/api/admin/exports/route.ts` → `src/lib/admin-export.ts`，并同步 `src/lib/i18n.tsx`、`next.config.ts` 和必要依赖。
- 改全站外观：`src/app/globals.css`、`src/app/layout.tsx`、共用组件；避免在多个页面重复样式。
- 改联系方式：`src/app/contact/page.tsx`、`src/components/whatsapp-floating-button.tsx`，并核对对应翻译和 `public/images/whatsapp-qr-code.jpg`。
