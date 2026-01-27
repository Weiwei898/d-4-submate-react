import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';

function AdminIndex() {
  return (
    <div>
      <h1>後台管理系統</h1>
      <Routes>
        {/*
          對應網址: /admin/register
          顯示元件: <AdminRegister />
        */}
        <Route path="register" element={<AdminRegister />} />

        {/*
          對應網址: /admin/login
          顯示元件: <AdminLogin />
        */}
        <Route path="login" element={<AdminLogin />} />

        {/*
          當網址為 /admin 時，預設顯示登入頁
        */}
        <Route index element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default AdminIndex;
