// RecipeCard.js
import React from 'react';
import PropTypes from 'prop-types';


const RecipeCard = ({ title }) => {
  return (
    <div className="recipe-card">
      
      <div className="recipe-details">
        <h2 className="recipe-title">{title}</h2>
        
        
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
