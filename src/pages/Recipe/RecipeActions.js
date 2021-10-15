import React from 'react';

const RecipeActions = ({ recipe }) => {

  const editRecipe = () => {};

  const deleteRecipe = () => {};

  return (
    <div className='recipe-actions'>
      <button id='edit-recipe' onClick={editRecipe}><span className="material-icons-round">edit</span></button>
      <button id='delete-recipe' onClick={deleteRecipe}><span className="material-icons-round">delete</span></button>
    </div>
  );
};

export default RecipeActions;
