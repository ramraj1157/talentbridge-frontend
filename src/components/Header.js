import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHouseUser,
  FaUsers,
  FaBriefcase,
  FaLink,
  FaFileAlt,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";
import "../assets/css/Header.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const developerId = localStorage.getItem("developerId");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!developerId) return;
      try {
        const response = await axios.get("http://localhost:5000/api/developer/profile", {
          headers: { "developer-id": developerId },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [developerId]);

  const navLinks = [
    { path: "/developer/dashboard", icon: <FaHouseUser />, label: "Dashboard" },
    { path: "/developer/connect", icon: <FaUsers />, label: "Connect" },
    { path: "/developer/apply", icon: <FaBriefcase />, label: "Jobs" },
    { path: "/developer/connections", icon: <FaLink />, label: "Connections" },
    { path: "/developer/applications", icon: <FaFileAlt />, label: "Applications" },
    { path: "/developer/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
      <div className="container-fluid">
        {/* Brand */}
        <span className="navbar-brand fw-bold text-primary fs-4">TalentBridge</span>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAlt"
          aria-controls="navbarNavAlt"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarNavAlt">
          <div className="navbar-nav mx-auto text-center">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                className={`btn nav-link d-flex align-items-center justify-content-center gap-1 ${
                  location.pathname === link.path
                    ? "text-primary fw-semibold"
                    : "text-secondary"
                }`}
                onClick={() => navigate(link.path)}
              >
                {link.icon}
                <span className="d-none d-md-inline">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Profile */}
          <div className="d-flex align-items-center justify-content-center mt-2 mt-lg-0 gap-2">
            {profile?.profilePhoto ? (
              <img
                src={`http://localhost:5000${profile.profilePhoto}`}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "35px",
                  height: "35px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/developer/profile")}
              />
            ) : (
              <FaUserCircle
                size={30}
                className="text-secondary"
                onClick={() => navigate("/developer/profile")}
                style={{ cursor: "pointer" }}
              />
            )}
            <span
              className="fw-medium d-none d-md-inline"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/developer/profile")}
            >
              {profile?.fullName || "My Profile"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
