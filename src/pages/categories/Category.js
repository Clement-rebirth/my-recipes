import React, { useContext, useState } from 'react';
import { RecipesContext } from '../../providers/RecipesProvider';
import Manager from '../../services/firebase/Manager';

const Category = ({ category }) => {

  const [showEditForm, setShowEditForm] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  let { recipes } = useContext(RecipesContext);

  const handleSubmit = e => {
    e.preventDefault();

    let categoryManager = new Manager(`categories/${category.id}`);
    categoryManager.set(categoryName, () => setShowEditForm(false));
  };

  const confirmDelete = onConfirm => {
    let text;
    let quit = false;
    let wordToEnter = 'oui';

    do {
      text = prompt(`
        Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?
        (cette action est irréversible !)
        Écrivez "${wordToEnter}" pour confirmer :
      `);

      if (text === null) quit = true; // user cliked "cancel" button

      if (text === wordToEnter) deleteCategory();
    } while (!quit && text !== wordToEnter);
  };

  const deleteCategory = () => {
    // remove the category from all recipes that have it
    let recipesToUpdate = {};

    Object
      .keys(recipes)
      .filter(key => recipes[key].category === category.id)
      .forEach(key => {
        let recipe = recipes[key];
        recipe.category = 'none';
        recipesToUpdate[key] = recipe;
      });

    let recipesManager = new Manager('recipes');
    recipesManager.update(recipesToUpdate);
  
    // delete the category
    let categoryManager = new Manager(`categories/${category.id}`);
    categoryManager.delete(() => alert('La catégorie a bien été supprimée.'));
  };

  if (showEditForm) return (
    <form className='category-edit-form' onSubmit={handleSubmit}>
      <input type='text' value={categoryName} onChange={e => setCategoryName(e.target.value)} />

      <div className='actions'>
        <button type='submit'>
          <span className='material-icons-round'>check</span>
        </button>
        <button className='close-category-form' type='button' onClick={() => setShowEditForm(false)}>
          <span className='material-icons-round'>close</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className='category'>
      <p>{ category.name }</p>

      <div className='actions'>
        <button className='edit-category' onClick={() => setShowEditForm(true)}>
          <span className='material-icons-round'>edit</span>
        </button>
        <button className='delete-category' onClick={confirmDelete}>
          <span className='material-icons-round'>delete_outline</span>
        </button>
      </div>
    </div>
  );
}

export default Category;
