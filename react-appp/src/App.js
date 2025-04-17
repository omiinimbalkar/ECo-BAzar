import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import './i18n'; // 👈 important

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Hide splash screen after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer  className="bg-dark text-light py-3 mt-auto"/>
          </>
        )}
      </div>
    </Router>
  );
}

export default App; 
