import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DataProvider from './context/DataContext';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodId from './pages/FoodId';
import DrinkId from './pages/DrinkId';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <DataProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id" component={ FoodId } />
          <Route exact path="/drinks/:id" component={ DrinkId } />
          <Route path="/foods/:id/in-progress" component={ FoodProgress } />
          <Route path="/drinks/:id/in-progress" component={ DrinkProgress } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </DataProvider>
      </Switch>
    </div>
  );
}

export default App;
