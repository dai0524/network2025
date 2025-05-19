# React DataGrid - 景點觀光展覽資訊

本專案為資訊復健作業 HW#4 的實作，使用 React 並整合 MUI 的 DataGrid 元件來展示台灣文化部的展覽資料。

## ✅ 專案功能

- 使用 `useEffect` 從 API 載入資料
- 可搜尋展覽名稱
- 使用 MUI DataGrid 顯示資料
- 分頁顯示，每頁 10 筆

## 📦 安裝方式

1. 安裝套件：
   ```
   npm install
   ```

2. 啟動開發伺服器：
   ```
   npm start
   ```

3. 瀏覽器開啟 [http://localhost:3000](http://localhost:3000)

## 🔗 API 資料來源

文化部展覽開放資料：  
https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6

## 📁 專案結構

```
react_datagrid/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   └── index.js
├── package.json
└── .gitignore
```

## 📝 作業要求

- 使用 DataGrid 替代原本 table 呈現方式
- 使用 useEffect 來呼叫 API 並更新資料
- 上傳整個 React 專案（不含 build 與 node_modules）
