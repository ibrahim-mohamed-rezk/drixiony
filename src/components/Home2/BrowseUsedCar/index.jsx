import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getData } from "@/src/libs/axios/server";

function index({ data }) {
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [filteredCars, setFilteredCars] = useState([]);

  // fetch filters
  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await getData(
          "cars/filters",
          {},
          {
            "Content-Type": "multipart/form-data",
          }
        );
        setFilters(response.data.brands);
      } catch (error) {
        console.log(error);
      }
    };

    feachData();
  }, []);

  // fetch cars
  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await getData(
          "cars",
          { brand: activeFilter },
          {
            "Content-Type": "multipart/form-data",
          }
        );
        setFilteredCars(response.data.cars);
      } catch (error) {
        console.log(error);
      }
    };

    feachData();
  }, [activeFilter]);

  return (
    <div className="browse-used-car-section mb-100" dir="rtl">
      <div className="container">
        <div className="row mb-50 wow fadeInUp" data-wow-delay="200ms">
          <div className="col-lg-12">
            <div className="section-title-2 text-center">
              <h2>تصفح السيارات المستعملة</h2>
              <p>هناك أكثر من 30 فئة علامة تجارية متوفرة</p>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          <div className="col-lg-12">
            <div className="browse-car-filter-area">
              <ul className="nav nav-tabs" id="myTab3" role="tablist">
                {filters?.map((filter, index) => {
                  if (index > 5) return null;
                  return (
                    <li key={index} className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id={filter}
                        data-bs-toggle="tab"
                        data-bs-target={`#${filter}`}
                        type="button"
                        role="tab"
                        aria-controls={filter}
                        aria-selected="true"
                        onClick={() => {
                          setActiveFilter(filter);
                        }}
                      >
                        {filter}
                      </button>
                    </li>
                  );
                })}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="premium-car-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#premium-car"
                    type="button"
                    role="tab"
                    aria-controls="premium-car"
                    aria-selected="false"
                    onClick={() => {
                      setActiveFilter("premium");
                    }}
                  >
                    <img src="assets/img/home2/icon/premium.svg" alt="" />{" "}
                    سيارات فاخرة
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="tab-content" id="myTab3Content">
              {filters?.map((filter, index) => {
                if (index > 5) return null;
                return (
                  <div
                    key={index}
                    className={`tab-pane fade show ${
                      index === 0 ? "active" : ""
                    }`}
                    id={filter}
                    role="tabpanel"
                    aria-labelledby={`${filter}-tab`}
                  >
                    {filteredCars && filteredCars.length > 0 ? (
                      <div className="row justify-content-center g-4">
                        {filteredCars.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
                              data-wow-delay="200ms"
                            >
                              <div className="product-card2 two">
                                <div className="product-img">
                                  <img
                                    style={{ width: "100%", height: "220px" }}
                                    src={item.image}
                                    alt="img"
                                  />
                                </div>
                                <div className="product-content">
                                  <div className="price">
                                    <strong>{item.price}EGP</strong>
                                  </div>
                                  <h6>
                                    <Link href={`/cars/${item.id}`}>
                                      {item.name}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <h5>لا توجد سيارات متاحة حالياً</h5>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Premium Car */}
              <div
                className="tab-pane fade"
                id="premium-car"
                role="tabpanel"
                aria-labelledby="premium-car-tab"
              >
                {data && data.length > 0 ? (
                  <div className="row justify-content-center g-4">
                    {data.map((item, idx) => (
                      <div
                        className="col-xl-3 col-md-4 col-sm-6"
                        key={item.id || idx}
                      >
                        <div className="product-card2 two">
                          <div className="product-img">
                            <img
                              src={
                                item.image || "assets/img/home2/used-car-01.png"
                              }
                              alt={item.name || "img"}
                              style={{ width: "100%", height: "220px" }}
                            />
                          </div>
                          <div className="product-content">
                            <div className="price">
                              <strong>{item.price}EGP</strong>
                            </div>
                            <h6>
                              <Link href={`/cars/${item.id}`}>
                                {item.name || "Mercedes-Benz-2023"}
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <h5>لا توجد سيارات فاخرة متاحة حالياً</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
