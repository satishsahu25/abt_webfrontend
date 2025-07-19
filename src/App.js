import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Signup  from './pages/Signup.jsx';
// import TradingPlatformHomepage from './pages/Demo.jsx';
import Stocks from './pages/Stocks.jsx';
import IndividualStock from './components/ui/IndividualStock.jsx';
import CryptoDashboard from './components/ui/CryptoList.jsx';
import CryptoTradingUI from './components/ui/SingleCrypto.jsx';
import UserProfile from './components/ui/ProfileSetting.jsx';

function App() {
  return (
    <>
      {/* <CartProvider> */}
      <Router>
           <Routes>
             {/* <Route path="/" element={<TradingPlatformHomepage/>} /> */}
             <Route path="/" element={<Home/>} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/stocks" element={<Stocks />} />
             <Route path="/stocks/:id" element={<IndividualStock />} />
             {/* <Route path="/orders" element={<Orders />} /> */}
            {/* <Route path="/bank-details" element={<BankDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} /> */}
            <Route path="/crypto" element={<CryptoDashboard />} /> 
            <Route path="/crypto/1" element={<CryptoTradingUI/>} /> 
            <Route path="/user" element={<UserProfile/>} /> 

           </Routes>
         </Router>
      {/* </CartProvider> */}
    </>
  );
}

export default App;
