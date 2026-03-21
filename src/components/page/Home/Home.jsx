import React from "react";
import { Nav, Services, About, Contact, Footer } from "../Export";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const mantras = [
    "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
    "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं। भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    "या कुन्देन्दुतुषारहारधवला, या शुभ्रवस्त्रावृता। या वीणावरदण्डमण्डितकरा, या श्वेतपद्मासना॥",
    "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता॥",
    "एतां विभूतिं योगं च मम यो वेत्ति तत्त्वतः। सोऽविकम्पेन योगेन युज्यते नात्र संशयः",
  ];
   const navigate = useNavigate();

  return (
    <>
      <div className="home-container page-transitio ">
        {/* <Nav /> */}

        {/* Moving Mantra Background */}
        <div className="mantra-wrapper page">
          <div className="mantra-track">
            {mantras.concat(mantras).map((mantra, index) => (
              <span key={index} className="moving-mantra">
                {mantra}
              </span>
            ))}
          </div>

          <div className="mantra-track-reverse">
            {mantras.concat(mantras).map((mantra, index) => (
              <span key={index} className="moving-mantra">
                {mantra}
              </span>
            ))}
          </div>
        </div>

        <section className="hero-section flex-column flex-center">
          <div className="hero-content text-glow">
            <p className="welcome-tag">सनातन धर्म सेवा</p>

            <h1 className="main-heading main-heading-h1">जय श्री राम</h1>

            <h2 className="sub-heading">
              वैदिक अनुष्ठान | संस्कृत पुजारी | कथा वाचक
            </h2>

            <p className="hero-para mt-1">
              शुद्ध वैदिक पद्धति एवं भक्तिमय कथा के माध्यम से आध्यात्मिक शांति
              की ओर एक पवित्र कदम।
            </p>

            <div className="cta-group mt-2">
              <button
                className="btn-primary btn1"
                onClick={() => navigate("/book")}
              >
                पूजा बुक करें
              </button>
              <button
                className="btn-outline ml-1 "
                onClick={() => navigate("/Contact")}
              >
                शास्त्री जी से संपर्क करें
              </button>
            </div>
          </div>
        </section>
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <div className="arrow-head"></div>
            <div className="arrow-shaft"></div>
          </div>
          <span className="scroll-text">SCROLL DOWN</span>
        </div>
      </div>

      <Services />
      <About />
      <Contact />
    </>
  );
};

export default Home;
