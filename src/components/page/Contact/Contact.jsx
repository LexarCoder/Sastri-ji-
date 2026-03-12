import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Send,
  MessageCircle,
  User,
  Hash,
} from "lucide-react";
import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formState, handleSubmit] = useForm("mreyzrwa");

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [postOffice, setPostOffice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const links = {
    insta: "https://www.instagram.com/acharya_anuj",
    fb: "https://www.facebook.com/acharya_anuj",
    wa: "https://wa.me/8317046443",
    email: "anujpandey122222@gmail.com",
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();
    tl.fromTo(
      ".contact-reveal",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" },
    );
  }, []);

  const fetchLocation = async (pin) => {
    if (pin.length !== 6) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`,
      );

      if (res.data[0].Status === "Success") {
        const offices = res.data[0].PostOffice;

        setPostOffices(offices);
        setStateName(offices[0].State);
        setDistrict(offices[0].District);
        setPostOffice(offices[0].Name);
      } else {
        alert("अमान्य पिनकोड!");
        setStateName("");
        setDistrict("");
        setPostOffices([]);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handlePincode = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);

    if (value.length === 6) {
      fetchLocation(value);
    }
  };

  /* SUCCESS REDIRECT */
  useEffect(() => {
    if (formState.succeeded) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formState.succeeded, navigate]);

  /* SUCCESS MESSAGE */
  if (formState.succeeded) {
    return (
      <section className="contact-section">
        <div className="contact-container">
          <h2 style={{ textAlign: "center" }}>
            सन्देश सफलतापूर्वक भेजा गया ✅
          </h2>

        </div>
      </section>
    );
  }

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header contact-reveal">
          <span className="contact-sub">सम्पर्क सूत्र</span>
          <h1 className="contact-title">आचार्य जी से जुड़ें</h1>
          <div className="contact-divider"></div>
        </div>

        <div className="contact-main-grid">
          {/* Form */}
          <div className="contact-form-box contact-reveal">
            <form className="modern-form" onSubmit={handleSubmit} method="POST">
              <div className="input-group">
                <User className="input-icon" size={18} />

                <input
                  type="text"
                  name="name"
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    setUserName(value);
                  }}
                  required
                  placeholder=" "
                />

                <label>आपका नाम</label>
              </div>

              <ValidationError
                prefix="Name"
                field="name"
                errors={formState.errors}
              />

              <div className="input-group">
                <Phone className="input-icon" size={18} />

                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value);
                  }}
                  maxLength="10"
                  required
                  placeholder=" "
                />

                <label>मोबाइल नंबर</label>
              </div>

              <ValidationError
                prefix="Phone"
                field="phone"
                errors={formState.errors}
              />

              <div className="input-group">
                <Hash className="input-icon" size={18} />

                <input
                  type="text"
                  name="pincode"
                  value={pincode}
                  onChange={handlePincode}
                  maxLength="6"
                  required
                  placeholder=" "
                />

                <label>पिन कोड</label>
              </div>

              {loading && <p className="loading-text">स्थान खोज रहे हैं...</p>}

              {stateName && (
                <div className="location-box">
                  <p>
                    <MapPin size={16} /> राज्य: <strong>{stateName}</strong>
                  </p>

                  <p>
                    <MapPin size={16} /> जिला: <strong>{district}</strong>
                  </p>

                  <label className="select-label">डाकघर चुनें:</label>

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

                  {/* Hidden Fields */}
                  <input type="hidden" name="state" value={stateName} />
                  <input type="hidden" name="district" value={district} />
                  <input type="hidden" name="postOffice" value={postOffice} />
                </div>
              )}

              <button
                type="submit"
                disabled={formState.submitting}
                className="form-submit-btn btn1"
              >
                {formState.submitting ? "भेजा जा रहा है..." : "सन्देश भेजें"}{" "}
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="contact-info contact-reveal">
            <p className="contact-desc">
              यज्ञ, अनुष्ठान या ज्योतिष परामर्श के लिए आप नीचे दिए गए माध्यमों
              से सीधे सम्पर्क कर सकते हैं।
            </p>

            <div className="info-cards-wrapper">
              <a href={`mailto:${links.email}`} className="info-card">
                <div className="icon-circle">
                  <Mail size={20} />
                </div>

                <div className="card-detail">
                  <span>ईमेल</span>
                  <p>{links.email}</p>
                </div>
              </a>

              <a href={links.wa} className="info-card">
                <div className="icon-circle">
                  <Phone size={20} />
                </div>

                <div className="card-detail">
                  <span>फ़ोन / व्हाट्सएप</span>
                  <p>+91 8317046483</p>
                </div>
              </a>

              <div className="info-card">
                <div className="icon-circle">
                  <MapPin size={20} />
                </div>

                <div className="card-detail">
                  <span>स्थान</span>
                  <p>अयोध्या धाम, उत्तर प्रदेश</p>
                </div>
              </div>
            </div>

            <div className="social-connect">
              <h4>सोशल मीडिया</h4>

              <div className="social-icons-gap">
                <a
                  href={links.insta}
                  target="_blank"
                  rel="noreferrer"
                  className="s-icon insta"
                >
                  <Instagram size={22} />
                </a>

                <a
                  href={links.fb}
                  target="_blank"
                  rel="noreferrer"
                  className="s-icon fb"
                >
                  <Facebook size={22} />
                </a>

                <a
                  href={links.wa}
                  target="_blank"
                  rel="noreferrer"
                  className="s-icon wa"
                >
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
