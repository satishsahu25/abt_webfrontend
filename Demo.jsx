import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Play, BarChart3, Coins, Trophy, Activity, Users, Shield, Zap, Globe, Star, Award, DollarSign } from 'lucide-react';

const TradingPlatformHomepage = () => {
  const [activeTab, setActiveTab] = useState('stocks');
  const [marketData, setMarketData] = useState({
    stocks: [],
    crypto: [],
    forex: []
  });
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Finnhub API key (you'll need to get one from finnhub.io)
  const FINNHUB_API_KEY = 'sandbox_c1k9fg0000000000000g'; // Replace with your actual API key

  // Stock symbols to fetch
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META'];
  const cryptoSymbols = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:ADAUSDT'];
  const forexSymbols = ['OANDA:EUR_USD', 'OANDA:GBP_USD', 'OANDA:USD_JPY'];

  // Fetch real market data from Finnhub
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        
        // Fetch stock data
        const stockPromises = stockSymbols.map(async (symbol) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );
          const data = await response.json();
          
          // Get company profile for additional info
          const profileResponse = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );
          const profile = await profileResponse.json();
          
          return {
            symbol,
            name: profile.name || symbol,
            price: data.c || 0,
            change: data.dp || 0,
            logo: profile.logo || `https://logo.clearbit.com/${profile.weburl?.replace('https://', '') || symbol.toLowerCase()}.com`,
            volume: Math.floor(Math.random() * 100) + 'M' // Dummy volume
          };
        });

        // Fetch crypto data
        const cryptoPromises = cryptoSymbols.map(async (symbol) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );
          const data = await response.json();
          
          const cleanSymbol = symbol.split(':')[1].replace('USDT', '');
          return {
            symbol: cleanSymbol,
            name: cleanSymbol === 'BTC' ? 'Bitcoin' : cleanSymbol === 'ETH' ? 'Ethereum' : 'Cardano',
            price: data.c || 0,
            change: data.dp || 0,
            logo: `https://cryptologos.cc/logos/${cleanSymbol.toLowerCase()}-${cleanSymbol.toLowerCase()}-logo.png`,
            volume: Math.floor(Math.random() * 10) + 'B'
          };
        });

        // Fetch forex data
        const forexPromises = forexSymbols.map(async (symbol) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );
          const data = await response.json();
          
          const pair = symbol.split(':')[1];
          return {
            symbol: pair,
            name: pair.replace('_', '/'),
            price: data.c || 0,
            change: data.dp || 0,
            logo: `https://flagcdn.com/24x18/${pair.split('_')[0].slice(0, 2).toLowerCase()}.png`,
            volume: Math.floor(Math.random() * 500) + 'K'
          };
        });

        const [stockData, cryptoData, forexData] = await Promise.all([
          Promise.all(stockPromises),
          Promise.all(cryptoPromises),
          Promise.all(forexPromises)
        ]);

        setMarketData({
          stocks: stockData,
          crypto: cryptoData,
          forex: forexData
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Fallback to dummy data if API fails
        setMarketData({
          stocks: [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 185.23, change: 1.45, logo: 'https://logo.clearbit.com/apple.com', volume: '45M' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2845.67, change: -0.85, logo: 'https://logo.clearbit.com/google.com', volume: '32M' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.45, change: 2.15, logo: 'https://logo.clearbit.com/microsoft.com', volume: '28M' }
          ],
          crypto: [
            { symbol: 'BTC', name: 'Bitcoin', price: 45234.67, change: 2.34, logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', volume: '24B' },
            { symbol: 'ETH', name: 'Ethereum', price: 2845.23, change: -1.23, logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', volume: '12B' },
            { symbol: 'ADA', name: 'Cardano', price: 0.65, change: 4.56, logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png', volume: '3B' }
          ],
          forex: [
            { symbol: 'EUR_USD', name: 'EUR/USD', price: 1.0865, change: 0.25, logo: 'https://flagcdn.com/24x18/eu.png', volume: '2.5T' },
            { symbol: 'GBP_USD', name: 'GBP/USD', price: 1.2654, change: -0.45, logo: 'https://flagcdn.com/24x18/gb.png', volume: '1.8T' },
            { symbol: 'USD_JPY', name: 'USD/JPY', price: 148.75, change: 0.85, logo: 'https://flagcdn.com/24x18/jp.png', volume: '1.2T' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sports betting dummy data
  const sportsData = [
    {
      symbol: 'NBA',
      name: 'Lakers vs Warriors',
      price: 1.85,
      change: 0.05,
      logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
      volume: '2.3M'
    },
    {
      symbol: 'NFL',
      name: 'Chiefs vs Bills',
      price: 1.95,
      change: 0.15,
      logo: 'https://static.www.nfl.com/image/private/t_headshot_desktop/league/u9fltoslqdsyao8cpm0k',
      volume: '4.2M'
    },
    {
      symbol: 'EPL',
      name: 'Man City vs Liverpool',
      price: 2.15,
      change: -0.10,
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Premier-League-Logo.png',
      volume: '5.8M'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our advanced matching engine',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Bank-Level Security',
      description: 'Your funds are protected with military-grade encryption',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Advanced Analytics',
      description: 'Professional-grade charts and technical analysis tools',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Markets',
      description: 'Access markets from around the world, 24/7 trading',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Professional Trader',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      text: 'TradePro has transformed my trading experience. The real-time data and execution speed are unmatched.'
    },
    {
      name: 'Mike Chen',
      role: 'Crypto Investor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      text: 'The multi-asset platform makes it easy to diversify my portfolio across different markets.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Sports Bettor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      text: 'Best sports betting platform I\'ve used. Great odds and instant payouts.'
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'stocks':
        return marketData.stocks;
      case 'crypto':
        return marketData.crypto;
      case 'forex':
        return marketData.forex;
      case 'sports':
        return sportsData;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=40&h=40&fit=crop" 
                alt="TradePro Logo" 
                className="w-10 h-10 rounded-lg mr-3"
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                TradePro
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Markets</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Trading</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Sports</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">Login</button>
              <button className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Trade Everything,
                <br />
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Everywhere
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Crypto, Stocks, Forex, and Sports Betting - All in one powerful platform with real-time data
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  Start Trading <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" /> Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure & Licensed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>2M+ Users</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
                alt="Trading Dashboard" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Data */}
      <section className="py-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6 text-green-400" />
              Live Markets
              {loading && <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>}
            </h2>
            <div className="flex space-x-4">
              {['stocks', 'crypto', 'forex', 'sports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getCurrentData().map((item, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800/70 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40x40/374151/ffffff?text=' + item.symbol.charAt(0);
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-400">{item.symbol}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${item.change > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {item.change > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">
                      ${typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
                    </span>
                    <span className={`font-semibold ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Volume: {item.volume}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">TradePro</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of trading with our cutting-edge platform designed for both beginners and professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-slate-800/50 transition-all group hover:transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-300">Join thousands of satisfied traders worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800/70 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-400">2M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">$50B+</div>
              <div className="text-gray-400">Trading Volume</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-400">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of traders who trust TradePro for their trading needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105">
              Create Free Account
            </button>
            <button className="border border-gray-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=40&h=40&fit=crop" 
                alt="TradePro Logo" 
                className="w-10 h-10 rounded-lg mr-3"
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                TradePro
              </div>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 TradePro. All rights reserved. Powered by Finnhub API</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradingPlatformHomepage;