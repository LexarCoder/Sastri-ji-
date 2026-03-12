import React from "react";
import { useRef } from "react";
import "./about.css";
import about from "../../../assets/about.webp";
import img1 from "../../../assets/1.webp";
import img2 from "../../../assets/2.webp";
import img3 from "../../../assets/3.webp";
import img4 from "../../../assets/4.webp";
import img5 from "../../../assets/5.webp";

const About = () => {
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = sliderRef.current;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    sliderRef.current.isDown = false;
  };

  const handleMouseUp = () => {
    sliderRef.current.isDown = false;
  };

  const handleMouseMove = (e) => {
    const slider = sliderRef.current;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5;
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };
  return (
    <div className="abt-root">
      {/* SECTION 1: HERO */}
      <section className="abt-hero ">
        <div className="abt-hero-main-flex container">
          <div className="abt-hero-left-content">
            <span className="abt-mantra-top">|| श्री गणेशाय नमः ||</span>
            <h1 className="abt-main-name">
              आचार्य श्री <br /> अनुज भारद्वाज
            </h1>
            <div className="abt-tagline-box">
              <p className="abt-tagline">
                वैदिक विद्वान | शुक्ल यजुर्वेद निष्णात | आध्यात्मिक पथप्रदर्शक
              </p>
            </div>
          </div>

          <div className="abt-hero-right-image">
            <div className="abt-hero-img-container">
              <img
                src={about}
                alt="Acharya Anuj Bhardwaj"
                className="abt-hero-img"
              />
              <div className="abt-img-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BIO */}
      <section className="abt-bio-section ">
        <div className="abt-container">
          <div className="abt-bio-content-full">
            <h2 className="abt-heading-gold centered">
              विद्वता एवं पावन पृष्ठभूमि
            </h2>
            <div className="abt-divider centered-margin"></div>

            <p className="abt-para centered-text">
              मूल रूप से बिहार के <strong>सीवान जनपद</strong> की पावन धरा से
              संबंध रखने वाले आचार्य अनुज भारद्वाज जी वर्तमान में प्रभु श्री राम
              की जन्मस्थली <strong>पावन अयोध्या धाम</strong> में रहकर सनातन धर्म
              की सेवा कर रहे हैं। इन्होंने अपनी शास्त्रीय शिक्षा
              <strong>
                श्रीमद् बालमुकुंद महादेशिक संस्कृत महाविद्यालय, स्वर्ग द्वार,
                अयोध्या
              </strong>
              से पूर्ण की है।
            </p>

            <div className="abt-spec-options-grid">
              <div className="abt-spec-card">
                <div className="spec-icon">📜</div>
                <h3>वैदिक आचार्य</h3>
                <p>
                  शुक्ल यजुर्वेद के अध्ययन में निपुण। शास्त्रोक्त विधि से यज्ञ,
                  महारुद्र, शतचंडी एवं विभिन्न वैदिक संस्कार श्रद्धा एवं
                  विधि-विधान के साथ संपन्न कराते हैं।
                </p>
              </div>

              <div className="abt-spec-card">
                <div className="spec-icon">🎓</div>
                <h3>शास्त्री</h3>
                <p>
                  श्रीमद् बालमुकुंद महादेशिक संस्कृत महाविद्यालय, स्वर्ग द्वार,
                  अयोध्या से शास्त्री शिक्षा प्राप्त। वेद एवं धर्मशास्त्रों का
                  पारंपरिक अध्ययन किया।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS */}
      <section className="abt-stats ">
        <div className="abt-container abt-stats-grid">
          <div className="abt-stat-item">
            <h2>2500+</h2>
            <p>संपन्न अनुष्ठान</p>
          </div>
          <div className="abt-stat-item">
            <h2>700+</h2>
            <p>वैदिक विवाह</p>
          </div>
          <div className="abt-stat-item">
            <h2>9+</h2>
            <p>वर्षों का अनुभव</p>
          </div>
          <div className="abt-stat-item">
            <h2>8000+</h2>
            <p>संतुष्ट परिवार</p>
          </div>
        </div>
      </section>

      <section className="abt-gallery-sec">
        <div
          className="abt-gallery-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="abt-gallery-track">
            {[...Array(2)].map((_, repeatIndex) =>
              [img1, img2, img3, img4, img5, about].map((img, index) => (
                <div
                  key={`${repeatIndex}-${index}`}
                  className="abt-gallery-item"
                >
                  <img src={img} alt={`Darshan ${index + 1}`} />
                </div>
              )),
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
