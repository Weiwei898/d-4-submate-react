import React from 'react';
import { Img } from '../assets/constants/imageManager';

const BrandStory = () => {
  return (
    <section>
        <div className="brand-story-bg">
            <div className="d-flex brand-story-box flex-column flex-md-row">
                <div className="main-area">
                    <div className="pic"><img src={Img.storyBefore} alt="" /></div>
                    <h3 className="fs-2 text-neutral-0 text-end">BEFORE</h3>
                    <h4 className="fs-7 fs-md-6 text-neutral-0 text-center text-md-end">在這個什麼都要訂閱的時代，一人太貴，揪團又麻煩。</h4>
                </div>
                <div className="main-area">
                    <div className="d-flex flex-wrap brand-story-subBox">
                        <div className="sub-area"><div className="pic"><img src={Img.storySub1} alt="" /></div></div>
                        <div className="sub-area"><div className="pic"><img src={Img.storySub2} alt="" /></div></div>
                        <div className="sub-area"><div className="pic"><img src={Img.storySub3} alt="" /></div></div>
                        <div className="sub-area"><div className="pic"><img src={Img.storySub4} alt="" /></div></div>
                    </div>
                    <h3 className="fs-2 text-neutral-0">AFTER</h3>
                    <h4 className="fs-7 fs-md-6 text-neutral-0 text-center">以台灣為核心的「訂閱共享平台」，安全共享多人帳號，降低支出並保障使用品質。</h4>
                </div>
            </div>
        </div>
    </section>
  );
};

export default BrandStory;
