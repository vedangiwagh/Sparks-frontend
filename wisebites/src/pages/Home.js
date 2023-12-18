// src/Home.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link , useParams} from 'react-router-dom';
import '../styles/Dashboard.css';

const Home = () => {
  // Ensure that match is defined before accessing params
  const { username } = useParams();
  return (
    <div className="home-page">
      <div className="center-top-content">
        <h1>Welcome to our Senior Citizen MealPlan Help App!!!!</h1>

      </div>

      <div className="app-container">
        <Link to="/recipes" className="tile" id="recipes">
          <h2>Recipes</h2>
        </Link>
        <Link to="/mealPlan" className="tile" id="mealPlan">
          <h2>Get Meal Plan</h2>
        </Link>
        <Link to="/ingredients" className="tile" id="ingredients">
          <h2>Ingredients</h2>
        </Link>
      </div>
    </div>
  );
};

export default Home;
