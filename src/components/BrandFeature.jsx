import React from 'react';
import { Img } from '../assets/constants/imageManager';

const BrandFeature = () => {
  return (
    <section className="bg-primary-50">
        <div className="container py-8 brand_feature-bg">
            <h2 className="d-flex gap-md-3 justify-content-center align-content-center mb-6 mb-md-10 text-primary-800">
              <img src={Img.titleItem} alt="" />
              <span className="fs-1 ms-3 me-3 text-center">為什麼要選擇<br/>SubMate?</span>
              <img src={Img.titleItem} alt="" />
            </h2>
            <ul className="row flex-wrap feature-list column-gap-md-0">
                <li className=" col-md-4 d-flex align-items-center column-gap-3 column-gap-md-0 flex-md-column">
                    <div className="pic mb-md-4 col-3"><img src={Img.feature01} alt="" /></div>
                    <div className="info col-9">
                        <h3 className="fs-5 fw-bold text-md-center mb-md-4 mb-3">台灣公司，價錢一目了然</h3>
                        <p className="fs-6 text-md-center">擁有豐富的影集、電影、紀錄片，跨國內容更新快。</p>
                    </div>
                </li>
                <li className=" col-md-4 d-flex align-items-center column-gap-3 column-gap-md-0 flex-md-column">
                    <div className="pic mb-md-4 col-3"><img src={Img.feature02} alt="" /></div>
                    <div className="info col-9">
                        <h3 className="fs-5 fw-bold text-md-center mb-md-4 mb-3">自動帳號分配引擎</h3>
                        <p className="fs-6 text-md-center">用戶付款後，由平台自動配對至現有團體，無需等待組團</p>
                    </div>
                </li>
                <li className=" col-md-4 d-flex align-items-center column-gap-3 column-gap-md-0 flex-md-column">
                    <div className="pic mb-md-4 col-3"><img src={Img.feature03} alt="" /></div>
                    <div className="info col-9">
                        <h3 className="fs-5 fw-bold text-md-center mb-md-4 mb-3">即時餘額計算，人數控管</h3>
                        <p className="fs-6 text-md-center">每個家庭帳號控管最多人數，動態分配可用名額</p>
                    </div>
                </li>
                <li className=" col-md-4 d-flex align-items-center column-gap-3 column-gap-md-0 flex-md-column">
                    <div className="pic mb-md-4 col-3"><img src={Img.feature04} alt="" /></div>
                    <div className="info col-9">
                        <h3 className="fs-5 fw-bold text-md-center mb-md-4 mb-3">帳號異常，備援帳號自動轉換</h3>
                        <p className="fs-6 text-md-center">若該組帳號被禁用或超額登入，自動切換至備援帳號，或退款處理</p>
                    </div>
                </li>
                <li className=" col-md-4 d-flex align-items-center column-gap-3 column-gap-md-0 flex-md-column">
                    <div className="pic mb-md-4 col-3"><img src={Img.feature05} alt="" /></div>
                    <div className="info col-9">
                        <h3 className="fs-5 fw-bold text-md-center mb-md-4 mb-3">一目了然管理中心</h3>
                        <p className="fs-6 text-md-center">用戶可查看目前所屬的帳號平台、裝置名額、使用規則、續訂情況</p>
                    </div>
                </li>
                <li className=" col-md-4 d-flex align-items-center column-gap-3 column-gap-md-0 flex-md-column">
                    <div className="pic mb-md-4 col-3"><img src={Img.feature06} alt="" /></div>
                    <div className="info col-9">
                        <h3 className="fs-5 fw-bold text-md-center mb-md-4 mb-3">保固機制</h3>
                        <p className="fs-6 text-md-center">一旦不能登入或平台出錯，自動申請退款或替代帳號，72小時內處理完畢</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
  );
};

export default BrandFeature;
