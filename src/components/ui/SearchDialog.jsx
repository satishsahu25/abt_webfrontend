import React, { useEffect, useRef, useState } from "react";
import "./SearchDialog.css";

// const API_KEY = "D1a5iihr01qltimvbc6gd1a5iihr01qltimvbc70"; // Replace this
const STOCK_LIST_URL = "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=d1a5iihr01qltimvbc6gd1a5iihr01qltimvbc70";
// const STOCK_LIST_URL = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`;
const RECENT_KEY = "recentStocks";
const MAX_RECENT = 5;
const PAGE_SIZE = 50;

export default function SearchDialog({ open, onClose, onSelect }) {
  const inputRef = useRef();
  const listRef = useRef();

  const [query, setQuery] = useState("");
  const [allStocks, setAllStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [displayedStocks, setDisplayedStocks] = useState([]);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState(null);
  const [hasFocused, setHasFocused] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Load recent from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    setRecent(stored);
  }, []);

  // Reset when dialog opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setFilteredStocks([]);
      setDisplayedStocks([]);
      setPage(1);
      setHasFocused(false);
      inputRef.current?.focus();
    }
  }, [open]);

  // Fetch all stocks on focus
  const handleFocus = () => {
    if (hasFocused) return;
    setHasFocused(true);
    setLoading(true);

    fetch(STOCK_LIST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const sorted = data
          .filter((d) => d.symbol && d.description)
          .sort((a, b) => a.symbol.localeCompare(b.symbol));
        setAllStocks(sorted);
        setFilteredStocks(sorted);
        setDisplayedStocks(sorted.slice(0, PAGE_SIZE));
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  // Filter on every keystroke
  useEffect(() => {
    if (query === "") {
      setFilteredStocks(allStocks);
      setDisplayedStocks(allStocks.slice(0, PAGE_SIZE));
      setPage(1);
      return;
    }

    const filtered = allStocks.filter(
      (item) =>
        item.symbol.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredStocks(filtered);
    setDisplayedStocks(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  }, [query, allStocks]);

  // Infinite scroll
  const handleScroll = () => {
    if (query !== "") return; // only when not typing

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      const nextPage = page + 1;
      const nextItems = filteredStocks.slice(0, nextPage * PAGE_SIZE);
      setDisplayedStocks(nextItems);
      setPage(nextPage);
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    const updated = [item, ...recent.filter((x) => x.symbol !== item.symbol)];
    const sliced = updated.slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(sliced));
    setRecent(sliced);
  };

  if (!open) return null;

  return (
    <div className="sd-backdrop" onClick={onClose}>
      <div className="sd-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="sd-header">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search stocks..."
            className="sd-input"
          />
        </div>

        {error && <div className="sd-error">Error: {error.message}</div>}

        {query === "" && recent.length > 0 && (
          <div className="sd-section">
            <h4>Recently Viewed</h4>
            <ul className="sd-list">
              {recent.map((item) => (
                <li
                  key={item.symbol}
                  className="sd-item"
                  onClick={() => handleSelect(item)}
                >
                  {item.symbol} — {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="sd-section" ref={listRef} onScroll={handleScroll}>
          <h4>{query ? `Results for “${query}”` : "All Stocks"}</h4>
          <ul className="sd-list">
            {displayedStocks.map((item) => (
              <li
                key={item.symbol}
                className="sd-item"
                onClick={() => handleSelect(item)}
              >
                {item.symbol} — {item.description}
              </li>
            ))}
            {loading && <li className="sd-item">Loading…</li>}
            {!loading && displayedStocks.length === 0 && (
              <li className="sd-no-results">No stocks found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
