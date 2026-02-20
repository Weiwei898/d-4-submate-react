import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Routes, Route } from "react-router-dom";
//元件
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Carts from "./components/Carts";
import ApiTester from "./components/ApiTester"; // 引入 ApiTester 元件
//頁面
import AdminIndex from "./pages/Admin/AdminIndex";
import ProductList from "./pages/ProductList";
import RegisterPage from "./pages/RegisterPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";


// 初始化 Supabase 客戶端
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// App 元件現在專職處理路由
function App() {
  // ==============================
  // 【Start】登入處理區 -  布萊斯
  // ===============================

  // 新增登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 模擬登入方法
  const handleLogin = () => {
    setIsLoggedIn(true); // 更新狀態為【已登入】
  };

  // 模擬登出方法
  const handleLogOut = () => {
    setIsLoggedIn(false); // 更新狀態為【已登出】
  };

  // ==============================
  // 【End】登入處理區 -  布萊斯
  // ===============================
  return (
    <>
      {/* --- 不會動的外殼 --- */}
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogOut}
      />
      {/* --- 會根據網址變動的內容區域 --- */}
      <Routes>
        {/*請依字母排序各自的路由，path是網頁路徑，例如https://weiwei898.github.io/d-4-submate-react/A/B*/}
        {/* path (網址路徑): 使用者在網址列看到的地址。例：/products
            element (渲染組件): 該網址要顯示的 React 組件。例：<ProductList /> 
            (註：組件需先在檔案上方完成 import)
        */}

        {/* --- 前台公開區域 --- */}
        <Route path="/" element={<HomePage />} />

        <Route path="/carts" element={<Carts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq" element={<FaqPage />} />

        {/* 後台總入口：交給 AdminIndex 處理所有 /admin/* 路由 */}
        <Route path="/admin/*" element={<AdminIndex supabase={supabase} />} />
      </Routes>
      {/* --- 不會動的外殼 --- */}
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
