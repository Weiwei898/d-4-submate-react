import { Routes, Route } from 'react-router-dom';
import AdminIndex from './pages/Admin/AdminIndex';
import ApiTester from './components/ApiTester'; // 引入 ApiTester 元件

// 將原本 App.jsx 的內容變成一個首頁元件
function HomePage() {
  return (
    <>
      <h1>首頁</h1>
      <p>這裡是原本 App.jsx 的內容。</p>
      {/* 👇 只要把這行註解掉，測試功能就會徹底關閉 */}
      <ApiTester />
    </>
  );
}

// App 元件現在專職處理路由
function App() {
  return (
    <Routes>
      {/* 前台路由 */}
      <Route path="/" element={<HomePage />} />

      {/* 後台總入口 */}
      <Route path="/admin/*" element={<AdminIndex />} />
    </Routes>
  );
}

export default App;
