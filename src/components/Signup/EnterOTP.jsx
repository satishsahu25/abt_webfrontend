import React, { useState, useRef, useEffect } from "react";
import "./EnterOTP.css";
import ProgressBar from "./ProgressBar";

export default function EnterOTP({
  phoneNumber = "+1 (212) 456-7890",
  onNext,
}) {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    setSent(true);
    setTimer(300); // 5 minutes
    // setOtp("");
    setError("");
  });

  // Start timer when OTP is sent
  useEffect(() => {
    if (sent && timer > 0) {
      timerRef.current = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [sent, timer]);

  // Handle timer reaching zero
  useEffect(() => {
    if (timer === 0) clearInterval(timerRef.current);
  }, [timer]);

  //   // Simulate sending OTP
  //   const handleSendOtp = () => {
  //     setSent(true);
  //     setTimer(300); // 5 minutes
  //     setOtp("");
  //     setError("");
  //     // TODO: Integrate with backend to actually send OTP
  //   };

  // Simulate OTP verification
  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   if (otp.length !== 6) {
  //     setError("Please enter the 6-digit code.");
  //     return;
  //   }
  //   setError("");
  //   // TODO: Integrate with backend to verify OTP
  //   // if (onVerify) onVerify(otp);
  // };

  return (
    <div
      className="otp-container"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="otp-title">Verify your phone number</div>
      <div className="otp-desc">
        We have sent you a six-digit code. It will get expired 5 minutes.
      </div>
      <div className="otp-number">{phoneNumber}</div>

      <form className="otp-form">
        <label className="otp-label" htmlFor="otp-input">
          Enter 6-digit code
        </label>
        <input
          id="otp-input"
          className="otp-input"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={otp}
          onChange={
            (e) => setOtp(e.target.value)
            // (e) => setOtp(e.target.value.replace(/\D/g, ""))
          }
          // disabled={timer === 0}
          autoFocus
        />
        <div className="otp-timer">
          {timer > 0
            ? `Expires in ${Math.floor(timer / 60)}:${String(
                timer % 60
              ).padStart(2, "0")}`
            : "Code expired"}
        </div>
        {error && <div className="otp-error">{error}</div>}
        <button
          className="otp-verify-btn"
          type="submit"
          disabled={otp.length !== 6 || timer === 0}
          onClick={onNext}
        >
          Verify
        </button>
        <button className="otp-resend-btn" type="button" disabled={timer > 0}>
          Resend code
        </button>
      </form>

      <ProgressBar progress={30} />
      <div style={{ display: "flex", gap: 10 }}>
        <div>back</div>
      </div>
    </div>
  );
}
