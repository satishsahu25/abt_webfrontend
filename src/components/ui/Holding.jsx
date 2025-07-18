// HoldingsDashboard.jsx
import React from "react";
import "./HoldingsDashboard.css";

const holdings = [
  {
    company: "SJVN",
    shares: 1,
    avgPrice: 116.75,
    currentPrice: 97.61,
    change: -0.69,
    percentChange: -0.70,
    returnValue: -19.14,
    returnPercent: 16.39,
  },
  {
    company: "Bank of Baroda",
    shares: 1,
    avgPrice: 270.4,
    currentPrice: 238.84,
    change: -2.29,
    percentChange: -0.95,
    returnValue: -31.56,
    returnPercent: 11.67,
  },
  {
    company: "IRFC",
    shares: 1,
    avgPrice: 154.9,
    currentPrice: 137.13,
    change: -0.46,
    percentChange: -0.33,
    returnValue: -17.77,
    returnPercent: 11.47,
  },
  {
    company: "Tata Steel",
    shares: 2,
    avgPrice: 143.2,
    currentPrice: 160.66,
    change: 1.66,
    percentChange: 1.04,
    returnValue: 34.92,
    returnPercent: 12.19,
  },
];

export default function HoldingsDashboard() {
  return (
    <div className="holdings-dashboard">
      <div className="holdings-summary">
        <h2>Holdings (11)</h2>
        <div className="summary-card">
          <div>
            <p>Current value</p>
            <h3>₹3,338</h3>
          </div>
          <div>
            <p>Invested value</p>
            <h3>₹4,062</h3>
          </div>
          <div>
            <p>1D returns</p>
            <h4 className="red">-₹0.52 (0.02%)</h4>
          </div>
          <div>
            <p>Total returns</p>
            <h4 className="red">-₹723.78 (17.82%)</h4>
          </div>
          <button className="analyze-btn">📈 Analyse</button>
        </div>
      </div>

      <div className="holdings-table">
        <div className="table-header">
          <span>Company</span>
          <span>Market price (1D%)</span>
          <span>Returns (%)</span>
          <span>Current (Invested)</span>
        </div>
        {holdings.map((h, idx) => (
          <div className="table-row" key={idx}>
            <div>
              <strong>{h.company}</strong>
              <p>{h.shares} share • Avg. ₹{h.avgPrice}</p>
            </div>
            <div>
              <strong>₹{h.currentPrice}</strong>
              <p className={h.change < 0 ? "red" : "green"}>
                {h.change} ({h.percentChange}%)
              </p>
            </div>
            <div>
              <strong className={h.returnValue < 0 ? "red" : "green"}>
                {h.returnValue > 0 ? "+" : ""}₹{h.returnValue}
              </strong>
              <p>{h.returnPercent}%</p>
            </div>
            <div>
              <strong>₹{h.currentPrice}</strong>
              <p>₹{h.avgPrice}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="select-prompt">
        <div className="pointer-box">
          <div className="pointer-icon">🖱️</div>
          <p>Select a stock to get started</p>
        </div>
        <div className="balance">
          <span>📆 Balance: ₹0.00</span>
          <span className="add-money">Add money</span>
        </div>
      </div>
    </div>
  );
}