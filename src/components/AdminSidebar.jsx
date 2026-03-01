import { Link } from 'react-router-dom';

function AdminSidebar({ handleLogout }) {
  return (
    <div className="bg-primary-50 border-end vh-100 p-3" style={{ width: '250px' }}>
      <h5 className="mb-4">SubMate 管理後台</h5>
      <nav className="nav flex-column gap-2">
        {/*<Link to="/admin/members" className="nav-link text-dark border-bottom">會員資料管理</Link>*/}
        <Link to="/admin/product" className="nav-link text-dark border-bottom">商品登錄</Link>
        <Link to="/admin/members" className="nav-link text-dark border-bottom">會員摺疊清單</Link>
      </nav>
    </div>
  );
}
export default AdminSidebar;