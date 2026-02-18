import React, { useState, useEffect } from "react";
// 暫時將 API 註解起來，等之後要串接真實資料時再打開
// import { getFaqs } from "../api/faqsApi";

import FaqCategorySection from "../components/FaqCategorySection";
import HelpCta from "../components/HelpCta";

// ==========================================
// 1. 設定檔：集中管理所有品牌與對應的 Logo
// ==========================================
const BRAND_LIST = [
  {
    id: "SubMate",
    title: "SubMate",
    logo: "../src/assets/images/SubMate_newLogo.svg",
  },
  {
    id: "NETFLIX",
    title: "NETFLIX",
    logo: "../src/assets/images/Property1_NETFLIX.svg",
    productId: [
      "3939f2e7-113e-46eb-9eab-4a241e0a608a",
      "dbbc3aa6-f2af-42fa-b9bd-ee3ac6b5789b",
    ],
  },
  {
    id: "Disney+",
    title: "Disney+",
    logo: "../src/assets/images/Property1_Disney+.svg",
    productId: [
      "92624a9c-769c-45d0-84eb-6804c6770278",
      "a4d9008a-d344-49c1-a081-74574ac0faf9",
    ],
  },
  {
    id: "YouTubePremium",
    title: "YouTube Premium",
    logo: "../src/assets/images/Property1_YouTubePremium.svg",
    productId: "ae936f5f-188b-468d-83be-372e8faf5b11",
  },
  {
    id: "KKTV",
    title: "KKTV",
    logo: "../src/assets/images/Property1_KKTV.svg",
    productId: [
      "bc6f52b4-b542-4a4b-889f-793eec2fccfa",
      "6b1750cb-7ef7-45c4-bef4-b4618513650f",
    ],
  },
  {
    id: "iQIYI",
    title: "iQIYI",
    logo: "../src/assets/images/Property1_iQIYI.svg",
    productId: [
      "28850a72-4a51-44ad-959b-c24b17691475",
      "574b96e1-0375-4d55-a0bc-f2bc621ede46",
    ],
  },
  {
    id: "Spotify",
    title: "Spotify",
    logo: "../src/assets/images/Property1_Spotify.svg",
    productId: "233340f8-1dee-4049-9316-b7e7e7a8e88b",
  },
  {
    id: "HamiVideo",
    title: "Hami Video",
    logo: "../src/assets/images/Property1_HamiVideo.svg",
    productId: [
      "017d94ea-d2f9-4f34-8000-b0749ec97df7",
      "53e6d5d7-44a5-4046-95b8-204e8d6356b1",
      "de70fd00-f4e2-42e7-81de-039ff12a45b3",
    ],
  },
  {
    id: "friday",
    title: "friday",
    logo: "../src/assets/images/Property1_friday.svg",
    productId: [
      "33f56250-63b0-4a86-b810-da8060c414af",
      "5df35cb3-08d2-4394-9ea1-b285bcef843a",
      "a4465728-a10b-4c5e-90e5-10c6399cecb9",
      "a65883b0-4ba9-4599-8c6d-6e7db4394b48",
    ],
  },
  {
    id: "Canva",
    title: "Canva",
    logo: "../src/assets/images/Property1_Canva.svg",
    productId: "e05df85a-8e98-4d66-a0ac-1fac85d09bf9",
  },
  {
    id: "miro",
    title: "miro",
    logo: "../src/assets/images/Property1_miro.svg",
    productId: [
      "8761df4a-6e96-47e2-a5c3-a2e94b98d2e0",
      "bb3177bf-35af-4215-8ffb-4ba389fa893e",
      "c65da7e8-7a5c-450d-b16c-40c9a76276dc",
      "d96d6728-28e1-4f6f-8e52-3ec8a00f6299",
    ],
  },
  {
    id: "Microsoft365",
    title: "Microsoft365",
    logo: "../src/assets/images/Property1_Microsoft365.svg",
    productId: [
      "8fa9547f-3248-4c41-a032-bb7f37d10f75",
      "ed111006-f67d-46ee-b988-45b98e42cee6",
    ],
  },
  {
    id: "Notion",
    title: "Notion",
    logo: "../src/assets/images/Property1_Notion.svg",
    productId: [
      "0061a743-300b-4da0-bbc3-9f2036761e03",
      "45b1b3f9-5e82-4700-946f-7f89461c5c6d",
      "a5aaf51b-1f24-4b80-9b60-59e529bba6b3",
      "c1a224a8-153a-4c08-833a-4b18e0a2010f",
    ],
  },
];

// ==========================================
// 2. 靜態資料庫：
// ==========================================
const STATIC_FAQS = [
  // --- SubMate 常見問題 ---
  {
    id: "submate-1",
    category: "SubMate",
    question: "Q1：什麼是 SubMate？",
    answer:
      "A：Submate 是一個專為台灣用戶打造的共享訂閱平台，讓大家能安全、快速地組團共享 NETFLIX、Disney+、Spotify、YouTube Premium 等多人方案，降低個人支出並享受完整服務。",
  },
  {
    id: "submate-2",
    category: "SubMate",
    question: "Q2：SubMate 有哪些可共享的服務？",
    answer:
      "A：目前支援 NETFLIX、Disney+、Spotify、YouTube Premium等多達13項服務商品，未來將陸續新增更多數位訂閱方案。",
  },
  {
    id: "submate-3",
    category: "SubMate",
    question: "Q3：SubMate 是官方授權平台嗎？",
    answer:
      "A：我們不是各串流服務的官方代理，而是提供費用分攤、帳號管理、安全保護機制的第三方共享平台。",
  },
  {
    id: "submate-4",
    category: "SubMate",
    question: "Q4：如何加入共享團？",
    answer:
      "A：你只需要 ➊選擇想加入的服務 ➋選擇方案（例如NETFLIX 高級方案）➌完成付款後，系統自動分配帳號登入資訊",
  },
  {
    id: "submate-5",
    category: "SubMate",
    question: "Q5：可以自己開團找朋友一起共享嗎？",
    answer:
      "A：可以！SubMate的其中一個特色就是：可以同一個帳號購買複數個平台帳號！SubMate將依照訂閱情況，提供最貼近的訂閱帳號組合。",
  },

  // --- NETFLIX 常見問題 ---
  {
    id: "netflix-1",
    question: "Q1：什麼是共享 NETFLIX？",
    answer:
      "A：透過我們的平台，您可以與其他用戶共同分擔 NETFLIX 高級或標準方案的費用，獲得專屬帳號使用權，節省每月訂閱成本。",
    product_id: BRAND_LIST.find((brand) => brand.id === "NETFLIX").productId,
  },
  {
    id: "netflix-2",
    question: "Q2：你們的服務跟 NETFLIX 官方有合作嗎？",
    answer:
      "A：我們並非 NETFLIX 官方，而是提供安全、穩定的團隊共享機制，協助多位用戶共用同一個家庭方案帳號。",
    product_id: BRAND_LIST.find((brand) => brand.id === "NETFLIX").productId,
  },
  {
    id: "netflix-3",
    question: "Q3：NETFLIX 可同時幾人觀看？",
    answer:
      "A：➊標準方案：最多 2 人同時觀看 ➋高級方案（4K Ultra HD）：最多 4 人同時觀看。我們會依方案限制合理分配名額，避免超額登入。",
    product_id: BRAND_LIST.find((brand) => brand.id === "NETFLIX").productId,
  },
  {
    id: "netflix-4",
    question: "Q4：我的觀看紀錄會跟其他人混在一起嗎？",
    answer:
      "A：不會，每位用戶都擁有專屬使用者帳號，觀看紀錄、推薦清單互不影響。",
    product_id: BRAND_LIST.find((brand) => brand.id === "NETFLIX").productId,
  },
  {
    id: "netflix-5",
    question: "Q5：密碼會不會被別人更改？",
    answer:
      "A：帳號密碼由平台統一管理，避免被個別用戶更改；你只需使用提供的登入資訊即可。",
    product_id: BRAND_LIST.find((brand) => brand.id === "NETFLIX").productId,
  },

  // --- Disney+ 常見問題 ---
  {
    id: "disney-1",
    question: "Q1：在 SubMate 的 Disney+ 團可以同時幾台裝置播放？",
    answer:
      "A：Disney+支援最多4台裝置同時觀看，並可建立最多7個使用者個人檔案，我們會為每位用戶分配專屬個人檔案，避免觀看紀錄影響。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Disney+").productId,
  },
  {
    id: "disney-2",
    question: "Q2：登入顯示裝置已達上限怎麼辦？",
    answer:
      "A：如無法登入，則表示目前已達到4台裝置同時播放上線，請稍後再重試。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Disney+").productId,
  },
  {
    id: "disney-3",
    question: "Q3：可以在旅遊時使用 Disney+ 嗎？",
    answer: "A：可以，但片庫會依所在地區變動。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Disney+").productId,
  },

  // --- YouTube Premium 常見問題 ---
  {
    id: "yt-1",
    question:
      "Q1：加入 SubMate 的 YouTube Premium 團，可以免廣告看所有影片嗎？",
    answer: "A：是的，官方支援的影片與音樂皆可免廣告播放。",
    product_id: BRAND_LIST.find((brand) => brand.id === "YouTubePremium")
      .productId,
  },
  {
    id: "yt-2",
    question: "Q2：背景播放與離線下載在哪些裝置可用？",
    answer: "A：手機與平板 App 支援背景播放與下載，桌面版僅支援背景播放。",
    product_id: BRAND_LIST.find((brand) => brand.id === "YouTubePremium")
      .productId,
  },
  {
    id: "yt-3",
    question: "Q3：頻繁換裝置會影響使用嗎？",
    answer: "A：可能會觸發官方風控，建議保持主要裝置穩定使用。",
    product_id: BRAND_LIST.find((brand) => brand.id === "YouTubePremium")
      .productId,
  },

  // --- Spotify 常見問題 ---
  {
    id: "spotify-1",
    question: "Q1：加入 SubMate 的 Spotify 團，可以離線聽歌嗎？",
    answer: "A：可以，Premium 方案支援離線播放功能。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Spotify").productId,
  },
  {
    id: "spotify-2",
    question: "Q2：播放清單會因退團消失嗎？",
    answer: "A：不會，播放清單會保留，但無法離線播放。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Spotify").productId,
  },
  {
    id: "spotify-3",
    question: "Q3：為什麼有些歌曲顯示「無法播放」？",
    answer: "A：可能因地區授權或歌曲下架導致。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Spotify").productId,
  },
  {
    id: "spotify-4",
    question: "Q4：可以跨國使用 Spotify 嗎？",
    answer: "A：可以，但長期跨區使用可能會被要求重新驗證地區。",
    product_id: BRAND_LIST.find((brand) => brand.id === "Spotify").productId,
  },

  // --- Hami Video 常見問題 ---
  {
    id: "hami-1",
    question: "Q1：加入 SubMate 的 Hami Video 團，影片畫質怎麼看？",
    answer: "A：部分影片支援 4K，需相容裝置與網速。",
    product_id: BRAND_LIST.find((brand) => brand.id === "HamiVideo").productId,
  },
  {
    id: "hami-2",
    question: "Q2：可以下載影片離線看嗎？",
    answer: "A：部分內容支援下載功能，依官方授權為準。",
    product_id: BRAND_LIST.find((brand) => brand.id === "HamiVideo").productId,
  },
  {
    id: "hami-3",
    question: "Q3：為什麼影片顯示「地區限制」？",
    answer: "A：因授權不同，部分內容僅限特定地區觀看。",
    product_id: BRAND_LIST.find((brand) => brand.id === "HamiVideo").productId,
  },
];

// ==========================================
// 3. 主頁面元件
// ==========================================
const FaqPage = () => {
  const [faqs, setFaqs] = useState(STATIC_FAQS);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScrollToFaq = (e, brandId) => {
    e.preventDefault();
    const targetElement = document.getElementById(`${brandId}-faq`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section className="bg-primary-50">
        <div className="container hero-search">
          <div className="row">
            <div className="d-flex justify-content-center">
              <h2 className="hero-title">
                <img
                  src="../src/assets/images/title item.svg"
                  alt="title item"
                />
                <span>你想找什麼樣的問題？</span>
                <img
                  src="../src/assets/images/title item.svg"
                  alt="title item"
                />
              </h2>
            </div>

            <div className="d-flex justify-content-center mb-4">
              <div className="col-12 col-md-4">
                <input
                  id="faqSearch"
                  className="form-control search-input mb-3"
                  type="search"
                  placeholder="輸入關鍵字"
                />
              </div>
            </div>
          </div>

          <div className="container text-center">
            <p className="d-flex justify-content-center brand">
              點選產品可快速前往常見問題
            </p>
            <div className="brand-grid row row-cols-3 row-cols-md-7 g-2 g-md-3 justify-content-center">
              {BRAND_LIST.map((brand) => (
                <div className="col" key={brand.id}>
                  <div className="brand-card">
                    <a
                      href={`#${brand.id}-faq`}
                      onClick={(e) => handleScrollToFaq(e, brand.id)}
                    >
                      <img
                        className="d-flex align-items-center justify-content-center brand-logo"
                        src={brand.logo}
                        alt={brand.title}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {BRAND_LIST.map((brand) => (
        <FaqCategorySection key={brand.id} brand={brand} allFaqs={faqs} />
      ))}

      <HelpCta />

      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          style={{ display: "flex" }}
        >
          <i className="bi bi-chevron-up"></i>
        </button>
      )}
    </>
  );
};

export default FaqPage;
