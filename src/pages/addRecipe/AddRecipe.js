import React from 'react';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const AddRecipe = () => {
  return (
    <div className='add-recipe container'>
      <h1>Ajouter une recette</h1>

      <RecipeForm />
    </div>
  );
};

export default AddRecipe;
