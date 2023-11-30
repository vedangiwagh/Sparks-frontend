
import React from 'react';
import { useState, useEffect } from 'react';
import IngredientCard from '../components/IngredientCard';

const AllIngredients = () => {
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
      <h1> Ingredients Page</h1>

      {ingredients.map((ingredient) => (
             <IngredientCard key={ingredient.id} {...ingredient} />
           ))}
    </div>
  );
};


export default AllIngredients;
