// IngredientCard.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/IngredientCard.css';

const IngredientCard = ({
  name,
  calories,
  fat,
  carbohydrates,
  fiber,
  sugar,
  protein,
  sodium,
}) => {
  return (
    <div className="ingredient-card">
      <div className="ingredient-details">
        <h2 className="ingredient-name">{name}</h2>
        <div className="nutrition-info">
          <p><strong>Calories:</strong> {calories} kcal</p>
          <p><strong>Fat:</strong> {fat} g</p>
          <p><strong>Carbohydrates:</strong> {carbohydrates} g</p>
          <p><strong>Fiber:</strong> {fiber} g</p>
          <p><strong>Sugar:</strong> {sugar} g</p>
          <p><strong>Protein:</strong> {protein} g</p>
          <p><strong>Sodium:</strong> {sodium} mg</p>
        </div>
      </div>
    </div>
  );
};

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fiber: PropTypes.number.isRequired,
  sugar: PropTypes.number.isRequired,
  protein: PropTypes.number.isRequired,
  sodium: PropTypes.number.isRequired,
};

export default IngredientCard;
