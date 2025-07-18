import React, { useState } from "react";
import "./Login.css"; // for custom styles

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      {/* Left side image */}
      <div className="login-image" />
      {/* <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_bW2zTMTV24WXwMzcnwA9J3_Z7i_1VMxrg&s"
        // style={{ width: "100%", height: "100%", objectFit: "cover" }}
        // alt="Image"
      /> */}

      {/* Right side form */}
      <div className="login-form">
        <h2>Log in to Robinhood</h2>

        <label>Email</label>
        <div className="input-wrapper">
          <input type="email" placeholder="you@example.com" />
          <img
            src="https://via.placeholder.com/20?text=↓"
            alt="dropdown"
            className="input-icon"
          />
        </div>

        <label>Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="icon-button"
            type="button"
          >
            👁️
          </button>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="stayLoggedIn" defaultChecked />
          <label htmlFor="stayLoggedIn">
            Keep me logged in for up to 30 days
          </label>
        </div>

        <div className="info-box">
          Only select this option if you trust this device and are not logging
          on from a shared computer.
        </div>

        <div className="login-actions">
          <button className="btn btn-primary">Log In</button>
          <button className="btn btn-outline">Help</button>
        </div>

        <div className="divider">or</div>

        <button className="btn btn-passkey">🔒 Log in with passkeys</button>

        <p className="signup-note">
          Not on Robinhood? <a href="#">Create an account</a>
        </p>
      </div>
    </div>
  );
}
