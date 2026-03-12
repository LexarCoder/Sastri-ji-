import React from "react";
import { useLocation } from "react-router-dom";
import "./thankYou.css";

const ThankYou = () => {
  const location = useLocation();
  const {
    userName,
    phone,
    whatsapp,
    pincode,
    state,
    district,
    country,
    area,
    landmark,
    pujaName,
    pujaTitle,
    price,
    pujaDate,
    notes,
  } = location.state || {};

  return (
    <div className="thankyou-container">
      <h1 className="main-heading"> 🙏 जय श्री राम 🙏</h1>
      <p className="mantra">
        🕉️ मङ्गलम् भगवान विष्णुः, मङ्गलम् गरुणध्वजः। मङ्गलम् पुण्डरी काक्षः,
        मङ्गलाय तनो हरिः॥ 🕉️
      </p>

      <div className="details-box">
        <h2>यजमान का विवरण</h2>
        <p>
          <strong>नाम:</strong> {userName}
        </p>
        <p>
          <strong>मोबाइल:</strong> {phone}
        </p>
        {whatsapp && (
          <p>
            <strong>WhatsApp:</strong> {whatsapp}
          </p>
        )}
        <p>
          <strong>पिनकोड:</strong> {pincode}
        </p>
        <p>
          <strong>राज्य:</strong> {state}
        </p>
        <p>
          <strong>ज़िला:</strong> {district}
        </p>
        <p>
          <strong>देश:</strong> {country}
        </p>
        <p>
          <strong>क्षेत्र / डाकघर:</strong> {area}
        </p>
        {landmark && (
          <p>
            <strong>निशान / गाँव :</strong> {landmark}
          </p>
        )}
        <p>
          <strong>पूजा का नाम:</strong> {pujaName}
        </p>
        <p>
          <strong>पूजा का शीर्षक:</strong> {pujaTitle}
        </p>
        <p>
          <strong>कीमत:</strong> ₹{price}
        </p>
        <p>
          <strong>पूजा की तारीख:</strong> {pujaDate}
        </p>
        {notes && (
          <p>
            <strong>नोट्स:</strong> {notes}
          </p>
        )}
      </div>

      <p className="footer-text">🌸 सदा सुखी रहें 🌸</p>
    </div>
  );
};

export default ThankYou;
