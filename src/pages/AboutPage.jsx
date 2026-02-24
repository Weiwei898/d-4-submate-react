import { Link } from 'react-router-dom';
import BrandStory from '../components/BrandStory';
import BrandFeature from '../components/BrandFeature';
import { Img } from "../assets/constants/imageManager";

const AboutPage = () => {
  return (
    <>
    {/*發想理念與沿革section*/}
    <section className="about py-10 py-md-13"> {/*海浪背景圖片*/}
    
      {/*發想理念與沿革 container*/}
      <div className="container">
        <div className="row ">{/*row發想理念與沿革-*/}
          <div className="col-12"> {/*col 發想理念與沿革-*/}
    
            {/*標題與logo-*/}
            <div className="title-container d-flex align-items-center gap-3 mb-6 mb-md-10">
              <div className="title-logo d-flex align-items-center"></div>{/*閃電偽元素-*/}
              <div className="title-text">
                <h3 className="text-center">發想理念與沿革</h3>
              </div>
              <div className="title-logo d-flex align-items-center"></div>{/*閃電偽元素-*/}
            </div>{/*標題與logo-*/}
    
            {/*卡片文字區：左上，僅電腦板顯示-*/}
            <div className="about-card  d-none d-md-flex">
              <p className="about-card1 col-12 col-md-4  px-4 px-md-3 py-3 py-md-5">
                我們是一群熟悉數位工具與共享經濟的年輕人，致力於打造一個<span className="text-secondary-700">公平、安全又便利</span>的訂閱共用平台。
              </p>
            </div>{/*卡片文字區-*/}
    
          </div>{/*col 發想理念與沿革-*/}
        </div>{/*row發想理念與沿革-*/}
      </div>{/*發想理念與沿革 container*/}
    
      {/*滾動波浪時間軸-*/}
      <div className="about-roadmap">
        <ol className="roadmap-card">
          <li className="time01  gap-3 gap-md-6 d-flex flex-column justify-center align-items-center">
            <div className="roadmap-dot">
              {/* <img src="../assets/images/roadmap-dot.svg" alt="" /> */}
            </div>
            <div className="roadmap-content  d-flex flex-column gap-1 gap-lg-2 p-4 p-md-5">
              <h5>2013</h5>
              <p>創立高雄前端技術社群</p>
            </div>
          </li>
      
          <li className="time02  gap-3 gap-md-6 d-flex flex-column align-items-center">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content d-flex flex-column gap-1 gap-lg-2 p-4 p-md-5">
              <h5>2016</h5>
              <p>成立六角學院，累積1.8萬名學員</p>
            </div>
          </li>
      
          <li className="time03  gap-3 gap-md-6 d-flex flex-column align-items-center">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content d-flex flex-column gap-1 gap-lg-2  p-4 p-md-5">
              <h5>2018</h5>
              <p>創辦波利馬資訊科技</p>
            </div>
          </li>
      
          <li className="time04  gap-3 gap-md-6 d-flex flex-column align-items-center">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content d-flex flex-column gap-1 gap-lg-2  p-4 p-md-5">
              <h5>2024</h5>
              <p>累積超過3萬名學員</p>
            </div>
          </li>
      
          <li className="time05  gap-3 gap-md-6 d-flex flex-column align-items-center">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content d-flex flex-column gap-1 gap-lg-2  p-4 p-md-5">
              <h5>2025</h5>
              <p>Submate正式上架，累積訂閱數100人</p>
            </div>
          </li>
      
          <li className="time06  gap-3 gap-md-6 d-flex flex-column align-items-center">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content d-flex flex-column gap-1 gap-md-2  p-4 p-md-5">
              <h5>2026</h5>
              <p>累積訂閱數500人</p>
            </div>
          </li>
        </ol>
      </div>{/*滾動波浪時間軸2-*/}

      {/*脫離文字流的卡片1：左上(謹手機板顯示)*/}
      <div className="container ">
        <div className="row">
          <div className="col-12 about-card-up d-block d-md-none">
            <div className="about-card">
              <div className="about-card-up-locate col-12  ">
                <p className="about-card1-monile  px-4 px-md-3 py-3 py-md-5">
                  我們是一群熟悉數位工具與共享經濟的年輕人，致力於打造一個 <span className="text-secondary-700">公平、安全又便利</span>的訂閱共用平台。</p>
              </div>
            </div>
          </div>
        </div>
      </div>{/*脫離文字流的卡片1：左上(謹手機板顯示)*/}


      
      {/*脫離文字流的卡片2：右下*/}
      <div className="container ">
        <div className="row">
          <div className="col-12 about-card-down">
            <div className="about-card">
              <div className="about-card-down-locate col-12 col-md-5 ">
                <p className="about-card2  px-4 px-md-3 py-3 py-md-5">
                  Submate不僅讓帳號共享變得制度化，更強調信任機制與用戶體驗。無論你是想省錢省時間，還是單純不想孤單訂閱，我們都能提供最合適的選擇。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>{/*脫離文字流的卡片2：右下*/}

    </section>


    {/*團隊成員*/}
    <section className="py-10 py-md-13">
      <div className="container">
        {/*標題與logo row*/}
        <div className="row mb-6 mb-md-10">
          <div className="col-12">
            <div className="title-container d-flex align-items-center justify-content-center gap-3">
              <div className="title-logo"></div>
              <div className="title-text">
                <h3 className="text-center">團隊成員</h3>
              </div>
              <div className="title-logo"></div>
            </div>
          </div>
        </div>{/*標題與logo row*/}
    
        {/*團隊照片 row*/}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <div className="portrait-group-row justify-content-between row g-6 g-md-10 gap-md-10">
              <div className="col-6 col-md-3 d-flex flex-column text-center gap-3 gap-md-4 mb-2 mb-md-0">
                <div className="portrait-frame2 ">
                  <div className="inner">
                    <img src={Img.iconPortrait} alt="Portrait" />
                  </div>
                </div>
                <h5 className="member-name">洧杰</h5>
                <p className="fs-6">六角學院校長，熱愛分享與交流的前端工程師，目前專注於兼容桌面/移動網頁前端開發</p>
              </div>
          
              <div className="col-6 col-md-3 d-flex flex-column text-center gap-3 gap-md-4">
                <div className="portrait-frame2">
                  <div className="inner">
                    <img src={Img.portraitGirl1} alt="Portrait" />
                  </div>
                </div>
                <h5 className="member-name">卡斯伯</h5>
                <p className="fs-6">六角學院共同創辦人。本科技能為視覺設計，後來轉為前端工程師，專長為 Bootstrap、Sass、 JavaScript、Vue.js …</p>
              </div>
          
              <div className="col-6 col-md-3 d-flex flex-column text-center gap-3 gap-md-4">
                <div className="portrait-frame2">
                  <div className="inner">
                    <img src={Img.portraitGirl2} alt="Portrait" />
                  </div>
                </div>
                <h5 className="member-name">中年大叔</h5>
                <p className="fs-6">前端工程師，中年轉職挑戰自己，專長切老闆大餅，技能樹不詳</p>
              </div>
          
              <div className="col-6 col-md-3 d-flex flex-column text-center gap-3 gap-md-4">
                <div className="portrait-frame2">
                  <div className="inner">
                    <img src={Img.portraitGirl1} alt="Portrait" />
                  </div>
                </div>
                <h5 className="member-name">布萊斯</h5>
                <p className="fs-6">前端工程師，PM挑戰轉職，想在天秤的另一端重新開始，探索和過去完全不同的風景</p>
              </div>
          
              <div className="col-6 col-md-3 d-flex flex-column text-center gap-3 gap-md-4">
                <div className="portrait-frame2">
                  <div className="inner">
                    <img src={Img.iconPortrait} alt="Portrait" />
                  </div>
                </div>
                <h5 className="member-name">Lika</h5>
                <p className="fs-6">前端工程師，一個做死橫跨在財會與工程領域之間的小蝦米。</p>
              </div>
          
              <div className="col-6 col-md-3 d-flex flex-column text-center gap-3 gap-md-4">
                <div className="portrait-frame2">
                  <div className="inner">
                    <img src={Img.portraitGirl2} alt="Portrait" />
                  </div>
                </div>
                <h5 className="member-name">Ken</h5>
                <p className="fs-6">前端工程師，熱愛與不同領域的人配合，喜歡跟大家交流，增加自己的能力</p>
              </div>
            </div>
          </div>
        </div>{/*團隊照片 row*/}
      </div>{/*團隊成員 container*/}
    </section> {/*發想理念與沿革test2*/}


    {/*首頁Before/After-*/}
    <BrandStory />

    {/*首頁品牌特色*/}
    <BrandFeature />

    {/*Call to Action按鈕*/}
    <div className="container mt-0 mt-md-2 mb-10 mb-md-13">
      <div className="d-flex justify-center">
          <Link to="/products" className="cta-btn btn btn-primary-600 py-4 px-6 fw-bold">立即查看熱門產品</Link>
      </div>
    </div>{/*按鈕*/}
    </>
  );
};

export default AboutPage;
