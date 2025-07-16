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
import { getData } from "../libs/axios/server";


const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adsLoading, setAdsLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
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
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        );
        setUserAds(response.data);
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
                  <div key={ad?.id} className="ad-card">
                    <div className="ad-image-container">
                      <img
                        src={ad?.image}
                        alt={ad?.name}
                        className="ad-image"
                      />
                      <div
                        className={`ad-status ${
                          ad?.status === "active" ? "active" : "inactive"
                        }`}
                      >
                        {ad?.status === "active" ? "نشط" : "غير نشط"}
                      </div>
                    </div>

                    <div className="ad-content">
                      <h3 className="ad-title">
                         {ad?.model?.name}
                      </h3>

                      <div className="ad-details" style={{ flexWrap: "wrap" }}>
                        <div className="ad-detail-item">
                          <span className="ad-detail-text">
                            {formatPrice(ad?.price)} جنيه
                          </span>
                          <DollarSign className="ad-detail-icon" />
                        </div>

                        <div className="ad-detail-item">
                          <span className="ad-detail-text">{ad?.year}</span>
                          <Calendar className="ad-detail-icon" />
                        </div>

                        <div className="ad-detail-item">
                          <span className="ad-detail-text">
                            {formatPrice(ad?.km)} كم
                          </span>
                          <Gauge className="ad-detail-icon" />
                        </div>

                        <div className="ad-detail-item">
                          <span className="ad-detail-text">{ad?.fuel}</span>
                          <Fuel className="ad-detail-icon" />
                        </div>

                        <div className="ad-detail-item">
                          <span className="ad-detail-text">{ad?.color}</span>
                          <Palette className="ad-detail-icon" />
                        </div>

                        <div className="ad-detail-item">
                          <span className="ad-detail-text">
                            {ad?.city?.name}
                          </span>
                          <MapPin className="ad-detail-icon" />
                        </div>
                      </div>

                      <div className="ad-footer">
                        <div className="ad-images-count">
                          <span className="ad-images-text">
                            {ad?.images?.length} صور
                          </span>
                          <Image className="ad-images-icon" />
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
                        تم النشر: {formatDate(ad?.created_at)}
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
