import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

function Carts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        console.log("products from API:", data);
        setProducts(data);
      } catch (error) {
        console.error("取得 products 失敗", error);
      }
    })();
  }, []);

  const filteredProducts = products
    .filter((p) => p.category === "stream")
    .filter(
      (p, index, self) =>
        index === self.findIndex((x) => x.imageUrl === p.imageUrl)
    );

  return (
    <>
      <TitleSection />

      <section id="cart-list-form" className="d-flex flex-column gap-6 mb-10">
        <div className="container">
          <div className="row">

            {/* Left Column (col-lg-8) */}
            <div className="col-lg-8">
              <div className="white-board bg-neutral-0 shadow-sm rounded px-12 py-10">
                <div className="row">
                  <div className="col-12">
                    <CartTable products={filteredProducts} />
                  </div>
                </div>

                <div className="row d-flex justify-end">
                  <div className="col-4">
                    <CartTotal />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <PaymentMethod />

              {/* Checkout Info Section */}
              <CheckoutInfo />

              {/* <div className="d-flex justify-end mt-4">
                <a href="#" className="next-step btn btn-primary-600" role="button">
                  下一步
                </a>
              </div> */}
            </div>

            {/* Right Column (col-lg-4) */}
            <div className="col-lg-4">
              <OrderSummary />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

// --- Internal Components ---

function TitleSection() {
  return (
    <section className="title-section mb-10">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title-container d-flex align-items-center gap-3 mb-6 mb-md-10">
              <div className="title-logo d-flex align-items-center"></div>
              <div className="title-text">
                <h3 className="text-center">購物車</h3>
              </div>
              <div className="title-logo d-flex align-items-center"></div>
            </div>
          </div>
        </div>
        <StepsNav />
      </div>
    </section>
  );
}

function StepsNav() {
  return (
    <div className="row justify-center">
      <nav className="col-6">
        <ol className="cart-steps d-flex justify-between">
          <li>
            <a href="#" className="cart-step-on d-flex flex-column fs-4 fw-bolder">
              <div className="cart-step-common cart-step01"></div>
              購物車確認
            </a>
          </li>
          <li>
            <a href="#" className="cart-step-off d-flex flex-column fs-4 fw-bolder">
              <div className="cart-step-common cart-step02"></div>
              填寫或確認結帳資料
            </a>
          </li>
          <li>
            <a href="#" className="cart-step-off d-flex flex-column fs-4 fw-bolder">
              <div className="cart-step-common cart-step03"></div>
              完成付款
            </a>
          </li>
        </ol>
      </nav>
    </div>
  );
}

function CartTable({ products }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="align-middle">
          <th scope="col" className="text-center">產品名稱</th>
          <th scope="col" className="text-center">方案</th>
          <th scope="col" className="text-center">數量</th>
          <th scope="col" className="text-center">小計(新台幣)</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr className="align-middle" key={product.id}>
            <th scope="col">
              <div className="form-check d-flex gap-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
                  id={`cart-product-${product.id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`cart-product-${product.id}`}
                >
                  {product.title}
                </label>
              </div>
            </th>
            <th scope="col" className="text-center">基本方案</th>
            <th scope="col" className="d-flex justify-center">
              <div className="number-control d-flex align-items-center gap-3">
                <button className="btn btn-primary rounded-circle p-0 decrement-btn" type="button">-</button>
                <input
                  type="number"
                  className="form-control text-center number-input"
                  defaultValue="1"
                  min="0"
                  max="99"
                />
                <button className="btn btn-primary rounded-circle p-0 increment-btn" type="button">+</button>
              </div>
            </th>
            <th scope="col" className="text-end">$180</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CartTotal() {
  return (
    <table className="table cart-total table-borderless">
      <tbody>
        <tr>
          <th className="text-end">總計金額 </th>
          <th className="text-start"> NT$</th>
          <th className="text-end">4,980 元</th>
        </tr>
        <tr>
          <th className="text-end">折扣總金額 </th>
          <th className="text-start"> NT$</th>
          <th className="text-end">-100 元</th>
        </tr>
        <tr>
          <th className="text-end">總付款 </th>
          <th className="text-start"> NT$</th>
          <th className="text-end">4,980 元</th>
        </tr>
      </tbody>
    </table>
  );
}

function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('atm');

  return (
    <div className="payment-method-card bg-white rounded-3 shadow-sm p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">設定付款方式</h5>
        <span className="text-muted small">郵寄付款方式</span>
      </div>

      <div className="row g-3">
        {/* VISA Card Option */}
        <div className="col-md-6">
          <div
            className={`payment-option p-4 rounded-3 border position-relative ${selectedMethod === 'visa' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('visa')}
            style={{ cursor: 'pointer' }}
          >
            <button className="btn-close position-absolute top-0 end-0 m-2" style={{ fontSize: '0.7rem' }}></button>
            <div className="text-center">
              <div className="payment-icon mb-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="fw-medium mb-1">VISA</div>
              <div className="text-primary small">**** **** **** 4096</div>
            </div>
          </div>
        </div>

        {/* ATM Option */}
        <div className="col-md-6">
          <div
            className={`payment-option p-4 rounded-3 border position-relative ${selectedMethod === 'atm' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('atm')}
            style={{ cursor: 'pointer' }}
          >
            <button className="btn-close position-absolute top-0 end-0 m-2" style={{ fontSize: '0.7rem' }}></button>
            <div className="text-center">
              <div className="payment-icon mb-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className="fw-medium mb-1">ATM 匯款</div>
              <div className="text-primary small">
                <div>請至【訂單記錄】查【信用卡資訊】或【銀行帳號資訊】完成轉帳繳費</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutInfo() {
  return (
    <div className="checkout-info-card bg-white rounded-3 shadow-sm p-4 mt-4">
      <h5 className="fw-bold mb-4">結帳資訊</h5>

      <div className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label text-muted small">姓名</label>
          <div className="fw-medium">布萊斯</div>
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label text-muted small">電子郵件</label>
          <div className="fw-medium">123456@hmail.com</div>
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label className="form-label text-muted small">手機號碼</label>
          <div className="fw-medium">0987654321</div>
        </div>

        {/* Payment Method */}
        <div className="col-md-6">
          <label className="form-label text-muted small">付款方式</label>
          <div className="fw-medium">ATM</div>
        </div>

        {/* Title */}
        <div className="col-12">
          <label className="form-label text-muted small">標題</label>
          <div className="fw-medium">國際文學</div>
        </div>

        {/* Address */}
        <div className="col-12">
          <label className="form-label text-muted small">地址</label>
          <div className="fw-medium">台北市大安區忠孝東路一段1號1樓</div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="order-summary-card bg-white rounded-3 shadow-sm p-4">
      <h4 className="fw-bold mb-4 text-primary">訂單金額</h4>

      <div className="summary-row d-flex justify-content-between mb-3">
        <span className="text-muted">總計金額</span>
        <span className="fw-medium">NT$ 4,980</span>
      </div>

      <div className="summary-row d-flex justify-content-between mb-4 pb-3 border-bottom">
        <span className="text-muted">折扣總金額</span>
        <span className="fw-medium">-NT$ 100</span>
      </div>

      <div className="summary-total d-flex justify-content-between align-items-center mb-4">
        <span className="text-muted">總付款金額</span>
        <span className="fs-4 fw-bold">NT$ 4,880</span>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-outline-primary flex-fill rounded-pill py-2">
          上一步
        </button>
        <button className="btn btn-primary flex-fill rounded-pill py-2">
          立即結帳
        </button>
      </div>
    </div>
  );
}

export default Carts;