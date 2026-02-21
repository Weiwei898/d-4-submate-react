import React, { useState, useEffect } from "react";
// 暫時將 API 註解起來，等之後要串接真實資料時再打開
// import { getFaqs } from "../api/faqsApi";

import FaqCategorySection from "../components/FaqCategorySection";
import HelpCta from "../components/HelpCta";

import { BRAND_LIST, STATIC_FAQS } from "./constants/faqData";
import { Img } from "../assets/constants/imageManager";

// ==========================================
// 1. 輔助函式：關鍵字紅字高亮處理
// ==========================================
const highlightKeyword = (text, keyword) => {
  if (!keyword.trim()) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ color: "red", fontWeight: "bold" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

// ==========================================
// 2. 主頁面元件
// ==========================================
const FaqPage = () => {
  const [faqs, setFaqs] = useState(STATIC_FAQS);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const searchResults = faqs.filter((faq) => {
    if (!searchTerm.trim()) return false;
    const lowerCaseTerm = searchTerm.toLowerCase();
    return faq.question.toLowerCase().includes(lowerCaseTerm);
  });

  const handleSuggestionClick = (faq) => {
    setSearchTerm("");
    setIsDropdownOpen(false);

    const targetHeading = document.getElementById(`heading-${faq.id}`);

    if (targetHeading) {
      targetHeading.scrollIntoView({ behavior: "smooth", block: "center" });

      const button = targetHeading.querySelector(".accordion-button");
      if (button && button.classList.contains("collapsed")) {
        button.click();
      }
    }
  };

  return (
    <>
      <section className="bg-primary-50">
        <div className="container hero-search">
          <div className="row">
            <div className="d-flex justify-content-center">
              <h2 className="hero-title">
                <img src={Img.titleItemImg} alt="title item" />
                <span>你想找什麼樣的問題？</span>
                <img src={Img.titleItemImg} alt="title item" />
              </h2>
            </div>

            <div className="d-flex justify-content-center mb-4">
              <div className="col-12 col-md-6 col-lg-4 position-relative">
                <input
                  id="faqSearch"
                  className="form-control search-input mb-1"
                  type="search"
                  placeholder="輸入關鍵字"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                />

                {/* 搜尋下拉選單 */}
                {isDropdownOpen && searchTerm.trim() !== "" && (
                  <ul
                    className="list-group position-absolute w-100 text-start shadow-sm"
                    style={{
                      zIndex: 1050,
                      maxHeight: "300px",
                      overflowY: "auto",
                      borderRadius: "8px",
                    }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((faq) => (
                        <li
                          key={faq.id}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: "pointer", fontSize: "15px" }}
                          onClick={() => handleSuggestionClick(faq)}
                        >
                          {/* 套用紅字高亮 */}
                          {highlightKeyword(faq.question, searchTerm)}
                        </li>
                      ))
                    ) : (
                      <li
                        className="list-group-item text-muted"
                        style={{ fontSize: "15px" }}
                      >
                        找不到包含「{searchTerm}」的相關問題...
                      </li>
                    )}
                  </ul>
                )}
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

      {/* 回到頂部按鈕 */}
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
