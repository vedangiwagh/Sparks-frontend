// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import MealPlan from './pages/MealPlan';
import AllIngredients  from './pages/AllIngredients';
import Signup from './pages/Signup';
import Login from './pages/Login';
const App = () => {
  return (
    <Router>

<Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<AllIngredients />} />
         <Route path="/mealPlan" element={<MealPlan />} />
         <Route path="/recipes" element={<Recipes />} />
      <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
         <Route path="/home/:username" component={Home} />
</Routes>
    </Router>
  );
};
const Home = ({ match }) => {
  const { username } = match.params;
  return <h2>Welcome, {username}!</h2>;
};
export default App;
