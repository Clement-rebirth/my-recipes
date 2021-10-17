import React from 'react';
import { Link } from 'react-router-dom';
import Manager from '../../services/firebase/Manager';

const RecipeActions = ({ recipe }) => {

  const confirmDelete = onConfirm => {
    let text;
    let quit = false;
    let wordToEnter = 'oui';

    do {
      text = prompt(`
        Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ?
        (cette action est irréversible !)
        Écrivez "${wordToEnter}" pour confirmer :
      `);

      if (text === null) quit = true; // user cliked "cancel" button

      if (text === wordToEnter) deleteRecipe();
    } while (!quit && text !== wordToEnter);
  };

  const deleteRecipe = () => {
    let recipeManager = new Manager(`recipes/${recipe.id}`);
    recipeManager.delete(() => alert('La recette a bien été supprimée.'));
  };

  return (
    <div className='recipe-actions'>
      <Link
        to={`/edit/${recipe.slug}`}
        id='edit-recipe'
      >
          <span className="material-icons-round">edit</span>
      </Link>
      <button id='delete-recipe' onClick={confirmDelete}><span className="material-icons-round">delete</span></button>
    </div>
  );
};

export default RecipeActions;
