import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("developer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = [];

    if (!formData.fullName) {
      errors.push(role === "developer" ? "Full name is required." : "Company name is required.");
    }
    if (!formData.email) {
      errors.push("Email is required.");
    }
    if (!formData.password) {
      errors.push("Password is required.");
    }
    if (role === "developer" && !formData.phoneNumber) {
      errors.push("Phone number is required.");
    }

    if (errors.length > 0) {
      setMessage(errors.join(" "));
      setMessageType("danger");
      setShowMessage(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const apiUrl =
      role === "developer"
        ? "https://talentbridge-backend.onrender.com/api/auth/developer/signup"
        : "https://talentbridge-backend.onrender.com/api/auth/company/signup";

    const payload =
      role === "developer"
        ? formData
        : { name: formData.fullName, email: formData.email, password: formData.password };

    try {
      const response = await axios.post(apiUrl, payload);

      if (role === "developer") {
        localStorage.setItem("developerId", response.data.developerId);
      } else {
        localStorage.setItem("companyId", response.data.companyId);
      }

      setMessage(response.data.message);
      setMessageType("success");
      setShowMessage(true);

      setTimeout(() => {
        navigate(role === "developer" ? "/developer/dashboard" : "/company/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed!");
      setMessageType("danger");
      setShowMessage(true);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-3">Sign Up to <span className="text-primary">TalentBridge</span></h2>

            {/* Role Toggle */}
            <div className="d-flex justify-content-center mb-4 gap-3">
              <button
                type="button"
                className={`btn btn-sm ${role === "developer" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setRole("developer")}
              >
                Developer
              </button>
              <button
                type="button"
                className={`btn btn-sm ${role === "company" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setRole("company")}
              >
                Company
              </button>
            </div>

            {/* Message Alert */}
            {showMessage && (
              <div className={`alert alert-${messageType}`} role="alert">
                {message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder={role === "developer" ? "Full Name" : "Company Name"}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {role === "developer" && (
                <div className="mb-3">
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-primary fw-medium">
                Go to Login Page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
