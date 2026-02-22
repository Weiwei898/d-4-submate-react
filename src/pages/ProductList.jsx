import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productsApi';
import CommonSwiper from '../components/CommonSwiper';
import ProductCard from '../components/ProductCard';
import ProductDetails from '../components/ProductDetails';

const ProductList = () => {
  // filter 狀態：控制顯示哪種類型的產品 (all: 全部, stream: 串流影音, ai: AI 工具)
  const [filter, setFilter] = useState('all'); // all, stream, ai
  const [products, setProducts] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState(null);

  const handleOpenDetails = (plans) => {
    setSelectedPlans(plans);
  };

  const handleCloseDetails = () => {
    setSelectedPlans(null);
  };

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

  // 將產品依據 title (服務名稱) 分組
  const serviceGroups = React.useMemo(() => {
    const groups = {};
    products.forEach(product => {
      if (!groups[product.title]) {
        groups[product.title] = [];
      }
      groups[product.title].push(product);
    });

    // 針對每個群組內的方案進行排序 (依價格由低到高)
    return Object.values(groups).map(groupPlans => {
      return groupPlans.sort((a, b) => {
        // 嘗試將價格轉為數字進行比較 (移除非數字字元如 "NT$", "," 等)
        const priceA = Number(String(a.price).replace(/[^0-9.-]+/g, "")) || 0;
        const priceB = Number(String(b.price).replace(/[^0-9.-]+/g, "")) || 0;
        return priceA - priceB;
      });
    });
  }, [products]);

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
            {/* plans={plans} 這一部分了嗎？這就是父元件 ProductList 將它自己內部名為 plans 的變數 (一個包含多個方案的陣列)，當作一個名叫 plans 的 "prop"，傳遞給了子元件 ProductCard。*/}
            <div className="container mt-4">
              <div className="row g-4 g-md-6" id="catalogGrid">
                {serviceGroups
                  .filter(plans => filter === 'all' || plans[0].category === filter)
                  .map(plans => (
                    <ProductCard key={plans[0].title} plans={plans} onOpenDetails={handleOpenDetails} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPlans && <ProductDetails plans={selectedPlans} onClose={handleCloseDetails} />}

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