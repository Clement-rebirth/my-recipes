import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../providers/UserProvider';
import Manager from '../../services/firebase/Manager';

import Loading from '../../components/Loading/Loading';
import RecipeActions from './RecipeActions';

const Recipe = () => {

  const [recipes, setRecipes] = useState('loading');
  const [recipe, setRecipe] = useState('loading');

  let { slug } = useParams();
  let { user } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    let recipeManager = new Manager('recipes');

    recipeManager.getAll(snapshot => {
      let data = snapshot.val();
      setRecipes(data);
    });
  }, []);

  useEffect(() => {
    if (recipes === 'loading') return;

    let matchingRecipe = findMatchingRecipeWithSlug(slug, recipes);

    // no match : redirect to home page
    if (!matchingRecipe) history.replace('/');

    setRecipe(matchingRecipe);
  }, [history, recipes, slug]);

  const findMatchingRecipeWithSlug = (slug, recipes) => {

    if (!recipes) return null;

    let recipeKey = Object
      .keys(recipes)
      .filter(key => recipes[key].slug === slug)[0];
      
    // no match, the list doesn't exist
    if (!recipeKey) return null;

    const matchingRecipe = {
      ...recipes[recipeKey],
      id: recipeKey
    };

    return matchingRecipe;
  };

  if (recipes === 'loading' || recipe === 'loading') return <Loading />;

  return (
    <div className='show-recipe container'>
      <div className='recipe-header'>
        <h1>{ recipe.title }</h1>
        { user && <RecipeActions recipe={recipe} /> }
      </div>
      <div className='recipe-image'>
        <img
          src={`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`}
          alt={`Image de ${recipe.title}`} />
      </div>
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
