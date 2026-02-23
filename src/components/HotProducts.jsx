import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonSwiper from './CommonSwiper';
import { getProducts } from '../api/productsApi';
// 引入 reviewsApi
import { getReviews } from '../api/reviewsApi';

const HotProducts = () => {
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 取得所有產品
        const allProducts = await getProducts();
        
        // 2. 整理產品資料 (因為 Supabase 回傳的是方案，我們需要依 Title 分組取得唯一產品)
        const uniqueProducts = [];
        const map = new Map();
        for (const item of allProducts) {
            if(!map.has(item.title)){
                map.set(item.title, true);
                uniqueProducts.push(item);
            }
        }

        // 3. 取得評論並計算評分 (這裡模擬邏輯，若您有真實 API 請替換)
        let productsWithRating = uniqueProducts.map(p => ({
          ...p,
          rating: 0, // 預設 0 分
          reviewCount: 0
        }));

        try {
          const reviews = await getReviews(); 
          // 這裡實作將 reviews 對應到 productsWithRating 的邏輯
          // 例如: 計算平均分數並更新 rating 欄位
        } catch (err) {
          console.log("尚未串接評論 API 或取得失敗，將使用隨機推薦");
        }

        // 4. 篩選邏輯：5星 -> 4星 -> 隨機
        let filtered = [];
        
        // 找出 5 星
        const fiveStars = productsWithRating.filter(p => p.rating >= 5);
        // 找出 4 星 (且不包含已選的 5 星)
        const fourStars = productsWithRating.filter(p => p.rating >= 4 && p.rating < 5);
        // 其他 (尚未評價或低分)
        const others = productsWithRating.filter(p => p.rating < 4);

        // 依序放入
        filtered = [...fiveStars, ...fourStars];

        // 如果數量不足 4 筆，從 others 隨機補足
        if (filtered.length < 4) {
          // 隨機打亂 others 陣列
          const shuffledOthers = others.sort(() => 0.5 - Math.random());
          // 補足缺額
          const needed = 4 - filtered.length;
          filtered = [...filtered, ...shuffledOthers.slice(0, needed)];
        }

        // 取最終前 4 筆
        const finalSelection = filtered.slice(0, 4);
        
        setHotProducts(finalSelection);

      } catch (error) {
        console.error('取得熱門商品失敗:', error);
      }
    };

    fetchData();
  }, []);

  // 如果沒有資料，不顯示區塊
  if (hotProducts.length === 0) return null;

  return (
    <div className="index-product-bg swiper-container">
      <CommonSwiper
        items={hotProducts}
        config={{
          slidesPerView: 1,
          spaceBetween: 16,
          loop: true, // 如果項目少於 slidesPerView 可能需要關閉 loop，視需求調整
          navigation: true,
          pagination: { clickable: true },
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }
        }}
        renderItem={(item) => {
          // 解析 description
          const features = (() => {
            if (Array.isArray(item.description)) {
              return item.description;
            }
            try {
              return JSON.parse(item.description || "[]");
            } catch (e) {
              console.error("Failed to parse item.description:", item.description);
              return [];
            }
          })();

          return (
            <div className="card p-4 p-md-8 h-100 border border-2 rounded-3 border-neutral-0 bg-white bg-opacity-40 position-relative">
              {item.plan_category && (
                <span className="badge rounded-pill bg-gradient-01-bltr text-neutral-0 position-absolute badge-stytle py-2 px-4 fw-semibold fs-7">
                  {item.plan_category}
                </span>
              )}
              
              <div className="d-flex justify-content-center align-items-center mb-4 mb-md-6" style={{ height: '80px' }}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                />
              </div>

              <div className="card-body p-0 d-flex flex-column">
                <div className="card-pane d-flex flex-column justify-content-between flex-grow-1">
                  <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                    {features.map((feature, index) => (
                      <div key={index} className="d-flex align-items-start">
                        <div className="svg-task_alt-size flex-shrink-0">
                          <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id={`mask0_hot_${item.id}_${index}`} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                              <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask={`url(#mask0_hot_${item.id}_${index})`}>
                              <path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" />
                          </g>
                        </svg>
                      </div>
                      <div className="fs-7 fs-md-6 text-neutral-700">{feature}</div>
                    </div>
                    ))}
                  </div>
                  
                  <div className="d-flex gap-2 justify-content-center align-items-center mt-auto">
                    <p className="text-primary-600 h4 h3-md">{item.price}</p>
                    <p className="text-neutral-800 fs-md-5">/ {item.unit || '期'}</p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/products" 
                className="mt-4 mt-md-6 w-100 py-4 px-6 border-0 bg-primary-600 text-neutral-0 rounded-pill text-decoration-none d-block text-center"
              >
                立即訂閱
              </Link>
            </div>
          );
        }}
      />
    </div>
  );
};

export default HotProducts;
