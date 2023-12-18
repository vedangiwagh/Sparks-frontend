// RecipeCard.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

const RecipeCard = ({ title, ingredients, description, image }) => {
  return (
    <div className="recipe-card">

      <div className="recipe-details">
        <h2 className="recipe-title">{title}</h2>
        <ul className="ingredient-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p className="recipe-description">{description}</p>
      </div>

    </div>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default RecipeCard;
