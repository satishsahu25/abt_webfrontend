import React from "react";
import "./ProfileDialog.css";
import { useNavigate } from "react-router-dom";

export default function ProfileDialog({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const logout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    navigate("/login");
    onClose();
  };

  return (
    <div className="profile-backdrop" onClick={onClose}>
      <div className="profile-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <h3>Satish Sahu</h3>
          <p>satishk7619@gmail.com</p>
        </div>

        <div className="profile-list">
          <div
            className="profile-item"
            onClick={() => alert("Balance page coming soon")}
          >
            <div className="item-main">₹0.00</div>
            <div className="item-sub">Stocks, F&O balance</div>
          </div>

          <div className="profile-item" onClick={() => handleNavigate("/orders")}>
            All Orders
          </div>

          <div className="profile-item" onClick={() => handleNavigate("/bank-details")}>
            Bank Details
          </div>

          <div className="profile-item" onClick={() => handleNavigate("/support")}>
            24 x 7 Customer Support
          </div>

          <div className="profile-item" onClick={() => handleNavigate("/reports")}>
            Reports
          </div>
        </div>

        <div className="profile-footer">
          <div className="profile-item logout" onClick={logout}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}
