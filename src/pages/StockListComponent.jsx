import React, { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function StockList({ stocks, onStockClick }) {

console.log(stocks)
  const Row = useCallback(
    ({ index, style }) => {
      const stock = stocks[index];
      return (
        <li
          key={stock.figi || stock.symbol}
          onClick={() => onStockClick && onStockClick(stock)}
          style={{
            ...style,
            padding: '0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            background:'#f9f9f9',
            marginBottom: '0.5rem',
            transition: 'background 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {/* <img
            src={`https://finnhub.io/api/logo?symbol=${stock.symbol}`}
            alt="logo"
            style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/200/300";
            }}
          /> */}
          <div>
            <div style={{ fontWeight: 'bold' }}>{stock.displaySymbol} — {stock.description}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>
              {stock.type} | {stock.currency}
            </div>
          </div>
        </li>
      );
    },
    [stocks, onStockClick]
  );

  if (!stocks.length) {
    return <div style={{ color: '#888' }}>No results found</div>;
  }

  return (
    <div style={{ height: '300px' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={stocks.length}
            itemSize={72}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}
