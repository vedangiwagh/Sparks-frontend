// src/Home.js
import React from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
const recipeData = {
    title: 'Spaghetti Bolognese',
    ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Herbs'],
    image: 'https://example.com/spaghetti_image.jpg',
  };

  return (
    <div>
      <h1>WiseBites App</h1>
      <RecipeCard {...recipeData} />
    </div>
  );
};


export default Home;
