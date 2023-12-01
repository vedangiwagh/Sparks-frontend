import React from 'react';
import PropTypes from 'prop-types';
import '../styles/IngredientCard.css';

const IngredientCard = ({ title }) => {
  return (
    <div className="ingredient-card">
      
      <div className="ingredients-details">
        <h2 className="ingredient-title">{title}</h2>
        
      </div>
    </div>
  );
};

IngredientCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IngredientCard;