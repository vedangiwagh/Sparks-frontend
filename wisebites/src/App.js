// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import MealPlan from './pages/MealPlan';
import AllIngredients  from './pages/AllIngredients';
const App = () => {
  return (
    <Router>

<Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<AllIngredients />} />
         <Route path="/mealPlan" element={<MealPlan />} />
         <Route path="/recipes" element={<Recipes />} />

</Routes>
    </Router>
  );
};

export default App;
