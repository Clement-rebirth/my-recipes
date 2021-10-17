import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { getAuth, signOut } from 'firebase/auth';
import { RecipesContext } from '../../providers/RecipesProvider';
import { strContains } from '../../services/strContains';

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';

import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';

import './App.scss';

const App = () => {

  const [recipesToShow, setRecipesToShow] = useState(false);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);

  let { user, setUser, userData } = useContext(UserContext);
  let { recipes } = useContext(RecipesContext);

  useEffect(() => {

    if (recipes === 'loading' || recipes === null) return;
    if (!search) setRecipesToShow(recipes);

    let matchingRecipes = {};

    Object
      .keys(recipes)
      .filter(key => strContains(recipes[key].title, search))
      .forEach(key => matchingRecipes[key] = recipes[key]);
      
    if (Object.keys(matchingRecipes).length === 0) matchingRecipes = null;

    setNoSearchResult(matchingRecipes === null);
    setRecipesToShow(matchingRecipes);
  }, [recipes, search]);

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => setUser(false))
      .catch(error => console.error(error));
  };

  if (user === 'loading' || userData === 'loading' || recipes === 'loading') return <Loading />;

  return (
    <div className='app container'>
      <div className='top'>
        <h1>My recipes</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className='wrap'>
        <h2>Liste des recettes</h2>
        { user && <Link to='/add-recipe'>+ Add recipe</Link> }
      </div>

      { noSearchResult && 
        <NothingToShow
          className='no-recipe-to-show'
          src={noResultFoundImg}
          message='Aucun résultat ne correspond à votre recherche'
          alt='no result illustration'
        />
      }
        
      { recipesToShow && Object.keys(recipesToShow).map(key => (
        <RecipeCard
          key={key}
          title={recipesToShow[key].title}
          imageName={recipesToShow[key].imageName}
          slug={recipesToShow[key].slug}
        />
      ))}

      <footer>
        <p>Made by <span className='name'>Clément</span></p>
        <div className='admin'>
          { user 
              ? <button className='sign-out' onClick={handleSignOut}>Déconnexion</button> 
              : <Link to='/admin'>Admin</Link>
          }
          { user && <Link to='/categories'>Catégories</Link> }
        </div>
      </footer>
    </div>
  );
}

export default App;
