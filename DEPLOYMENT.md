# 部署指南 - IELTS Writing Error Tester

## 準備部署到 Vercel

### 1. 確保 Node.js 已安裝
```bash
node --version
npm --version
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 本地測試
```bash
npm run dev
```
打開 http://localhost:3000 確認應用程式正常運行

### 4. 建構靜態文件
```bash
npm run build
```

### 5. 部署到 Vercel

#### 方法 A: 透過 Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

#### 方法 B: 透過 GitHub 連接
1. 推送代碼到 GitHub:
```bash
git remote add origin https://github.com/your-username/IELTS-GAME.git
git push -u origin main
```

2. 在 Vercel 網站上:
   - 登入 https://vercel.com
   - 點擊 "New Project"
   - 選擇你的 GitHub 倉庫
   - Vercel 會自動偵測 Next.js 並配置部署

### 6. 配置說明

#### next.config.js
```javascript
const nextConfig = {
  output: 'export',        // 靜態導出
  trailingSlash: true,     // 添加尾隨斜線
  images: {
    unoptimized: true      // 禁用圖片優化
  }
}
```

#### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 7. 部署後檢查

部署完成後，確認以下功能正常：
- ✅ 三個測試模組都能正常載入
- ✅ 輸入和檢查答案功能正常
- ✅ 統計數據保存到 localStorage
- ✅ 每 40 題顯示報告模態框
- ✅ 響應式設計在手機上正常顯示

### 8. 故障排除

#### 常見問題：

1. **建構失敗**
   - 檢查 TypeScript 錯誤
   - 確認所有依賴已安裝
   - 檢查 `next.config.js` 配置

2. **部署後功能異常**
   - 確認使用 `output: 'export'` 配置
   - 檢查 `vercel.json` 重寫規則
   - 確認所有路由都是客戶端渲染

3. **localStorage 不工作**
   - 確認使用 `'use client'` 指令
   - 檢查瀏覽器控制台錯誤

### 9. 性能優化

- 使用 Next.js 14 App Router
- 靜態導出減少伺服器負載
- 優化 CSS 和 JavaScript 打包
- 使用 TypeScript 提升代碼品質

### 10. 監控和維護

- 定期檢查 Vercel 部署狀態
- 監控應用程式性能
- 收集用戶反饋並持續改進
