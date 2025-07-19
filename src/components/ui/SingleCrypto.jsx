// === React Component (CryptoTradingUI.jsx) ===
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import './SingleCrypto.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const API_KEY = 'demo'; // Replace with real API key for production

export default function CryptoTradingUI() {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [btcAmount, setBtcAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [timeframe, setTimeframe] = useState('30D');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_24hr_change=true')
      .then(res => res.json())
      .then(data => {
        setPrice(data.bitcoin.eur);
        setChange(data.bitcoin.eur_24h_change);
      });
  }, []);

  useEffect(() => {
    const fetchBTCData = async () => {
      const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const series = data['Time Series (Digital Currency Daily)'];
      if (!series) return;

      const dates = Object.keys(series).sort((a, b) => new Date(a) - new Date(b));
      const close = dates.map(date => parseFloat(series[date]['4. close']));

      let filteredDates = dates;
      let filteredClose = close;

      if (timeframe === '7D') {
        filteredDates = dates.slice(-7);
        filteredClose = close.slice(-7);
      } else if (timeframe === '1M') {
        filteredDates = dates.slice(-30);
        filteredClose = close.slice(-30);
      } else if (timeframe === '3M') {
        filteredDates = dates.slice(-90);
        filteredClose = close.slice(-90);
      } else if (timeframe === '1Y') {
        filteredDates = dates.slice(-365);
        filteredClose = close.slice(-365);
      }

      setChartData({
        labels: filteredDates,
        datasets: [
          {
            label: `BTC/EUR Close Price`,
            data: filteredClose,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      });
    };

    fetchBTCData();
  }, [timeframe]);

  const handleBtcBuy=()=>{
    alert("bitcoin bought")
  }

  const handleBtcChange = (e) => {
    const btc = parseFloat(Number(e.target.value));
    setBtcAmount(btc);
    setUsdAmount(btc * price);
  };

  const handleUsdChange = (e) => {
    const usd = parseFloat(Number(e.target.value));
    setUsdAmount(usd);
    setBtcAmount(usd / price);
  };

  return (
    <div className="crypto-ui">
      <div className="price-panel">
        <h1>
          <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="BTC" className="btc-icon" />
          Bitcoin Price (BTC) <span className="tag">HOT</span>
        </h1>
        <p>
          BTC to <span className="green">EUR</span>: 1 Bitcoin equals <strong>€{price?.toLocaleString()}</strong>
          <span className={change > 0 ? 'green' : 'red'}>{change?.toFixed(2)}%</span>
        </p>

        <div className="timeframes">
          {["7D", "1M", "3M", "1Y"].map(tf => (
            <button
              key={tf}
              className={tf === timeframe ? 'active' : ''}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="chart-container">
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="order-box">
        <div className="order-tabs">
          <button className="active">Buy BTC</button>
          <button>Trade BTC</button>
        </div>
        <div className="input-group">
          <label>You Buy</label>
          <div className="input-row">
            <input type="text" value={btcAmount} onChange={handleBtcChange} />
            <span className="token-label">BTC</span>
          </div>
          <p className="conversion">1 BTC ≈ EUR {price?.toLocaleString()}</p>
        </div>

        <div className="input-group">
          <label>You Spend</label>
          <div className="input-row">
            <input type="text" value={usdAmount} onChange={handleUsdChange} />
            <span className="token-label">EUR</span>
          </div>
          <p className="range">10 - 50,000</p>
        </div>

        <button className="buy-button" onClick={handleBtcBuy}>Buy BTC</button>
      </div>
    </div>
  );
}
