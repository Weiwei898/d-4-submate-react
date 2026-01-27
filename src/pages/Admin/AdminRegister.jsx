import React, { useState } from 'react';

function AdminRegister({ supabase }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setStatus({ type: 'danger', msg: '系統初始化中，請稍後再試。' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', msg: '正在連線至資料庫...' });

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      setStatus({
        type: 'success',
        msg: '註冊成功！請檢查信箱並完成驗證。驗證後請通知管理員開啟權限。'
      });
    } catch (err) {
      setStatus({ type: 'danger', msg: `錯誤：${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 animate-fade-in">
      {/* Page Title */}
      <div className="row mb-6">
        <div className="col-12">
          <div className="title-container d-flex align-items-center justify-content-center gap-3 mb-6 mb-md-10">
            <div className="title-logo d-flex align-items-center"></div>
            <div className="title-text">
              <h3 className="text-center">組員權限註冊</h3>
            </div>
            <div className="title-logo d-flex align-items-center"></div>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex flex-column bg-neutral-0 shadow-sm rounded px-6 py-10">
            <h5 className="text-center mb-6 text-secondary">建立帳號以取得新增、修改、刪除 (CRUD) 的權限</h5>

            <form onSubmit={handleRegister} className="d-flex flex-column gap-4">
              <div>
                <label className="form-label fw-bold text-secondary small">電子信箱</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label fw-bold text-secondary small">設定密碼</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="至少 6 位數"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Status Message Alert */}
              {status.msg && (
                <div className={`alert alert-${status.type} d-flex align-items-center`} role="alert">
                  <div>{status.msg}</div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary-600 btn-lg w-100 fw-bold mt-4"
                disabled={loading || !supabase}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    處理中...
                  </>
                ) : '送出註冊申請'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <small className="text-muted">註冊後資料將進入 Supabase Authentication 系統</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
