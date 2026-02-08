import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Swal from "sweetalert2";

const BACKGROUND_STYLE = {
  background:
    "linear-gradient(225deg, rgba(30, 223, 173, 0.4) 0.07%, rgba(17, 167, 237, 0.4) 50.07%, rgba(151, 56, 245, 0.4) 100.07%)",
  position: "relative",
  overflow: "hidden",
};

const BackgroundDecorations = () => (
  <>
    {/* 左上圓形 */}
    <div
      className="d-none d-md-block"
      style={{
        position: "absolute",
        top: "20%",
        left: "13%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "linear-gradient(180deg, rgba(160, 250, 219, 0.6) 0%, rgba(234, 255, 247, 0) 100%)",
        zIndex: 0,
      }}
    />
    {/* 右下圓形 */}
    <div
      className="d-none d-md-block"
      style={{
        position: "absolute",
        bottom: "10%",
        right: "15%",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        background:
          "linear-gradient(180deg, rgba(198, 226, 255, 0.4) 0%, rgba(198, 226, 255, 0) 100%)",
        zIndex: 0,
      }}
    />
  </>
);

const RegisterPage = () => {
  const navigate = useNavigate();

  // 表單資料狀態
  const [formData, setFormData] = useState({
    email: "",
    verifyCode: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
    agreed: false,
  });

  // UI 狀態
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validated, setValidated] = useState(false); // 控制 Bootstrap 的驗證樣式

  // 倒數計時器狀態
  const [timeLeft, setTimeLeft] = useState(0);
  const DURATION = 60;
  const STORAGE_KEY = "register_code_sent_at";

  // 初始化：檢查 localStorage 是否有未完成的倒數
  useEffect(() => {
    const sentAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (sentAt) {
      const elapsed = Math.floor((Date.now() - sentAt) / 1000);
      const remaining = DURATION - elapsed;
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // 倒數計時器邏輯
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(STORAGE_KEY);
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 發送驗證碼處理
  const handleSendCode = async () => {
    if (!formData.email) {
      Swal.fire({
        icon: "warning",
        title: "請先輸入 Email",
        text: "輸入電子信箱後才能發送驗證碼喔！",
        confirmButtonColor: "#0d6efd",
      });

      document.getElementById("InputEmail")?.focus();
      return;
    }

    // 檢查 2: Email 格式是否簡單正確 (包含 @)
    if (!formData.email.includes("@")) {
      Swal.fire({
        icon: "warning",
        title: "Email 格式錯誤",
        text: "請輸入有效的電子信箱地址",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    // 通過檢查，執行發送流程
    Swal.fire({
      icon: "info",
      title: "發送中...",
      text: "正在發送驗證碼至 " + formData.email,
      timer: 1000,
      showConfirmButton: false,
    });

    const ok = true;

    if (ok) {
      const now = Date.now();
      localStorage.setItem(STORAGE_KEY, String(now));
      setTimeLeft(DURATION);

      Swal.fire({
        icon: "success",
        title: "已發送",
        text: "驗證碼已寄至您的信箱",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // 表單送出
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // 檢查密碼一致性
    const isPasswordMatch =
      formData.password === formData.confirmPassword &&
      formData.password.length > 0;

    if (form.checkValidity() === false || !isPasswordMatch) {
      e.stopPropagation();
      setValidated(true);

      Swal.fire({
        icon: "warning",
        title: "資料填寫不完整",
        text: "請確認註冊資料皆填寫正確無誤，並勾選『使用條款與隱私權政策』。",
        confirmButtonText: "好，我檢查一下",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "註冊成功！",
      text: "歡迎加入 SubMate 會員",
      confirmButtonText: "前往首頁",
      confirmButtonColor: "#0F4C81",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center py-5">
        <BackgroundDecorations />

        <div className="container">
          <div
            className="card border-0 rounded-4 mx-auto"
            style={{
              maxWidth: "600px",
              maxWidth: "600px",
              ...BACKGROUND_STYLE,
            }}
          >
            <div className="card-body" style={{ padding: "48px 64px" }}>
              <h1
                className="h2 text-center mb-4 fw-bold"
                style={{ color: "#0F4C81" }}
              >
                SubMate 會員註冊
              </h1>

              <form
                className={`row g-3 ${validated ? "was-validated" : ""}`}
                noValidate
                onSubmit={handleSubmit}
              >
                {/* Q1：電子信箱 */}
                <InputField
                  id="InputEmail"
                  label="電子信箱地址"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  iconClass="bi bi-person-fill"
                  helperText="※電子郵件地址將作為登入帳號，敬請填寫正確資訊，以免喪失會員權益。"
                  isInvalid={
                    validated &&
                    (!formData.email || !formData.email.includes("@"))
                  }
                  invalidFeedback="無效的 Email 或已註冊"
                />

                {/* Q2：驗證碼 */}
                <div className="col-12 mb-3 pb-3 border-bottom border-light-subtle">
                  <label
                    htmlFor="verifyCodeInput"
                    className="form-label h6"
                    style={{ color: "#1F2937" }}
                  >
                    電子信箱驗證
                  </label>

                  <div className="position-relative mt-2">
                    <input
                      type="text"
                      className={`form-control bg-light border-0 ${validated && !formData.verifyCode ? "is-invalid" : ""}`}
                      style={{ paddingRight: "140px" }}
                      id="verifyCodeInput"
                      placeholder="輸入驗證碼"
                      required
                      value={formData.verifyCode}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-primary text-white position-absolute top-50 end-0 translate-middle-y me-1 rounded-pill shadow-sm"
                      style={{
                        height: "80%",
                        padding: "0 20px",
                      }}
                      onClick={handleSendCode}
                      disabled={timeLeft > 0}
                    >
                      {timeLeft > 0 ? `重新發送 (${timeLeft}s)` : "取得驗證碼"}
                    </button>
                  </div>

                  {/* 錯誤訊息 */}
                  <div
                    className="invalid-feedback"
                    style={{
                      display:
                        validated && !formData.verifyCode ? "block" : "none",
                    }}
                  >
                    驗證碼填寫錯誤！
                  </div>
                </div>

                {/* Q3：手機 */}
                <InputField
                  id="InputPhoneNumber"
                  label="手機號碼"
                  placeholder="手機號碼"
                  value={formData.phone}
                  onChange={handleChange}
                  iconClass="bi bi-telephone-fill"
                  helperText="※為保護您的個人資料，手機一旦綁定，無法變更或連結其他電子郵件。"
                  isInvalid={validated && !formData.phone}
                  invalidFeedback="無效的手機號碼格式！"
                />

                {/* Q4：密碼 */}
                <InputField
                  id="InputPassword"
                  label="密碼"
                  type={showPassword ? "text" : "password"}
                  placeholder="請輸入 8–20 位，需同時包含英文與數字"
                  pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}"
                  value={formData.password}
                  onChange={handleChange}
                  iconClass="bi bi-lock-fill"
                  isInvalid={validated && !formData.password}
                  invalidFeedback="請確認密碼輸入一致！"
                >
                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="pwCheck1"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="pwCheck1"
                    >
                      顯示密碼
                    </label>
                  </div>
                </InputField>

                {/* Q5：確認密碼 */}
                <InputField
                  id="InputPasswordConfirm"
                  label="確認密碼"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="再次輸入密碼"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  iconClass="bi bi-lock-fill"
                  isInvalid={
                    validated &&
                    (!formData.confirmPassword ||
                      formData.password !== formData.confirmPassword)
                  }
                  invalidFeedback="請確認密碼輸入一致！"
                >
                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="pwCheck2"
                      checked={showConfirmPassword}
                      onChange={(e) => setShowConfirmPassword(e.target.checked)}
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="pwCheck2"
                    >
                      顯示密碼
                    </label>
                  </div>
                </InputField>

                {/* Q6：姓名 */}
                <InputField
                  id="InputName"
                  label="真實姓名"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  iconClass="bi bi-person-fill"
                  isInvalid={validated && !formData.name}
                  invalidFeedback="請輸入姓名！"
                />

                {/* 同意條款 */}
                <div className="col-12 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="readCheck"
                      required
                      checked={formData.agreed}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="readCheck"
                    >
                      我已閱讀並同意 <u className="text-primary">使用條款</u> 與{" "}
                      <u className="text-primary">隱私權政策</u>
                    </label>
                    <div className="invalid-feedback">請勾選同意</div>
                  </div>
                </div>

                {/* 註冊按鈕 */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fs-5 text-white shadow-sm rounded-pill"
                  >
                    註冊
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
