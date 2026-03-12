import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "./servicesData";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import "./serviceDetail.css";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // find service by id
  const service = services.find((s) => s.id === id);

  // safety check
  if (!service) {
    return (
      <div className="service-not-found">
        <h2>Service Not Found</h2>
        <button onClick={() => navigate("/services")}>Back to Services</button>
      </div>
    );
  }

  return (
    <div className="service-detail-container">
      <h1 className="service-title">{service.title}</h1>

      <div className="service-layout">
        <div className="service-image-box">
          <img
            src={service.godImg}
            alt={service.name}
            className="service-main-image"
          />
        </div>

        {/* Content */}
        <div className="service-content">
          <h2 className="service-name">{service.name}</h2>

          {/* Description */}
          <p className="service-desc">{service.desc}</p>

          {/* Price */}
          <div className="service-price">
            <h3>पूजा शुल्क</h3>
            <p>₹ {service.price}</p>
          </div>

          {/* 🔹 Travel Info (NEW SECTION ADDED) */}
          <div className="travel-info">
            <h3>यात्रा शुल्क</h3>
            <p>
              शास्त्री जी के आने-जाने का किराया यजमान द्वारा अलग से दिया जाएगा।
            </p>
          </div>

          {/* 🔹 Puja Samagri Info (NEW SECTION ADDED) */}
          <div className="samagri-info">
            <h3>पूजा सामग्री</h3>
            <p>
              पूजा बुक होने के बाद आपको WhatsApp पर सम्पूर्ण पूजा सामग्री की
              सूची भेज दी जाएगी।
            </p>
          </div>

          {/* Buttons */}
          <div className="service-buttons">
            <button
              className="book-btn btn1"
              
              onClick={() =>
                navigate(`/booking/${service.id}`, {
                  state: {
                    pujaName: service.name,
                    pujaTitle: service.title,
                    price: service.price,
                  },
                })
              }
            >
              अभी बुकिंग करें <CalendarCheck size={20} />
            </button>

            <button className="back-btn btn1" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} /> वापस जाएँ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
