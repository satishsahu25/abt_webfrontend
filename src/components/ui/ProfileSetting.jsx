// UserProfile.jsx
import React, { useState } from "react";
import "./ProfileSetting.css";
import { Settings } from "lucide-react";
import BasicDetails from "../ProfileComponent/BasicDetails";
import ReportSelector from "../ProfileComponent/Reports";
import PasswordUpdateForm from "../ProfileComponent/ChangePassword";
import ChangePin from "../ProfileComponent/ChangePin";

const UserProfile = () => {
  const [sectionnum, setsectionum] = useState(1);

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="avatar"
          />
          <h3>Satish Sahu</h3>
        </div>
        <ul className="sidebar-menu">
          <li className="active" onClick={()=>setsectionum(1)}>
            Basic Details <span>&gt;</span>
          </li>
          <li onClick={()=>setsectionum(2)}>
            Reports <span>&gt;</span>
          </li>
          <li onClick={()=>setsectionum(3)}>
            Change Password <span>&gt;</span>
          </li>
          <li onClick={()=>setsectionum(4)}>
            Change Groww PIN <span>&gt;</span>
          </li>
          <li onClick={()=>setsectionum(5)}>
            Trading controls <span>&gt;</span>
          </li>
          <li onClick={()=>setsectionum(6)}>
            Trading APIs <span>&gt;</span>
          </li>
        </ul>
      </aside>
      {sectionnum == 1 && <BasicDetails />}
      {
            sectionnum==2 && <ReportSelector/>
        }
        {
            sectionnum==3 && <PasswordUpdateForm/>
        }  {
            sectionnum==4 && <ChangePin/>
        }
    </div>
  );
};

export default UserProfile;
