// ReportSelector.jsx
import React from 'react';
import './Reports.css';
import { ArrowRight } from 'lucide-react';

const ReportSelector = () => {
  const reports = {
    'Profit & Loss': ['Stocks P&L', 'Dividend report'],
    'Tax': [
      'Mutual Funds - ELSS statement',
      'Mutual Funds - Capital gains',
      'Stocks - Capital gains',
      'F&O - Tax report',
      'GST invoice'
    ]
  };

  return (
    <div className="report-container">
      <div className="report-sidebar">
        {Object.entries(reports).map(([category, items]) => (
          <div className="report-section" key={category}>
            <h3>{category}</h3>
            {items.map((item, idx) => (
              <div className="report-item" key={idx}>
                {item}
                <ArrowRight size={16} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="report-placeholder">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6338/6338210.png"
          alt="click indicator"
          className="click-indicator"
        />
        <p>Select a report to get started</p>
      </div>
    </div>
  );
};

export default ReportSelector;
