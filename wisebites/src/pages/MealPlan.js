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
   const [ingredients, setIngredients] = useState([]);

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
        dietRestriction: formData.dietRestrictions,
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
 useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const ingredientsResponse = await fetch('http://localhost:8080/ingredients');
      const ingredientsData = await ingredientsResponse.json();
      setIngredients(ingredientsData);
      console.log(ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  // Invoke the fetchRecipes function
  fetchRecipes();
}, []); // The empty
  return (
    <div className="meal-plan">

      <div>
      {/* Form Part */}
      <nav className="navbar">
      <Link to="/home">
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
  <select
    value={mealType}
    onChange={(e) => setMealType(e.target.value)} 
  >
    <option value="" disabled>
      Select a meal type
    </option>
    <option value="Main Course">Main Course</option>
    <option value="Breakfast">Breakfast</option>
    <option value="Appetizer">Appetizer</option>
    <option value="Soup">Soup</option>
    <option value="dinner">Dinner</option>

  </select>
</label>
          

          <label>
  Recipe Type:
  <select
    value={recipeType}
    onChange={(e) => setRecipeType(e.target.value)}
  >
    <option value="" disabled>
      Select a recipe type
    </option>
    <option value="Vegetarian">Vegetarian</option>
    <option value="Non-Vegetarian">Non-Vegetarian</option>
    <option value="sea-food">Seafood</option>
    <option value="Vegan">Vegan</option>
    <option value="Gluten-Free">Gluten-Free</option>
    <option value="soy-free">Soy-Free</option>

  </select>
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
    {ingredients.map((ingredient) => (
      <option key={ingredient._id} value={ingredient._id}>
        {ingredient.name}
      </option>
    ))}
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
        {meals.length > 0 ? (
          meals.map((meal) => (
<div className="meal">
            <React.Fragment key={meal.recipe.recipeid}>
            <RecipeCard {...meal.recipe} />
            <NutritionCard key={meal.recipe.recipeid} {...meal.nutritionModel} />
            </React.Fragment>
</div>

          ))
        ) : (
          <p>No meal plan can be generated.</p>

        )}
      </div>
    </div>
    </div>
  );
};

const RecipeCard = ({  recipeName, description, instructions, preparationTime, cookingTime }) => {
  return (
    <div className="recipe-card">
      <h2>{recipeName}</h2>
      <p>Description: {description}</p>
      <p>Instructions: {instructions}</p>
      <p>Preparation Time: {preparationTime} minutes</p>
      <p>Cooking Time: {cookingTime} minutes</p>
    </div>
  );
};

const NutritionCard = ({  calories,fat, carbohydrates, fiber, sugar, protein, sodium }) => {
  return (
    <div className="recipe-card">
      <h4>Calories:{calories}</h4>
      <h4>Fat:{fat}</h4>
      <h4>Carbohydrates:{carbohydrates}</h4>
      <h4>Fiber:{fiber}</h4>
      <h4>Sugar:{sugar}</h4>
      <h4>Protein:{protein}</h4>
      <h4>Sodum:{sodium}</h4>
      
    </div>

  );
};

export default MealPlan;
