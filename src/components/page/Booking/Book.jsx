import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "@formspree/react";
import { useNavigate } from "react-router-dom";
import "./book.css";

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
  const [pinError, setPinError] = useState(""); // ✅ alert ki jagah inline error

  const navigate = useNavigate();

  const cacheRef = useRef({});
  const debounceRef = useRef(null);

  // PINCODE CHANGE
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    setPinError(""); // error clear karo jab user type kare

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length === 6) {
      debounceRef.current = setTimeout(() => {
        fetchLocation(value);
      }, 400);
    } else {
      resetLocation();
    }
  };

  // PRIMARY API FETCH
  const fetchFromPrimary = async (pin) => {
    const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`, {
      timeout: 8000,
    });
    const result = res.data[0];
    if (result.Status === "Success") return result;
    return null;
  };

  // FALLBACK API FETCH (backup source)
  const fetchFromFallback = async (pin) => {
    const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`, {
      timeout: 10000,
      headers: { "Cache-Control": "no-cache" }, // fresh request
    });
    const result = res.data[0];
    if (result.Status === "Success") return result;
    return null;
  };

  // FETCH LOCATION — primary try, fallback on failure
  const fetchLocation = async (pin) => {
    // ✅ Cache check
    if (cacheRef.current[pin]) {
      applyData(cacheRef.current[pin]);
      return;
    }

    setLoading(true);
    setPinError("");
    resetLocation();

    let result = null;

    try {
      result = await fetchFromPrimary(pin);
    } catch (primaryErr) {
      console.warn("Primary API failed:", primaryErr.message);
      // Primary fail hone par fallback try karo
      try {
        result = await fetchFromFallback(pin);
      } catch (fallbackErr) {
        console.error("Fallback API also failed:", fallbackErr.message);
        setPinError(
          "Network error. Please check your connection and try again.",
        );
        setLoading(false);
        return;
      }
    }

    if (result) {
      cacheRef.current[pin] = result; // ✅ cache save
      applyData(result);
      setPinError("");
    } else {
      setPinError("Invalid Pincode. Please enter a valid 6-digit PIN.");
      resetLocation();
    }

    setLoading(false);
  };

  // APPLY DATA
  const applyData = (result) => {
    const offices = result.PostOffice;
    setPostOffices(offices);
    setState(offices[0].State);
    setDistrict(offices[0].District);
    setPostOffice(offices[0].Name);
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

        {/* ✅ Inline error — alert() ki jagah */}
        {pinError && (
          <p style={{ color: "red", fontSize: "13px", margin: "4px 0 0" }}>
            {pinError}
          </p>
        )}

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
