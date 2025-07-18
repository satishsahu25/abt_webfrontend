import React, { useState } from 'react';
import './PanCardForm.css';
import { useNavigate } from 'react-router-dom';

export default function PanCardForm ()  {
  const [panCard, setPanCard] = useState('');
const navigate = useNavigate();
  const handlePanChange = (e) => {
    setPanCard(e.target.value.toUpperCase());
  };

  

  const Pancontinue = () => {
    // Add your validation or logic here, if necessary
    navigate('/stocks');
  };

  return (
    // <div className="pan-card-container">
      <div className="pan-card-container">
        <h2>Enter your PAN Card Number</h2>
        <p>Please make sure it matches exactly what's printed on your PAN Card.</p>

        <input
          type="text"
          value={panCard}
          placeholder="ABCDE1234F"
          maxLength={10}
          onChange={handlePanChange}
          className="pan-input"
        />

        <div className="pan-buttons">
          <button className="edit-btn" onClick={Pancontinue}>
            Continue
          </button>
        </div>
      </div>
    // </div>
  );
};


