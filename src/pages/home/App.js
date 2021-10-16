import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { getAuth, signOut } from 'firebase/auth';
import { RecipesContext } from '../../providers/RecipesProvider';

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import RecipeCard from './RecipeCard';

import './App.scss';

const App = () => {

  let { user, setUser, userData } = useContext(UserContext);
  let { recipes } = useContext(RecipesContext);

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => setUser(false))
      .catch(error => console.error(error));
  };

  if (user === 'loading' || userData === 'loading' || recipes === 'loading') return <Loading />;

  return (
    <div className='app container'>
      <h1>My recipes</h1>

      <div className='wrap'>
        <h2>Liste des recettes</h2>
        { user && <Link to='/add-recipe'>+ Add recipe</Link> }
      </div>

      <div className='recipes'>
        {Object.keys(recipes).map(key => (
          <RecipeCard
            key={key}
            title={recipes[key].title}
            imageName={recipes[key].imageName}
            slug={recipes[key].slug} />
        ))}
      </div>

      <footer>
        <p>Made by <span className='name'>Clément</span></p>
        <div className='admin'>
          { user 
              ? <button className='sign-out' onClick={handleSignOut}>Déconnexion</button> 
              : <Link to='/admin'>Admin</Link>
          }
        </div>
      </footer>
    </div>
  );
}

export default App;
