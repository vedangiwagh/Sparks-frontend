import React from 'react';
import IngredientCard from '../components/IngredientCard';
import RecipeCard from '../components/RecipeCard';
import MealCard from '../components/MealCard';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <IngredientCard />
        <RecipeCard />
        <MealCard />
      </div>
    </div>
  );
};

export default Dashboard;