import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { getData } from "../libs/axios/server";

function Faq() {
  const [faq, setFaq] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getData("questions", {}, {});
      return setFaq(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div
        className="faq-page-wrap pt-100 mb-100"
        dir="rtl"
        style={{ textAlign: "right" }}
      >
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-4 d-lg-flex d-none">
              <div className="faq-img">
                <img src="assets/img/inner-page/faq-img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="faq-area">
                <div className="section-title-and-filter mb-40">
                  <div className="section-title">
                    <h4>الأسئلة الشائعة وأحدث الإجابات</h4>
                  </div>
                </div>
                <div className="faq-wrap">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    {faq.length > 0 ? (
                      faq.map((item, idx) => (
                        <div className="accordion-item" key={item.id || idx}>
                          <h5
                            className="accordion-header"
                            id={`flush-heading${idx}`}
                          >
                            <button
                              className={`accordion-button${
                                idx === 0 ? "" : " collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#flush-collapse${idx}`}
                              aria-expanded={idx === 0 ? "true" : "false"}
                              aria-controls={`flush-collapse${idx}`}
                              style={{ textAlign: "right" }}
                            >
                              {item.title}
                            </button>
                          </h5>
                          <div
                            id={`flush-collapse${idx}`}
                            className={`accordion-collapse collapse${
                              idx === 0 ? " show" : ""
                            }`}
                            aria-labelledby={`flush-heading${idx}`}
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div
                              className="accordion-body"
                              style={{ textAlign: "right" }}
                            >
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="accordion-item">
                        <h5 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            disabled
                            style={{ textAlign: "right" }}
                          >
                            لا توجد أسئلة متاحة حالياً
                          </button>
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Faq;
