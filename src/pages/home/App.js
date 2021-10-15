import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { getAuth, signOut } from 'firebase/auth';
import Manager from '../../services/firebase/Manager';

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

import './App.scss';

const App = () => {

  const [recipes, setRecipes] = useState('loading');

  let { user, setUser, userData } = useContext(UserContext);

  useEffect(() => {
    let recipeManager = new Manager('recipes');

    recipeManager.getAll(snapshot => {
      let data = snapshot.val();
      setRecipes(data);
    });
  }, []);

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
          <div key={key} className='recipe'>
            <h3>{ recipes[key].title }</h3>
          </div>
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
