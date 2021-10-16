export const findMatchingRecipeWithSlug = (slug, recipes) => {

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
