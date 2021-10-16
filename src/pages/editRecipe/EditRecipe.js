import React, { useContext } from 'react';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import { RecipesContext } from '../../providers/RecipesProvider';

const EditRecipe = () => {

  let { recipe } = useContext(RecipesContext);

  return (
    <div className='edit-recipe container'>
      <h1>Modifier la recette</h1>

      <RecipeForm recipe={recipe} />
    </div>
  );
};

export default EditRecipe;
