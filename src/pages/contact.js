import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { Phone, Mail, MessageCircle, Send, Clock, Car } from 'lucide-react'

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <MainLayout>
            <style jsx>{`
        .contact-hero {
          background: #13141A;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }
        
        .contact-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-15px,0); }
          70% { transform: translate3d(0,-7px,0); }
          90% { transform: translate3d(0,-2px,0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .contact-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.04);
        }
        
        .icon-bounce {
          animation: bounce 2s infinite;
        }
        
        .slide-in {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .contact-form {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .form-control {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .btn-gradient {
          background: #13141A;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-gradient:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }
        
        .whatsapp-card { border-left: 3px solid #25d366; }
        .email-card { border-left: 3px solid rgba(255, 255, 255, 0.3); }
        .hours-card { border-left: 3px solid #ffd700; }
        
        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        
        .contact-card:hover .contact-icon {
          transform: rotate(8deg) scale(1.05);
        }
        
        .whatsapp-icon { background: linear-gradient(135deg, #25d366, #128c7e); }
        .email-icon { background: linear-gradient(135deg, #000000, #333333); }
        .hours-icon { background: linear-gradient(135deg, #ffd700, #ffb347); }
      `}</style>

            <div className="contact-hero text-white py-5">
                <div className="container">
                    {/* Header Section */}
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-lg-8">
                            <div className="icon-bounce mb-4">
                                <Car size={60} className="text-white" />
                            </div>
                            <h1 className="display-3 fw-bold mb-4 slide-in text-white">تواصل معنا</h1>
                            <p className="lead slide-in" style={{ animationDelay: '0.2s' }}>
                                نحن هنا لخدمتكم! تواصلوا معنا للحصول على أفضل السيارات وأجود الخدمات
                            </p>
                        </div>
                    </div>

                    <div className="row g-4 mb-5">
                        {/* Contact Cards */}
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-card whatsapp-card rounded-4 p-4 h-100 slide-in" style={{ animationDelay: '0.3s' }}>
                                <div className="d-flex align-items-center">
                                    <div className="contact-icon whatsapp-icon me-3">
                                        <MessageCircle size={30} className="text-white" />
                                    </div>
                                    <div className="flex-grow-1 text-end">
                                        <h4 className="h3 mb-2 text-white">📱 واتساب</h4>
                                        <a href="https://wa.me/4915160177121"
                                            className="text-decoration-none text-white fs-5 fw-bold">
                                            +49 151 60177121
                                        </a>
                                        <p className="text-white-50 mt-2 mb-0">تواصل مباشر وسريع عبر الواتساب</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="contact-card email-card rounded-4 p-4 h-100 slide-in" style={{ animationDelay: '0.4s' }}>
                                <div className="d-flex align-items-center">
                                    <div className="contact-icon email-icon me-3">
                                        <Mail size={30} className="text-white" />
                                    </div>
                                    <div className="flex-grow-1 text-end">
                                        <h4 className="h3 mb-2 text-white">📧 البريد الإلكتروني</h4>
                                        <a href="mailto:info@drixiony.com"
                                            className="text-decoration-none text-white fs-5 fw-bold">
                                            info@drixiony.com
                                        </a>
                                        <p className="text-white-50 mt-2 mb-0">للاستفسارات والمراسلات الرسمية</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="contact-card hours-card rounded-4 p-4 h-100 slide-in" style={{ animationDelay: '0.5s' }}>
                                <div className="d-flex align-items-center">
                                    <div className="contact-icon hours-icon me-3">
                                        <Clock size={30} className="text-white" />
                                    </div>
                                    <div className="flex-grow-1 text-end">
                                        <h4 className="h3 mb-2 text-white">⏰ ساعات العمل</h4>
                                        <p className="text-warning fs-4 fw-bold mb-2">24/7</p>
                                        <p className="text-white-50 mb-0">يسعدنا الرد على استفساراتكم في أي وقت!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {/* Contact Form */}
                            {/* <div className="contact-form rounded-4 p-5 slide-in" style={{ animationDelay: '0.6s' }}>
                                <h2 className="text-center h1 mb-4   form-label text-white d-block fw-semibold">أرسل لنا رسالة</h2>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-end d-block fw-semibold">الاسم</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-control form-control-lg rounded-3"
                                            placeholder="اسمك الكريم"
                                            style={{ textAlign: 'right' }}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label text-end d-block fw-semibold">البريد الإلكتروني</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="form-control form-control-lg rounded-3"
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label text-end d-block fw-semibold">رقم الهاتف</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="form-control form-control-lg rounded-3"
                                            placeholder="+49 123 456 789"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label text-end d-block fw-semibold">الرسالة</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="5"
                                            className="form-control form-control-lg rounded-3"
                                            placeholder="اكتب رسالتك هنا..."
                                            style={{ textAlign: 'right', resize: 'none' }}
                                        ></textarea>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button
                                            onClick={handleSubmit}
                                            className="btn btn-gradient btn-lg px-5 py-3 rounded-3 d-inline-flex align-items-center"
                                        >
                                            <span className="fs-5 fw-bold me-2">إرسال الرسالة</span>
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-10">
                            <div className="contact-card rounded-4 p-5 text-center slide-in" style={{ animationDelay: '0.7s' }}>
                                <h3 className="h2 mb-3 text-white">🚗 نحن نقدم أفضل السيارات بأفضل الأسعار</h3>
                                <p className="lead text-white-50 mb-0">
                                    فريقنا مستعد لخدمتكم على مدار الساعة. سواء كنتم تبحثون عن سيارة جديدة أو مستعملة،
                                    أو تحتاجون إلى استشارة، نحن هنا لمساعدتكم في اتخاذ القرار المناسب.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ContactPage