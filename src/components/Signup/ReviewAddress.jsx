import React from "react";
import "./ReviewAddress.css";
import ProgressBar from "./ProgressBar";

export default function ReviewAddress({ address, onConfirm, onEdit }) {
    address="Google NYC - 9th Avenue. 111 8th Ave, New York, NY 10011";
  return (
    <div className="review-address-container">
      <div className="review-address-title">Review your residential address</div>
      <div className="review-address-subtitle">
        We couldn't verify the address you entered. Can you confirm it looks correct?
      </div>
      <hr className="review-address-divider" />
      <div className="review-address-label">You entered</div>
      <div className="review-address-value">{address}</div>
      <ProgressBar progress={30} />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                className="signup-continue"
                style={{ background: "#222", color: "#fff" }}
               onClick={onEdit}
              >
               Edit address
              </button>
              <button type="submit" className="signup-continue" onClick={onConfirm} disabled={false}>
               Confirm address
              </button>
    
    </div>
    </div>
  );
}
