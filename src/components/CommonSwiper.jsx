import { Swiper, SwiperSlide } from 'swiper/react';
// 引入 Swiper 的核心模組：導航箭頭 (Navigation)、分頁圓點 (Pagination)、自動播放 (Autoplay)
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// 引入 Swiper 的 CSS 樣式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 使用 props 傳入設定與內容
const CommonSwiper = ({ 
  items = [], 
  renderItem, // 這是一個 function (Render Prop 模式)，決定怎麼畫每一格內容
  config = {} // 允許針對不同頁面微調設定
}) => {
  return (
    <Swiper
      // 設定要使用的功能模組
      modules={[Navigation, Pagination, Autoplay]}
      
      // --- 基本設定 (若 config 沒傳入，則使用預設值) ---
      spaceBetween={config.spaceBetween || 20} // Slide 之間的間距 (px)
      slidesPerView={config.slidesPerView || 1} // 同時顯示幾張 Slide
      
      // --- 功能開關 ---
      // navigation: 左右切換箭頭。使用 ?? (Nullish Coalescing) 運算子：只有當 config.navigation 為 null 或 undefined 時，才預設為 true (開啟)
      navigation={config.navigation ?? true} 
      
      // pagination: 下方分頁圓點。預設為 { clickable: true } 表示圓點可以點擊切換
      pagination={config.pagination ?? { clickable: true }} 
      
      // --- 進階設定 ---
      {...config} // 展開其餘自訂設定 (例如 autoplay, loop, breakpoints 等)，讓外部可以覆蓋上面的預設值
    >
      {items.map((item, index) => (
        <SwiperSlide key={item.id || index}>
          {/* 這裡就是關鍵：把資料丟回去給呼叫者決定怎麼渲染 (Render Prop) */}
          {/* 這樣 CommonSwiper 就不需要知道內容是圖片、文字還是卡片，只負責輪播邏輯 */}
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommonSwiper;