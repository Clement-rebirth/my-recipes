import React from 'react';
import { useHistory } from 'react-router';

const RecipeCard = ({ title, imageName, slug }) => {

  let history = useHistory();

  let backgroundImageUrl = imageName && `https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${imageName}?alt=media`;
  
  const openRecipe = () => history.push(`/recette/${slug}`);

  return (
    <div
      onClick={openRecipe}
      className={`recipe ${imageName ? '' : 'no-image'}`}
      style={{ backgroundImage: imageName && `url(${backgroundImageUrl})` }}
    >
      <h3>{ title }</h3>
    </div>
  );
};

export default RecipeCard;
