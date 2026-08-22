# QUAN Portfolio

這是一個以 Next.js App Router 建立的個人作品集網站，用來展示 Quan 的個人簡介、技能、競賽經歷與代表專案。網站整體採用深色視覺、卡片式資訊層級與 Framer Motion 動畫，並支援桌面與行動裝置瀏覽。專案資料由後端資料庫驅動，並提供管理後台可直接編輯，不需要改程式碼。

## 功能

- 首頁展示個人介紹、頭像與作品集入口，專案卡片資料來自資料庫。
- 作品集區塊可依 `all / mobile / web / hardware` 篩選專案。
- About 頁面整理學歷、競賽經歷與聯絡方式。
- 每個專案都有獨立詳情頁（`/project/[slug]` 動態路由，內容完全由資料庫驅動），包含角色、時程、技術棧、重點說明、可選的展示連結／GitHub 連結，以及可上傳圖片／影片的作品預覽 Gallery（圖片可點擊放大瀏覽，支援上一張／下一張與 Esc 關閉）。
- 各專案詳情頁會記錄瀏覽次數。
- `/admin` 管理後台：密碼登入後可新增、編輯、刪除首頁專案卡片，並上傳作品預覽圖片／影片（使用 Vercel Blob），查看各專案瀏覽次數。
- 透過 Lucide icons 與 Framer Motion 提升互動與視覺表現。

## 技術棧

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Neon Postgres（透過 Vercel Marketplace 佈署，`@neondatabase/serverless` 存取）
- Vercel Blob（後台作品預覽圖片／影片上傳與託管，`@vercel/blob` 存取）

## 後端架構

- `src/lib/db.ts`：Neon 資料庫連線（延遲初始化，避免 build time 噴錯）。
- `src/lib/projects.ts`：專案資料的 CRUD 存取層。
- `src/lib/project-input.ts`：後台送出的專案資料驗證與正規化，供新增／編輯 API 共用。
- `src/lib/views.ts`：各專案瀏覽次數的讀取與累加。
- `src/lib/admin-auth.ts`：管理後台的 cookie session 驗證（HMAC 簽章，密碼比對用 timing-safe 比較）。
- `src/app/api/projects/`：專案 CRUD 的 Route Handlers（`GET` 公開讀取，`POST` / `PUT` / `DELETE` 需要登入）。
- `src/app/api/upload/`：後台作品預覽圖片／影片上傳的 Vercel Blob token 端點（需要登入才會核發權杖）。
- `src/app/api/views/[slug]/`：瀏覽次數的讀取與累加 API。
- `src/app/api/admin/login`、`.../logout`：管理後台登入 / 登出。
- `scripts/db-init.mjs`：建立資料表（`projects`、`page_views`）並灌入初始資料，可重複執行。

資料庫連線字串、管理密碼等機密只存在 Vercel 環境變數與本機 `.env.local`（已被 `.gitignore` 排除），不會出現在程式碼或版本控制中。

## 專案結構

- `src/app/page.tsx`：首頁，Server Component，直接從資料庫讀取專案清單。
- `src/app/about/page.tsx`：個人介紹與聯絡資訊。
- `src/app/project/[slug]/page.tsx`：專案詳情頁，動態路由，內容由資料庫讀取（找不到對應 slug 會回傳 404）。
- `src/app/admin/page.tsx`：管理後台（未登入顯示登入表單，登入後顯示 CRUD 介面）。
- `src/app/api/`：後端 Route Handlers。
- `src/components/ProjectsSection.tsx`：首頁專案篩選與卡片渲染。
- `src/components/ProjectGallery.tsx`：專案詳情頁的圖片／影片預覽區塊，圖片可點擊放大並支援上一張／下一張切換。
- `src/components/ViewCounter.tsx`：埋在專案詳情頁裡的瀏覽次數計數元件。
- `src/components/admin/`：管理後台的登入表單與 CRUD 介面。
- `src/lib/`：資料庫與驗證邏輯。
- `src/app/layout.tsx`：全站佈局與字體設定。
- `src/app/globals.css`：全域樣式。

## 本機執行

先安裝依賴：

```bash
npm install
```

從 Vercel 拉環境變數（需要先 `vercel link` 這個專案）：

```bash
vercel env pull .env.local
```

啟動開發伺服器：

```bash
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000) 即可查看網站，`/admin` 為管理後台入口。

## 可用指令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 路由

- `/`：首頁
- `/about`：關於我
- `/admin`：管理後台
- `/project/[slug]`：專案詳情頁，`slug` 由資料庫中的專案決定，後台新增專案時會自動產生對應頁面

## 部署

此專案部署在 Vercel，資料庫為 Vercel Marketplace 上的 Neon Postgres。正式上線前建議先執行 `npm run build` 確認沒有型別或編譯錯誤，並確認 Vercel 專案的環境變數（`DATABASE_URL`、`ADMIN_PASSWORD`、`ADMIN_SESSION_SECRET`、`BLOB_READ_WRITE_TOKEN` 等）已設定。

## 聯絡方式

- Email：kevinquan0520@gmail.com
- GitHub：https://github.com/Quanchen0520
