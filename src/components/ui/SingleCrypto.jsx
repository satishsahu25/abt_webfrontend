// CryptoTradingUI.jsx
import React, { useEffect, useState } from 'react';
import './CryptoTradingUI.css';

export default function CryptoTradingUI() {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [btcAmount, setBtcAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
      .then(res => res.json())
      .then(data => {
        setPrice(data.bitcoin.usd);
        setChange(data.bitcoin.usd_24h_change);
      });
  }, []);

  const handleBtcChange = (e) => {
    const btc = parseFloat(e.target.value);
    setBtcAmount(btc);
    setUsdAmount(btc * price);
  };

  const handleUsdChange = (e) => {
    const usd = parseFloat(e.target.value);
    setUsdAmount(usd);
    setBtcAmount(usd / price);
  };

  return (
    <div className="crypto-ui">
      <div className="price-panel">
        <h1><img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="BTC" className="btc-icon" /> Bitcoin Price (BTC) <span className="tag">HOT</span></h1>
        <p>BTC to <span className="green">USD</span>: 1 Bitcoin equals <strong>${price?.toLocaleString()}</strong> USD <span className={change > 0 ? 'green' : 'red'}>{change?.toFixed(2)}%</span></p>
        <div className="timeframes">
          <button>1D</button>
          <button>7D</button>
          <button>1M</button>
          <button>3M</button>
          <button>1Y</button>
          <button>YTD</button>
        </div>
        <div className="chart-placeholder">[Chart Here]</div>
      </div>

      <div className="order-box">
        <div className="order-tabs">
          <button className="active">Buy BTC</button>
          <button>Trade BTC</button>
        </div>
        <div className="input-group">
          <label>You Buy</label>
          <div className="input-row">
            <input type="number" value={btcAmount} onChange={handleBtcChange} />
            <span className="token-label">BTC</span>
          </div>
          <p className="conversion">1 BTC ≈ USD {price?.toLocaleString()}</p>
        </div>

        <div className="input-group">
          <label>You Spend</label>
          <div className="input-row">
            <input type="number" value={usdAmount} onChange={handleUsdChange} />
            <span className="token-label">USD</span>
          </div>
          <p className="range">10 - 50,000</p>
        </div>

        <button className="buy-button">Buy BTC</button>
      </div>
    </div>
  );
}
