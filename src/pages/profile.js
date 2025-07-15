import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Fuel,
  Gauge,
  Palette,
  Settings,
  Image,
} from "lucide-react";
import MainLayout from "../layout/MainLayout";
// Note: Import './Profile.css' in your actual project

// Mock getData function - replace with your actual implementation
const getData = async (endpoint, params, headers) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          brands: [
            {
              id: 1,
              name: "gdfgdfg",
              description: "<p>gfhgfhfgh</p>",
              image:
                "https://darkgoldenrod-weasel-493963.hostingersite.com/cars/iSclUjm6llLxe2oatAUvUFeIwBtNOgO7hZga6eqO.jpg",
              price: "373000",
              year: "2020",
              km: "267000",
              fuel: "gdfgdfg",
              transmission: "gdfgdf",
              color: "بيج",
              engine_capacity: "1300",
              engine_power: "gdfgfd",
              engine_type: "gdfg",
              link: "https://drixuniy.test/dashboard/adds/create",
              status: "active",
              installment: "no",
              installment_price: null,
              installment_duration: null,
              installment_interest: null,
              installment_down_payment: null,
              installment_monthly_payment: null,
              installment_total_payment: null,
              installment_total_interest: null,
              city_id: 4,
              body_type_id: 5,
              model_id: 224,
              user_id: 1,
              featured_score: null,
              city: {
                id: 4,
                name: "الجيزة",
                created_at: "2025-06-03T18:32:09.000000Z",
                updated_at: "2025-06-03T18:32:09.000000Z",
                deleted_at: null,
              },
              body_type: {
                id: 5,
                name: "SUV",
                image: null,
                created_at: "2025-06-03T18:31:08.000000Z",
                updated_at: "2025-06-03T18:31:08.000000Z",
                deleted_at: null,
              },
              model: {
                id: 224,
                brand: "مرسيدس-بنز",
                name: "200",
                image: null,
                created_at: "2025-06-03T16:59:09.000000Z",
                updated_at: "2025-06-03T16:59:09.000000Z",
                deleted_at: null,
              },
              user: {
                id: 1,
                name: "super",
                email: "super@admin.com",
                phone: "fdgdf",
                role: "admin",
                email_verified_at: null,
                created_at: "2025-06-03T17:03:51.000000Z",
                updated_at: "2025-06-03T14:13:53.000000Z",
                deleted_at: null,
              },
              images: [
                {
                  id: 1,
                  add_id: 1,
                  image:
                    "https://darkgoldenrod-weasel-493963.hostingersite.com/storage/files/140341749048046.jpg",
                  created_at: "2025-06-04 11:40:46",
                  updated_at: "2025-06-04 11:40:46",
                  deleted_at: null,
                },
                {
                  id: 2,
                  add_id: 1,
                  image:
                    "https://darkgoldenrod-weasel-493963.hostingersite.com/storage/files/195321749048046.png",
                  created_at: "2025-06-04 11:40:46",
                  updated_at: "2025-06-04 11:40:46",
                  deleted_at: null,
                },
              ],
              created_at: "2025-06-04 10:26:01",
              updated_at: "2025-06-04 10:26:01",
              deleted_at: null,
            },
          ],
        },
      });
    }, 1000);
  });
};

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adsLoading, setAdsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.data) {
      setUser(userData.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          "profile/adds",
          {},
          {
            "Content-Type": "multipart/form-data",
          }
        );
        setUserAds(response.data.brands);
      } catch (error) {
        console.log(error);
      } finally {
        setAdsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-EG").format(price);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="profile-container">
        <div className="profile-content">
          {/* Personal Information Section */}
          <div className="profile-card">
            <div className="section-header">
              <User className="section-icon" />
              <h2 className="section-title">المعلومات الشخصية</h2>
            </div>

            {user ? (
              <div className="info-grid">
                <div className="info-column">
                  <div className="info-item">
                    <User className="info-icon" />
                    <div className="info-content">
                      <p className="info-label">الاسم</p>
                      <p className="info-value">{user.name}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Phone className="info-icon" />
                    <div className="info-content">
                      <p className="info-label">رقم الهاتف</p>
                      <p className="info-value">{user.phone}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Mail className="info-icon" />
                    <div className="info-content">
                      <p className="info-label">البريد الإلكتروني</p>
                      <p className="info-value">{user.email || "غير محدد"}</p>
                    </div>
                  </div>
                </div>

                <div className="info-column">
                  <div className="info-item">
                    <MapPin className="info-icon" />
                    <div className="info-content">
                      <p className="info-label">العنوان</p>
                      <p className="info-value">{user.address || "غير محدد"}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Settings className="info-icon" />
                    <div className="info-content">
                      <p className="info-label">نوع المستخدم</p>
                      <p className="info-value">{user.role}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Calendar className="info-icon" />
                    <div className="info-content">
                      <p className="info-label">تاريخ التسجيل</p>
                      <p className="info-value">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="no-data">لا توجد معلومات شخصية متاحة</p>
            )}
          </div>

          {/* User Ads Section */}
          <div className="profile-card">
            <div className="section-header">
              <Car className="section-icon" />
              <h2 className="section-title">إعلاناتي</h2>
            </div>

            {adsLoading ? (
              <div className="ads-loading">
                <div className="ads-loading-spinner"></div>
              </div>
            ) : userAds.length > 0 ? (
              <div className="ads-grid">
                {userAds.map((ad) => (
                  <div key={ad.id} className="ad-card">
                    <div className="ad-image-container">
                      <img src={ad.image} alt={ad.name} className="ad-image" />
                      <div
                        className={`ad-status ${
                          ad.status === "active" ? "active" : "inactive"
                        }`}
                      >
                        {ad.status === "active" ? "نشط" : "غير نشط"}
                      </div>
                    </div>

                    <div className="ad-content">
                      <h3 className="ad-title">
                        {ad.model.brand} {ad.model.name}
                      </h3>

                      <div className="ad-details">
                        <div className="ad-detail-item">
                          <DollarSign className="ad-detail-icon" />
                          <span className="ad-detail-text">
                            {formatPrice(ad.price)} جنيه
                          </span>
                        </div>

                        <div className="ad-detail-item">
                          <Calendar className="ad-detail-icon" />
                          <span className="ad-detail-text">{ad.year}</span>
                        </div>

                        <div className="ad-detail-item">
                          <Gauge className="ad-detail-icon" />
                          <span className="ad-detail-text">
                            {formatPrice(ad.km)} كم
                          </span>
                        </div>

                        <div className="ad-detail-item">
                          <Fuel className="ad-detail-icon" />
                          <span className="ad-detail-text">{ad.fuel}</span>
                        </div>

                        <div className="ad-detail-item">
                          <Palette className="ad-detail-icon" />
                          <span className="ad-detail-text">{ad.color}</span>
                        </div>

                        <div className="ad-detail-item">
                          <MapPin className="ad-detail-icon" />
                          <span className="ad-detail-text">{ad.city.name}</span>
                        </div>
                      </div>

                      <div className="ad-footer">
                        <div className="ad-images-count">
                          <Image className="ad-images-icon" />
                          <span className="ad-images-text">
                            {ad.images.length} صور
                          </span>
                        </div>

                        <div className="ad-actions">
                          <button className="action-btn view">
                            <Eye className="action-icon" />
                          </button>
                          <button className="action-btn edit">
                            <Edit className="action-icon" />
                          </button>
                          <button className="action-btn delete">
                            <Trash2 className="action-icon" />
                          </button>
                        </div>
                      </div>

                      <div className="ad-date">
                        تم النشر: {formatDate(ad.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-ads">
                <Car className="no-ads-icon" />
                <p className="no-ads-text">لا توجد إعلانات متاحة</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileComponent;
