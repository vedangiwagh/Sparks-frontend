// RecipeCard.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

const RecipeCard = ({ title, ingredients, image }) => {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-details">
        <h2 className="recipe-title">{title}</h2>
        <ul className="ingredient-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
};

export default RecipeCard;
