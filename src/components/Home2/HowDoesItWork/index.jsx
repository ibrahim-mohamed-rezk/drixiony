// import React, { useState } from "react";
// import 'node_modules/react-modal-video/css/modal-video.css';
// import ModalVideo from 'react-modal-video';

function index() {
  // const [isOpen, setOpen] = useState(false);
  return (
    <div className="how-it-work-section " dir="rtl">
      <div className="container">
        <div className="row mb-50 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between gap-3 flex-wrap">
            <div className="section-title-2">
              <h2>كيف نعمل؟</h2>
              <p>هنا بعض السيارات المميزة في فئات مختلفة</p>
            </div>
            <div className="video-btn">
              {/* <a onClick={() => setOpen(true)} className="video-popup">
                <i className="bi bi-play-circle" /> شاهد الفيديو
              </a> */}
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12">
            <div className="work-process-group">
              <div className="row justify-content-center g-lg-0 gy-5">
                <div className="col-lg-3 col-sm-6">
                  <div className="single-work-process text-center">
                    <div className="step">
                      <span>01</span>
                    </div>
                    <div className="icon">
                      <img src="assets/img/home2/icon/loaction.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>اختر أي سيارة</h6>
                      <p>قم باختيار السياره المناسبه لك</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="single-work-process text-center">
                    <div className="step">
                      <span>02</span>
                    </div>
                    <div className="icon">
                      <img src="assets/img/home2/icon/contact.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>تواصل معنا</h6>
                      <p>
                        تواصل معنا للحصول على المزيد من المعلومات حول كيفيه
                        الحصول على سيارة
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="single-work-process text-center">
                    <div className="step">
                      <span>03</span>
                    </div>
                    <div className="icon">
                      <img src="assets/img/home2/icon/pay.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>ادفع ثمن السيارة</h6>
                      <p>
                        قم بدفع المبلغ الذي تم الاتفاق عليه للحصول على سيارة
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="single-work-process text-center">
                    <div className="step">
                      <span>04</span>
                    </div>
                    <div className="icon">
                      <img src="assets/img/home2/icon/recieve.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>استلم السيارة</h6>
                      <p>استلم السيارة من و استمتع بتجربه مميزه من خلالها</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row wow fadeInUp" data-wow-delay="400ms">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="trustpilot-review">
              <strong>ممتاز!</strong>
              <img src="assets/img/home1/icon/trustpilot-star2.svg" alt="" />
              <p>
                تقييم <strong>5.0</strong> من أصل <strong>5.0</strong> بناءً على{" "}
                <a href="#">
                  <strong>&nbsp;245354&nbsp;</strong>
                  مراجعة
                </a>
              </p>
              <img src="assets/img/home1/icon/trustpilot-logo.svg" alt="" />
            </div>
          </div>
        </div> */}
      </div>
      {/* <React.Fragment> */}
        {/* <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0 }}
            isOpen={isOpen}
            videoId="L61p2uyiMSo"
            onClose={() => setOpen(false)} 
          /> */}
      {/* </React.Fragment> */}
    </div>
  );
}

export default index;
