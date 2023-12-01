import React, { useState, useEffect } from 'react';
import '../styles/MealPlan.css'; // Import your CSS file for styling

const MealPlan = () => {
  const [mealType, setMealType] = useState('');
  const [recipeType, setRecipeType] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = () => {
    // Make API call with form data
    // ...

  };

  useEffect(() => {
    // Fetch recipes and setRecipes logic
    // ...

  }, []); // Empty dependency array means the effect runs once after the first render

  return (
    <div className="meal-plan">
      {/* Upper half: Form */}
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
            Dietary Restrictions:
            <select
              multiple
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label>
            Calorie Limit:
            <div>
              <button onClick={() => setCalorieLimit(calorieLimit - 50)}>-</button>
              <span>{calorieLimit}</span>
              <button onClick={() => setCalorieLimit(calorieLimit + 50)}>+</button>
            </div>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Lower half: Recipe Cards */}
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe.recipeId} {...recipe} />
        ))}
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe, ingredientList, nutrionalValue, nutritionModel }) => {
  return (
    <div className="recipe-card">
      <h2>{recipe.recipeName}</h2>
      <p>{recipe.description}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Preparation Time: {recipe.preparationTime} minutes</p>
      <p>Cooking Time: {recipe.cookingTime} minutes</p>
      {/* Display other recipe information */}
    </div>
  );
};

export default MealPlan;
