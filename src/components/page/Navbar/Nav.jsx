import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import "./nav.css";
import logo from "../../../assets/nav-logo.webp";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <nav className={`nav-wrapper ${isScrolled ? "nav-active" : ""}`}>
      <div className="nav-container">
        {/* BRANDING */}
        <div className="nav-logo-group">
          <NavLink
            to="/"
            className="logo-img-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logo} alt="Logo" className="logo-img" />
          </NavLink>

          <div className="logo-brand">
            <span className="brand-title">आचार्य</span>
            <h2 className="brand-name">श्री अनुज भारद्वाज</h2>
          </div>
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${isMenuOpen ? "mobile-nav-active" : ""}`}>
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <NavLink
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                end={item === "Home"} // 🔥 Important
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? "active" : ""}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-text">{item}</span>
              </NavLink>
            </li>
          ))}

          {/* Mobile Resume */}
          <li className="nav-resume-mobile">
            <a href="#" className="nav-resume-btn">
              <span>Resume</span>
              <Download size={18} />
            </a>
          </li>
        </ul>

        {/* ACTIONS */}
        <div className="nav-actions">
          <a href="#" className="nav-resume-btn desktop-only">
            <span>Resume</span>
            <Download size={18} />
          </a>

          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} color="#FFD700" />
            ) : (
              <Menu size={28} color="#FFD700" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
