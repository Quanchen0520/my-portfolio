# QUAN Portfolio

這是一個以 Next.js App Router 建立的個人作品集網站，用來展示 Quan 的個人簡介、技能、競賽經歷與代表專案。網站整體採用深色視覺、卡片式資訊層級與 Framer Motion 動畫，並支援桌面與行動裝置瀏覽。

## 功能

- 首頁展示個人介紹、頭像與作品集入口。
- 作品集區塊可依 `all / mobile / web / hardware` 篩選專案。
- About 頁面整理學歷、競賽經歷與聯絡方式。
- 每個專案都有獨立詳情頁，包含角色、技術棧與重點說明。
- 透過 Lucide icons 與 Framer Motion 提升互動與視覺表現。

## 技術棧

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## 專案結構

- `src/app/page.tsx`：首頁與專案篩選區。
- `src/app/about/page.tsx`：個人介紹與聯絡資訊。
- `src/app/project/*/page.tsx`：各專案詳情頁。
- `src/app/layout.tsx`：全站佈局與字體設定。
- `src/app/globals.css`：全域樣式。

## 本機執行

先安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000) 即可查看網站。

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
- `/project/building-mobile`：Building... 專案頁
- `/project/elevator-timer-module`：電梯倒數計時模組
- `/project/certiflow-pro`：CertiFlow Pro
- `/project/quan-portfolio`：QUAN 作品集專案頁

## 部署

此專案可直接部署到 Vercel 或其他支援 Next.js 的平台。若要正式上線，建議先執行 `npm run build` 確認沒有型別或編譯錯誤。

## 聯絡方式

- Email：kevinquan0520@gmail.com
- GitHub：https://github.com/Quanchen0520
