import React, { useEffect } from 'react';

// =========================================================================
// ⚠️【本地開發關鍵步驟】：
// 在您的 VS Code 專案中，請務必「取消」下方這兩行的註解！
// 這是讓 Console 能真的連上 Supabase 的關鍵。
// =========================================================================
// import * as productsApi from '../api/productsApi';
// import * as usersApi from '../api/usersApi';

// --- 模擬資料 (僅供預覽，本地請刪除) ---
const productsApi = {
  getProducts: async () => { console.log("📦 [GET] 取得所有產品..."); return [{id: 1, title: "測試產品"}]; },
  addProduct: async (data) => console.log("➕ [ADD] 新增產品:", data),
  deleteProduct: async (id) => console.log("❌ [DELETE] 刪除產品 ID:", id),
  updateProduct: async (id, data) => console.log("✏️ [UPDATE] 修改產品 ID:", id, data)
};
const usersApi = {
  getMyProfile: async () => console.log("👤 [GET] 取得個人資料...")
};
// ---------------------------------------------------

/**
 * 🛠️ API Console 測試器
 * 只要把這個元件放在 App.jsx 裡，您就不需要寫任何 UI。
 * 直接按 F12 打開 Console，輸入指令就能操作資料庫！
 */
const ApiTester = () => {
  useEffect(() => {
    // 1. 將整包 API 掛載到 window 物件
    // 這樣您在 Console 就可以直接用 window.productsApi 來呼叫
    window.productsApi = productsApi;
    window.usersApi = usersApi;

    console.clear();
    console.log("%c🚀 API 測試模式已啟動！", "color: #00ff9d; font-size: 16px; font-weight: bold; background: #333; padding: 4px; border-radius: 4px;");
    console.log("請嘗試在下方輸入：await window.productsApi.getProducts()");

    // 2. 清理函式
    return () => {
      delete window.productsApi;
      delete window.usersApi;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900/90 p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700 z-50 font-mono text-xs max-w-sm">
      <h3 className="text-sm font-bold text-green-400 mb-3 border-b border-slate-700 pb-2 flex justify-between items-center">
        <span>⚡ Console Command Center</span>
        <span className="text-[10px] bg-green-900 text-green-300 px-2 py-0.5 rounded">Active</span>
      </h3>
      
      <div className="space-y-3 opacity-80">
        <div>
          <p className="text-slate-400 mb-1">📦 產品 (productsApi)</p>
          <ul className="list-disc ml-4 space-y-1 text-blue-300">
            <li className="hover:text-white cursor-pointer transition-colors" title="點擊複製" onClick={() => navigator.clipboard.writeText('await window.productsApi.getProducts()')}>
              await window.productsApi.getProducts()
            </li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigator.clipboard.writeText("await window.productsApi.addProduct({ title: 'New', price: 100 })")}>
              await window.productsApi.addProduct(...)
            </li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigator.clipboard.writeText("await window.productsApi.deleteProduct('id')")}>
              await window.productsApi.deleteProduct(...)
            </li>
          </ul>
        </div>
        
        <div>
          <p className="text-slate-400 mb-1">👤 會員 (usersApi)</p>
          <ul className="list-disc ml-4 space-y-1 text-purple-300">
            <li className="hover:text-white cursor-pointer transition-colors">
              await window.usersApi.getMyProfile()
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700 text-slate-500 text-[10px] text-center">
        按 <kbd className="bg-slate-700 px-1 rounded text-slate-300">F12</kbd> 開啟 Console 貼上指令
      </div>
    </div>
  );
};

export default ApiTester;