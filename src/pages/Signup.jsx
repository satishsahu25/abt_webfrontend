import React, { useState } from "react";
import Location from "../components/Signup/Location";
import Credential from "../components/Signup/Credential";
import "./Signup.css";
import AddressForm from "../components/Signup/AddressForm";
import ReviewAddress from "../components/Signup/ReviewAddress";
import PhoneOtpVerify from "../components/Signup/PhoneVerify";
import EnterOTP from "../components/Signup/EnterOTP";
import DateofBirth from "../components/Signup/DateofBirth";
import PanCardForm from "../components/Signup/PanCardForm";

export default function SignupPage() {
  const [step, setStep] = useState(7);
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const regions = ["Japan", "United States", "India", "Germany", "France"];

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-brand">
          <h1>Welcome to Robinhood</h1>
          <p>
            Invest, trade, and grow your wealth. <br />
            Secure and easy signup process.
          </p>
        </div>
      </div>
      <div className="signup-right">
        <div className="signup-form-box">
          {step === 0 && (
            <Location
              region={region}
              setRegion={setRegion}
              regions={regions}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <Credential
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )}
             {step === 2 && (
            <AddressForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )} 
          {step === 3 && (
            <ReviewAddress
            address={setAddress}
            onConfirm={() => setStep(4)}
            onEdit={() => setStep(2)}     
             
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )}
           {step === 4 && (
            <PhoneOtpVerify
            phoneNumber="7339826546615"
            onVerify={()=>{console.log("otp verified")}}
            onSendbyText={() => setStep(5)}
            onSendbyCall={() => setStep(5)}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )}
          {step === 5 && (
            <EnterOTP
            phoneNumber="7339826546615"
            onVerify={()=>{console.log("otp verified")}}
          
            onBack={() => setStep(4)}
            onNext={() => setStep(6)}
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )}

           {step === 6 && (
            <DateofBirth
            // phoneNumber="7339826546615"
            // onVerify={()=>{console.log("otp verified")}}
          
            onBack={() => setStep(5)}
            onNext={() => setStep(7)}
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )} 
          {step === 7 && (
            <PanCardForm
            // phoneNumber="7339826546615"
            // onVerify={()=>{console.log("otp verified")}}
            onBack={() => setStep(6)}
            onNext={() => setStep(8)}
              // onSubmit={() => {
              //   // Final submission logic here
              //   alert("Signup complete!");
              // }}
            />
          )}


        </div>
      </div>
    </div>
  );
}
