import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./services.css";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("Major");
  const navigate = useNavigate();

  const serviceCategories = {
    Major: {
      title: "मुख्य पूजा एवं अनुष्ठान",
      icon: "🕉️",
      list: [
        { id: "satyanarayan-katha", name: "श्री सत्यनारायण व्रत कथा" },
        { id: "mahamritunjay-jaap", name: "महामृत्युंजय जाप (लघु एवं महा)" },
        { id: "rudrabhishek-pujan", name: "रुद्राभिषेक पूजन (नमक-चमक के साथ)" },
        { id: "navgrah-shanti", name: "नवग्रह शांति पूजन" },
        { id: "sunderkand-paath", name: "सुन्दरकाण्ड पाठ" },
        { id: "hanuman-chalisa", name: "हनुमान चालीसा/बजरंग बाण पाठ" },
        { id: "bhay-badha-nivaran", name: "भय बाधा निवारण पूजा" },
        { id: "kaalsarp-dosh", name: "कालसर्प दोष निवारण" },
        { id: "mangal-dosh", name: "मंगल दोष शांति" },
        { id: "chandi-path", name: "दुर्गा सप्तशती/चण्डी पाठ" }, // Naya add kiya
        { id: "laghu-rudra", name: "लघु रुद्र अनुष्ठान" }, // Naya add kiya
      ],
    },
    Vastu: {
      title: "वास्तु एवं गृह अनुष्ठान",
      icon: "🏠",
      list: [
        { id: "griha-pravesh", name: "गृह प्रवेश पूजन" },
        { id: "bhumi-pujan", name: "भूमि पूजन" },
        { id: "vastu-shanti", name: "वास्तु शांति पूजन" },
        { id: "nutan-griha", name: "नूतन गृह शांति" },
        { id: "office-udghatan", name: "दुकान/कार्यालय उद्घाटन पूजन" },
        { id: "factory-sthapna", name: "फैक्ट्री स्थापना पूजन" },
        { id: "shila-nyas", name: "शिलान्यास पूजन" }, // Naya add kiya
        { id: "borewell-pujan", name: "बोरवेल/जल पूजन" }, // Naya add kiya
      ],
    },
    Sanskar: {
      title: "संस्कार एवं उत्सव",
      icon: "👶",
      list: [
        { id: "namkaran", name: "नामकरण संस्कार" },
        { id: "annaprashan", name: "अन्नप्राशन संस्कार" },
        { id: "mundan", name: "मुंडन संस्कार (चूड़ाकर्म)" },
        { id: "upnayan", name: "उपनयन (जनेऊ) संस्कार" },
        { id: "vivah-sanskar", name: "विवाह संस्कार (पूर्ण वैदिक पद्धति)" },
        { id: "god-bharai", name: "गोद भराई (सीमन्तोन्नयन)" },
        { id: "karnavedh", name: "कर्णवेध संस्कार" },
        { id: "vidyarambh", name: "विद्यारंभ संस्कार" },
        { id: "shashti-pujan", name: "षष्ठी पूजन (छठी)" },
        { id: "antyeshti", name: "अन्त्येष्टि संस्कार (अंतिम विदा)" }, // Naya add kiya
        { id: "birthday-pujan", name: "जन्मदिन वर्षगाँठ पूजन" }, // Naya add kiya
      ],
    },
    Katha: {
      title: "भक्ति एवं कथा",
      icon: "🙏",
      list: [
        { id: "bhagwat-katha", name: "श्रीमद्भागवत महापुराण कथा" },
        { id: "ram-katha", name: "श्री राम कथा" },
        { id: "shiv-puran", name: "शिव पुराण कथा" },
        { id: "devi-bhagwat", name: "देवी भागवत कथा" },
        { id: "narad-puran", name: "नारद पुराण कथा" },
        { id: "garud-puran", name: "गरुड़ पुराण (शोक के समय)" },
        { id: "bhagwat-gita", name: "श्रीमद्भगवद्गीता पाठ" }, // Naya add kiya
      ],
    },
    Special: {
      title: "विशेष देव पूजन",
      icon: "🔱",
      list: [
        { id: "ganesh-pujan", name: "गणेश पूजन/अथर्वशीर्ष पाठ" },
        { id: "mahalaxmi-pujan", name: "महालक्ष्मी पूजन" },
        { id: "durga-saptashati", name: "दुर्गा सप्तशती पाठ" },
        { id: "saraswati-pujan", name: "सरस्वती पूजन" },
        { id: "vishnu-sahasranam", name: "विष्णु सहस्रनाम पाठ" },
        { id: "baglamukhi", name: "बगलामुखी अनुष्ठान" },
        { id: "kubera-pujan", name: "कुबेर पूजन" },
        { id: "shani-shanti", name: "शनि देव शांति पूजन" },
        { id: "kartikeya-pujan", name: "कार्तिकेय पूजन" }, // Naya add kiya
        { id: "surya-pujan", name: "सूर्य देव पूजन (आरोग्य हेतु)" }, // Naya add kiya
      ],
    },
    Ancestral: {
      title: "पितृ कर्म एवं शांति",
      icon: "🕯️",
      list: [
        { id: "shraddh-karma", name: "श्राद्ध कर्म (तर्पण)" },
        { id: "pind-daan", name: "पिंड दान" },
        { id: "narayan-bali", name: "नारायण बलि पूजन" },
        { id: "tripindi-shraddh", name: "त्रिपिंडी श्राद्ध" },
        { id: "gaya-shraddh", name: "गया श्राद्ध" },
        { id: "pitra-dosh", name: "पितृ दोष शांति" },
        { id: "barkhi-pujan", name: "वार्षिक बरखी पूजन" }, // Naya add kiya
      ],
    },
    Fasting: {
      title: "मासिक एवं व्रत पूजन",
      icon: "🗓️",
      list: [
        { id: "purnima-vrat", name: "पूर्णिमा व्रत पूजन" },
        { id: "karwa-chauth", name: "करवा चौथ व्रत कथा" },
        { id: "ahoi-ashtami", name: "अहोई अष्टमी पूजन" },
        { id: "pradosh-vrat", name: "प्रदोष व्रत पूजन" },
        { id: "sankashti-chaturthi", name: "संकष्टी चतुर्थी व्रत" },
        { id: "ekadashi-udyapan", name: "एकादशी व्रत उद्यापन" },
        { id: "mahashivratri", name: "महाशिवरात्रि अभिषेक" },
        { id: "janmashtami", name: "जन्माष्टमी पूजन" },
        { id: "santoshi-mata", name: "संतोषी माता व्रत कथा" }, // Naya add kiya
        { id: "vaibhav-laxmi", name: "वैभव लक्ष्मी व्रत पूजन" }, // Naya add kiya
      ],
    },
  };

  useEffect(() => {
    gsap.fromTo(
      ".service-item",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" },
    );
  }, [activeCategory]);

  return (
    <div className="services-page-root page">
      <header className="services-hero page-transition">
        <h1 className="main-heading">हमारी वैदिक सेवाएँ</h1>
        <p className="sub-heading">
          शास्त्रोक्त विधि एवं पूर्ण निष्ठा के साथ अनुष्ठान
        </p>
        <div className="accent-line"></div>
      </header>

      <div className="services-main-container">
        <aside className="category-sidebar">
          {Object.keys(serviceCategories).map((key) => (
            <button
              key={key}
              className={`cat-btn ${activeCategory === key ? "active" : ""}`}
              onClick={() => setActiveCategory(key)}
            >
              <span className="cat-icon">{serviceCategories[key].icon}</span>

              <span className="cat-text">{serviceCategories[key].title}</span>
            </button>
          ))}
        </aside>

        <main className="service-content-area">
          <div className="content-header">
            <h2>
              {serviceCategories[activeCategory].icon}
              {serviceCategories[activeCategory].title}
            </h2>
          </div>

          <div className="service-grid">
            {serviceCategories[activeCategory].list.map((service) => (
              <div key={service.id} className="service-item">
                <div className="service-dot"></div>

                <p>{service.name}</p>

                <Link to={`/service/${service.id}`} className="no-underline">
                  <button className="inquiry-link">जानकारी लें</button>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Services;
