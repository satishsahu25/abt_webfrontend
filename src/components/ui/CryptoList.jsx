// === React Component (CryptoDashboard.jsx) ===
import React, { useEffect, useState } from "react";
import "./CryptoList.css";
import {useNavigate} from 'react-router-dom'

const API_KEY = "d1a5iihr01qltimvbc6gd1a5iihr01qltimvbc70";
const PAGE_SIZE = 15;

const CryptoDashboard = () => {
  const [data, setData] = useState({ topTokens: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.topTokens.length / PAGE_SIZE);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchCryptoSymbols = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=${API_KEY}`
        );
        const result = await response.json();
        const only50 = result.slice(0, 50);

        const topTokens = only50.map((entry) => {
          const symbol = entry.symbol;
          const base = symbol.replace("BINANCE:", "").replace("BTC", "").toLowerCase();
          return {
            symbol: entry.symbol,
            name: entry.description,
            icon: `https://cryptoicon-api.vercel.app/api/icon/${base}`,
            price: (Math.random() * 1000 + 10).toFixed(2),
            change24h: (Math.random() * 10 - 5).toFixed(2),
            volume24h: (Math.random() * 1000).toFixed(2) + "M",
            marketCap: (Math.random() * 10000).toFixed(2) + "B",
          };
        });

        setData({ hot: topTokens.slice(0, 3),
          new: topTokens.slice(0, 3),
          gainers: topTokens.slice(0, 3).sort(() => Math.random() - 0.5),
          volume: topTokens.slice(0, 3),
          topTokens, });
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchCryptoSymbols();
  }, []);

  const Section = ({ title, items }) => (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      {items.map((item, index) => (
        <div key={index} className="section-item">
          <div className="section-symbol">
            <img src={item.icon} className="token-icon" />
            <span>
            {item.symbol.split(":")[1]}
            </span>
          </div>
          <div
            className={
              parseFloat(item.change24h) >= 0 ? "positive" : "negative"
            }
          >
            ${parseFloat(item.price).toFixed(2)} ({item.change24h}%)
          </div>
        </div>
      ))}
    </div>
  );

  const paginate = (tokens) => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return tokens.slice(start, start + PAGE_SIZE);
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const handleBtcProfile=()=>{
      navigate("/crypto/1")
  }

  return (
    <div className="dashboard-container">
    <h1 className="dashboard-title">Overview</h1>
      <div className="sections-wrapper">
        <Section title="Hot" items={data.hot} />
        <Section title="New" items={data.new} />
        <Section title="Top Gainer" items={data.gainers} />
        <Section title="Top Volume" items={data.volume} />
      </div>

      <h1 className="dashboard-title">Top Tokens by Market Capitalization</h1>
      <div className="table-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h Volume</th>
              <th>Market Cap</th>
              <th>Trend</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginate(data.topTokens).map((token, index) => (
              <tr key={index} onClick={handleBtcProfile}>
                <td className="name-cell">
                  <img src={token.icon} alt={token.symbol} className="token-icon" />
                  <div>
                    <strong>{token.symbol.split(":").pop()}</strong> {token.name}
                  </div>
                </td>
                <td>
                  {parseFloat(token.price).toFixed(4)}<br />
                  <small>${parseFloat(token.price).toFixed(2)}</small>
                </td>
                <td className={token.change24h >= 0 ? "positive" : "negative"}>{token.change24h}%</td>
                <td>${token.volume24h}</td>
                <td>${token.marketCap}</td>
                <td>
                  <button className="icon-btn" title="View Chart">📈</button>
                </td>
                <td>
                  <button className="icon-btn" title="Details">📊</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CryptoDashboard;