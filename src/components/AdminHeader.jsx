import { Link, useLocation } from "react-router-dom"; // 1. 引入 Link 和 useLocation
import { Img } from "../assets/constants/imageManager";

function AdminHeader({ isLoggedIn, onLogout }) {
    const location = useLocation(); // 取得目前 location

    const renderAuthButton = () => {
        // c. 在登入頁面後，AdminHeader是登出
        if (isLoggedIn) {
            return (
                <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={onLogout}
                >
                    登出
                </button>
            );
        }

        // a. 在login頁面時，AdminHeader是註冊
        if (location.pathname === '/admin/login') {
            return (
                <Link
                    to="/admin/register"
                    className="btn btn-outline-secondary w-100 d-none d-md-block"
                >
                    註冊
                </Link>
            );
        }

        // b. 在在Register頁面時，AdminHeader是登入
        if (location.pathname === '/admin/register') {
            return (
                <Link
                    to="/admin/login"
                    className="btn btn-outline-secondary w-100 d-none d-md-block"
                >
                    登入
                </Link>
            );
        }

        // 預設情況 (雖然在當前路由設定下不太可能觸發，但作為保險)
        return (
            <Link
                to="/admin/login"
                className="btn btn-outline-secondary w-100 d-none d-md-block"
            >
                登入
            </Link>
        );
    }

    return (
        <header className="bg-primary-50 border">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="d-flex justify-content-between align-items-center">
                            {/* Logo */}
                            {/* 3. 使用 Link 取代 <a> 避免全頁重整 */}
                            <Link
                                className="d-flex align-items-center gap-1"
                                to="/"
                            >
                                <img src={Img.logoPure} alt="Submate-logo" />
                                <img
                                    src={Img.logoSubMateWord}
                                    className="Submate-word"
                                    alt="Submate-word"
                                />
                            </Link>

                            {/* 主選單 */}
                            <div className="d-flex align-items-center py-3 px-1 py-md-4">
                                {/* 電腦版登入/登出按鈕 (根據是否已登入判斷)*/}
                                <div>
                                    {renderAuthButton()}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
