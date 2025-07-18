import React, { useState, useRef, useEffect } from "react";
import "./PhoneVerify.css";
import ProgressBar from "./ProgressBar";

export default function PhoneOtpVerify({
  phoneNumber = "+1 (212) 456-7890",
  onVerify,
  onSendbyText,
  onSendbyCall
}) {
  // const [otp, setOtp] = useState("");
  // const [sent, setSent] = useState(false);
  // const [timer, setTimer] = useState(0);
  // const [error, setError] = useState("");
  // const timerRef = useRef();



//   Start timer when OTP is sent
//   useEffect(() => {
//     if (sent && timer > 0) {
//       timerRef.current = setInterval(() => setTimer((t) => t - 1), 1000);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [sent, timer]);

//   Handle timer reaching zero
//   useEffect(() => {
//     if (timer === 0) clearInterval(timerRef.current);
//   }, [timer]);

  // Simulate sending OTP
  // const handleSendOtp = () => {
  //   setSent(true);
  //   setTimer(300); // 5 minutes
  //   // setOtp("");
  //   setError("");
  //   // TODO: Integrate with backend to actually send OTP
  // };

  // Simulate OTP verification
  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   if (otp.length !== 6) {
  //     setError("Please enter the 6-digit code.");
  //     return;
  //   }
  //   setError("");
  //   // TODO: Integrate with backend to verify OTP
  //   if (onVerify) onVerify(otp);
  // };

  return (
    <div className="otp-container">
      <div className="otp-title">Verify your phone number</div>
      <div className="otp-desc">
        We'll send you a six-digit code. It expires 5 minutes after you request
        it.
      </div>
      <div className="otp-number">{phoneNumber}</div>

      {/* {!true ? (
        <button className="otp-send-btn" >
          Send OTP
        </button>
      ) : (
        <form className="otp-form" >
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
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            disabled={timer === 0}
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
          >
            Verify
          </button>
          <button
            className="otp-resend-btn"
            type="button"
       
            disabled={timer > 0}
          >
            Resend code
          </button>
        </form>
      )} */}

      <div className="otp-privacy">
        You are consenting to be contacted at this phone number for the purpose
        of receiving a verification code. Message and data rates may apply. Your
        phone number will only be used consistent with our privacy policy and
        terms and conditions.
      </div>
      <ProgressBar progress={30} />
      <div style={{ display: "flex", gap: 10 }}>
      
      
      <div>
        back
      </div>
        <button
          type="button"
          className="signup-continue"
          style={{ background: "#222", color: "#fff" }}
          onClick={onSendbyText}
        >
          Send by call
        </button>
        <button
          type="submit"
          className="signup-continue"
          onClick={onSendbyCall}
          disabled={false}
        >
          Send by text
        </button>
      </div>
    </div>
  );
}
