import React, { useEffect } from 'react';
import * as usersApi from '../api/usersApi';
import * as productsApi from '../api/productsApi';
import * as reviewsApi from '../api/reviewsApi';
import * as faqsApi from '../api/faqsApi';
import * as cartsApi from '../api/cartsApi';
import * as authApi from '../api/authApi';

const ApiTester = () => {
  useEffect(() => {
    // ==========================================
    // 將 API 掛載到 window 物件
    // 這樣就可以在瀏覽器 Console 直接呼叫測試
    // ==========================================
    window.usersApi = usersApi;
    window.productsApi = productsApi;
    window.reviewsApi = reviewsApi;
    window.faqsApi = faqsApi;
    window.cartsApi = cartsApi;
    window.authApi = authApi; // 新增 Auth API

    // 在 Console 顯示使用說明
    console.clear();
    console.log('%c API 測試模式已啟動 ', 'background: #222; color: #bada55; font-size: 16px');
    console.log('所有 API 已掛載到 window 物件，請直接在 Console 輸入指令測試。');
    
    console.group('📦 可用的 API 模組');
    console.log('window.usersApi    - 使用者資料表操作');
    console.log('window.productsApi - 商品資料表操作');
    console.log('window.reviewsApi  - 評論資料表操作');
    console.log('window.faqsApi     - 常見問題資料表操作');
    console.log('window.cartsApi    - 購物車資料表操作');
    console.log('window.authApi     - 身分驗證 (登入/註冊/登出)');
    console.groupEnd();

    console.group('🔑 Auth (身分驗證) 測試範例');
    console.log('1. 註冊: await window.authApi.signUp("test@example.com", "password123")');
    console.log('2. 登入: await window.authApi.signIn("test@example.com", "password123")');
    console.log('3. 登出: await window.authApi.signOut(token)');
    console.log('4. 查用戶: await window.authApi.getCurrentUser(token)');
    console.groupEnd();

    console.group('🛒 資料表測試範例 (以 Products 為例)');
    console.log('1. 列表: await window.productsApi.getProducts()');
    console.log('2. 新增: await window.productsApi.createProduct({ title: "Test", price: 100 })');
    console.groupEnd();

    return () => {
      // 清除掛載
      delete window.usersApi;
      delete window.productsApi;
      delete window.reviewsApi;
      delete window.faqsApi;
      delete window.cartsApi;
      delete window.authApi;
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="alert alert-info">
        <h4>API 測試模式 (Console Mode)</h4>
        <p>請按下 <strong>F12</strong> 開啟瀏覽器開發者工具，切換到 <strong>Console</strong> 分頁進行測試。</p>
        <p>API 已掛載到 <code>window</code> 全域變數上。</p>
        <hr />
        <p className="mb-0">詳細指令請查看 Console 輸出。</p>
      </div>
    </div>
  );
};

export default ApiTester;