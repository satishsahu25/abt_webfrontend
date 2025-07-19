// PasswordUpdateForm.jsx
import React, { useState } from 'react';
import './ChangePassword.css';
import { Eye, EyeOff } from 'lucide-react';

const ChangePin = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="password-form">
      <div className="form-group">
        <label>New Pin</label>
        <div className="input-wrapper">
          <input
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Pin"
          />
          <div className="icon-group">
            <img src="https://cdn-icons-png.flaticon.com/512/8832/8832154.png" alt="padlock" />
            <button type="button" onClick={() => setShowNew(!showNew)}>
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Confirm New Pin</label>
        <div className="input-wrapper">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Pin"
          />
          <div className="icon-group">
            <img src="https://cdn-icons-png.flaticon.com/512/8832/8832154.png" alt="padlock" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <button className="submit-btn">Update Pin</button>
    </div>
  );
};

export default ChangePin;