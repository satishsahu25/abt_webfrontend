import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="https://groww.in/logo-groww.svg"
            alt="Groww Logo"
            className="footer-logo"
          />
          <address>
            Vaishnavi Tech Park, South Tower, 3rd Floor<br />
            Sarjapur Main Road, Bellandur, Bengaluru – 560103<br />
            Karnataka
          </address>
          <div className="social-icons">
            <i className="fab fa-x-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>GROWW</h4>
            <ul>
              <li>About Us</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Media & Press</li>
              <li>Careers</li>
              <li>Help & Support</li>
              <li>Trust & Safety</li>
            </ul>
          </div>

          <div>
            <h4>PRODUCTS</h4>
            <ul>
              <li>Stocks</li>
              <li>F&O</li>
              <li>MTF</li>
              <li>ETF</li>
              <li>IPO</li>
              <li>Credit</li>
              <li>Mutual Funds</li>
              <li>Groww Terminal</li>
              <li>Stocks Screener</li>
              <li>Algo Trading</li>
              <li>Commodities</li>
              <li>Groww Digest</li>
              <li>Demat Account</li>
              <li>Groww AMC</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-tabs">
          <div>Share Market</div>
          <div>Indices</div>
          <div>F&O</div>
          <div>Mutual Funds</div>
          <div>Funds By Groww</div>
          <div>Calculators</div>
          <div>IPO</div>
          <div>Miscellaneous</div>
        </div>

        <div className="footer-resources">
          <ul>
            <li>Top Gainers Stocks</li>
            <li>52 Weeks High Stocks</li>
            <li>Tata Motors</li>
            <li>NHPC</li>
            <li>ITC</li>
          </ul>
          <ul>
            <li>Top Losers Stocks</li>
            <li>52 Weeks Low Stocks</li>
            <li>IREDA</li>
            <li>State Bank of India</li>
            <li>Adani Power</li>
          </ul>
          <ul>
            <li>Most Traded Stocks</li>
            <li>Stocks Market Calender</li>
            <li>Tata Steel</li>
            <li>Tata Power</li>
            <li>Bharat Heavy Electricals</li>
          </ul>
          <ul>
            <li>Stocks Feed</li>
            <li>Suzlon Energy</li>
            <li>Zomato (Eternal)</li>
            <li>Yes Bank</li>
            <li>Infosys</li>
          </ul>
          <ul>
            <li>FII DII Activity</li>
            <li>IRFC</li>
            <li>Bharat Electronics</li>
            <li>HDFC Bank</li>
            <li>Vedanta</li>
          </ul>
        </div>

        <div className="version">Version: 6.3.9</div>
        <p style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "1rem" }}>
          © 2016–2025 Groww. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
