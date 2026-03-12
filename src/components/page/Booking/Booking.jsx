import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import { useForm } from "@formspree/react";
import QRCode from "react-qr-code";

const Booking = () => {
 
  const [formState, sendToEmail] = useForm("mbdzrqeq");
  const location = useLocation();
  const navigate = useNavigate();
  const { pujaTitle, pujaName, price } = location.state || {};

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [loading, setLoading] = useState(false);

  const [pujaDate, setPujaDate] = useState("");
  const [notes, setNotes] = useState("");

  // VALIDATIONS
  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidPhone = (num) => /^\d{10}$/.test(num);
  const isValidPincode = (pin) => /^\d{6}$/.test(pin);

  // PINCODE API
  const handlePincodeBlur = async () => {
    if (!isValidPincode(pincode)) {
      alert("Please enter valid 6 digit pincode");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );

      if (res.data[0].Status === "Success") {
        const data = res.data[0].PostOffice;

        setPostOffices(data);
        setState(data[0].State);
        setDistrict(data[0].District);
        setCountry(data[0].Country);
        setArea(data[0].Name);
      } else {
        alert("Invalid Pincode!");
        resetLocation();
      }
    } catch {
      alert("API Error! Try again.");
      resetLocation();
    }

    setLoading(false);
  };

  const resetLocation = () => {
    setState("");
    setDistrict("");
    setCountry("");
    setArea("");
    setPostOffices([]);
  };

  const handlePostOfficeChange = (selected) => setArea(selected);

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidName(userName)) {
      alert("Name should contain only letters");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    if (whatsapp && !isValidPhone(whatsapp)) {
      alert("Enter valid WhatsApp number");
      return;
    }

    if (!isValidPincode(pincode)) {
      alert("Invalid Pincode");
      return;
    }

    if (!state || !district || !country || !area) {
      alert("Please enter valid location");
      return;
    }

    if (!pujaDate) {
      alert("Please select puja date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (pujaDate < today) {
      alert("Past date not allowed");
      return;
    }

    sendToEmail(e);

    navigate("/thankyou", {
      state: {
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
      },
    });
  };
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
 const upiLink = `upi://pay?pa=pandey.nitesh29@axl&pn=NiteshPandey&am=${price}&cu=INR`;
  return (
    <div className="booking-landscape-container">
      <div className="booking-form">
        <h2>बुक करें अपना पूजा / Book Your Puja</h2>

        <form onSubmit={handleSubmit}>
          <h3>User Info / उपयोगकर्ता जानकारी</h3>

          <label>नाम / Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) =>
              setUserName(e.target.value.replace(/[^A-Za-z\s]/g, ""))
            }
            required
            name="userName"
          />

          <label>मोबाइल / Mobile Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            required
            name="phone"
          />

          <label>WhatsApp (Optional)</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            name="whatsapp"
          />

          <h3>स्थान विवरण / Location Details</h3>

          <label>पिनकोड / Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            onBlur={handlePincodeBlur}
            maxLength={6}
            required
            name="pincode"
          />

          {/* {loading && <p>Fetching location...</p>} */}

          <label>राज्य / State</label>
          <input type="text" value={state} readOnly name="state" />

          <label>जिला / District</label>
          <input type="text" value={district} readOnly name="district" />

          <label>देश / Country</label>
          <input type="text" value={country} readOnly name="country" />

          <label>डाकघर / Post Office</label>

          {postOffices.length > 1 ? (
            <select
              className="post-select"
              value={area}
              onChange={(e) => handlePostOfficeChange(e.target.value)}
            >
              {postOffices.map((po) => (
                <option key={po.Name} value={po.Name}>
                  {po.Name}
                </option>
              ))}
            </select>
          ) : (
            <input type="text" value={area} readOnly name="area" />
          )}

          <label>Village / गाँव (Optional)</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) =>
              setLandmark(e.target.value.replace(/[^A-Za-z\s]/g, ""))
            }
            maxLength={15}
            name="landmark"
          />

          <h3>बुकिंग विवरण / Booking Details</h3>

          <label>पूजा का नाम / Puja Name</label>
          <input type="text" value={pujaName} readOnly name="pujaName" />

          <label>पूजा का शीर्षक / Puja Title</label>
          <input type="text" value={pujaTitle} readOnly name="pujaTitle" />

          <label>कीमत / Price</label>
          <input type="text" value={`₹${price}`} readOnly name="price" />

          <label>तारीख / Date of Puja</label>
          <input
            type="date"
            value={pujaDate}
            onChange={(e) => setPujaDate(e.target.value)}
            required
            name="pujaDate"
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                .toISOString()
                .split("T")[0]
            }
          />

          <p className="phonepe-title">PhonePe QR</p>

          <div className="qr-box">
            <QRCode value={upiLink} size={170} />

            <p className="qr-name">Account Holder : Nitesh Pandey</p>
          </div>

          <label className="payment-confirm">
            <input
              type="checkbox"
              checked={paymentConfirmed}
              onChange={(e) => setPaymentConfirmed(e.target.checked)}
              required
            />
            I confirm payment is completed / मैंने भुगतान कर दिया है
          </label>
          <button
            className="book-btn"
            type="submit"
            disabled={!paymentConfirmed}
          >
            बुक करें / Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
