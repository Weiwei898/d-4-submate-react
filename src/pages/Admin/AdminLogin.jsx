import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ supabase }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 登入成功，導向到註冊頁面 (或是未來的 Dashboard)
      navigate('/admin/register');
    } catch (error) {
      setErrorMsg('登入失敗：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="bg-neutral-0 shadow-sm rounded px-6 py-10">
          <h2 className="text-center mb-6">後台登入</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label fw-bold text-secondary small">電子信箱</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold text-secondary small">密碼</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <button
              type="submit"
              className="btn btn-primary-600 btn-lg w-100 fw-bold mt-4"
              disabled={loading}
            >
              {loading ? '登入中...' : '登入'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
