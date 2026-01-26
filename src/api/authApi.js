// ==========================================
// 1. 配置與初始化
// ==========================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// 設定 API 基礎路徑 (針對 Auth 系統，注意這裡是 /auth/v1)
const BASE_URL = `${SUPABASE_URL}/auth/v1`;

// 設定共用標頭
const headers = {
  'apikey': SUPABASE_KEY,
  'Content-Type': 'application/json',
};

// ==========================================
// 2. API 功能函式 (Native Fetch)
// ==========================================

// 1. 註冊 (Sign Up)
export const signUp = async (email, password, userData = {}) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email,
      password,
      data: userData // 額外的使用者資訊 (metadata)
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || error.message || '註冊失敗');
  }

  return await response.json();
};

// 2. 登入 (Sign In)
export const signIn = async (email, password) => {
  const response = await fetch(`${BASE_URL}/token?grant_type=password`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    // Supabase Auth 的錯誤訊息有時候在 error_description
    throw new Error(error.error_description || error.msg || error.message || '登入失敗');
  }

  return await response.json();
};

// 3. 登出 (Sign Out)
export const signOut = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      ...headers,
      'Authorization': `Bearer ${accessToken}` // 登出需要帶 Token
    }
  });

  if (!response.ok) {
    // 登出失敗通常不影響使用者體驗，但還是可以拋出錯誤
    const error = await response.json();
    throw new Error(error.message || '登出失敗');
  }

  // 登出成功通常回傳 204 No Content，沒有 JSON body，直接回傳 true 即可
  return true;
};

// 4. 取得當前使用者資訊 (Get User by Token)
export const getCurrentUser = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) return null; // Token 無效或過期
  return await response.json();
};