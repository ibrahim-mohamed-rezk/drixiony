import Link from "next/link";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import { getData } from "../libs/axios/server";

function BlogStandardPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    perPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getData(
        "blogs",
        {
          page: page,
        },
        {
          "Content-Type": "multipart/form-data",
        }
      );

      setBlogs(response.data.blogs);

      setPagination({
        totalPages:
          response.total_pages ||
          response.last_page ||
          Math.ceil(response.total / pagination.perPage),
        totalItems: response.total || response.count || 0,
        currentPage: response.current_page || page,
        perPage: response.per_page || pagination.perPage,
        hasNextPage:
          response.has_next_page ||
          page < (response.total_pages || response.last_page),
        hasPrevPage: response.has_prev_page || page > 1,
      });

      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  // توليد أرقام الصفحات
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= pagination.totalPages
    ) {
      fetchBlogs(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "لا يوجد تاريخ";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="blog-standard-page pt-100 mb-100" dir="rtl">
          <div className="container">
            <div className="text-center">
              <p>جاري تحميل المقالات...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="blog-standard-page pt-100 mb-100" dir="rtl">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div
              style={{ gap: "24px", display: "flex", flexWrap: "wrap" }}
              className="col-lg-12"
            >
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <div
                    key={blog.id || index}
                    className="news-card2 col-md-5 mb-50"
                  >
                    <div className="news-img">
                      <Link href={`/blogs/${blog.id}`}>
                        <img
                          src={
                            blog.image ||
                            blog.featured_image ||
                            "assets/img/inner-page/blog-st-01.png"
                          }
                          style={{ width: "100%", height: "220px" }}
                          alt={blog.title || "مقال"}
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h4>
                        <Link legacyBehavior href={`/blogs/${blog.id}`}>
                          <a>{blog.title || "مقال بدون عنوان"}</a>
                        </Link>
                      </h4>
                      <p>
                        {blog.excerpt ||
                          blog.description ||
                          (blog.content
                            ? blog.content.substring(0, 150) + "..."
                            : "لا يوجد وصف.")}
                      </p>
                      <div className="news-btm d-flex align-items-center justify-content-between">
                        <div className="author-area">
                          <div className="author-img">
                            <img
                              src={
                                blog.author?.avatar ||
                                blog.author_image ||
                                "assets/img/home1/author-02.png"
                              }
                              alt={blog.author?.name || blog.author || "الكاتب"}
                            />
                          </div>
                          <div className="author-content">
                            <h6>
                              {blog.author?.name || blog.author || "دريكسوني"}
                            </h6>
                            <Link legacyBehavior href="/blog-standard">
                              <a>
                                تم النشر في -{" "}
                                {formatDate(
                                  blog.created_at ||
                                    blog.published_at ||
                                    blog.date
                                )}
                              </a>
                            </Link>
                          </div>
                        </div>
                        <Link legacyBehavior href={`/blogs/${blog.id}`}>
                          <a className="view-btn">اقرأ المزيد</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>لا توجد مقالات.</p>
                </div>
              )}
            </div>

            {/* ترقيم الصفحات */}
            {pagination.totalPages > 1 && (
              <div className="pagination-and-next-prev">
                <div className="pagination">
                  <ul>
                    {getPageNumbers().map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={currentPage === pageNumber ? "active" : ""}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                          }}
                        >
                          {pageNumber.toString().padStart(2, "0")}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="next-prev-btn">
                  <ul>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.hasPrevPage) {
                            handlePageChange(currentPage - 1);
                          }
                        }}
                        style={{
                          opacity: !pagination.hasPrevPage ? 0.5 : 1,
                          pointerEvents: !pagination.hasPrevPage
                            ? "none"
                            : "auto",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={7}
                          height={14}
                          viewBox="0 0 7 14"
                          style={{ transform: "scaleX(-1)" }}
                        >
                          <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z" />
                        </svg>{" "}
                        السابق
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.hasNextPage) {
                            handlePageChange(currentPage + 1);
                          }
                        }}
                        style={{
                          opacity: !pagination.hasNextPage ? 0.5 : 1,
                          pointerEvents: !pagination.hasNextPage
                            ? "none"
                            : "auto",
                        }}
                      >
                        التالي
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={7}
                          height={14}
                          viewBox="0 0 7 14"
                        >
                          <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default BlogStandardPage;
