import React from 'react';
import { Link } from 'react-router-dom';
import CommonSwiper from '../components/CommonSwiper';

// 引入圖片 (或是直接使用絕對路徑字串，這裡示範直接使用路徑字串配合 Vite)
// 注意：請確保圖片路徑正確，這裡假設您的圖片都在 src/assets/images 下

const HomePage = () => {
  // 熱門商品資料
  const hotProducts = [
    {
      id: 1,
      imgSrc: '/src/assets/images/Property1_Disney+.svg',
      alt: 'Disney+',
      title: 'Disney+',
      price: 'NT$ 270',
      period: '/ 月',
      desc: '無限制「地點」，可共享但官方不推薦',
      device: '10 台裝置（註冊)',
      view: 'month'
    },
    {
      id: 2,
      imgSrc: '/src/assets/images/Property1_YouTubePremium.svg',
      alt: 'YouTubePremium',
      title: 'YouTube Premium',
      price: 'NT$ 290',
      period: '/ 月',
      desc: '家人共享最多 5 位家庭成員',
      device: '每戶支援最多 10 裝置',
      view: 'plus'
    },
    // 為了示範輪播效果，重複加入資料
    {
      id: 3,
      imgSrc: '/src/assets/images/Property1_Disney+.svg',
      alt: 'Disney+',
      title: 'Disney+',
      price: 'NT$ 270',
      period: '/ 月',
      desc: '無限制「地點」，可共享但官方不推薦',
      device: '10 台裝置（註冊)',
      view: 'month'
    },
    {
      id: 4,
      imgSrc: '/src/assets/images/Property1_YouTubePremium.svg',
      alt: 'YouTubePremium',
      title: 'YouTube Premium',
      price: 'NT$ 290',
      period: '/ 月',
      desc: '家人共享最多 5 位家庭成員',
      device: '每戶支援最多 10 裝置',
      view: 'plus'
    }
  ];

  // 用戶推薦資料
  const testimonials = [
    {
      id: 1,
      img: '/src/assets/images/portrait01.png',
      name: '台北 張先生',
      content: '最近發現 Submate 超好用！現在訂閱 Netflix、Disney+、Spotify 一個人真的太貴，自己找人湊團又麻煩還容易出問題。 Submate 幫你快速找到可靠團員，自動處理付款，還有帳號安全保障。省錢、省心又方便，訂閱共享就用 Submate！'
    },
    {
      id: 2,
      img: '/src/assets/images/portrait02.png',
      name: '台南 黃小姐',
      content: '你也是訂閱一堆平台花很多錢的人嗎？加起來真的很傷荷包。以前找朋友湊團超麻煩，管理帳號、收款都讓人頭痛。自從用 Submate，一鍵成團、自動扣款，帳號安全還有保障。省下大筆費用，享受所有內容Submate真的超讚！'
    },
    {
      id: 3,
      img: '/src/assets/images/portrait03.png',
      name: '台中 陳太太',
      content: '訂閱費越來越高，一個人扛真的不划算， 湊團又麻煩還怕遇到問題。我朋友推薦我用 Submate，真的超方便！平台自動幫你找到團隊，所有分攤付款和帳號管理都幫你處理好。安全、省心、省錢，訂閱共享原來可以這麼輕鬆！'
    },
    // 重複資料以展示輪播
    {
      id: 4,
      img: '/src/assets/images/portrait01.png',
      name: '台北 張先生',
      content: '最近發現 Submate 超好用！現在訂閱 Netflix、Disney+、Spotify 一個人真的太貴，自己找人湊團又麻煩還容易出問題。 Submate 幫你快速找到可靠團員，自動處理付款，還有帳號安全保障。省錢、省心又方便，訂閱共享就用 Submate！'
    }
  ];

  return (
    <>
      {/* Banner Section */}
      <section className="index-banner-bg bg-primary-50">
        <div className="index-banner">
          <picture>
            <source srcSet="/src/assets/images/Property1_mobile.png" media="(max-width: 767px)" />
            <img src="/src/assets/images/Property1_Default.png" alt="Banner" />
          </picture>
        </div>
        <div className="index-banner-infoBox">
          <p className="text-primary fs-5 fs-md-3 mb-4">想要蹭優惠，又揪不到咖嗎?</p>
          <div className="logo"><img src="/src/assets/images/logo.svg" alt="logo" /></div>
          <h2 className="fs-md-display h1 mb-8">一起訂，省到底</h2>
          <div>
            <a href="#hotProduct" className="btn index-btn btn-primary text-neutral-0 main-btn fs-6">立即查看熱門產品</a>
          </div>
        </div>
      </section>

      {/* News Section (Bootstrap Carousel) */}
      <section className="bg-primary-50">
        <div className="container py-8">
          <h2 className="d-flex gap-md-3 justify-content-center align-content-center mb-6 mb-md-10 text-primary-800">
            <img src="/src/assets/images/title_item.svg" alt="" />
            <span className="fs-1 ms-3 me-3">最新消息</span>
            <img src="/src/assets/images/title_item.svg" alt="" />
          </h2>
          <div id="carouselExampleInterval" className="index-news-carousel carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="d-flex gap-3 p-6 index-news-bg rounded justify-content-between shadow-sm flex-column-reverse flex-md-row">
                  <div className="d-md-flex flex-md-column justify-content-center ms-5">
                    <p className="fs-2 mb-3">買越多、省越多！</p>
                    <p className="fs-2 mb-3">開幕慶，兩件以上立即9折，</p>
                    <p className="fs-2 mb-6">享受服務更划算。</p>
                    <div>
                      <button type="button" className="btn index-btn btn-primary main-btn text-neutral-0 fs-6">查看詳情</button>
                    </div>
                  </div>
                  <div className="mb-6"><img src="/src/assets/images/Property1_1.svg" alt="" /></div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex gap-3 p-6 index-news-bg rounded justify-content-between shadow-sm flex-column-reverse flex-md-row">
                  <div className="d-md-flex flex-md-column justify-content-center ms-5">
                    <p className="fs-2 mb-3">買越多、省越多！</p>
                    <p className="fs-2 mb-3">開幕慶，兩件以上立即9折，</p>
                    <p className="fs-2 mb-6">享受服務更划算。</p>
                    <div>
                      <button type="button" className="btn index-btn btn-primary main-btn text-neutral-0 fs-6">查看詳情</button>
                    </div>
                  </div>
                  <div className="mb-6"><img src="/src/assets/images/Property1_1.svg" alt="" /></div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          
          <div id="hotProduct"></div>
          
          <h2 className="d-flex gap-md-3 justify-content-center align-content-center mb-6 mb-md-10 text-primary-800">
            <img src="/src/assets/images/title_item.svg" alt="" />
            <span className="fs-1 ms-3 me-3">熱門商品</span>
            <img src="/src/assets/images/title_item.svg" alt="" />
          </h2>
          
          <div className="index-search-bg">
            <input id="faqSearch" className="form-control search-input mb-3" type="search" placeholder="輸入關鍵字" aria-controls="faqList" />
            <div className="icon"><img src="/src/assets/icons/Search.svg" alt="" /></div>
          </div>

          {/* Hot Product Swiper */}
          <div className="index-product-bg">
            <CommonSwiper
              items={hotProducts}
              config={{
                slidesPerView: 1,
                spaceBetween: 16,
                loop: true,
                navigation: true,
                pagination: { clickable: true },
                breakpoints: {
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 4,
                  },
                }
              }}
              renderItem={(item) => (
                <div className="card p-4 p-md-8 h-100 border border-2 rounded-3 border-neutral-0 bg-white bg-opacity-40">
                  <div className="d-flex justify-content-center mb-4 mb-md-6">
                    <img src={item.imgSrc} alt={item.alt} style={item.alt === 'YouTubePremium' ? { width: 'auto' } : {}} />
                  </div>
                  <div className="card-body p-0">
                    <div className="card-pane d-flex flex-column justify-content-between h-100">
                      <div className="d-flex flex-column gap-4 mb-4 mb-md-6 text-start">
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_29222_16883)">
                                <path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" />
                              </g>
                            </svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">{item.device}</div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="svg-task_alt-size">
                            <svg className="text-secondary-500 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_29222_16883" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_29222_16883)">
                                <path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z" fill="currentColor" />
                              </g>
                            </svg>
                          </div>
                          <div className="fs-7 fs-md-6 text-neutral-700">{item.desc}</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 justify-content-center align-items-center">
                        <p className="text-primary-600 h4 h3-md">{item.price}</p>
                        <p className="text-neutral-800 fs-md-5">{item.period}</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 mt-md-6 w-100 py-4 px-6 border-0 main-btn text-neutral-0 rounded-pill">立即訂閱</button>
                </div>
              )}
            />
          </div>
          
          <div className="index-product-btn-bg text-center">
            <Link to="/products" className="btn index-btn sub-btn">更多商品</Link>
          </div>
        </div>
      </section>

      {/* Brand Story & Feature (Placeholders for now as components are not provided) */}
      {/* <BrandStory /> */}
      {/* <BrandFeature /> */}

      {/* User Recommendation Section */}
      <section className="bg-primary-50">
        <div className="container py-8">
          <h2 className="d-flex gap-md-3 justify-content-center align-content-center mb-6 mb-md-10 text-primary-800">
            <img src="/src/assets/images/title_item.svg" alt="" />
            <span className="fs-1 ms-3 me-3">用戶推薦</span>
            <img src="/src/assets/images/title_item.svg" alt="" />
          </h2>
          
          <div className="swiper-container">
            <CommonSwiper
              items={testimonials}
              config={{
                slidesPerView: 1,
                spaceBetween: 16,
                loop: true,
                navigation: true,
                pagination: { clickable: true },
                breakpoints: {
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 4,
                  },
                }
              }}
              renderItem={(item) => (
                <ul className="p-8 list shadow-sm d-flex flex-wrap rounded bg-white">
                  <li className="me-4 mb-6"><img src={item.img} alt={item.name} /></li>
                  <li className="d-flex flex-column justify-content-center mb-6">
                    <h6 className="fs-5 mb-3">{item.name}</h6>
                    <div className="d-flex">
                      {[...Array(5)].map((_, i) => (
                        <div className="me-1" key={i}><img src="/src/assets/images/kid_star.svg" alt="star" /></div>
                      ))}
                    </div>
                  </li>
                  <li>
                    <p className="fs-6" dangerouslySetInnerHTML={{ __html: item.content.replace(/<span/g, '<span class="text-primary-600"') }} />
                  </li>
                </ul>
              )}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary-50">
        <div className="container py-8">
          <h2 className="d-flex gap-md-3 justify-content-center align-content-center mb-6 mb-md-10 text-primary-800">
            <img src="/src/assets/images/title_item.svg" alt="" />
            <span className="fs-1 ms-3 me-3">熱門FAQ</span>
            <img src="/src/assets/images/title_item.svg" alt="" />
          </h2>
          <div className="accordion" id="faqSubMate">
            <div className="accordion-item">
              <h2 className="accordion-header" id="submate-q1-h">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#submate-q1" aria-expanded="false" aria-controls="submate-q1">
                  Q1：什麼是 Submate？
                  <span className="q-hot-ic" style={{
                    WebkitMaskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")',
                    maskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")'
                  }}></span>
                  <span className="accordion-icon"><i className="bi bi-plus-lg"></i><i className="bi bi-dash-lg"></i></span>
                </button>
              </h2>
              <div id="submate-q1" className="accordion-collapse collapse" aria-labelledby="submate-q1-h" data-bs-parent="#faqSubMate">
                <div className="accordion-body">
                  A：Submate
                  是一個專為台灣用戶打造的共享訂閱平台，讓大家能安全、快速地組團共享
                  Netflix、Disney+、Spotify、YouTube Premium
                  等多人方案，降低個人支出並享受完整服務。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="submate-q2-h">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#submate-q2" aria-expanded="false" aria-controls="submate-q2">
                  Q2：Submate 有哪些可共享的服務？
                  <span className="q-hot-ic" style={{
                    WebkitMaskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")',
                    maskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")'
                  }}></span>
                  <span className="accordion-icon"><i className="bi bi-plus-lg"></i><i className="bi bi-dash-lg"></i></span>
                </button>
              </h2>
              <div id="submate-q2" className="accordion-collapse collapse" aria-labelledby="submate-q2-h" data-bs-parent="#faqSubMate">
                <div className="accordion-body">
                  A：目前支援 Netflix、Disney+、Spotify、YouTube
                  Premium等多達13項服務商品，未來將陸續新增更多數位訂閱方案。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="submate-q3-h">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#submate-q3" aria-expanded="false" aria-controls="submate-q3">
                  Q3：Submate 是官方授權平台嗎？
                  <span className="q-hot-ic" style={{
                    WebkitMaskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")',
                    maskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")'
                  }}></span>
                  <span className="accordion-icon"><i className="bi bi-plus-lg"></i><i className="bi bi-dash-lg"></i></span>
                </button>
              </h2>
              <div id="submate-q3" className="accordion-collapse collapse" aria-labelledby="submate-q3-h" data-bs-parent="#faqSubMate">
                <div className="accordion-body">
                  A：我們不是各串流服務的官方代理，而是提供費用分攤、帳號管理、安全保護機制的第三方共享平台。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="submate-q4-h">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#submate-q4" aria-expanded="false" aria-controls="submate-q4">
                  Q4：如何加入共享團？
                  <span className="q-hot-ic" style={{
                    WebkitMaskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")',
                    maskImage: 'url("data:image/svg+xml,%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cmask%20id=\'mask0_29364_3215\'%20style=\'mask-type:alpha\'%20maskUnits=\'userSpaceOnUse\'%20x=\'0\'%20y=\'0\'%20width=\'24\'%20height=\'24\'%3e%3crect%20width=\'24\'%20height=\'24\'%20fill=\'%23D9D9D9\'/%3e%3c/mask%3e%3cg%20mask=\'url(%23mask0_29364_3215)\'%3e%3cpath%20d=\'M4%2014C4%2012.25%204.41667%2010.6917%205.25%209.325C6.08333%207.95833%207%206.80833%208%205.875C9%204.94167%209.91667%204.22917%2010.75%203.7375L12%203V6.3C12%206.91667%2012.2083%207.40417%2012.625%207.7625C13.0417%208.12083%2013.5083%208.3%2014.025%208.3C14.3083%208.3%2014.5792%208.24167%2014.8375%208.125C15.0958%208.00833%2015.3333%207.81667%2015.55%207.55L16%207C17.2%207.7%2018.1667%208.67083%2018.9%209.9125C19.6333%2011.1542%2020%2012.5167%2020%2014C20%2015.4667%2019.6417%2016.8042%2018.925%2018.0125C18.2083%2019.2208%2017.2667%2020.175%2016.1%2020.875C16.3833%2020.475%2016.6042%2020.0375%2016.7625%2019.5625C16.9208%2019.0875%2017%2018.5833%2017%2018.05C17%2017.3833%2016.875%2016.7542%2016.625%2016.1625C16.375%2015.5708%2016.0167%2015.0417%2015.55%2014.575L12%2011.1L8.475%2014.575C7.99167%2015.0583%207.625%2015.5917%207.375%2016.175C7.125%2016.7583%207%2017.3833%207%2018.05C7%2018.5833%207.07917%2019.0875%207.2375%2019.5625C7.39583%2020.0375%207.61667%2020.475%207.9%2020.875C6.73333%2020.175%205.79167%2019.2208%205.075%2018.0125C4.35833%2016.8042%204%2015.4667%204%2014ZM12%2013.9L14.125%2015.975C14.4083%2016.2583%2014.625%2016.575%2014.775%2016.925C14.925%2017.275%2015%2017.65%2015%2018.05C15%2018.8667%2014.7083%2019.5625%2014.125%2020.1375C13.5417%2020.7125%2012.8333%2021%2012%2021C11.1667%2021%2010.4583%2020.7125%209.875%2020.1375C9.29167%2019.5625%209%2018.8667%209%2018.05C9%2017.6667%209.075%2017.2958%209.225%2016.9375C9.375%2016.5792%209.59167%2016.2583%209.875%2015.975L12%2013.9Z\'%20fill=\'%234F4F4F\'/%3e%3c/g%3e%3c/svg%3e")'
                  }}></span>
                  <span className="accordion-icon"><i className="bi bi-plus-lg"></i><i className="bi bi-dash-lg"></i></span>
                </button>
              </h2>
              <div id="submate-q4" className="accordion-collapse collapse" aria-labelledby="submate-q4-h" data-bs-parent="#faqSubMate">
                <div className="accordion-body">
                  只需：<br />1. 選擇想加入的服務<br />2. 選擇方案（例如
                  Netflix 高級方案）<br />3.
                  完成付款後，系統自動分配帳號登入資訊
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="index-product-btn-bg text-center">
          <Link to="/faq" className="btn index-btn sub-btn">完整更多內容</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
