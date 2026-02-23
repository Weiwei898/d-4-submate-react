import React from "react";
import { Link } from "react-router-dom";
import { Img } from "../assets/constants/imageManager";

function Footer({ isLoggedIn }) {
    return (
        <footer className="bg-primary-50">
            <div className="container">
                {/* 導航區塊 row */}
                <div className="row">
                    <div className="col-md-12 py-6">
                        {/* 導航區塊容器 */}
                        <div className="footer-group d-flex flex-column flex-lg-row align-items-start shadow-sm rounded py-4 px-2 p-md-6 gap-3 gap-lg-0">
                            {/* Submate logo */}
                            <Link
                                className="d-flex align-items-center gap-1 py-3 px-4"
                                to="/"
                            >
                                <img src={Img.logoPure} alt="Submate-logo" />
                                <img
                                    src={Img.logoSubMateWord}
                                    className="Submate-word"
                                    alt="Submate-word"
                                />
                            </Link>

                            {/* 電話地址 */}
                            <div className="d-flex flex-column">
                                <ul className="contact-info d-flex flex-column py-3 px-4 gap-4 gap-md-6">
                                    <li>
                                        <a
                                            className="d-flex gap-2"
                                            href="https://maps.app.goo.gl/tG7tDZkWrqkbeQ8EA"
                                            target="_blank"
                                        >
                                            <img
                                                src={Img.locationOn}
                                                alt="定位圖示"
                                            />
                                            <p className="fs-6">
                                                信義路五段信義區台北市110號
                                            </p>
                                        </a>
                                    </li>
                                    <li className="d-flex gap-2">
                                        <img
                                            src={Img.callIcon}
                                            alt="電話圖示"
                                        />
                                        <p className="fs-6">02 8101 8800</p>
                                    </li>
                                </ul>
                            </div>

                            {/* 功能選單 */}
                            <div className="footer-navbar d-flex">
                                <ul className="d-flex flex-column">
                                    <li>
                                        <Link className="fs-6" to="/about">
                                            關於我們
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="fs-6" to="/products">
                                            商品列表
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="d-flex flex-column">
                                    <li>
                                        <Link className="fs-6" to="/faq">
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        {/* 根據登入狀態切換連結名稱與路徑  */}
                                        {isLoggedIn ? (
                                            <Link className="fs-6" to="/">
                                                會員中心
                                            </Link>
                                        ) : (
                                            <Link className="fs-6" to="/login">
                                                登入 / 註冊
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>

                            {/* 社群資訊 */}
                            <div className="d-flex gap-2">
                                <a href="#">
                                    <img
                                        className="p-3"
                                        src={Img.iconInstagram}
                                        alt="ig圖示"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        className="p-3"
                                        src={Img.iconFacebook}
                                        alt="fb圖示"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 法律資訊列 */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="law-info d-flex pb-6">
                            <p className="fs-7 text-natural-500">
                                © 2026 Copyright SubMate. All Rights Reserved
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
