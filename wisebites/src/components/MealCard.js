import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MealCard.css';

const MealCard = ({ title }) => {
  return (
    <div className="meal-card">
      
      <div className="meal-details">
        <h2 className="meal-title">Meals</h2>
        
      </div>
    </div>
  );
};

MealCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MealCard;