// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import MealPlan from './pages/MealPlan';
import AllIngredients  from './pages/AllIngredients';
import Login from './pages/Login';
const App = () => {
  return (
    <Router>

<Routes>
        <Route path="/about" element={<About />} />
        <Route path="/ingredients" element={<AllIngredients />} />
         <Route path="/mealPlan" element={<MealPlan />} />
         <Route path="/recipes" element={<Recipes />} />
<Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
 <Route path="/home" element={<Home />} />
</Routes>
    </Router>
  );
};

export default App;
