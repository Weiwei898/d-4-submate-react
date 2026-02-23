import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// 【圖片引用】
import loginBgImg2 from "../assets/images/Login2.svg"; // 地球人示意圖
import fbIcon from "../assets/images/facebook.svg";
import instagramIcon from "../assets/images/instagram.svg";
import GoogleIcon from "../assets/images/google.svg";
import Visibility_Off from "../assets/images/Visibility_Off.svg";
// 引入組長的 API
import { signIn } from "../api/authApi";

// 暫時引入
// 1. 確保你有 import authApi 和 usersApi
// import * as authApi from "../api/authApi";
// import * as usersApi from "../api/usersApi";

// --- 1. 裝飾氣泡 (維持左低右高，手機版隱藏) ---
const BackgroundDecorations = () => (
    <>
        {/* 右側粉紫色氣泡 - 位置較高 */}
        <div
            className="d-none d-lg-block"
            style={{
                position: "absolute",
                top: "10%",
                right: "-5%",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background:
                    "linear-gradient(180deg, rgba(187, 230, 252, 0.4) 0%, rgba(248, 242, 255, 0) 100%)",
                // filter: "blur(30px)",
                zIndex: 0,
            }}
        />
        {/* 左側粉綠色氣泡 - 位置較低 */}
        <div
            className="d-none d-lg-block"
            style={{
                position: "absolute",
                bottom: "5%",
                left: "-2%",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background:
                    "linear-gradient(180deg, rgba(160, 250, 219, 0.4) 0%, rgba(234, 255, 247, 0) 100%)",
                // filter: "blur(30px)",
                zIndex: 0,
            }}
        />
    </>
);

// --- 2. 登入表單容器樣式 (套用三色漸層參數) ---
const FORM_CONTAINER_STYLE = {
    //三色漸層參數
    background:
        "linear-gradient(225deg, rgba(30, 223, 173, 0.3) 0%, rgba(17, 167, 237, 0.3) 50%, rgba(151, 56, 245, 0.3) 100%)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.05)",
};

// --- 3. 全頁面背景 (改為素色，不再有漸層) ---
const PAGE_STYLE = {
    backgroundColor: "#F0F9FF",
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
};

function Login({ onLogin }) {
    // 測試用記得刪除
    // window.usersApi = usersApi;
    // if (typeof window !== "undefined") {
    //     window.authApi = authApi;
    //     window.usersApi = usersApi;
    // }

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) newErrors.email = "帳號不得為空";
        else if (!emailRegex.test(email))
            newErrors.email = "帳號格式必須為 Email";
        if (!password.trim()) newErrors.password = "密碼不得為空";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            await signIn(email, password);
            onLogin();
            navigate("/products");
        } catch (err) {
            setErrors({ api: err.message || "登入失敗" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={PAGE_STYLE}>
            {/* 背景氣泡 */}
            <BackgroundDecorations />

            {/* 測試用，記得刪除 */}
            {/* <ApiTester /> */}

            <div
                className="container py-10"
                style={{ position: "relative", zIndex: 1 }}
            >
                {/* 手機版 flex-column：圖片在上，容器在下 */}
                <div className="row d-flex flex-column flex-lg-row justify-content-center align-items-center gap-lg-5">
                    {/* 圖片區域 (手機版優先顯示) */}
                    <div className="col-10 col-lg-5 d-flex flex-row flex-lg-column align-items-center mb-8 mb-lg-0">
                        <div
                            className="login-hero-img" // 👈 加上自定義 class
                            style={{ backgroundImage: `url(${loginBgImg2})` }}
                        ></div>
                        <div className="text-center mt-4 login-slogan">
                            <h4 className="fw-bold">不只分攤費用</h4>
                            <h4 className="fw-bold">更是分享快樂</h4>
                        </div>
                    </div>

                    {/* 登入表單容器 (這裏才是漸層出現的地方) */}
                    <div className="col-12 col-lg-5">
                        <div
                            className="p-5 p-md-8"
                            style={FORM_CONTAINER_STYLE}
                        >
                            <h1 className="Login-title text-center mb-5">
                                SubMate 會員登入
                            </h1>

                            <form
                                className="d-flex flex-column gap-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="d-flex flex-column gap-2 mt-4">
                                    {/* <label className="fw-bold">帳號</label> */}
                                    <input
                                        type="email"
                                        className={`form-control p-3 rounded-3 border-0 ${errors.email ? "is-invalid" : ""}`}
                                        style={{
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.7)",
                                        }}
                                        placeholder="請輸入電子郵件"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex flex-column gap-2">
                                    {/* 容器改為 position-relative 方便定位眼睛圖標 */}
                                    <div className="position-relative">
                                        <input
                                            // 2. 關鍵：根據 showPassword 狀態切換 type
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className={`form-control p-3 pe-10 rounded-3 border-0 ${errors.password ? "is-invalid" : ""}`}
                                            style={{
                                                backgroundColor:
                                                    "rgba(255, 255, 255, 0.7)",
                                            }}
                                            placeholder="請輸入密碼"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />

                                        {/* 3. 眼睛圖標按鈕 */}
                                        <button
                                            type="button" // 務必設為 button 避免觸發表單 submit
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "15px",
                                                transform: "translateY(-50%)",
                                                border: "none",
                                                background: "transparent",
                                                padding: "0",
                                                cursor: "pointer",
                                                zIndex: 10,
                                            }}
                                        >
                                            {/* 這裡引用設計師給你的眼睛元件 */}
                                            <img
                                                src={Visibility_Off}
                                                alt="顯示密碼"
                                                style={{
                                                    width: "20px",
                                                    opacity: showPassword
                                                        ? 1
                                                        : 0.5,
                                                }} // 點擊時切換透明度做點視覺反饋
                                            />
                                        </button>

                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {errors.api && (
                                    <div className="text-danger small">
                                        {errors.api}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 p-3 text-white fw-bold rounded-pill mt-2 shadow-sm fs-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "登入中..." : "登入"}
                                </button>
                            </form>

                            <div className="text-end my-4  text-bold ">
                                <Link
                                    to="/Login"
                                    className=" text-muted fw-bold ms-2 fs-6"
                                >
                                    忘記密碼
                                </Link>
                            </div>

                            <div className="text-center my-4  text-muted">
                                登入即表示同意
                                <Link
                                    to="/Login"
                                    className=" text-primary text-decoration-underline fw-bold ms-2 fs-6"
                                >
                                    服務條款
                                </Link>{" "}
                                與
                                <Link
                                    to="/Login"
                                    className=" text-primary text-decoration-underline fw-bold ms-2 fs-6"
                                >
                                    隱私權政策
                                </Link>
                            </div>

                            <div className="text-center my-4 text-muted small">
                                或使用其他方式登入
                            </div>

                            <div className="d-flex align-items-center justify-content-center gap-5">
                                <button className="btn btn-white bg-white border-0  d-flex align-items-center justify-content-center p-5 rounded-circle shadow-sm">
                                    <img
                                        src={GoogleIcon}
                                        alt="google"
                                        width="24"
                                    />{" "}
                                </button>
                                <button className="btn btn-white bg-white border-0  d-flex align-items-center justify-content-center p-5 rounded-circle shadow-sm">
                                    <img
                                        src={fbIcon}
                                        alt="FB"
                                        width="24"
                                    />{" "}
                                </button>
                                <button className="btn btn-white bg-white border-0  d-flex align-items-center justify-content-center p-5 rounded-circle shadow-sm">
                                    <img
                                        src={instagramIcon}
                                        alt="IG"
                                        width="24"
                                    />{" "}
                                </button>
                            </div>

                            <div className="text-center mt-6 small">
                                還不是會員嗎？
                                <Link
                                    to="/Register"
                                    className="text-muted fw-bold ms-2 fs-6"
                                >
                                    立即註冊
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
