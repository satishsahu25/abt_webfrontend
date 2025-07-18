// UserProfile.jsx
import React from "react";
import "./UserProfile.css";
import { FaCopy } from "react-icons/fa6";

const UserProfile = () => {
  const user = {
    name: "Satish Sahu",
    dob: "**/**/2002",
    mobile: "*****61412",
    email: "sat********9@gmail.com",
    fatherName: "Sri Ram Sahu",
    boid: "1208870244683130",
    pan: "******832G",
    gender: "Male",
    maritalStatus: "Single",
    clientCode: "7076980583",
    income: "Below 1 Lac",
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <img src="/avatar.png" alt="User Avatar" className="avatar" />
        <h2>{user.name}</h2>
        <ul>
          <li className="active">Basic Details</li>
          <li>Reports</li>
          <li>Change Password</li>
          <li>Change Groww PIN</li>
          <li>Trading controls</li>
          <li>Trading APIs</li>
        </ul>
      </aside>

      <section className="profile-details">
        <div className="column">
          <label>Name</label>
          <div className="value">{user.name} <FaCopy /></div>

          <label>Date of Birth (DD/MM/YYYY)</label>
          <div className="value">{user.dob}</div>

          <label>Mobile Number</label>
          <div className="value">{user.mobile}</div>

          <label>Email</label>
          <div className="value">{user.email}</div>

          <label>Father's Name</label>
          <div className="value">{user.fatherName}</div>

          <label>Demat Acc Number / BOID</label>
          <div className="value">{user.boid} <FaCopy /></div>
        </div>

        <div className="column">
          <label>PAN</label>
          <div className="value">{user.pan}</div>

          <label>Gender</label>
          <div className="value">{user.gender}</div>

          <label>Marital Status</label>
          <div className="value">{user.maritalStatus}</div>

          <label>Unique Client Code</label>
          <div className="value">{user.clientCode} <FaCopy /></div>

          <label>Income Range</label>
          <div className="value">{user.income}</div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
