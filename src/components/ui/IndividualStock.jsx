// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
// } from "chart.js";
// import "./IndividualStock.css";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// const API_KEY = "4I7A2D6H4H1THG4D";

// export default function IndividualStock({ symbol = "RELIANCE.BSE", onBack }) {
//   const [profile, setProfile] = useState(null);
//   const [quote, setQuote] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const [priceInput, setPriceInput] = useState("");
//   const [qtyInput, setQtyInput] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Fetch company overview
//         const overviewRes = await axios.get(
//           `https://www.alphavantage.co/query`,
//           {
//             params: {
//               function: "OVERVIEW",
//               symbol,
//               apikey: API_KEY,
//             },
//           }
//         );

//         // Fetch stock price quote
//         const quoteRes = await axios.get(
//           `https://www.alphavantage.co/query`,
//           {
//             params: {
//               function: "GLOBAL_QUOTE",
//               symbol,
//               apikey: API_KEY,
//             },
//           }
//         );

//         // Fetch daily stock prices
//         const chartRes = await axios.get(
//           `https://www.alphavantage.co/query`,
//           {
//             params: {
//               function: "TIME_SERIES_DAILY",
//               symbol,
//               outputsize: "compact",
//               apikey: API_KEY,
//             },
//           }
//         );

//         const overview = overviewRes.data;
//         const quoteData = quoteRes.data["Global Quote"];
//         const timeSeries = chartRes.data["Time Series (Daily)"];

//         if (overview && quoteData && timeSeries) {
//           setProfile(overview);
//           setQuote({
//             price: parseFloat(quoteData["05. price"]),
//             change: parseFloat(quoteData["09. change"]),
//             percent: parseFloat(quoteData["10. change percent"]),
//           });

//           const labels = Object.keys(timeSeries).reverse();
//           const prices = labels.map((date) => parseFloat(timeSeries[date]["4. close"]));

//           setChartData({
//             labels,
//             datasets: [
//               {
//                 label: "Price",
//                 data: prices,
//                 borderColor: "#28a745",
//                 fill: false,
//               },
//             ],
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching data", err);
//       }
//     }

//     fetchData();
//   }, [symbol]);

//   if (!profile || !quote || !chartData) {
//     return <div className="loading">Loading stock data...</div>;
//   }

//   const isPositive = quote.change >= 0;

//   return (
//     <div className="stock-detail-container">
//       <div className="left-panel">
//         <div className="stock-header">
//           <h2>{profile.Name || symbol}</h2>
//           <small>{profile.Industry}</small>
//         </div>
//         <div className="stock-price">₹{quote.price.toFixed(2)}</div>
//         <div className={`stock-change ${isPositive ? "positive" : "negative"}`}>
//           {isPositive ? "+" : ""}
//           {quote.change.toFixed(2)} ({quote.percent})
//         </div>

//         <div className="stock-chart">
//           <Line data={chartData} />
//         </div>

//         <button className="back-button" onClick={onBack}>
//           ← Back
//         </button>
//       </div>

//       <div className="right-panel">
//         <h3>Buy {profile.Name}</h3>

//         <div className="mode-buttons">
//           <button>Delivery</button>
//           <button>Intraday</button>
//           <button>MTF</button>
//         </div>

//         <label>Qty:</label>
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={qtyInput}
//           onChange={(e) => setQtyInput(e.target.value)}
//         />

//         <label>Price Limit:</label>
//         <input
//           type="number"
//           placeholder="Eg: 554.4"
//           value={priceInput}
//           onChange={(e) => setPriceInput(e.target.value)}
//         />

//         <div className="price-info">
//           <span>Balance:</span> <span>₹0</span>
//         </div>
//         <div className="price-info">
//           <span>Approx req.:</span> <span>₹{priceInput * qtyInput || 0}</span>
//         </div>

//         <button className="buy-button">Buy</button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import "./IndividualStock.css";
import { useLocation } from 'react-router-dom';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const API_KEY = "4I7A2D6H4H1THG4D"; // Replace with your own Alpha Vantage key if needed

export default function IndividualStock({ symbol = "TCS.BSE", onBack }) {
// export default function IndividualStock({ symbol = "RELIANCE.BSE", onBack }) {
  const [profile, setProfile] = useState(null);
  const [quote, setQuote] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");

  const location = useLocation();
  
    console.log("Current pathname:", location.pathname);   
    console.log("Search params:", location.search);     
    console.log("Hash:", location.hash);    
  

  useEffect(() => {
    async function fetchData() {
      try {
        const [overviewRes, quoteRes, chartRes] = await Promise.all([
          axios.get("https://www.alphavantage.co/query", {
            params: {
              function: "OVERVIEW",
              symbol,
              apikey: API_KEY,
            },
          }),
          axios.get("https://www.alphavantage.co/query", {
            params: {
              function: "GLOBAL_QUOTE",
              symbol,
              apikey: API_KEY,
            },
          }),
          axios.get("https://www.alphavantage.co/query", {
            params: {
              function: "TIME_SERIES_DAILY",
              symbol,
              outputsize: "compact",
              apikey: API_KEY,
            },
          }),
        ]);

        const overview = overviewRes.data;
        const quoteData = quoteRes.data["Global Quote"];
        const timeSeries = chartRes.data["Time Series (Daily)"];

        console.log("Overview:", overview);
        console.log("Quote Data:", quoteData);
        console.log("Time Series:", timeSeries);

        if (
          overview?.Note ||
          quoteRes.data?.Note ||
          chartRes.data?.Note ||
          !quoteData?.["05. price"] ||
          !timeSeries
        ) {
          throw new Error("Alpha Vantage API limit hit or data missing");
        }

        setProfile(overview);
        setQuote({
          price: parseFloat(quoteData["05. price"]),
          change: parseFloat(quoteData["09. change"]),
          percent: quoteData["10. change percent"],
        });

        const labels = Object.keys(timeSeries).reverse();
        const prices = labels.map((date) =>
          parseFloat(timeSeries[date]["4. close"])
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Price",
              data: prices,
              borderColor: "#28a745",
              fill: false,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock data. Please try again later.");
      }
    }

    fetchData();
  }, [symbol]);

if (error) return <div className="error">{error}</div>;
if (!profile || !quote || !chartData) return <div className="loading">Loading stock data…</div>;


  const isPositive = quote.change >= 0;

  return (
    <div className="stock-detail-container">
      <div className="left-panel">
        <div className="stock-header">
          <h2>{profile.Name || symbol}</h2>
          <small>{profile.Industry}</small>
        </div>
        <div className="stock-price">₹{quote.price.toFixed(2)}</div>
        <div className={`stock-change ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? "+" : ""}
          {quote.change.toFixed(2)} ({quote.percent})
        </div>

        <div className="stock-chart">
          <Line data={chartData} />
        </div>

        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="right-panel">
        <h3>Buy {profile.Name}</h3>

        <div className="mode-buttons">
          <button>Delivery</button>
          <button>Intraday</button>
          <button>MTF</button>
        </div>

        <label>Qty:</label>
        <input
          type="number"
          placeholder="Quantity"
          value={qtyInput}
          onChange={(e) => setQtyInput(e.target.value)}
        />

        <label>Price Limit:</label>
        <input
          type="number"
          placeholder="Eg: 554.4"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />

        <div className="price-info">
          <span>Balance:</span> <span>₹0</span>
        </div>
        <div className="price-info">
          <span>Approx req.:</span>{" "}
          <span>₹{(priceInput * qtyInput || 0).toFixed(2)}</span>
        </div>

        <button className="buy-button">Buy</button>
      </div>
    </div>
  );
}
