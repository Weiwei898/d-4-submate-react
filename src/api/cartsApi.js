// ==========================================
// 1. 配置與初始化
// ==========================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// 設定 API 基礎路徑 (針對 carts 資料表)
const BASE_URL = `${SUPABASE_URL}/rest/v1/carts`;

// 設定共用標頭
const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation' // 讓 Supabase 在操作後回傳資料
};

// ==========================================
// 2. API 功能函式 (Native Fetch)
// ==========================================

// 1. 取得所有購物車
export const getCarts = async () => {
  const response = await fetch(`${BASE_URL}?select=*`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '無法取得購物車列表');
  }

  return await response.json();
};

// 2. 篩選購物車 (例如: 依 ID 搜尋)
export const getCartById = async (id) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}&select=*`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '無法取得該購物車');
  }

  const data = await response.json();
  // 如果是依 ID 搜尋，通常回傳單一物件，若無則回傳 null
  return data.length > 0 ? data[0] : null;
};

// 3. 新增購物車
export const createCart = async (cart) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(cart)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '新增購物車失敗');
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};

// 4. 刪除購物車
export const deleteCart = async (id) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '刪除購物車失敗');
  }

  // 回傳被刪除的資料 (因為設定了 return=representation)
  return await response.json();
};

// 5. 更新購物車 (額外補充，方便完整 CRUD)
export const updateCart = async (id, updates) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '更新購物車失敗');
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};