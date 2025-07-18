import React, { useState } from "react";
import "./DateofBirth.css";
import ProgressBar from "./ProgressBar";

export default function DateofBirth({ onNext }) {
  const [dob, setDob] = useState("");

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleContinue = () => {
    // Implement your continue logic here
    console.log("Date of Birth:", dob);
  };

  return (
    <div
      className="otp-container"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2>Enter your Date of Birth</h2>
      <div className="dobdiv">
      <input
        type="date"
        value={dob}
        onChange={handleDobChange}
        className="dob-input"
      />      
      </div>
  
    <div className="btndiv">
          <button onClick={onNext} className="continue-button">
        Continue
      </button>
    </div>

      <ProgressBar progress={30} />
      <div style={{ display: "flex", gap: 10 }}>{/* <div>back</div> */}</div>
    </div>
  );
}
