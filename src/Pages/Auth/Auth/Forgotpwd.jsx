import axios from "axios";
import React, { useState } from "react";
import "./Fpwd.css";

function Forgotpwd() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlefpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8080/api/user/send-forgot-password-email", { email });
      setMessage("Reset link sent to your email!");
    } catch (err) {
      setMessage("Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Forgot Password</h1>
          <p>Enter your registered email</p>
        </div>

        <form onSubmit={handlefpSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button className="btn-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Forgotpwd;
