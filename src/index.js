import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import App from './pages/home/App';
import Login from './pages/login/Login';
import UserProvider from './providers/UserProvider';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Recipe from './pages/Recipe/Recipe';
import RecipesProvider from './providers/RecipesProvider';
import EditRecipe from './pages/editRecipe/EditRecipe';
import Categories from './pages/categories/Categories';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <RecipesProvider>
              <App />
            </RecipesProvider>
          </Route>
          <Route path={['/admin', '/login']}>
            <Login />
          </Route>
          <Route path='/add-recipe'>
            <AddRecipe />
          </Route>
          <Route path='/edit/:slug'>
            <RecipesProvider>
              <EditRecipe />
            </RecipesProvider>
          </Route>
          <Route path='/recette/:slug'>
            <RecipesProvider>
              <Recipe />
            </RecipesProvider>
          </Route>
          <Route path='/categories'>
            <RecipesProvider>
              <Categories />
            </RecipesProvider>
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
