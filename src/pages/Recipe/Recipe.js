import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { RecipesContext } from '../../providers/RecipesProvider';

import Loading from '../../components/Loading/Loading';
import RecipeActions from './RecipeActions';

const Recipe = () => {

  let { user } = useContext(UserContext);
  let { recipes, recipe } = useContext(RecipesContext);

  if (recipes === 'loading' || recipe === 'loading' || !recipe) return <Loading />;

  return (
    <div className='show-recipe container'>
      <div className='recipe-header'>
        <h1>{ recipe.title }</h1>
        { user && <RecipeActions recipe={recipe} /> }
      </div>
      
      { recipe.imageName && 
        <div className='recipe-image'>
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`}
            alt={recipe.title} />
        </div>
      }

      <div className='ingredients'>
        <h2>Ingédients</h2>
        { recipe.ingredients }
      </div>

      <div className='separator'></div>

      <div className='recipe-content'>
        <h2>Préparation</h2>
        { recipe.content }
      </div>
    </div>
  );
};

export default Recipe;
