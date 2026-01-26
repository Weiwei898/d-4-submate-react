// ==========================================
// 1. 配置與初始化
// ==========================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// 設定 API 基礎路徑 (針對 reviews 資料表)
const BASE_URL = `${SUPABASE_URL}/rest/v1/reviews`;

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

// 1. 取得所有評論
export const getReviews = async () => {
  const response = await fetch(`${BASE_URL}?select=*`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '無法取得評論列表');
  }

  return await response.json();
};

// 2. 篩選評論 (例如: 依 ID 搜尋)
export const getReviewById = async (id) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}&select=*`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '無法取得該評論');
  }

  const data = await response.json();
  // 如果是依 ID 搜尋，通常回傳單一物件，若無則回傳 null
  return data.length > 0 ? data[0] : null;
};

// 3. 新增評論
export const createReview = async (review) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(review)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '新增評論失敗');
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};

// 4. 刪除評論
export const deleteReview = async (id) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '刪除評論失敗');
  }

  // 回傳被刪除的資料 (因為設定了 return=representation)
  return await response.json();
};

// 5. 更新評論 (額外補充，方便完整 CRUD)
export const updateReview = async (id, updates) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '更新評論失敗');
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};