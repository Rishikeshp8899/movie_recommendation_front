import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./register.css"; // Using the same styling as login
import ApiCall from "../service/ApiCall";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Assuming you have a loading spinner component
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle register submit
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const result = await ApiCall({
        apiname: "REGISTER",
        userData: {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      });
      console.log("Register success:", result.data);
      navigate("/login");
      setLoading(false);
     
    } catch (error: any) {
      setLoading(false);
      console.error("Register failed:", error);
      navigate("/register");
    }
  };

  // Handle Google Register
  const handleGoogleRegisterSuccess = (credentialResponse: any) => {
    console.log("Google register success:", credentialResponse);
  };

  const handleGoogleRegisterError = () => {
    console.error("Google register failed");
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-card col-10 col-sm-6 col-md-4">
          <h2 className="text-center peacock-text mb-4">Register</h2>

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label peacock-text">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control bg-dark text-white"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label peacock-text">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control bg-dark text-white"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label peacock-text">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control bg-dark text-white"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label peacock-text">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control bg-dark text-white"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn peacock-btn w-100 mt-3 border-info bg-gradient text-info"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-3 text-info">
            <span>or</span>
          </div>

          {/* Google Register */}
          <div className="d-flex justify-content-center mb-3">
            <GoogleLogin
              onSuccess={handleGoogleRegisterSuccess}
              onError={handleGoogleRegisterError}
            />
          </div>

          {/* Login Link */}
          <div className="text-center text-info">
            <span>
              Already have an account?{" "}
              <a href="/login" className="peacock-text">
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );

}