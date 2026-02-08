import React from "react";
import { Link } from "react-router-dom"; // 1. 引入 Link

function Header({ isLoggedIn, onLogout }) {
    return (
        <header className="bg-primary-50">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="header navbar navbar-expand-md justify-content-between align-items-center py-3 px-1 py-md-4">
                            {/* Logo */}
                            {/* 3. 使用 Link 取代 <a> 避免全頁重整 */}
                            <Link
                                className="d-flex align-items-center gap-1"
                                to="/"
                            >
                                <img
                                    src="../src/assets/images/SubmateLogo.svg"
                                    alt="Submate-logo"
                                />
                                <img
                                    src="../src/assets/images/SubMate_word_new.svg"
                                    className="Submate-word"
                                    alt="Submate-word"
                                />
                            </Link>

                            {/* 主選單 */}
                            <div className="header-right d-flex align-items-center gap-md-6">
                                {/* 電腦版主功能按鈕 */}
                                <div className="d-none d-md-flex">
                                    <ul className="nav navbar-nav me-auto mb-2 mb-md-0 py-md-2 gap-md-2">
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link py-md-3 px-md-4 fs-6"
                                                to="/about"
                                            >
                                                關於我們
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link py-md-3 px-md-4 fs-6"
                                                to="/products"
                                            >
                                                商品列表
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link py-md-3 px-md-4 fs-6"
                                                to="/faq"
                                            >
                                                FAQ
                                            </Link>
                                        </li>
                                        {/* 已登入才顯示 */}
                                        {/* 4. 根據登入狀態顯示不同選單 */}
                                        {isLoggedIn && (
                                            <>
                                                <li className="nav-item">
                                                    <Link
                                                        className="nav-link py-md-3 px-md-4 fs-6"
                                                        to="/profile"
                                                    >
                                                        會員中心
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        className="nav-link py-md-3 px-md-4 fs-6"
                                                        to="/carts"
                                                    >
                                                        <div className="cart-group position-relative">
                                                            {/* 1. 購物車主圖示 */}
                                                            <img
                                                                className="local_mall"
                                                                src="/src/assets/images/local_mall.svg"
                                                                alt="購物車按鈕"
                                                            />
                                                            {/* 2. 商品數量圖示 (目前是靜態的 Badge_10) */}
                                                            <img
                                                                className="porduct-sum"
                                                                src="/src/assets/images/Badge_10.svg"
                                                                alt="購物車商品數量圖示"
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    top: "-5px",
                                                                    right: "-15px",
                                                                }}
                                                            />
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>

                                {/* 電腦版登入/登出按鈕 (根據是否已登入判斷)*/}
                                <div>
                                    {!isLoggedIn ? (
                                        <button
                                            type="button"
                                            className="btn-secondary-large d-none d-md-block"
                                        >
                                            <Link href="/login">登入/註冊</Link>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn-secondary-large d-none d-md-block"
                                            onClick={onLogout}
                                        >
                                            登出
                                        </button>
                                    )}
                                </div>

                                {/* 手機版右側按鈕群組 */}
                                <div className="mobile-header-buttons d-flex d-md-none align-items-center">
                                    {!isLoggedIn ? (
                                        <button
                                            type="button"
                                            className="btn-secondary-medium mobile-login-toggle"
                                        >
                                            <Link href="/login">登入/註冊</Link>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn-secondary-medium mobile-login-toggle"
                                            onClick={onLogout}
                                        >
                                            登出
                                        </button>
                                    )}

                                    {/* 漢堡選單按鈕 */}
                                    <button
                                        className="navbar-toggler btn-hamburger"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#mobileNavContent"
                                        aria-controls="mobileNavContent"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <i className="bi bi-list"></i>
                                    </button>
                                </div>
                            </div>
                        </nav>

                        {/* 手機版漢堡展開選單內容 */}
                        <div
                            className="hambergur-list collapse navbar-collapse mobile-nav-menu my-6"
                            id="mobileNavContent"
                        >
                            <div className="mobile-nav-content">
                                <ul className="nav flex-column gap-2">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link mobile-nav-link py-3 px-4 fs-6"
                                            to="/about"
                                        >
                                            關於我們
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link mobile-nav-link py-3 px-4 fs-6"
                                            to="/products"
                                        >
                                            商品列表
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link py-md-3 px-md-4"
                                            to="/carts"
                                        >
                                            <div className="cart-group position-relative">
                                                {/* 1. 購物車主圖示 */}
                                                <img
                                                    className="local_mall"
                                                    src="/src/assets/images/local_mall.svg"
                                                    alt="購物車按鈕"
                                                />
                                                {/* 2. 商品數量圖示 (目前是靜態的 Badge_10) */}
                                                <img
                                                    className="porduct-sum"
                                                    src="/src/assets/images/Badge_10.svg"
                                                    alt="購物車商品數量圖示"
                                                    style={{
                                                        position: "absolute",
                                                        top: "-5px",
                                                        right: "-15px",
                                                    }}
                                                />
                                            </div>
                                        </Link>
                                    </li>
                                    {/* 已登入才顯示 */}
                                    {isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link mobile-nav-link py-3 px-4 fs-6"
                                                    to="/profile"
                                                >
                                                    會員中心
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link mobile-nav-link py-3 px-4 fs-6"
                                                    to="/carts"
                                                >
                                                    <div className="cart-group position-relative">
                                                        {/* 1. 購物車主圖示 */}
                                                        <img
                                                            className="local_mall"
                                                            src="/src/assets/images/local_mall.svg"
                                                            alt="購物車按鈕"
                                                        />
                                                        {/* 2. 商品數量圖示 (目前是靜態的 Badge_10) */}
                                                        <img
                                                            className="porduct-sum"
                                                            src="/src/assets/images/Badge_10.svg"
                                                            alt="購物車商品數量圖示"
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                top: "-5px",
                                                                right: "-15px",
                                                            }}
                                                        />
                                                    </div>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
