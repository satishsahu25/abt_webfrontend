import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, Sun, Moon } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StockList from "./StockListComponent";

const filters = ["All", "Stocks", "F&O", "Mutual Funds", "ETF", "FAQs"];

export default function Home() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [stocks, setStocks] = useState([]);
  // const [darkMode, setDarkMode] = useState(false);

  const apiKey = "d1a5iihr01qltimvbc6gd1a5iihr01qltimvbc70";
  // https://finnhub.io/api/v1/search?q=$query&token=$apiKey
  // https://finnhub.io/api/v1/stock/symbol?exchange=US&token=$apiKey
  const AllStocksSymbolURL = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`;

  useEffect(() => {
    fetch(AllStocksSymbolURL)
      .then((res) => res.json())
      .then((data) =>
        setStocks(data.slice(0, 20).map((item) => item.description))
      )
      .catch((err) => console.error(err));
  }, []);

  console.log(stocks);
  const filteredStocks = stocks.filter((stock) =>
    stock.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#fff",
        // background: darkMode ? "#111" : "#fff",
        color: "#000",
        // color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Groww your wealth
        </h1>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            onClick={() => setDarkMode(!darkMode)}
            style={{
              border: "1px solid gray",
              padding: "0.5rem",
              background: "transparent",
              cursor: "pointer",
            }}
          > */}
          {/* {darkMode ? <Sun size={20} /> : <Moon size={20} />} */}
          {/* </button> */}
          <Link to="/login">
            <button
              style={{
                background: "#16a34a",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={{
                background: "#16a34a",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Sign up
            </button>
          </Link>
        </div>
      </header>

      <p
        style={{
          fontSize: "1.25rem",
          color: "#555",
          // color: darkMode ? "#ccc" : "#555",
          marginBottom: "1.5rem",
        }}
      >
        Built for a Growwing India
      </p>
      <button
        style={{
          background: "#22c55e",
          padding: "0.75rem 1.5rem",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
        onClick={() => alert("Get Started Clicked")}
      >
        Get started
      </button>

      <div
        style={{ maxWidth: "768px", margin: "0 auto", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid gray",
            borderRadius: "9999px",
            padding: "0.5rem 1rem",
            background: "#fff",
            // background: darkMode ? "#333" : "#fff",
            cursor: "text",
          }}
          onClick={() => setSearchActive(true)}
        >
          <Search size={20} style={{ marginRight: "0.5rem", color: "#666" }} />
          <input
            placeholder="Search Groww..."
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              flex: 1,
              color: "#000",
              // color: darkMode ? "#fff" : "#000",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            readOnly={!searchActive}
          />
        </div>

        {searchActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "3rem",
              left: 0,
              width: "100%",
              background: "#fff",
              // background: darkMode ? "#333" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {filters.map((filter) => (
                  <button
                    key={filter}
                    style={{
                      padding: "0.5rem 1rem",
                      border:
                        selectedFilter === filter ? "none" : "1px solid gray",
                      background:
                        selectedFilter === filter ? "#22c55e" : "transparent",
                      color:
                        selectedFilter === filter
                          ? "white"
                          // : darkMode
                          // ? "#ddd"
                          : "#333",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSearchActive(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
              
                Popular on AbusinessTech
              </h4>
              <StockList
                stocks={filteredStocks}
                // darkMode={darkMode}
                onStockClick={(stock) => console.log("Clicked:", stock)}
              />
            </div>
          </motion.div>
        )}
      </div>

      <div style={{ marginTop: "4rem" }}>
        <img
          src="https://www.investopedia.com/thmb/4Rss8zsGoyphXgkDa_2LLFgh9YA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/INV_RobinhoodLogo_GettyImages-1237892801-3778fcd8e99949f4a95de4bb74f1281d.jpg"
          alt="Illustration"
          style={{
            width: "100%",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
  );
}
