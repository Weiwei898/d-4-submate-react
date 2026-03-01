import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';

// 這個 Layout 用於包裝後台的 "登入" 和 "註冊" 頁面
// 它提供了一個統一的頁首和頁尾，但沒有側邊欄
function AdminAuthLayout() {
  return (
    <>
      {/* 
        isLoggedIn 傳遞 false，因為這個 Layout 只用於未登入狀態的頁面。
        onLogout 傳遞 null 或 undefined，因為在這些頁面上不需要登出功能。
      */}
      <AdminHeader isLoggedIn={false} onLogout={() => {}} />
      
      {/* 頁面主要內容 (會是 Login 或 Register 元件) */}
      <main className="flex-grow-1 p-4 bg-white">
        <Outlet />
      </main>

      <AdminFooter />
    </>
  );
}

export default AdminAuthLayout;
