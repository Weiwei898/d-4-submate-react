import React from "react";
import { Img } from "../assets/constants/imageManager";

const FaqCategorySection = ({ brand, allFaqs }) => {
  const safeFaqs = allFaqs || [];

  const categoryFaqs = safeFaqs.filter((faq) => {
    if (brand.id === "SubMate" || brand.title === "SubMate") {
      return faq.id && faq.id.toLowerCase().includes("submate");
    }

    if (faq.product_id && brand.productId) {
      const faqIds = Array.isArray(faq.product_id)
        ? faq.product_id
        : [faq.product_id];
      const brandIds = Array.isArray(brand.productId)
        ? brand.productId
        : [brand.productId];

      return faqIds.some((id) => brandIds.includes(id));
    }

    return false;
  });

  if (categoryFaqs.length === 0) return null;

  return (
    <section className="bg-primary-50" id={`${brand.id}-faq`}>
      <div className="faq container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="d-flex justify-content-center align-items-center logo-mb-4 mt-5">
              <img className="logo-me-3" src={Img.titleItemImg} alt="icon" />
              <img
                className="logo-me-3 faq-logo"
                src={brand.logo}
                alt={brand.title}
              />
              <img className="logo-me-3" src={Img.titleItemImg} alt="icon" />
            </div>

            <div className="accordion" id={`faq-${brand.id}`}>
              {categoryFaqs.map((faq, index) => (
                <div className="accordion-item mb-1" key={faq.id}>
                  <h2 className="accordion-header" id={`heading-${faq.id}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${faq.id}`}
                    >
                      {faq.question}
                      <span className="accordion-icon">
                        <i className="bi bi-plus-lg"></i>
                        <i className="bi bi-dash-lg"></i>
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${faq.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent={`#faq-${brand.id}`}
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqCategorySection;
