import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-4 border-top">
      <span className="fw-bold fs-4 text-primary">Talent Bridge</span>
      {/* Inspirational Quote */}
      <p className="mb-2 fst-italic">
        "Bridging talent and opportunity, one step at a time."
      </p>

      {/* Social Icons */}
      <div className="mb-2">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark mx-2 fs-5"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark mx-2 fs-5"
        >
          <i className="bi bi-linkedin"></i>
        </a>
        <a
          href="mailto:support@talentbridge.com"
          className="text-dark mx-2 fs-5"
        >
          <i className="bi bi-envelope"></i>
        </a>
      </div>

      {/* Copyright */}
      <p className="mb-0">&copy; {new Date().getFullYear()} Talent Bridge</p>
    </footer>
  );
};

export default Footer;
