import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Since we don't have a specific SVG loader, we'll import them as paths for `<img>` tags
// And for inline SVGs, we'll just use them as they are in JSX.
// This might require adjustments based on the Vite config for SVGs.
import thumbsUpIcon from '../assets/icons/thumbs-up.svg';
import arrowForwardIcon from '../assets/icons/arrow_forward.svg';

const ProductDetails = ({ plans, onClose }) => {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    if (plans && plans.length > 0) {
      // Find the first plan that is not a recommendation
      const initialPlan = plans.find(p => p.id); // Assuming recommendations might not have ids
      setActivePlan(initialPlan || plans[0]);
    }
  }, [plans]);

  if (!activePlan) {
    return null; // Don't render if there's no active plan
  }
  
  // The product title should be the same for all plans of a product
  const productTitle = plans[0]?.title || 'Product';
  const productImageUrl = plans[0]?.imageUrl || '';
  const productContent = plans[0]?.content || '';
  const productDescription = plans[0]?.description || '[]';

  const features = (() => {
    try {
      return JSON.parse(productDescription);
    } catch (e) {
      console.error("Failed to parse product description:", productDescription);
      return [];
    }
  })();

  // 處理點擊背景關閉視窗的邏輯
  const handleBackdropClick = (e) => {
    // 當點擊的目標是 modal 容器本身時（即背景區域），才觸發關閉
    // 如果點擊的是內部的 modal-dialog 或其他內容，e.target 就不會等於 e.currentTarget
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="productDetailsModalLabel" aria-hidden="true" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-details modal-xl">
        <div className="modal-content bg-primary-50">
          <div className="modal-header border-0">
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row flex-column flex-md-row">
                <div className="col-12 col-md-4 d-flex flex-column">
                  <div className="left-img-heigth d-flex flex-column justify-content-center align-items-center">
                    <img className="brand-img" src={productImageUrl} alt={productTitle} />
                  </div>
                  <div className="d-none d-md-flex flex-column mt-auto">
                    <h5 className="mb-3 mb-md-5">推薦組合/方案</h5>
                    <h6 className="mb-1 mb-md-2">追劇不停</h6>
                    <p className="mb-2 mb-md-3">Netflix（美劇）、KKTV（日韓劇）</p>
                    <h6 className="mb-1 mb-md-2">國際大片、原創劇</h6>
                    <p className="mb-1 mb-md-2">Netflix、Disney</p>
                  </div>
                </div>

                <div className="col-12 col-md-8 ms-auto">
                  <h4 className="mb-3 mb-md-5">{productTitle}</h4>
                  <div className="d-flex gap-2 gap-md-3 mb-3 mb-md-5">
                    <h5 className="mb-0">商品介紹</h5>
                    <img src={thumbsUpIcon} alt="thumbs-up" />
                    {/* The subscriber count is not in the current data model, so it's static for now */}
                    <p className="mb-0">訂閱人數：<span>1004</span> 人</p>
                  </div>

                  {/* Assuming 'content' holds the main description */}
                  <p className="mb-3 mb-md-5">{productContent}</p>
                  
                  {/* The features from 'description' field */}
                  <ul className="list-unstyled d-flex flex-column gap-3 gap-md-4 mb-3 mb-md-5">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>

                  <div className="d-flex flex-nowrap align-items-center gap-3 gap-md-4 mb-3 mb-md-5">
                    <label className="form-label mb-0">方案選擇</label>
                    <select 
                      className="form-select rounded-pill border-primary-500 select-w-300" 
                      aria-label="Plan select"
                      value={activePlan.id}
                      onChange={(e) => {
                        const newActivePlan = plans.find(p => p.id.toString() === e.target.value);
                        setActivePlan(newActivePlan);
                      }}
                    >
                      {plans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.plan_name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="d-flex gap-2 justify-content-end align-items-center mb-4">
                    <p className="text-primary-600 h4 h3-md">{activePlan.currency} {activePlan.price}</p>
                    <p className="text-neutral-800 fs-md-5">/ {activePlan.unit || '期'}</p>
                  </div>

                  <div className="d-flex d-md-none flex-column mt-auto mb-3 mb-md-5">
                    <h5 className="mb-3 mb-md-5">推薦組合/方案</h5>
                    <div className="d-flex gap-4">
                      <div>
                        <h6 className="mb-1">追劇不停</h6>
                        <p className="mb-0">Netflix（美劇）、KKTV（日韓劇）</p>
                      </div>
                      <div>
                        <h6 className="mb-1">國際大片、原創劇</h6>
                        <p className="mb-0">Netflix、Disney</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8 d-flex flex-column flex-md-row gap-4">
                  <button
                    type="button"
                    className="btn py-4 px-6 btn-primary rounded-pill text-neutral-0 d-flex justify-content-center align-items-center gap-1"
                    onClick={() => navigate('/cart_payment')} // Placeholder navigation
                  >
                    快速結帳
                    <img src={arrowForwardIcon} alt="" />
                  </button>
                  <button
                    type="button"
                    className="btn py-4 px-6 btn-neutral-0 rounded-pill text-secondary-700 border-secondary-700"
                    onClick={() => navigate('/cart_list')} // Placeholder navigation
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* 加上 onClick 讓使用者點擊黑色背景也能關閉 */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ProductDetails;
