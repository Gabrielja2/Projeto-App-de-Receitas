import React from 'react';
import FoodFilteredRecipes from '../components/FoodFilteredRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Foods() {
  return (
    <div className="father">
      <Header title="Foods" bool btnName="food" />
      <FoodFilteredRecipes />
      <Recipes food />
      <Footer />
    </div>
  );
}

export default Foods;
