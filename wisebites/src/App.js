// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AllIngredients  from './pages/AllIngredients';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allIngredients" element={<AllIngredients />} />
        <Route path = "/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
