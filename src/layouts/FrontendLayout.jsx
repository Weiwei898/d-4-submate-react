// 前台的外殼 (FrontendLayout.jsx)
import { Outlet } from 'react-router-dom';
//元件
import Header from "../components/Header";
import Footer from "../components/Footer";

const FrontendLayout = ({ isLoggedIn, handleLogOut }) => (
  <>
    <Header isLoggedIn={isLoggedIn} onLogout={handleLogOut} />
    <Outlet /> {/* 👈 這裡會渲染 Home, Products, Carts 等子頁面 */}
    <Footer isLoggedIn={isLoggedIn} />
  </>
);

export default FrontendLayout;