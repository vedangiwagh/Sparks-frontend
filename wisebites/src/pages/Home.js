// src/Home.js
import React from 'react';
import RecipeCard from '../components/RecipeCard';
import IngredientCard from '../components/IngredientCard';

import IngredientCard from '../components/IngredientCard';
import MealCard from '../components/MealCard';
const Home = () => {
const recipeData = {
    title: 'Spaghetti Bolognese',
    ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Herbs']
    title: 'Recipes',

  };
const IngredientData = {
    title: 'Ingredients',
};
const MealData = {
    title: 'Meals',
};

  const ingredientData = {
      name: 'Black Beans',
      calories: 127.0,
      fat: 0.5,
      carbohydrates: 23.0,
      fiber: 7.6,
      sugar: 0.0,
      protein: 8.9,
      sodium: 473.0,
    };


  return (
    <div>
      <h1>WiseBites App</h1>
      <RecipeCard {...recipeData} />
      <MealCard {...IngredientData} />
      <IngredientCard {...IngredientData} />
      <IngredientCard {...ingredientData} />
    </div>
  );
};


export default Home;
