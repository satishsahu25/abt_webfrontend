import React from "react";
import ProgressBar from "./ProgressBar";

export default function Location({ region, setRegion, regions, onNext }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onNext(); }}>
      <div className="signup-title">Create your login</div>
      {/* <div className="signup-desc">
        After confirming your region, we'll need your name, email address, and a unique password. You'll use this login to access Robinhood next time.
      </div> */}
      <div className="signup-field">
        <label>Confirm your region</label>
        <div className="signup-field-desc">
          This helps us make sure you get the right experience for where you live and pay tax. If you’re temporarily abroad for work, school, or other reasons, choose your permanent residence.
        </div>
        <input
          type="text"
          placeholder="Search for a country or region..."
          value={region}
          onChange={e => setRegion(e.target.value)}
          list="region-list"
          required
        />
        <datalist id="region-list">
          {regions.map(r => (
            <option value={r} key={r} />
          ))}
        </datalist>
      </div>
      <ProgressBar progress={10} />
      <button type="submit" className="signup-continue" disabled={!region}>
        Continue
      </button>
    </form>
  );
}
