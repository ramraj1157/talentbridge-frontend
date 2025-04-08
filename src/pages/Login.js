import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("developer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error, info
  const [showMessage, setShowMessage] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
      showAlert("Please enter your email and password.", "danger");
      return;
    }

    if (!email) {
      setEmailError(true);
      showAlert("Please enter your email.", "danger");
      return;
    }

    if (!password) {
      setPasswordError(true);
      showAlert("Please enter your password.", "danger");
      return;
    }

    try {
      let response;
      if (role === "developer") {
        response = await axios.post("https://talentbridge-backend.onrender.com/api/auth/developer/login", {
          email,
          password,
        });
        localStorage.setItem("developerId", response.data.developerId);
      } else {
        response = await axios.post("https://talentbridge-backend.onrender.com/api/auth/company/login", {
          email,
          password,
        });
        localStorage.setItem("companyId", response.data.companyId);
      }

      showAlert(response.data.message, "success");

      setTimeout(() => {
        navigate(role === "developer" ? "/developer/dashboard" : "/company/dashboard");
      }, 1000);
    } catch (error) {
      showAlert(error.response?.data?.message || "Login failed. Please try again.", "danger");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showAlert("Please enter your email.", "danger");
      return;
    }

    try {
      const response = await axios.post("https://talentbridge-backend.onrender.com/api/auth/forgot-password", {
        email,
        type: role,
      });

      showAlert(response.data.message, "success");

      setTimeout(() => {
        showAlert("Didn't receive the email? Click 'Send Reset Link' again.", "info");
      }, 7000);
    } catch (error) {
      const msg =
        error.response?.status === 404 && error.response?.data?.message === "User not found"
          ? "The email you entered doesn't exist in our records."
          : error.response?.data?.message || "Failed to send reset link.";
      showAlert(msg, "danger");
    }
  };

  const showAlert = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 7000);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>

        {/* Role Toggle */}
        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn me-2 ${role === "developer" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setRole("developer")}
          >
            Developer
          </button>
          <button
            className={`btn ${role === "company" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setRole("company")}
          >
            Company
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="invalid-feedback">Please enter your email.</div>}
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${passwordError ? "is-invalid" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="invalid-feedback">Please enter your password.</div>}
        </div>

        {/* Login Button */}
        <div className="d-grid">
          <button className="btn btn-success" onClick={handleLogin}>
            Login
          </button>
        </div>

        {/* Message Display */}
        {showMessage && (
          <div className={`alert alert-${messageType} mt-3`} role="alert">
            {message}
          </div>
        )}

        {/* Forgot Password */}
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => setShowForgotPassword((prev) => !prev)}
          >
            Forgot Password?
          </button>
        </div>

        {/* Forgot Password Section */}
        {showForgotPassword && (
          <div className="mt-3">
            <h5>Reset Your Password</h5>
            <button className="btn btn-outline-secondary mt-2" onClick={handleForgotPassword}>
              Send Reset Link
            </button>
          </div>
        )}

        {/* Signup Link */}
        <div className="text-center mt-4">
          <p>
            New here? <Link to="/signup">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
