import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

const NutritionCard = ({  nutrionalValue }) => {
  return (
    <div className="ingredient-card">




      <h2>Nutrition Model</h2>
    {nutrionalValue}
    </div>
  );
};

export default NutritionCard;
