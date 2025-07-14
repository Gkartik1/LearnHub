// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { mode, changeMode } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleAccountDropdown = () => setAccountDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
    setAccountDropdownOpen(false);
    setMenuOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo" tabIndex={0}>
          LearnHub 🚀
        </Link>
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${menuOpen ? "expanded" : "collapsed"}`}>
        {/* Landing/Home link REMOVED */}

        {user?.role === "student" && (
          <>
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                {t("dashboard") || "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/materials" onClick={() => setMenuOpen(false)}>
                {t("materials") || "Materials"}
              </Link>
            </li>
            <li>
              <Link to="/roadmaps" onClick={() => setMenuOpen(false)}>
                {t("roadmaps") || "Roadmaps"}
              </Link>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                {t("adminPanel") || "Admin Panel"}
              </Link>
            </li>
            <li>
              <Link to="/admin/users" onClick={() => setMenuOpen(false)}>
                {t("manageUsers") || "Manage Users"}
              </Link>
            </li>
            <li>
              <Link to="/admin/upload" onClick={() => setMenuOpen(false)}>
                {t("UploadMaterials") || "Upload Materials"}
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to="/Announcements" onClick={() => setMenuOpen(false)}>
            {t("Announcements") || "Announcements"}
          </Link>
        </li>
        <li>
          <Link to="/Blog" onClick={() => setMenuOpen(false)}>
            {t("Blog") || "Blog"}
          </Link>
        </li>
        <li>
          <Link to="/Community" onClick={() => setMenuOpen(false)}>
            {t("Community") || "Community"}
          </Link>
        </li>
        <li>
          <Link to="/Resources" onClick={() => setMenuOpen(false)}>
            {t("Resources") || "Resources"}
          </Link>
        </li>
        <li>
          <Link to="/Payment" onClick={() => setMenuOpen(false)}>
            {t("Payment") || "Payment"}
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/Login" className="btn login-btn" onClick={() => setMenuOpen(false)}>
                {t("Login") || "Login"}
              </Link>
            </li>
            <li>
              <Link to="/Register" className="btn register-btn" onClick={() => setMenuOpen(false)}>
                {t("Register") || "Register"}
              </Link>
            </li>
          </>
        ) : (
          <li className="account-dropdown">
            <button
              className="account-btn"
              onClick={toggleAccountDropdown}
              aria-haspopup="true"
              aria-expanded={accountDropdownOpen}
            >
              {user.name || "Account"} ▼
            </button>
            {accountDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/profile"
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {t("profile") || "Profile"}
                  </Link>
                </li>
                <li>
                  <button className="btn logout-btn" onClick={handleLogout}>
                    {t("logout") || "Logout"}
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}

        <li>
          <select
            className="theme-select"
            value={mode}
            onChange={(e) => changeMode(e.target.value)}
            aria-label="Select Theme Mode"
          >
            <option value="light">☀ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">🖥 System</option>
          </select>
        </li>

        <li>
          <select
            className="lang-select"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label="Select Language"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Español</option>
            {/* Add more languages here */}
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;