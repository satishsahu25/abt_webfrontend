import React, { useEffect, useRef, useState } from "react";
import "./Stocks.css";
import { Link } from "react-router-dom";
import SearchDialog from "../components/ui/SearchDialog";
import { useNavigate } from "react-router-dom";
import ProfileDialog from "../components/ui/ProfileDialog";
import { useLocation } from 'react-router-dom';
import IndividualStock from "../components/ui/IndividualStock";


const INDEXES = [
  { label: "NIFTY", value: "25,355.25", change: -120.85, pct: 0.47 },
  { label: "SENSEX", value: "83,190.28", change: -345.8, pct: 0.41 },
  { label: "BANKNIFTY", value: "56,956.00", change: -257.55, pct: 0.45 },
  { label: "MIDCPNIFTY", value: "13,211.05", change: -80.8, pct: 0.61 },
  { label: "FINNIFTY", value: "26,984.00", change: -50.3, pct: 0.19 },
];

const MOST_TRADED = [
  {
    logo: "https://assets-netstorage.groww.in/stock-assets/logos2/MAMATA.png",
    name: "Mamata Machinery",
    price: "483.75",
    change: +70.8,
    pct: 17.14,
  },
  {
    logo: "https://assets-netstorage.groww.in/stock-assets/logos2/QualityPowerElectricalEquipmentsLtd_48177673_54766.png",
    name: "Quality Power Elect.",
    price: "808.45",
    change: +92.7,
    pct: 12.95,
  },
  {
    logo: "https://assets-netstorage.groww.in/stock-assets/logos2/BSE.webp",
    name: "BSE",
    price: "2,466.30",
    change: -57.5,
    pct: 2.28,
  },
  {
    logo: "https://assets-netstorage.groww.in/stock-assets/logos2/KIRLOSENG.webp",
    name: "Kirloskar Oil Engines",
    price: "918.10",
    change: +86.25,
    pct: 10.37,
  },
];

const TOOLS = [
  {
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/mint_ipo_light.svg",
    label: "IPO",
  },
  {
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/mtf_mint_light.svg",
    label: "MTF",
  },
  {
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/bond_mint_light.svg",
    label: "Bonds",
  },
  {
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/mint_intraday_light.svg",
    label: "Intraday",
  },
  {
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/mint_event_light.svg",
    label: "Events",
  },
  {
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/mint_screener_light.svg",
    label: "Screener",
  },
];

const WATCHLISTS = [
  { name: "Telecommunications", items: ["Airtel", "Reliance", "Vodafone"] },
  { name: "Food Industry", items: ["Nestle", "Britannia", "HUL", "ITC"] },
  {
    name: "Finance Companies",
    items: ["HDFC Bank", "ICICI Bank", "Kotak Bank"],
  },
];

export default function Stocks() {
  const [openWL, setOpenWL] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const apikey = "D1a5iihr01qltimvbc6gd1a5iihr01qltimvbc70";
  const navigator = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  console.log("Current pathname:", location.pathname);   
  console.log("Search params:", location.search);     
  console.log("Hash:", location.hash);    

  const toggleWL = (name) => {
    setOpenWL((o) => ({ ...o, [name]: !o[name] }));
  };

  const handleSelectSymbol = (symbolObj) => {
    console.log("User picked", symbolObj);
    setIsSearchOpen(false);
    // optionally navigate or place symbolObj.displaySymbol into your search field
    navigator(`/stocks/${symbolObj.displaySymbol}`);
  };

  return (
    <div className="dashboard">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="top-nav">
          <Link to="/stocks" className="logo">
            <img
              className="logo"
              src="https://cdn.prod.website-files.com/616850bf7aafb036f47e4d7d/616850bf7aafb0c1a67e4ddb_ABusiness_small_blue.png"
            />
          </Link>
          <nav className="main-links">
            <a href="#stocks" className="active">
              Stocks
            </a>
            <a href="#fo">F&O</a>
            <a href="#mf">Mutual Funds</a>
          </nav>

          <div className="utilities">
            <input
              className="search"
              placeholder="Search Groww…"
              onFocus={() => setIsSearchOpen(true)}
              onChange={() => setIsSearchOpen(true)}
            />
            <button className="terminal">Terminal</button>
            <button className="bell">
              🔔<span className="badge">5</span>
            </button>
          <button className="avatar" onClick={() => setIsProfileOpen(!isProfileOpen)}>👤</button>
          <ProfileDialog open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          </div>
        </div>

        <nav className="sub-nav">
          {["Explore", "Holdings", "Positions", "Orders", "Watchlist"].map(
            (tab) => (
              <a
                key={tab}
                href={"#" + tab.toLowerCase()}
                className={tab === "Explore" ? "active" : ""}
              >
                {tab}
              </a>
            )
          )}
        </nav>
      </header>

      {/* ===== INDEX BAR ===== */}
      <div className="indexes">
        {INDEXES.map((ix) => (
          <div className="index" key={ix.label}>
            <span className="label">{ix.label}</span>
            <span className="value">{ix.value}</span>
            <span className={ix.change >= 0 ? "pos" : "neg"}>
              {ix.change >= 0 ? "+" : ""}
              {ix.change.toFixed(2)} ({ix.pct.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      {
        location.pathname=="/stocks" ? (
           <div className="content">
        {/* — Left Column — */}
        <div className="left-col">
          <section className="most-traded">
            <header>
              <h2>Most Traded Stocks on Groww</h2>
              <a href="#see-more">See more</a>
            </header>
            <div className="cards">
              {MOST_TRADED.map((s) => (
                <div className="card" key={s.name}>
                  <img src={s.logo} alt={s.name} />
                  <p className="name">{s.name}</p>
                  <p className="price">₹{s.price}</p>
                  <p className={s.change >= 0 ? "pos" : "neg"}>
                    {s.change >= 0 ? "+" : ""}
                    {s.change.toFixed(2)} ({s.pct.toFixed(2)}%)
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="tools-section">
            <h2>Products &amp; tools</h2>
            <div className="tools">
              {TOOLS.map((t) => (
                <div className="tool" key={t.label}>
                  <img src={t.icon} alt={t.label} />
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* — Right Column — */}
        <div className="right-col">
          <section className="investments">
            <header>
              <h2>Your Investments</h2>
              <a href="#dashboard">Dashboard</a>
            </header>
            <div className="inv-cards">
              <div className="inv-card neg">
                <p>Total Returns</p>
                <strong>−₹724</strong>
              </div>
              <div className="inv-card pos">
                <p>Current Value</p>
                <strong>₹3,338</strong>
              </div>
            </div>
          </section>

          <section className="watchlists">
            <header>
              <h2>All watchlists</h2>
              <a href="#viewall">View all</a>
            </header>
            {WATCHLISTS.map((wl) => (
              <div className="watchlist" key={wl.name}>
                <div className="wl-header" onClick={() => toggleWL(wl.name)}>
                  <span>{wl.name}</span>
                  <span className="arrow">{openWL[wl.name] ? "▾" : "▸"}</span>
                </div>
                {openWL[wl.name] && (
                  <ul className="wl-items">
                    {wl.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
         ):(<IndividualStock symbol = "TCS.BSE" onBack={()=>{navigator("/stocks")}}/>)
      }
     
 
      <SearchDialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleSelectSymbol}
      />
    </div>
  );
}
