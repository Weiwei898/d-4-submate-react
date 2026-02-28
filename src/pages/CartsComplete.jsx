import { useEffect, useRef } from "react";

// 【圖片引用】
import titleItemIcon from "../assets/images/title_item.svg";
import submateLogo from "../assets/images/SubmateLogo.svg";
import submateWord from "../assets/images/SubMate_word_new.svg";
import cartIconStep1 from "../assets/images/cart_icon_step1.svg";
import cartIconStep2 from "../assets/images/cart_icon_step2.svg";
import cartIconStep3 from "../assets/images/cart_icon_step3.svg";
import roadmapBg from "../assets/images/roadmap_bg.svg";
import checkCircleIcon from "../assets/images/check-circle.svg";

function CartsComplete() {
    return (
        <>
            <TitleSection />

            {/* 結帳完成畫面+資訊 */}
            <section id="cart-finish-section" className="d-flex flex-column gap-6 mb-10">
                <div className="container">
                    <FinishBoard />
                </div>

                {/* 按鈕 */}
                <div className="container d-flex justify-center justify-md-end gap-3 gap-md-4">
                    <a href="#" className="btn btn-outline-success px-4 py-2" role="button">查看訂單</a>
                    <a href="#" className="btn btn-outline-success px-4 py-2" role="button">前往首頁</a>
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
                                <img src={titleItemIcon} alt="" />
                                <h3 className="text-center text-primary-800 mb-0">購物車</h3>
                                <img src={titleItemIcon} alt="" />
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
                    {/* 1. 購物車確認 */}
                    <li>
                        <a href="#" className="cart-step-off d-flex flex-column fs-4 fw-bolder">
                            <div
                                className="cart-step-common cart-step01"
                                style={{
                                    maskImage: `url(${cartIconStep1})`,
                                    WebkitMaskImage: `url(${cartIconStep1})`,
                                }}
                            ></div>
                            購物車確認
                        </a>
                    </li>

                    {/* 2. 填寫或確認結帳資料 */}
                    <li>
                        <a href="#" className="cart-step-off d-flex flex-column fs-4 fw-bolder">
                            <div
                                className="cart-step-common cart-step02"
                                style={{
                                    maskImage: `url(${cartIconStep2})`,
                                    WebkitMaskImage: `url(${cartIconStep2})`,
                                }}
                            ></div>
                            填寫或確認結帳資料
                        </a>
                    </li>

                    {/* 3. 完成付款（目前步驟，active） */}
                    <li>
                        <a href="#" className="cart-step-on d-flex flex-column fs-4 fw-bolder">
                            <div
                                className="cart-step-common cart-step03"
                                style={{
                                    maskImage: `url(${cartIconStep3})`,
                                    WebkitMaskImage: `url(${cartIconStep3})`,
                                }}
                            ></div>
                            完成付款
                        </a>
                    </li>
                </ol>
            </nav>
        </div>
    );
}

function FinishBoard() {
    const whiteBoardRef = useRef(null);
    const finishContainerRef = useRef(null);

    // 原始圖片比例（1920 x 713）
    const ORIGINAL_IMAGE_WIDTH = 1920;
    const ORIGINAL_IMAGE_HEIGHT = 713;

    useEffect(() => {
        function updateDimensions() {
            const whiteBoard = whiteBoardRef.current;
            const finishContainer = finishContainerRef.current;

            if (whiteBoard && finishContainer) {
                const whiteBoardWidth = whiteBoard.offsetWidth;
                finishContainer.style.width = `${whiteBoardWidth - 8}px`;

                if (window.innerWidth >= 768) {
                    const aspectRatio = ORIGINAL_IMAGE_HEIGHT / ORIGINAL_IMAGE_WIDTH;
                    const newHeight = whiteBoardWidth * aspectRatio;
                    finishContainer.style.height = `${newHeight - 8}px`;
                } else {
                    finishContainer.style.width = "100%";
                    finishContainer.style.height = "auto";
                }
            }
        }

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    return (
        <div className="white-board bg-neutral-0 shadow-sm rounded px-12 py-10" ref={whiteBoardRef}>
            {/* 結帳完成圖示 */}
            <div
                className="finish-container d-flex align-items-center justify-center"
                ref={finishContainerRef}
            >
                <div
                    className="finish-bg"
                    style={{ backgroundImage: `url(${roadmapBg})` }}
                ></div>
                <div className="row">
                    <div className="finish-image d-flex flex-column flex-md-row align-items-center gap-4 gap-md-12">
                        {/* <div
                            className="check-circle"
                            style={{ backgroundImage: `url(${checkCircleIcon})` }}
                        ></div> */}

                        <div className="d-flex flex-column justify-center align-items-center align-items-md-start gap-4 gap-md-10">
                            {/* Submate logo */}
                            <div className="submate-logo d-flex align-items-center gap-4 gap-md-12">
                                <img src={submateLogo} alt="Submate-logo" />
                                <img className="imgSize" src={submateWord} alt="Submate-word" />
                            </div>

                            <h1 className="mb-0">結帳完成</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* 訂單資訊清單 */}
            <div className="row mt-8">
                <ol className="d-flex flex-column gap-3 gap-md-4">
                    <li className="d-flex">
                        <p className="col-4 col-md-2 mb-0 fw-bold">訂單編號：</p>
                        <p className="col-8 col-md-10 mb-0">S2025070462970</p>
                    </li>

                    <li className="d-flex">
                        <p className="col-4 col-md-2 mb-0 fw-bold">付款方式：</p>
                        <p className="col-8 col-md-10 mb-0">ATM匯款</p>
                    </li>

                    <li className="d-flex">
                        <p className="col-4 col-md-2 mb-0 fw-bold">虛擬帳號：</p>
                        <p className="col-8 col-md-10 mb-0 text-danger">國泰世華 013 - 698906213239879</p>
                    </li>

                    <li className="d-flex">
                        <p className="col-4 col-md-2 mb-0 fw-bold">繳費期限：</p>
                        <p className="col-8 col-md-10 mb-0 text-danger">2025/07/05 23:59:59（逾期自動取消訂單）</p>
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default CartsComplete;
