import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRoutes } from "react-router-dom";
//元件
import Login from "./components/Login";
import Carts from "./pages/CartsList";
import CartsPay from "./pages/CartsPay";
import CartsComplete from "./pages/CartsComplete";
//import ApiTester from "./components/ApiTester"; // 引入 ApiTester 元件
//頁面
import AdminIndex from "./pages/Admin/AdminIndex";
import ProductList from "./pages/ProductList";
import RegisterPage from "./pages/RegisterPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
//layouts
import FrontendLayout from "./layouts/FrontendLayout";
import AdminLayout from "./layouts/AdminLayout";

// 初始化 Supabase 客戶端
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// App 元件現在專職處理路由
function App() {
    // ==============================
    // 【Start】登入處理區 -  布萊斯
    //  登入邏輯留著 (作為全站狀態源)
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
    //將邏輯傳進 router 巢狀物件
    const element = useRoutes(
        [
            {
                /*
                 --- 會根據網址變動的內容區域 ---
                請依字母排序各自的路由，path是網頁路徑，例如https://weiwei898.github.io/d-4-submate-react/A/B
                path (網址路徑): 使用者在網址列看到的地址。例：/products
                element (渲染組件): 該網址要顯示的 React 組件。例：<ProductList /> 
                (註：組件需先在檔案上方完成 import)
                */
                /* ...前台路由... */
                element: <FrontendLayout
                    isLoggedIn={isLoggedIn}
                    handleLogOut={handleLogOut} />,
                children: [
                    { path: "/", element: <HomePage /> },
                    { path: "/carts", element: <Carts /> },
                    { path: "/carts-pay", element: <CartsPay /> },
                    { path: "/carts-complete", element: <CartsComplete /> },
                    // 透過傳入 onLogin 這個 Props 以更新全站的 header、footer
                    { path: "/login", element: <Login onLogin={handleLogin} /> },
                    { path: "/about", element: <AboutPage /> },
                    { path: "/products", element: <ProductList /> },
                    { path: "/register", element: <RegisterPage /> },
                    { path: "/faq", element: <FaqPage /> }
                ]
            },
            {
                element: <AdminLayout />,
                children: [
                    /* ...後台路由... */
                    { path: "/admin/*", element: <AdminIndex supabase={supabase} /> }
                ]
            }
        ]);
    return element;
}

export default App;
