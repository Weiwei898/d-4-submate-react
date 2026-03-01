import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
//元件
import AdminSidebar from '../components/AdminSidebar'; // 引入拆出來的側欄
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

function AdminLayout({ supabase }) {
  const navigate = useNavigate();
  const location = useLocation(); // 抓取目前網址
  // 新增狀態來判斷是否登入，預設為 false (不顯示 Sidebar)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    // 1. 初始檢查 session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // 如果沒有 session (未登入)，直接導到登入頁
        navigate('/admin/login');
      }
    });

    // 2. 監聽 auth 變化 (登入/登出自動更新狀態)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);

      // 如果登出，導向登入頁
      if (event === 'SIGNED_OUT') {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, navigate]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      // 登出後的導航由上方的 onAuthStateChange 處理
    }
  };

  return (
    <>
      {/* 將登入狀態傳給 Header 以切換按鈕 */}
      <AdminHeader isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="d-flex">
        {/* 側欄元件 - 只有登入時，才顯示側欄  */}
        {isLoggedIn && (
          <AdminSidebar handleLogout={handleLogout} />
        )}

        {/* 右側內容動態區域 */}
        <main className="flex-grow-1 p-4 bg-white">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminLayout;