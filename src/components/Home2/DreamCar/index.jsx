import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getData } from "@/src/libs/axios/server";

function index() {
  const [filters, setFilters] = useState([]);

  const feachData = async () => {
    try {
      const response = await getData("cars/filters");
      setFilters(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    feachData();
  }, []);

  return (
    <div className="dream-car-area pt-100 pb-100">
      <div className="container">
        <div className="row mb-50 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12">
            <div className="section-title-2 text-center">
              <h2>ابحث عن سيارةاحلامك</h2>
              <p>يوجد أكثر من 30 فئة ماركة متاحة</p>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12">
            <div className="filter-area d-flex flex-wrap align-items-center justify-content-between">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-make-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-make"
                    type="button"
                    role="tab"
                    aria-controls="pills-make"
                    aria-selected="true"
                  >
                    الماركة
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-body-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-body"
                    type="button"
                    role="tab"
                    aria-controls="pills-body"
                    aria-selected="false"
                  >
                    النوع
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-location-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-location"
                    type="button"
                    role="tab"
                    aria-controls="pills-location"
                    aria-selected="false"
                  >
                    الموقع
                  </button>
                </li>
              </ul>
              <div className="explore-btn d-lg-flex d-none">
                <Link legacyBehavior href="/brand-category">
                  <a className="explore-btn2">
                    عرض المزيد <i className="bi bi-arrow-right-short" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-make"
            role="tabpanel"
            aria-labelledby="pills-make-tab"
          >
            <div className="row g-4 justify-content-center">
              {filters?.brands?.map((brand) => (
                <div
                  key={brand}
                  className="col-xl-2 col-md-3 col-sm-4 col-6 wow fadeInUp"
                  data-wow-delay="200ms"
                >
                  {/* <Link legacyBehavior href="/single-brand-category"> */}
                  <div className="car-category text-center">
                    {/* <div className="icon">
                        <img src="assets/img/home2/icon/suzuki.svg" alt="" />
                      </div> */}
                    <div className="content">
                      <h6>{brand}</h6>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-body"
            role="tabpanel"
            aria-labelledby="pills-body-tab"
          >
            <div className="row g-4 justify-content-center">
              {filters?.body_types?.map((body_type) => {
                return (
                  <div
                    key={body_type.id}
                    className="col-xl-2 col-md-3 col-sm-4 col-6"
                  >
                    {/* <Link legacyBehavior href="/single-brand-category"> */}
                    <a className="car-category text-center">
                      {/* <div className="icon">
                      <img src="assets/img/home2/icon/body-01.svg" alt="" />
                    </div> */}
                      <div className="content">
                        <h6>{body_type.name}</h6>
                      </div>
                    </a>
                    {/* </Link> */}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-location"
            role="tabpanel"
            aria-labelledby="pills-location-tab"
          >
            <div className="row g-4 justify-content-center">
              {filters?.cities?.map((citie) => (
                <div
                  key={citie.id}
                  className="col-xl-2 col-md-3 col-sm-4 col-6"
                >
                  <a className="car-category text-center">
                    {/* <div className="icon">
                      <img src="assets/img/home2/icon/panama.svg" alt="" />
                    </div> */}
                    <div className="content">
                      <h6>{citie.name}</h6>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="explore-btn d-lg-none d-flex pt-40">
          <Link legacyBehavior href="/brand-category">
            <a className="explore-btn2">
              عرض المزيد <i className="bi bi-arrow-right-short" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
