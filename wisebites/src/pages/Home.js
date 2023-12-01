// src/Home.js
import React from 'react';
import RecipeCard from '../components/RecipeCard';
import IngredientCard from '../components/IngredientCard';
import MealCard from '../components/MealCard';
const Home = () => {
const recipeData = {
    title: 'Recipes',
    
  };
const IngredientData = {
    title: 'Ingredients',
};
const MealData = {
    title: 'Meals',
};

  return (
    <div>
      <h1>WiseBites App</h1>
      <RecipeCard {...recipeData} />
      <MealCard {...IngredientData} />
      <IngredientCard {...IngredientData} />
    </div>
  );
};


export default Home;
