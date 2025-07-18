import React from "react";
import ProgressBar from "./ProgressBar";

export default function Credential({
  name, setName,
  email, setEmail,
  password, setPassword,
  onBack, 
  // onSubmit,
  onNext
}) {
  const isValid =
    name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length >= 10;

  return (
    <form onSubmit={e => { e.preventDefault(); onNext(); }}>
      <div className="signup-title">Enter your details</div>
      <div className="signup-field-desc">Enter your first and last name as they appear on your government ID.</div>
      <div className="signup-field">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="signup-field">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="signup-field">
        <input
          type="password"
          placeholder="Password (at least 10 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={1}
          required
        />
        <p className="signup-field-desc ">Minimum 8 length password required</p>
      </div>
      <ProgressBar progress={20} />
      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          className="signup-continue"
          style={{ background: "#222", color: "#fff" }}
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="submit"
          className="signup-continue"
          disabled={!isValid}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
