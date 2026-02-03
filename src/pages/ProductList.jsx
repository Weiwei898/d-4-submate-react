import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productsApi';
import CommonSwiper from '../components/CommonSwiper';
// import Header from '../layout/Header'; // 請根據實際路徑引入 Header
// import Footer from '../layout/Footer'; // 請根據實際路徑引入 Footer

const ProductCard = ({ category, imgSrc, imgAlt, badge, tabs, children }) => {
  const [activeView, setActiveView] = useState(tabs[0].id);

  return (
    <div className="col-12 col-md-6 col-lg-4 catalog-item" data-cat={category}>
      <div className="card p-4 p-md-8 h-100 border border-2 rounded-3 border-neutral-0 bg-white bg-opacity-40 position-relative">
        {/* 如果有 badge 屬性，則顯示標籤 */}
        {badge && (
          <span className="badge rounded-pill bg-gradient-01-bltr text-neutral-0 position-absolute badge-stytle py-2 px-4 fw-semibold fs-7">
            {badge}
          </span>
        )}
        <div className="d-flex justify-content-center mb-4 mb-md-6">
          <img src={imgSrc} alt={imgAlt} style={imgAlt === 'YouTubePremium' ? { width: 'auto' } : {}} />
        </div>

        {/* 切換按鈕：遍歷 tabs 陣列生成按鈕 */}
        <div className="card-switch bg-neutral-0 nav gap-2 p-2 flex-nowrap overflow-auto mb-4 mb-md-6 border border-1 rounded-4 shadow">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              // 如果當前 activeView 等於 tab.id，則加上 active class
              className={`btn btn-sm text-neutral-300 px-4 py-2 rounded-4 btn-effect w-100 ${activeView === tab.id ? 'active' : ''}`}
              type="button"
              // 點擊時更新 activeView 狀態
              onClick={() => setActiveView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card-body p-0">
          {/* 內容區域：遍歷 children，根據 data-view 屬性決定是否顯示 */}
          {React.Children.map(children, (child) => {
            // 檢查子元素是否有 data-view 屬性
            if (React.isValidElement(child) && child.props['data-view']) {
              return (
                <div className={`card-pane h-100 ${child.props['data-view'] === activeView ? 'd-flex flex-column justify-content-between' : 'd-none'}`}>
                  {child.props.children}
                </div>
              );
            }
            return child;
          })}
        </div>
        {/* 訂閱按鈕 */}
        <button className="mt-4 mt-md-6 w-100 py-4 px-6 border-0 bg-primary-600 text-neutral-0 rounded-pill">
          立即訂閱
        </button>
      </div>
    </div>
  );
};

const ProductList = () => {
  // filter 狀態：控制顯示哪種類型的產品 (all: 全部, stream: 串流影音, ai: AI 工具)
  const [filter, setFilter] = useState('all'); // all, stream, ai
  const [products, setProducts] = useState([]);
  //取得產品，getProducts()就是靜態的productsApi.js
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('取得商品失敗:', error);
      }
    };
    fetchProducts();
  }, []);

  // 定義輪播圖的資料結構 (取代原本寫死在 HTML 的 carousel-item)
  const heroSlides = [
    {
      id: 'stream',
      category: 'stream',
      badge: '影音熱門組合',
      title1: '追劇不停!!!',
      title2: '國際大片+原創劇!!!',
      bgClass: 'hero-veil', // 對應原本的 CSS class
    },
    {
      id: 'ai',
      category: 'ai',
      badge: 'AI 工具熱門組合',
      title1: '工作效率再升級',
      title2: '一起用更順手！',
      bgClass: 'hero-veil-bubbles', // 對應原本的 CSS class
    },
  ];

  // 篩選邏輯：判斷產品類別是否符合當前 filter
  const isVisible = (cat) => filter === 'all' || filter === cat;

  return (
    <div className="bg-primary-50">
      {/* <Header /> */}

      {/* Hero Carousel - 改用 CommonSwiper 套件實作 */}
      {/* 這裡使用 CommonSwiper 取代原本的 Bootstrap Carousel 結構 */}
      {/* 樣式部分保留原本的 px-4 px-md-10 以維持版面間距 */}
      <section className="px-4 px-md-10">
        <CommonSwiper
          items={heroSlides}
          config={{
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            loop: true,
            // 使用 Swiper 內建的導航和分頁，取代原本手寫的 DOM
            navigation: true,
            pagination: { clickable: true },
          }}
          renderItem={(slide) => (
            // 這裡保留原本的樣式類別 (pt-120, hero-veil 等) 以維持視覺效果
            <div className={`pt-120 pt-md-13 ${slide.bgClass}`}>
              <div className="d-flex flex-column align-items-center container">
                <span
                  className="border border-2 border-neutral-0 bg-neutral-0 rounded-pill py-2 px-6 fs-5 fs-md-3 text-primary-600 mb-6"
                  style={{ '--bs-bg-opacity': '.4' }}
                >
                  {slide.badge}
                </span>
                <h2 className="fs-2 fs-md-56 mb-4">{slide.title1}</h2>
                <h2 className="fs-2 fs-md-56 mb-56 mb-md-13">{slide.title2}</h2>
                <ul className="brand-logos d-flex justify-content-center flex-wrap gap-10">
                  {products
                    .filter((product) => product.category === slide.category) // 篩選 category 分類
                    .filter((product, index, self) => // 篩選 imageUrl 有重覆的
                      index === self.findIndex((p) => p.imageUrl === product.imageUrl)
                    )
                    .map((product) => (
                      <li key={product.id}><img src={product.imageUrl} alt={product.title} /></li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        />
      </section>

      <div className="container my-10 my-md-13">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* 篩選按鈕 */}
            <ul className="nav nav-pills justify-content-center mb-6 mb-md-10" id="catalogFilters">
              <li className="nav-item me-4">
                <button className={`nav-link text-neutral-300 neutral-300 ${filter === 'all' ? 'active' : ''}`} type="button" onClick={() => setFilter('all')}>
                  <svg className="svg-stytle" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_29351_2149" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_29351_2149)">
                      <path d="M16.65 13L11 7.34995L16.65 1.69995L22.3 7.34995L16.65 13ZM3 11V2.99995H11V11H3ZM13 21V13H21V21H13ZM3 21V13H11V21H3ZM5 8.99995H9V4.99995H5V8.99995ZM16.675 10.2L19.5 7.37495L16.675 4.54995L13.85 7.37495L16.675 10.2ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z" fill="currentColor" />
                    </g>
                  </svg>
                  <div className="h5 h3-md">所有項目</div>
                </button>
              </li>
              <li className="nav-item me-4">
                <button className={`nav-link text-neutral-300 neutral-300 ${filter === 'stream' ? 'active' : ''}`} type="button" onClick={() => setFilter('stream')}>
                  <svg className="svg-stytle" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_29351_2148" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_29351_2148)">
                      <path d="M12 13.5L18 9.5L12 5.5V13.5ZM12.7 19H18.3C18.1833 19.4333 17.9833 19.7833 17.7 20.05C17.4167 20.3167 17.05 20.4833 16.6 20.55L5.7 21.875C5.15 21.9583 4.65417 21.8292 4.2125 21.4875C3.77084 21.1458 3.51667 20.7 3.45 20.15L2.125 9.225C2.05834 8.675 2.19167 8.18333 2.525 7.75C2.85834 7.31667 3.3 7.06667 3.85 7L5 6.85V8.85L4.1 8.975L5.45 19.9L12.7 19ZM9 17C8.45 17 7.97917 16.8042 7.5875 16.4125C7.19584 16.0208 7 15.55 7 15V4C7 3.45 7.19584 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V15C22 15.55 21.8042 16.0208 21.4125 16.4125C21.0208 16.8042 20.55 17 20 17H9ZM9 15H20V4H9V15Z" fill="currentColor" />
                    </g>
                  </svg>
                  <div className="h5 h3-md">串流影音</div>
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link text-neutral-300 neutral-300 ${filter === 'ai' ? 'active' : ''}`} type="button" onClick={() => setFilter('ai')}>
                  <svg className="svg-stytle" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_29351_2147" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_29351_2147)">
                      <path d="M4 21V16C4 15.45 4.19583 14.9792 4.5875 14.5875C4.97917 14.1958 5.45 14 6 14H18C18.55 14 19.0208 14.1958 19.4125 14.5875C19.8042 14.9792 20 15.45 20 16V21H4ZM9 13C7.61667 13 6.4375 12.5125 5.4625 11.5375C4.4875 10.5625 4 9.38333 4 8C4 6.61667 4.4875 5.4375 5.4625 4.4625C6.4375 3.4875 7.61667 3 9 3H15C16.3833 3 17.5625 3.4875 18.5375 4.4625C19.5125 5.4375 20 6.61667 20 8C20 9.38333 19.5125 10.5625 18.5375 11.5375C17.5625 12.5125 16.3833 13 15 13H9ZM6 19H18V16H6V19ZM9 11H15C15.8333 11 16.5417 10.7083 17.125 10.125C17.7083 9.54167 18 8.83333 18 8C18 7.16667 17.7083 6.45833 17.125 5.875C16.5417 5.29167 15.8333 5 15 5H9C8.16667 5 7.45833 5.29167 6.875 5.875C6.29167 6.45833 6 7.16667 6 8C6 8.83333 6.29167 9.54167 6.875 10.125C7.45833 10.7083 8.16667 11 9 11ZM9 9C9.28333 9 9.52083 8.90417 9.7125 8.7125C9.90417 8.52083 10 8.28333 10 8C10 7.71667 9.90417 7.47917 9.7125 7.2875C9.52083 7.09583 9.28333 7 9 7C8.71667 7 8.47917 7.09583 8.2875 7.2875C8.09583 7.47917 8 7.71667 8 8C8 8.28333 8.09583 8.52083 8.2875 8.7125C8.47917 8.90417 8.71667 9 9 9ZM15 9C15.2833 9 15.5208 8.90417 15.7125 8.7125C15.9042 8.52083 16 8.28333 16 8C16 7.71667 15.9042 7.47917 15.7125 7.2875C15.5208 7.09583 15.2833 7 15 7C14.7167 7 14.4792 7.09583 14.2875 7.2875C14.0958 7.47917 14 7.71667 14 8C14 8.28333 14.0958 8.52083 14.2875 8.7125C14.4792 8.90417 14.7167 9 15 9Z" fill="currentColor" />
                    </g>
                  </svg>
                  <div className="h5 h3-md">AI 協作工具</div>
                </button>
              </li>
            </ul>

            {/* 卡片列表 */}
            <div className="container mt-4">
              <div className="row g-4 g-md-6" id="catalogGrid">
                {/* Netflix (Placeholder for included content) */}
                {isVisible('stream') && (
                  <div className="col-12 col-md-6 col-lg-4 catalog-item" data-cat="stream">
                    {/* 這裡原本是 <%- include('./layout/details_netflix'); -%> */}
                    {/* 由於沒有 details_netflix 的內容，這裡保留位置 */}
                    <div className="card p-4 p-md-8 h-100 border border-2 rounded-3 border-neutral-0 bg-white bg-opacity-40">
                      <div className="d-flex justify-content-center mb-4 mb-md-6">
                        <img src="../assets/images/Property1_NETFLIX.svg" alt="NETFLIX" />
                      </div>
                      <div className="card-body p-0 text-center">
                        <p>Netflix 方案詳情 (請參考 details_netflix)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disney+ */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_Disney+.svg"
                    imgAlt="Disney+"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            {/* SVG Icon */}
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">10 台裝置（註冊)</div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">4人同時觀看</div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">無限制「地點」，可共享但官方不推薦</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 270</p>
                        <p className="text-neutral-800 fs-md-5">/ 月</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">無限制「地點」，可共享但官方不推薦</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 2,790</p>
                        <p className="text-neutral-800 fs-md-5">/ 年</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* YouTube Premium */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_YouTubePremium.svg"
                    imgAlt="YouTubePremium"
                    tabs={[{ id: 'month', label: '月費' }]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">家人共享最多 5 位家庭成員</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 290</p>
                        <p className="text-neutral-800 fs-md-5">/ 月</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* KKTV */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_KKTV.svg"
                    imgAlt="KKTV"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">無嚴格限制，實測可多人使用</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 220</p>
                        <p className="text-neutral-800 fs-md-5">/ 月</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">無限制地點，偏寬鬆</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 2,190</p>
                        <p className="text-neutral-800 fs-md-5">/ 年</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* iQIYI */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_iQIYI.svg"
                    imgAlt="iQIYI"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">可隨時取消</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 298</p>
                        <p className="text-neutral-800 fs-md-5">/ 月</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每期送天數+電影單片券(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 2,388</p>
                        <p className="text-neutral-800 fs-md-5">/ 360天</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Spotify */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_Spotify.svg"
                    imgAlt="Spotify"
                    tabs={[{ id: 'month', label: '月費' }]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每戶支援最多 10 裝置</div>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="svg-task_alt-size">
                            <svg class="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div class="fs-7 fs-md-6 text-neutral-700">2人同時觀看</div>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="svg-task_alt-size">
                            <svg class="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">無限制地點，偏寬鬆</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 250</p>
                        <p className="text-neutral-800 fs-md-5">/ 月</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* HamiVideo */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_HamiVideo.svg"
                    imgAlt="HamiVideo"
                    tabs={[
                      { id: '60-days', label: '60 天' },
                      { id: '90-days', label: '90 天' },
                      { id: '180-days', label: '180 天' },
                    ]}
                  >
                    <div data-view="60-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每方案送天數(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 199</p>
                        <p className="text-neutral-800 fs-md-5">/ 60天</p>
                      </div>
                    </div>
                    <div data-view="90-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每方案送天數(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 597</p>
                        <p className="text-neutral-800 fs-md-5">/ 90天</p>
                      </div>
                    </div>
                    <div data-view="180-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每方案送天數(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 1,194</p>
                        <p className="text-neutral-800 fs-md-5">/ 180天</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* friday */}
                {isVisible('stream') && (
                  <ProductCard
                    category="stream"
                    imgSrc="../assets/images/Property1_friday.svg"
                    imgAlt="friday"
                    tabs={[
                      { id: '30-days', label: '30天' },
                      { id: '90-days', label: '90天' },
                      { id: '180-days', label: '180天' },
                      { id: '360-days', label: '360天' },
                    ]}
                  >
                    <div data-view="30-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每期送天數+電影單片券(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 199</p>
                        <p className="text-neutral-800 fs-md-5">/ 30天</p>
                      </div>
                    </div>
                    <div data-view="90-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每期送天數+電影單片券(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 597</p>
                        <p className="text-neutral-800 fs-md-5">/ 90天</p>
                      </div>
                    </div>
                    <div data-view="180-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每期送天數+電影單片券(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 1,194</p>
                        <p className="text-neutral-800 fs-md-5">/ 180天</p>
                      </div>
                    </div>
                    <div data-view="360-days">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">每期送天數+電影單片券(贈送內容依各方案而定)</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 2,388</p>
                        <p className="text-neutral-800 fs-md-5">/ 360天</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Canva */}
                {isVisible('ai') && (
                  <ProductCard
                    category="ai"
                    imgSrc="../assets/images/Property1_Canva.svg"
                    imgAlt="Canva"
                    tabs={[{ id: 'plus', label: '月費' }]}
                  >
                    <div data-view="plus">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">裝置數不限</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 500</p>
                        <p className="text-neutral-800 fs-md-5">/ 月 / 5人內</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Microsoft365 */}
                {isVisible('ai') && (
                  <ProductCard
                    category="ai"
                    imgSrc="../assets/images/Property1_Microsoft365.svg"
                    imgAlt="Microsoft365"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">Word、Excel、OneDrive 含 Copilot、1TB／人</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 388</p>
                        <p className="text-neutral-800 fs-md-5">/ 月 / 人</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">Word、Excel、OneDrive 含 Copilot、1TB／人</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 3,880</p>
                        <p className="text-neutral-800 fs-md-5">/ 年 / 人</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Miro Starter */}
                {isVisible('ai') && (
                  <ProductCard
                    category="ai"
                    imgSrc="../assets/images/Property1_miro.svg"
                    imgAlt="miro"
                    badge="Starter"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">Miro AI：每位成員每月 25 次</div>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="svg-task_alt-size">
                            <svg class="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">協作對象：支援 Visitors（匿名訪客連結）</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 300</p>
                        <p className="text-neutral-800 fs-md-5">/ 月 / 人</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">推薦組合Notion Business + Miro Starter 可整合</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 3,600</p>
                        <p className="text-neutral-800 fs-md-5">/ 年 / 人</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Miro Business */}
                {isVisible('ai') && (
                  <ProductCard
                    category="ai"
                    imgSrc="../assets/images/Property1_miro.svg"
                    imgAlt="miro"
                    badge="Business"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">Miro AI：每位成員每月 50 次</div>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="svg-task_alt-size">
                            <svg class="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">協作對象：支援 Guests（需登入）＋ Visitors</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 600</p>
                        <p className="text-neutral-800 fs-md-5">/ 月 / 人</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">安全/管理：單一登入（SSO）、多團隊管理、進階權限控管</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 5,380</p>
                        <p className="text-neutral-800 fs-md-5">/ 年 / 人</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Notion Plus */}
                {isVisible('ai') && (
                  <ProductCard
                    category="ai"
                    imgSrc="../assets/images/Property1_Notion.svg"
                    imgAlt="Notion"
                    badge="Plus"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">推薦組合Notion Plus + Canva for Teams</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 300</p>
                        <p className="text-neutral-800 fs-md-5">/ 月 / 人</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">推薦組合Notion Plus + Canva for Teams</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 3,600</p>
                        <p className="text-neutral-800 fs-md-5">/ 年 / 人</p>
                      </div>
                    </div>
                  </ProductCard>
                )}

                {/* Notion Business */}
                {isVisible('ai') && (
                  <ProductCard
                    category="ai"
                    imgSrc="../assets/images/Property1_Notion.svg"
                    imgAlt="Notion"
                    badge="Business"
                    tabs={[
                      { id: 'month', label: '月費' },
                      { id: 'year', label: '年費' },
                    ]}
                  >
                    <div data-view="month">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">包含NotionAI功能，高級安全與權限管理集成系統</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 450</p>
                        <p className="text-neutral-800 fs-md-5">/ 月 / 人</p>
                      </div>
                    </div>
                    <div data-view="year">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9" /></mask><g mask="url(#mask0_29222_16883)"><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" /></g></svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">安全/管理：單一登入（SSO）、多團隊管理、進階權限控管</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">NT$ 5,380</p>
                        <p className="text-neutral-800 fs-md-5">/ 年 / 人</p>
                      </div>
                    </div>
                  </ProductCard>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}

      {/* global svg defs */}
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <linearGradient id="grad-01" gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="24" y2="0">
            <stop offset="0%" stopColor="#9738F5" />
            <stop offset="50%" stopColor="#11A7ED" />
            <stop offset="100%" stopColor="#1EDFAD" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ProductList;