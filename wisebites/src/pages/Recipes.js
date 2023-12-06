import React, { useState, useEffect } from 'react';
import '../styles/Recipes.css'; // Import your CSS file for styling
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';


const Recipes = () => {
   const [recipes, setRecipes] = useState([]);
   const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [client, setClient] = useState('');

    const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

    useEffect(() => {
     setClient(2);
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
//          setFilteredRecipes(data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };

      fetchRecipes();
    }, []); // Empty dependency array means the effect runs once after the first render

const handleSearch = async () => {
    try {
if (name === null || name === '') {
      // If name is null or an empty string, set an empty array and return
      setFilteredRecipes([]);
      return;
    }
      const response = await fetch(`http://localhost:8080/recipes/byNameAndClient/${name}/${client}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Fetched Data:', data);
      setFilteredRecipes(data || []);
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
      setFilteredRecipes([]);
    }
  };
    return (
      <div className="recipes-page">
        <h1>Recipes</h1>
         <label>
                Search for recipe:
                 <input type="text" value={name} placeholder="Type the recipe name" onChange={handleNameChange} />
              </label>

               <button onClick={handleSearch}>Submit</button>
        <div className="recipe-container">
         {filteredRecipes.length === 0 ? (
         <ul>
                {recipes.map((recipe) => (
                            <RecipeCard key={recipe.recipeId} {...recipe} />
                          ))}
                          </ul>
              ) : (
<ul>
                  {filteredRecipes.map((recipe) => (
                             <RecipeCard key={recipe.recipeId} {...recipe} />
                         ))}
              </ul>
              )}

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
