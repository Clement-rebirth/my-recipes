import React from 'react';
import { useHistory } from 'react-router';

const RecipeCard = ({ title, imageName, slug }) => {

  let history = useHistory();

  let backgroundImageGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7))';
  let backgroundImageUrl = imageName && `https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${imageName}?alt=media`;
  
  let backgroundImage = imageName ? `${backgroundImageGradient}, url(${backgroundImageUrl})` : backgroundImageGradient;

  const openRecipe = () => history.push(`/recette/${slug}`);

  return (
    <div
      onClick={openRecipe}
      className={`recipe ${imageName ? '' : 'no-image'}`}
      style={{ backgroundImage: backgroundImage }}
    >
      <h3 className='recipe-title'>{ title }</h3>
    </div>
  );
};

export default RecipeCard;
