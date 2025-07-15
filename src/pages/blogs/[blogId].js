import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MainLayout from "@/src/layout/MainLayout";
import { getData } from "@/src/libs/axios/server";
import { useParams } from "next/navigation";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function BlogDetailsPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await getData(
        `blogs/${params.blogId}`,
        {},
        {
          "Content-Type": "multipart/form-data",
        }
      );
      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentBlog = async () => {
    try {
      const response = await getData(
        `blogs/${params.blogId}/related`,
        {},
        {
          "Content-Type": "multipart/form-data",
        }
      );
      setRelatedBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchRecentBlog();
  }, [params.blogId]);

  const settings = useMemo(() => {
    return {
      speed: 1500,
      spaceBetween: 24,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-51",
        prevEl: ".prev-51",
      },
    };
  }, []);

  // Helper to format date in Arabic
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString.replace(" ", "T"));
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  if (!blog) {
    return (
      <MainLayout>
        <div
          className="blog-details-page pt-100 mb-100"
          dir="rtl"
          style={{ textAlign: "right" }}
        >
          <div className="container">
            <div className="row g-lg-4 gy-5">
              <div className="col-lg-12">
                <p>جاري التحميل...</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="blog-details-page pt-100 mb-100"
        dir="rtl"
        style={{ textAlign: "right" }}
      >
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-12">
              <div className="post-thumb">
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: "100%", minHeight: "220px" }}
                />
              </div>
              <h3 className="post-title">{blog.title}</h3>
              <div className="author-area">
                <div className="author-content">
                  <h6>دريكسوني</h6>
                  <span>تم النشر في - {formatDate(blog.published_at)}</span>
                </div>
              </div>
              <p dangerouslySetInnerHTML={{ __html: blog.description }} />
            </div>

            {relatedBlogs.length > 0 && (
              <div className="single-widgets widget_egns_recent_post mb-20">
                <div className="widget-title blog-title mb-20">
                  <h6> مقالات مرتبطة</h6>
                  <div className="slider-btn-group2 d-flex align-items-center justify-content-between">
                    <div className="slider-btn prev-51">
                      <svg
                        width={7}
                        height={12}
                        viewBox="0 0 8 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                      </svg>
                    </div>
                    <div className="slider-btn next-51">
                      <svg
                        width={7}
                        height={12}
                        viewBox="0 0 8 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="recent-post-wraper">
                  <Swiper
                    {...settings}
                    className="swiper recent-post-sidebar-slider"
                  >
                    <div className="swiper-wrapper">
                      {relatedBlogs.map((blog) => (
                        <SwiperSlide className="swiper-slide">
                          <div className="widget-cnt">
                            <div className="wi">
                              <Link href={`blogs/${blog.id}`}>
                                <img
                                  src={blog.image}
                                  alt="image"
                                  style={{ width: "100%", height: "220px" }}
                                />
                              </Link>
                            </div>
                            <div className="wc">
                              <Link href="/blog-standard">
                                <a className="date">١٨ مايو ٢٠٢٣</a>
                              </Link>
                              <h6>
                                <Link href={`blogs/${blog.id}`}>
                                  <a>التأثير البيئي للسيارات وكيفية تقليله.</a>
                                </Link>
                              </h6>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </div>
                  </Swiper>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default BlogDetailsPage;
