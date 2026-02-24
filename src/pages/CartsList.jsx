import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

function CartsList() {
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

                            </div>


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
                            <div className="title-text d-flex align-items-center gap-2">
                                <img src="/src/assets/images/title_item.svg" alt="" />
                                <h3 className="text-center text-primary-800 mb-0">購物車</h3>
                                <img src="/src/assets/images/title_item.svg" alt="" />
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
            <nav className="col-10 col-md-6">
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
        <div className="cart-table-wrapper">
            <table className="table table-hover">
                <thead>
                    <tr className="align-middle">
                        <th scope="col" className="text-start">產品名稱</th>
                        <th scope="col" className="text-center">方案</th>
                        <th scope="col" className="text-center">數量</th>
                        <th scope="col" className="text-end">小計(新台幣)</th>
                        <th scope="col"></th>
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
                            <th scope="col" className="text-center">
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
                            <td className="text-end">$180</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-danger rounded-pill px-2 py-1"
                                    type="button"
                                >
                                    刪除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                <button className="btn btn-primary flex-fill rounded-pill py-2 text-white">
                    立即結帳
                </button>
            </div>
        </div>
    );
}

export default CartsList;
