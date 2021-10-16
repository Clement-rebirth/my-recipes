import { off } from '@firebase/database';
import React, { createContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { findMatchingRecipeWithSlug } from '../services/findMatchingRecipeWithSlug';
import Manager from '../services/firebase/Manager';

export const RecipesContext = createContext({
  recipes: 'loading',
  recipe: 'loading'
});

const RecipesProvider = ({ children }) => {

  const [recipes, setRecipes] = useState('loading');
  const [recipe, setRecipe] = useState('loading');

  let history = useHistory();
  let { slug } = useParams();

  useEffect(() => {
    let recipeManager = new Manager('recipes');

    recipeManager.getAll(snapshot => {
      let data = snapshot.val();
      setRecipes(data);
    });

    return () => off(recipeManager.ref);
  }, [history]);

  useEffect(() => {
    if (recipes === 'loading' || !slug) return;

    let matchingRecipe = findMatchingRecipeWithSlug(slug, recipes);

    // no match : redirect to home page
    if (!matchingRecipe) history.replace('/');

    setRecipe(matchingRecipe);
  }, [history, recipes, slug]);

  return (
    <RecipesContext.Provider value={{ recipes, recipe }}>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
