import React, { useState, useEffect } from 'react';
import '../styles/Recipes.css'; // Import your CSS file for styling
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/recipes/getRecipesForClient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mealType: 'Main Course',
            recipeType: 'Vegetarian',
            client: 2,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array means the effect runs once after the first render

  return (
    <div className="recipes-page">
      <h1>Recipes</h1>
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipeId} {...recipe} />
        ))}
      </div>
      <Link to="/">
              <button className="home-button">Go to Home</button>
            </Link>
    </div>
  );
};

const RecipeCard = ({ recipeName, description, instructions, preparationTime, cookingTime }) => {
  return (
    <div className="recipe-card">
      <h2>{recipeName}</h2>
      <p>{description}</p>
      <p>Instructions: {instructions}</p>
      <p>Preparation Time: {preparationTime} minutes</p>
      <p>Cooking Time: {cookingTime} minutes</p>
    </div>
  );
};

export default Recipes;
