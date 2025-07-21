import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { getData } from "../libs/axios/server";

function CustomerReview() {
  const [reviews, setReviews] = useState([]);
  const feachData = async () => {
    try {
      const response = await getData("reviews", {}, {});
      return setReviews(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    feachData();
  }, []);

  return (
    <MainLayout>
      <div className="customer-feedback-pages pt-100 pb-100">
        <div className="container">
          <div className="row  mb-40 g-4">
            {reviews.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <div key={index} className="col-lg-4 h-100">
                    <div
                      className="feedback-card"
                      style={{
                        height: "250px",
                      }}
                    >
                      <div className="feedback-top">
                        <div className="stat-area">
                          <img
                            src="assets/img/home1/icon/trustpilot-star.svg"
                            alt=""
                          />
                          <span>Trusted Company</span>
                        </div>
                        <div className="logo">
                          <img
                            src="assets/img/home1/icon/trustpilot-log3.svg"
                            alt=""
                          />
                        </div>
                      </div>
                      <p>{item.comment}</p>
                      <div className="author-name">
                        <h6>{item.name}</h6>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="col-lg-4" style={{
                    height:"250px"
                  }}>
                    <div className="feedback-card h-100">
                      <div className="feedback-top">
                        <div className="stat-area">
                          <div className="star">
                            <ul>
                              {Array.from(
                                { length: item.rating },
                                (_, index) => (
                                  <li key={index}>
                                    <i className="bi bi-star-fill" />
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          <span>Great Services!</span>
                        </div>
                        <div className="logo">
                          <img src="assets/img/home1/icon/google3.svg" alt="" />
                        </div>
                      </div>
                      <p>{item.comment}</p>
                      <div className="author-name">
                        <h6>{item.name}</h6>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="load-more-btn">
                <a href="#" className="primary-btn3">
                  Load More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CustomerReview;
