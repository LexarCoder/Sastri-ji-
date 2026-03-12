import React from "react";
import { Instagram, Facebook, MessageCircle, Mail, Phone } from "lucide-react";
import "./footer.css";
import logo from "../../../assets/nav-logo.webp"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const tags = Array(30).fill("जय श्री राम");

  return (
    <footer className="footer-root">
      <div className="footer-bg-tags">
        {tags.map((tag, index) => (
          <span key={index} className="bg-tag-item">
            {tag}
          </span>
        ))}
      </div>

      <div className="footer-container">
        <div className="f-left-content">
          <div className="f-brand-wrapper">
            <img src={logo} alt="Logo" className="f-logo-elite" />
            <div className="f-text-box">
              <span className="f-title-mini">आचार्य</span>
              <h2 className="f-name-elite">श्री अनुज भारद्वाज</h2>
            </div>
          </div>
          <p className="f-desc-elite">
            वेदोक्त परम्पराओं और आध्यात्मिक मार्गदर्शन के माध्यम से आपके जीवन
            में सकारात्मकता का संचार।
          </p>
        </div>

        <div className="f-right-content">
          <h4 className="f-section-label">सम्पर्क सूत्र</h4>
          <div className="f-contact-links">
            <a href="tel:+918317046483" className="f-link-item">
              <Phone size={16} /> <span>+91 83170 46483</span>
            </a>
            <a href="mailto:anujpandey122222@gmail.com" className="f-link-item">
              <Mail size={16} /> <span>anujpandey122222@gmail.com</span>
            </a>
          </div>

          <div className="f-social-grid-elite">
            <a href="#" className="f-social-btn-elite">
              <Instagram size={20} />
            </a>
            <a href="#" className="f-social-btn-elite">
              <Facebook size={20} />
            </a>
            <a href="#" className="f-social-btn-elite">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="f-copyright-line">
        <p>© {currentYear} सर्वाधिकार सुरक्षित।</p>
      </div>
    </footer>
  );
};

export default Footer;
