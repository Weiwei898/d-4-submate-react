import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

// --- 以下是從原本 main.js 搬過來的「全域資源」 ---
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 樣式
import '@/assets/styles/scss/all.scss';         // 你的客製化 SCSS (使用 @ 別名)
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS 功能

// --- 以下是 React 原有的基礎設定 ---
import './index.css'
import App from './App.jsx'

// 測試用 Console Log
console.log('Hello world - React 專案已成功合併進入點');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)