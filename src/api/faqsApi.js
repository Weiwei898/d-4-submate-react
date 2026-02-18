// ==========================================
// 1. 配置與初始化
// ==========================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 設定 API 基礎路徑 (針對 faqs 資料表)
const BASE_URL = `${SUPABASE_URL}/rest/v1/faqs`;

// 設定共用標頭
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation", // 讓 Supabase 在操作後回傳資料
};

// ==========================================
// 2. API 功能函式 (Native Fetch)
// ==========================================

// 1. 取得所有問題
export const getFaqs = async () => {
  const response = await fetch(`${BASE_URL}?select=*`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "無法取得問題列表");
  }

  return await response.json();
};

// 2. 篩選問題 (例如: 依 ID 搜尋)
export const getFaqById = async (id) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}&select=*`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "無法取得該問題");
  }

  const data = await response.json();
  // 如果是依 ID 搜尋，通常回傳單一物件，若無則回傳 null
  return data.length > 0 ? data[0] : null;
};

// 3. 新增問題
export const createFaq = async (faq) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(faq),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "新增問題失敗");
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};

// 4. 刪除問題
export const deleteFaq = async (id) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "刪除問題失敗");
  }

  // 回傳被刪除的資料 (因為設定了 return=representation)
  return await response.json();
};

// 5. 更新問題 (額外補充，方便完整 CRUD)
export const updateFaq = async (id, updates) => {
  const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "更新問題失敗");
  }

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};
