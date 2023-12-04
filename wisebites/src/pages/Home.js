// src/Home.js
import React from 'react';
import RecipeCard from '../components/RecipeCard';
import IngredientCard from '../components/IngredientCard';
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import MealCard from '../components/MealCard';
import '../styles/Dashboard.css';
const Home = () => {




  return (
    <div>
      <h1>WiseBites App</h1>

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
