
import React from 'react';
import { useState, useEffect } from 'react';
import IngredientCard from '../components/IngredientCard';
import '../styles/AllIngredients.css';
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';

const AllIngredients = () => {

const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8080/ingredients')
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
  <div>
  <h1> Ingredient List </h1>
  <nav className="navbar">
  <Link to="/home">
                <button className="home-button">Go to Home</button>
              </Link>
  <Link to="/recipes">
                <button className="home-button">See Recipes</button>
                </Link>
  <Link to="/mealPlan">
                <button className = "home-button">Get a MealPlan</button>
                </Link>

  </nav>
    <div className="card-container">
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient.id} {...ingredient} />
      ))}
    </div>
    </div>
  );
};


export default AllIngredients;
