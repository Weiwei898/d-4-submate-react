import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';

function AdminIndex({ supabase }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="w-100">
      <div className="container py-5">
        <div className="position-relative mb-5">
          <h1 className="text-center m-0">後台管理系統</h1>
          <button
            className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
        <Routes>
          {/*
            對應網址: #/admin/register
            顯示元件: <AdminRegister />
          */}
          <Route path="register" element={<AdminRegister supabase={supabase} />} />

          {/*
            對應網址: #/admin/login
            顯示元件: <AdminLogin />
          */}
          <Route path="login" element={<AdminLogin supabase={supabase} />} />

          {/*
            當網址為 /admin 時，預設顯示登入頁
          */}
          <Route index element={<AdminLogin supabase={supabase} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminIndex;
