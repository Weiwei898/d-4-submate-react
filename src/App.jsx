import { createClient } from '@supabase/supabase-js';
import { Routes, Route } from 'react-router-dom';
import AdminIndex from './pages/Admin/AdminIndex';
import ProductList from './pages/ProductList';
import ApiTester from './components/ApiTester'; // 引入 ApiTester 元件

// 初始化 Supabase 客戶端
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 將原本 App.jsx 的內容變成一個首頁元件
function HomePage() {
  return (
    <>
      <h1>首頁</h1>
      <p>這裡是原本 App.jsx 的內容。</p>
      {/* 👇 只要把這行註解掉，測試功能就會徹底關閉 */}
      {/* <ApiTester />*/}
      <ProductList />
    </>
  );
}

// App 元件現在專職處理路由
function App() {
  return (
    <Routes>
      {/* 前台 */}
      <Route path="/" element={<HomePage />} />

      {/* 後台總入口：交給 AdminIndex 處理所有 /admin/* 路由 */}
      <Route path="/admin/*" element={<AdminIndex supabase={supabase} />} />
    </Routes>
  );
}

export default App;
