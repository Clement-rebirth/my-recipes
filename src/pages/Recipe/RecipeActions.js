import React from 'react';
import { Link } from 'react-router-dom';

const RecipeActions = ({ recipe }) => {

  const editRecipe = () => {};

  const deleteRecipe = () => {};

  return (
    <div className='recipe-actions'>
      <Link
        to={`/edit/${recipe.slug}`}
        id='edit-recipe'
        onClick={editRecipe}
      >
          <span className="material-icons-round">edit</span>
      </Link>
      <button id='delete-recipe' onClick={deleteRecipe}><span className="material-icons-round">delete</span></button>
    </div>
  );
};

export default RecipeActions;
