import React, { useState, useEffect } from 'react';
import '../styles/MealPlan.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MealPlan = () => {
  const [mealType, setMealType] = useState('');
  const [recipeType, setRecipeType] = useState('');
  const [dietRestrictions, setDietRestrictions] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState(0);
  const [clientId, setClientId] = useState(0);
  const [clientName, setClientName] = useState('');
  const [meals, setMeals] = useState([]);

  const decreaseCalorieLimit = () => {
    setCalorieLimit((prevCalorieLimit) => prevCalorieLimit - 50);
  };

  const increaseCalorieLimit = () => {
    setCalorieLimit((prevCalorieLimit) => prevCalorieLimit + 50);
  };
 const handleSubmit = async () => {
    try {
      const response = await fetch('http://104.196.35.206:8080/meals/getMealClientSpecific', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealType,
          recipeType,
          clientId,
          clientName,
          dietRestrictions,
          calorieLimit,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    handleSubmit(); // Initial call to fetch meals
  }, [mealType, recipeType, clientId, clientName, dietRestrictions, calorieLimit]);

  return (
    <div className="meal-plan">
      <div className="form-container">
        <h2>Meal Plan Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Meal Type:
            <input type="text" value={mealType} onChange={(e) => setMealType(e.target.value)} />
          </label>

          <label>
            Recipe Type:
            <input type="text" value={recipeType} onChange={(e) => setRecipeType(e.target.value)} />
          </label>

          <label>
            Diet Restrictions:
            <select
              multiple
              value={dietRestrictions}
              onChange={(e) =>
                setDietRestrictions(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              <option value="Avocado">Avocado</option>
              <option value="Black beans">Black beans</option>

              
            </select>
          </label>

          <label>
            Calorie Limit:
            <div>
              <button type="button" onClick={decreaseCalorieLimit}>
                -
              </button>
              <span>{calorieLimit}</span>
              <button type="button" onClick={increaseCalorieLimit}>
                +
              </button>
            </div>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="recipe-container">
        {meals.map((meal) => (
          <RecipeCard key={meal.recipeid} {...meal} />
        ))}
      </div>
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

export default MealPlan;
