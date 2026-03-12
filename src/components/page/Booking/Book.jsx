import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "@formspree/react";
import { useNavigate } from "react-router-dom";
import "./Book.css";

const Book = () => {
  const [formState, handleSubmitFormspree] = useForm("mreyzrwa");

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [postOffice, setPostOffice] = useState("");
  const [landmark, setLandmark] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // PINCODE CHANGE
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);

    if (value.length === 6) {
      fetchLocation(value);
    }
  };

  // FETCH LOCATION
  const fetchLocation = async (pin) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`,
      );

      if (res.data[0].Status === "Success") {
        const offices = res.data[0].PostOffice;

        setPostOffices(offices);
        setState(offices[0].State);
        setDistrict(offices[0].District);
        setPostOffice(offices[0].Name);
      } else {
        alert("Invalid Pincode");
        resetLocation();
      }
    } catch {
      alert("API Error");
      resetLocation();
    }
    setLoading(false);
  };

  const resetLocation = () => {
    setState("");
    setDistrict("");
    setPostOffices([]);
    setPostOffice("");
  };

  // SUCCESS REDIRECT
  useEffect(() => {
    if (formState.succeeded) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [formState.succeeded, navigate]);

  // SUCCESS PAGE
  if (formState.succeeded) {
    return (
      <div className="book-container">
        <h2 style={{ textAlign: "center" }}>सन्देश सफलतापूर्वक भेजा गया ✅</h2>
      </div>
    );
  }

  return (
    <div className="book-container">
      <h2>Book Your Puja</h2>

      <form className="book-form" onSubmit={handleSubmitFormspree}>
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={userName}
          onChange={(e) =>
            setUserName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
          }
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          maxLength={10}
          required
        />

        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
          maxLength={6}
          required
        />

        {loading && <p>Fetching location...</p>}

        <label>State</label>
        <input type="text" name="state" value={state} readOnly />

        <label>District</label>
        <input type="text" name="district" value={district} readOnly />

        {postOffices.length > 0 && (
          <>
            <label>Select Post Office</label>
          

            <select
              className="post-select"
              value={postOffice}
              onChange={(e) => setPostOffice(e.target.value)}
              name="postOffice"
              required
            >
              {postOffices.map((po) => (
                <option key={po.Name} value={po.Name}>
                  {po.Name}
                </option>
              ))}
            </select>
          </>
        )}

        <label>Village / Landmark</label>
        <input
          type="text"
          name="landmark"
          placeholder="Enter Village / Landmark"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          required
        />

        <button type="submit" disabled={formState.submitting} className="btn1">
          {formState.submitting ? "Sending..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default Book;
