// 後台的外殼 (AdminLayout.jsx)
const AdminLayout = ({ supabase }) => (
  <div className="admin-wrapper">
    <nav>後台專用側邊欄</nav>
    <Outlet /> {/* 👈 這裡渲染 AdminProducts, AdminOrders 等 */}
  </div>
);

export default AdminLayout;