import React from "react";
import { Link } from "react-router-dom";
import companyLogo from "../../assets/images/companyLogo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Left: Logo + Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={companyLogo}
            alt="Company Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold fs-4 text-primary mb-0">Talent Bridge</span>
        </Link>

        {/* Right: Toggler + Collapse */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Center: Nav Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about-us">About Us</a>
            </li>
          </ul>

          {/* Right: Auth Buttons */}
          <div className="d-flex gap-2 ms-lg-auto">
            <Link to="/signup" className="btn btn-primary">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
