import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Fpwd.css"; 

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/reset-password",
        {
          token: token,
          newPassword: password,
        }
      );

      setMessage(response.data);
      setTimeout(() => {
        navigate("/login"); 
      }, 3000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing reset token.");
    }
  }, [token]);

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p className="subtitle">
          Enter your new password below to reset your account password
        </p>

        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{marginRight: "30px"}}>
            New Password 
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            style={{marginBottom: "30px"}}
           
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label" style={{marginRight: "10px"}}>
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default ResetPasswordPage;
