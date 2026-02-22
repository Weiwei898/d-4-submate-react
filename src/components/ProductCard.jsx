import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ProductCard 元件
 * @param {object} props - 元件的 props
 * @param {Array<object>} props.plans - 屬於同一個服務的多個方案物件陣列 (例如 [Netflix HD方案, Netflix 4K方案])
 */
const ProductCard = ({ plans, onOpenDetails }) => {
  // useNavigate 是 react-router-dom 提供的 hook，用於程式化的頁面跳轉
  const navigate = useNavigate();
  // activePlan 狀態用來追蹤並顯示當前使用者選擇的方案。初始值為 null
  const [activePlan, setActivePlan] = useState(null);

  // useEffect Hook: 用於處理 props 傳入後的副作用
  // 當 props.plans 發生變化時，此函式會執行，自動將 activePlan 的狀態設置為傳入方案中的第一個
  useEffect(() => {
    // 確保 plans 是一個有內容的陣列
    if (plans && plans.length > 0) {
      // setActivePlan 會更新 activePlan 的狀態，觸發元件重新渲染以顯示該方案的資訊
      setActivePlan(plans[0]); 
    }
  }, [plans]); // 依賴項陣列：只有當 plans 這個 prop 改變時，這個 effect 才會重新執行

  // 防禦性程式碼：如果 activePlan 尚未被設置 (例如 props.plans 是空的)，則不渲染任何內容，避免後續程式碼出錯
  if (!activePlan) return null;

  // 解析 `description` 欄位以獲取特色列表。這是一個「立即調用函式表達式」(IIFE)
  // 它的目的是根據 `activePlan.description` 的格式，穩健地產生一個 `features` 陣列
  const features = (() => {
    // 情況1: 如果 `activePlan.description` 已經是一個陣列 (例如，從 API 來的時候就被正確解析)
    if (Array.isArray(activePlan.description)) {
      // ...就直接回傳使用
      return activePlan.description;
    }
    // 情況2: 如果 `activePlan.description` 不是陣列，我們假設它是一個 JSON 字串
    try {
      // JSON.parse() 會嘗試將一個 JSON 字串轉換為 JavaScript 的值 (此處預期是陣列)
      // `activePlan.description || "[]"` 的意思是：如果 `activePlan.description` 是 `null` 或 `undefined`，就使用 `[]` 這個空陣列的字串作為備用，避免 `JSON.parse(null)` 拋出錯誤
      return JSON.parse(activePlan.description || "[]");
    } catch (e) {
      // 如果 `try` 區塊內的程式碼執行出錯 (例如 `activePlan.description` 是 "你好" 這種無效的JSON字串)，`catch` 會捕捉到錯誤
      // 記錄錯誤到控制台，方便開發者除錯
      console.error("Failed to parse activePlan.description:", activePlan.description);
      // ...並返回一個空陣列，確保即使資料格式錯誤，頁面也不會因此崩潰
      return [];
    }
  })();

  return (
    <div className="col-12 col-md-6 col-lg-4 catalog-item" data-cat={activePlan.category}>
      <div className="card p-4 p-md-8 h-100 border border-2 rounded-3 border-neutral-0 bg-white bg-opacity-40 position-relative">
        {activePlan.plan_category && (
          <span className="badge rounded-pill bg-gradient-01-bltr text-neutral-0 position-absolute badge-stytle py-2 px-4 fw-semibold fs-7">
            {activePlan.plan_category}
          </span>
        )}
        {/* 主要圖片區域：圖片來源隨 activePlan 的變化而更新 */}
        <div className="d-flex justify-content-center mb-4 mb-md-6">
          <img 
            src={activePlan.imageUrl} 
            alt={activePlan.title} 
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} 
          />
        </div>

        {/* 方案切換按鈕組：映射 plans 陣列來產生所有可選方案的按鈕 */}
        <div className="card-switch bg-neutral-0 nav gap-2 p-2 flex-nowrap overflow-auto mb-4 mb-md-6 border border-1 rounded-4 shadow">
          {plans.map((plan) => (
            <button
              key={plan.id}
              className={`btn btn-sm text-neutral-300 px-4 py-2 rounded-4 btn-effect w-100 ${activePlan.id === plan.id ? 'active' : ''}`}
              type="button"
              onClick={() => setActivePlan(plan)} // 點擊按鈕時，更新 activePlan 為所選方案
            >
              {plan.plan_name}
            </button>
          ))}
        </div>

        <div className="card-body p-0">
          {/* 卡片核心內容面板 */}
          <div className="card-pane d-flex flex-column justify-content-between h-100">
            {/* 特色列表渲染區域 */}
            <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
              {/* 映射 features 陣列，為每個特色項目產生一個列表項 */}
              {features.map((item, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div className="svg-task_alt-size">
                    <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id={`mask0_${activePlan.id}_${index}`} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask={`url(#mask0_${activePlan.id}_${index})`}>
                        <path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" />
                      </g>
                    </svg>
                  </div>
                  <div className="fs-7 fs-md-6 text-neutral-700">{item}</div>
                </div>
              ))}
            </div>
            {/* 價格與單位顯示區域 */}
            <div className="d-flex gap-2 justify-content-center align-items-center">
              <p className="text-primary-600 h4 h3-md">{activePlan.price}</p>
              <p className="text-neutral-800 fs-md-5">/ {activePlan.unit || '期'}</p>
            </div>
          </div>
        </div>
        
        {/* 主要操作按鈕 */}
        <button 
          className="mt-4 mt-md-6 w-100 py-4 px-6 border-0 bg-primary-600 text-neutral-0 rounded-pill"
          onClick={() => onOpenDetails(plans)}
        >
          立即訂閱
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
