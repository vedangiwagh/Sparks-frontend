import React, { useState, useEffect } from 'react';
import '../styles/MealPlan.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MealPlan = () => {
  const [mealType, setMealType] = useState('');
  const [recipeType, setRecipeType] = useState('');
  const [dietRestrictions, setDietRestrictions] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState(0);
  const [clientId, setClientId] = useState(2);
  const [clientName, setClientName] = useState('test');
  const [meals, setMeals] = useState([]);

  const decreaseCalorieLimit = () => {
    setCalorieLimit((prevLimit) => Math.max(prevLimit - 100, 0));
  };

  const increaseCalorieLimit = () => {
    setCalorieLimit((prevLimit) => prevLimit + 100);
  };
 // const handleSubmit = async () => {
 //    try {
 //      const response = await fetch('http://localhost:8080/meals/getMealClientSpecific', {
 //        method: 'POST',
 //        headers: {
 //          'Content-Type': 'application/json',
 //        },
 //        body: JSON.stringify({
 //          mealType,
 //          recipeType,
 //          clientId,
 //          clientName,
 //          dietRestrictions,
 //          calorieLimit,
 //        }),
 //      });

 //      if (!response.ok) {
 //        throw new Error('Network response was not ok');
 //      }

 //      const data = await response.json();
 //      console.log(data)
 //      setMeals(data);
 //    } catch (error) {
 //      console.error('Error fetching meals:', error);
 //    }
 //  };
 const fetchRecipes = async (formData) => {
    try {
      // Adjust the URL to the actual API endpoint for fetching recipes
      const response = await fetch('http://localhost:8080/meals/getMealClientSpecific', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mealType: formData.mealType,
        recipeType: formData.recipeType,
        clientId: clientId, // Assuming clientId is defined somewhere in your component
        clientName: clientName, // Assuming clientName is defined somewhere in your component
        dietRestrictions: formData.dietRestrictions,
        calorieLimit: formData.calorieLimit,
      }),
    });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const recipes = await response.json();
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming formData is an object containing the form data
      const formData = {
        mealType,
          recipeType,
          dietRestrictions,
          calorieLimit,
      };

      const recipes = await fetchRecipes(formData);

      // Update state with the fetched recipes
      setMeals(recipes);
console.log(meals)
      // Reset form fields
      setMealType('');
      setRecipeType('');
      setDietRestrictions([]);
      setCalorieLimit(0);
    } catch (error) {
      // Handle the error, e.g., show an error message to the user
    }
  };
  // useEffect(() => {
  //   handleSubmit(); // Initial call to fetch meals
  // }, [mealType, recipeType, clientId, clientName, dietRestrictions, calorieLimit]);

  return (
    <div className="meal-plan">

      <div>
      {/* Form Part */}
      <nav className="navbar">
      <Link to="/">
                <button className="home-button">Go to Home</button>
              </Link>
  <Link to="/recipes">
                <button className="home-button">See Recipes</button>
                </Link>
  <Link to="/ingredients">
                <button className = "home-button">See all Ingredients</button>
                </Link>

  </nav>
  <h1>Let's Get a MealPlan for YOU!!!</h1>
      <div className="form-container">

        
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
              {/* Add more options as needed */}
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

      {/* Response Part */}
      <div className="recipe-container">
        {meals.map((meal) => (
          <RecipeCard key={meal.recipe.recipeid} {...meal.recipe} />
        ))}
      </div>
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
