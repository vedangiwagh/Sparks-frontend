import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

const NutritionCard = ({  calories,fat,carb,fiber,sugar,protein,sodium , nutritionalvalue}) => {
  return (

    <div className="recipe-card">

      <div className="recipe-details">
        <h2 className="recipe-title">{calories}</h2>
        
        <p className="recipe-description">{fat}</p>
      </div>

    </div>
  );
};

NutritionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default NutritionCard;
