import React, { useState } from "react";
import "./AddressForm.css";
import ProgressBar from "./ProgressBar";

const countries = [
  { code: "US", label: "US", dial: "+1" },
  { code: "IN", label: "IN", dial: "+91" },
  // Add more countries as needed
];

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California", // ...etc
];

export default function AddressForm({ onSubmit, onNext, onBack }) {
  const [country, setCountry] = useState("US");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ country, phone, address, apartment, city, state, zip });
    }
  };

  return (
    <form
      className="address-form"
      onSubmit={
        // handleSubmit
        (e) => {
          e.preventDefault();
          onNext();
        }
      }
      autoComplete="off"
    >
      <div className="address-field-row">
        <div className="address-country-dropdown">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((c) => (
              <option value={c.code} key={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <input
          className="address-phone"
          type="tel"
          placeholder={`${
            countries.find((c) => c.code === country)?.dial || ""
          } Phone number`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <input
        className="address-input"
        type="text"
        placeholder="Residential address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <input
        className="address-input"
        type="text"
        placeholder="Apartment #, Building #, etc."
        value={apartment}
        onChange={(e) => setApartment(e.target.value)}
      />

      <div className="address-field-row">
        <input
          className="address-city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <select
          className="address-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="">State</option>
          {states.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          className="address-zip"
          type="text"
          placeholder="ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
      </div>
      <div className="address-note">
        We will never share this information with marketers and we will never
        send you spam.
      </div>
      <ProgressBar progress={30} />
      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          className="signup-continue"
          style={{ background: "#222", color: "#fff" }}
          onClick={onBack}
        >
          Back
        </button>
        <button type="submit" className="signup-continue" disabled={false}>
          Continue
        </button>
      </div>
    </form>
  );
}
