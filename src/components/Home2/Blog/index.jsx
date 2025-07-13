import React from "react";
import Link from "next/link";

function index({ data }) {
  return (
    <div className="news-section pt-90 pb-90" dir="rtl">
      <div className="container">
        <div className="row mb-60 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
            <div className="section-title-2">
              <h2>آخر أخبار السيارات </h2>
              <p>هنا بعض المقالات المميزة في فئات مختلفة</p>
            </div>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          {data?.map((item, idx) => {
            return (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="200ms"
                key={item.id || idx}
              >
                <div className="news-card">
                  <div className="news-img">
                    <Link href="/blog-details">
                      <img
                        src={item.cover || "assets/img/home1/news-01.png"}
                        alt={item.title}
                      />
                    </Link>
                    <div className="date">
                      <Link href="/blog-standard">نصائح الشراء</Link>
                    </div>
                  </div>
                  <div className="content">
                    <h6>
                      <Link href="/blog-details">{item.title}</Link>
                    </h6>
                    <div className="news-btm">
                      <div className="author-area">
                        {/* <div className="author-img">
                          <img
                            src={
                              item.authorImage || "assets/img/home1/news-01.png"
                            }
                            alt={item.author || item.title}
                          />
                        </div> */}
                        <div className="author-content">
                          <h6>drixiony</h6>
                          <Link href="/blog-standard">
                            تم النشر في - {item.created_at?.split(' ')[0]}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default index;
