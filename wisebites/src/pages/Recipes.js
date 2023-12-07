import React, { useState, useEffect } from 'react';
import '../styles/Recipes.css'; // Import your CSS file for styling
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import Modal from 'react-modal';

const Recipes = () => {
   const [recipes, setRecipes] = useState([]);
   const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [client, setClient] = useState(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const openModal = () => {
      setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
      setIsModalOpen(false);
    };

const [formData, setFormData] = useState({
    recipeName: '',
    description: '',
    instruction: '',
    preparationTime: 0,
    cookingTime: 0,
     mealType: '', // New field for Meal Type dropdown
      recipeType: '', // New field for Recipe Type dropdown
      ingredientsList: [],
  });

  const handleFormSubmit = async (e) => {
      e.preventDefault();

      try {
        // Step 1: Call /recipes to create a new recipe
        const lowercaseFormData = {
              recipeName: formData.recipeName.toLowerCase(),
              description: formData.description.toLowerCase(),
              instructions: formData.instruction.toLowerCase(),
              preparationTime: formData.preparationTime,
              cookingTime: formData.cookingTime,
              mealType: formData.mealType.toLowerCase(),
              recipeType: formData.recipeType.toLowerCase(),
              client: client,
               };
        const recipesResponse = await fetch('http://localhost:8080/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lowercaseFormData),
        });

        if (!recipesResponse.ok) {
          throw new Error('Error creating recipe');
        }

        const recipeData = await recipesResponse.json();
        const recipeId = recipeData;
//console.log(formData.ingredientsList)
        // Step 2: Call /recipe-ingredients/bulk to add ingredients for the created recipe
        const ingredientsResponse = await fetch('http://localhost:8080/recipe-ingredients/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
              formData.ingredientsList.map((ingredient) => ({
                recipeId: parseInt(recipeId, 10),
                ingredient_id: parseFloat(ingredient.id),
                quantity: ingredient.quantity,
              }))
            ),
          });

        if (!ingredientsResponse.ok) {
          throw new Error('Error adding ingredients');
        }

        // Optionally, you can do something with the response from the second API call
        const ingredientsData = await ingredientsResponse.json();
        console.log('Ingredients added successfully:', ingredientsData);

        // Close the modal after successful submission
        closeModal();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    useEffect(() => {
//     setClient(2);
      const fetchRecipes = async () => {
        try {
         const ingredientsResponse = await fetch('http://localhost:8080/ingredients');
                const ingredientsData = await ingredientsResponse.json();
                setIngredients(ingredientsData);
console.log(ingredients)
         const response = await fetch(`http://localhost:8080/recipes/all/${client}`, {
                   method: 'GET',
                   headers: {
                     'Content-Type': 'application/json',
                   },
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

 const handleAddIngredient = (ingredient) => {
   const updatedIngredientsList = [...formData.ingredientsList, {
     id: ingredient || null,  // Set to null if ingredient.id is undefined
 // Set to null if ingredient.name is undefined
     quantity: 1,
   }];
   setFormData({ ...formData, ingredientsList: updatedIngredientsList });
 };



 // Function to handle updating the quantity of an ingredient
 const handleUpdateQuantity = (index, newQuantity, e) => {
   e.preventDefault();
   const updatedIngredientsList = [...formData.ingredientsList];
   updatedIngredientsList[index].quantity = newQuantity;

   // Remove the item if the quantity is less than or equal to zero
   if (newQuantity <= 0) {
     updatedIngredientsList.splice(index, 1);
   }

   setFormData({ ...formData, ingredientsList: updatedIngredientsList });
 };

    // Function to handle removing an ingredient from the form
    const handleRemoveIngredient = (index) => {
      const updatedIngredientsList = [...formData.ingredientsList];
      updatedIngredientsList.splice(index, 1);
      setFormData({ ...formData, ingredientsList: updatedIngredientsList });
    };
    return (
      <div className="recipes-page">
        <h1>Recipes</h1>
        <nav className="navbar">
        <Link to="/">
          <button className="home-button">Go to Home</button>
        </Link>
        <Link to="/ingredients">
          <button className="home-button">See All Ingredients</button>

        </Link>
        <Link to="/mealPlan">
          <button className="home-button">Get a MealPlan</button>
        </Link>

      </nav>

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

              <div>
                    {/* Button to open the modal */}
                    <button onClick={openModal}>Add Recipes</button>

                    {/* Modal component */}
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      contentLabel="Recipe Form Modal"
                    >
                      {/* Form inside the modal */}
                      <form onSubmit={handleFormSubmit}>
                        <label>
                          Recipe Name:
                          <input
                            type="text"
                            value={formData.recipeName}
                            onChange={(e) =>
                              setFormData({ ...formData, recipeName: e.target.value })
                            }
                          />
                        </label>

                        <label>
                          Description:
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                            }
                          />
                        </label>

                        <label>
                          Instruction:
                          <textarea
                            value={formData.instruction}
                            onChange={(e) =>
                              setFormData({ ...formData, instruction: e.target.value })
                            }
                          />
                        </label>

                        <label>
                          Preparation Time:
                          <input
                            type="number"
                            value={formData.preparationTime}
                            onChange={(e) =>
                              setFormData({ ...formData, preparationTime: parseInt(e.target.value, 10) || 0 })
                            }
                          />
                        </label>

                        <label>
                          Cooking Time:
                          <input
                            type="number"
                            value={formData.cookingTime}
                            onChange={(e) =>
                              setFormData({ ...formData, cookingTime: parseInt(e.target.value, 10) || 0 })
                            }
                          />
                        </label>

<label>
  Meal Type:
  <select
    value={formData.mealType}
    onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
  >
    <option value="" disabled>
      Select a meal type
    </option>
    <option value="main course">Main Course</option>
    <option value="breakfast">Breakfast</option>
    <option value="brunch">Brunch</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
    <option value="dessert">Dessert</option>
    <option value="snacks">Snacks</option>
  </select>
</label>

<label>
  Recipe Type:
  <select
    value={formData.recipeType}
    onChange={(e) => setFormData({ ...formData, recipeType: e.target.value })}
  >
    <option value="" disabled>
      Select a recipe type
    </option>
    <option value="vegetarian">Vegetarian</option>
    <option value="non-vegetarian">Non-Vegetarian</option>
    <option value="sea-food">Seafood</option>
    <option value="vegan">Vegan</option>
    <option value="gluten-free">Gluten-Free</option>
    <option value="egg-free">Egg-Free</option>
    <option value="soy-free">Soy-Free</option>
    <option value="nut-free">Nut-Free</option>
    <option value="dairy-free">Dairy-Free</option>
  </select>
</label>


                         <label>
                                     Ingredients:
                                     <select
                                       value=""
                                       onChange={(e) => handleAddIngredient(e.target.value)}
                                     >
                                       <option value="" disabled>
                                         Select an ingredient
                                       </option>
                                       {ingredients.map((ingredient) => (
                                         <option key={ingredient.id} value={ingredient.id}>
                                           {ingredient.name}
                                         </option>
                                       ))}
                                     </select>
                                   </label>

                                   {/* Display selected ingredients with quantity */}
                                   <ul>
                                     {formData.ingredientsList.map((ingredient, index) => (
                                       <li key={index}>
                                         {ingredient.name} - Quantity:
                                         <button onClick={(e) => handleUpdateQuantity(index, ingredient.quantity - 1, e)}>-</button>
                                         {ingredient.quantity}
                                         <button onClick={(e) => handleUpdateQuantity(index, ingredient.quantity + 1, e)}>+</button>
                                         <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
                                       </li>

                                     ))}
                                   </ul>


                        {/* Submit button */}
                        <button type="submit">Submit</button>
                      </form>

                      {/* Button to close the modal */}
                      <button onClick={closeModal}>Close</button>
                    </Modal>
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

export default Recipes;
