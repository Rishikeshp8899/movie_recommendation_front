import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './Login.css'; // Assuming you have a CSS file for styling
import ApiCall from "../service/ApiCall";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CheckResp } from "../auth/CheckResp";

export default function Login() {
  const navigate = useNavigate();
const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle normal login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
            const result = await ApiCall({
      apiname: "LOGIN",
      userData: {
        username: formData.username,
        password: formData.password
      }
    });
    if (!CheckResp({ response: result })) {
      console.error("Invalid token");
      return;
    }
    console.log("Login success:", result.data.token);
    localStorage.setItem("token", result.data.token);
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoading(false);
     navigate("/login");
    }
    setLoading(false);
    navigate("/home");
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    console.log("Google login success:", credentialResponse);
    // Send credentialResponse.credential to backend for verification
  };

  const handleGoogleLoginError = () => {
    console.error("Google login failed");
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-card col-10 col-sm-6 col-md-4">
          <h2 className="text-center peacock-text mb-4">Login</h2>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
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

            <button
              type="submit"
              className="btn peacock-btn w-100 mt-3 border-info bg-gradient text-info"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-3  text-info">
            <span>or</span>
          </div>

          {/* Google Login */}
          <div className="d-flex justify-content-center mb-3">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>

          {/* Register Link */}
          <div className="text-center  text-info">
            <span>
              Don’t have an account?{" "}
              <a href="/register" className="peacock-text">
                Register
              </a>
            </span>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
