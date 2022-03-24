import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { RecipesContext } from '../../providers/RecipesProvider';
import remarkGfm from 'remark-gfm';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import Loading from '../../components/Loading/Loading';
import RecipeActions from './RecipeActions';
import ReactMarkdown from 'react-markdown';

import './Recipe.scss';

const Recipe = () => {

  let { user } = useContext(UserContext);
  let { recipes, recipe } = useContext(RecipesContext);

  if (recipes === 'loading' || recipe === 'loading' || !recipe) return <Loading />;

  return (
    <div className={`show-recipe container ${recipe.imageName ? '' : 'no-image'}`}>

      <Link to='/' className='top'>
        <p><img src={logo} alt='logo' className='logo' />My recipes</p>
      </Link>

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
        <h2>Ingrédients</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: 'h3', h2: 'h4', h3: 'h5' }}>
          { recipe.ingredients }
        </ReactMarkdown>
      </div>

      <div className='recipe-content'>
        <h2>Préparation</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: 'h3', h2: 'h4', h3: 'h5' }}>
          { recipe.content }
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Recipe;
