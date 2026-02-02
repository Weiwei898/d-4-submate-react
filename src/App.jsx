import { createClient } from '@supabase/supabase-js';
import { Routes, Route } from 'react-router-dom';
import AdminIndex from './pages/Admin/AdminIndex';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Carts from './components/Carts';
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
      <h1>首頁(暫時測試區)</h1>
      {/* 👇 只要把這行註解掉，測試功能就會徹底關閉 */}
      {/* <ApiTester />*/}
    </>
  );
}

// App 元件現在專職處理路由
function App() {
  return (
    <>
      {/* --- 不會動的外殼 --- */}
      <Header supabase={supabase} />
      {/* --- 會根據網址變動的內容區域 --- */}
      <Routes>
        {/*請依字母排序各自的路由，path是網頁路徑，例如https://weiwei898.github.io/d-4-submate-react/A/B*/}
        {/*A=path的內容，只有"/"就是會少一層，d-4submate-react/product*/}
        {/*A=path的內容，如果是"pages"，d-4submate-react/pages/product*/}
        {/**B=element裡的檔案路徑，例如product/ */}

        {/* --- 前台公開區域 --- */}
        <Route path="/" element={<HomePage />} />

        <Route path="/carts" element={<Carts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/register" element={<Register />} />

        


        {/* 後台總入口：交給 AdminIndex 處理所有 /admin/* 路由 */}
        <Route path="/admin/*" element={<AdminIndex supabase={supabase} />} />
      </Routes>
      {/* --- 不會動的外殼 --- */}
      <Footer supabase={supabase} />
    </>
  );
}

export default App;
