import PropTypes from 'prop-types';
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

function DataProvider({ children }) {
  const USER = {
    email: '',
    password: '',
  };

  const [userData, setUserData] = useState(USER);
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [allButtonState, setAllButtonState] = useState([]);
  const [goatTrue, setGoatTrue] = useState(false);
  const [resetFilter, setResetFilter] = useState(false);
  const [filteredById, setFilteredById] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const [searched, setSearched] = useState('');
  const changeSearch = (param) => {
    setSearched(param);
  };
  const [foodFilter, setFoodFilter] = useState('');
  const [actualPage, setActualPage] = useState('');
  const [recipes, setRecipes] = useState([]);
  const changeRecipes = (param) => {
    setRecipes(param);
  };

  const fetchErro = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    const foodFetch = async () => {
      if (foodFilter === 'ingredient') {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searched}`);
        const json = await resp.json();
        changeRecipes(json);
      } else if (foodFilter === 'name') {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searched}`);
        const json = await resp.json();
        changeRecipes(json);
      } else if (foodFilter === 'firstLetter' && searched.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (foodFilter === 'firstLetter') {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searched}`);
        const json = await resp.json();
        changeRecipes(json);
      }
    };
    if (actualPage === 'food') {
      foodFetch();
    }
  }, [searched, foodFilter, actualPage]);

  useEffect(() => {
    const drinkFetch = async () => {
      if (foodFilter === 'ingredient') {
        try {
          const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searched}`);
          const json = await resp.json();
          changeRecipes(json);
        } catch (e) {
          global.alert(fetchErro);
        }
      } else if (foodFilter === 'name') {
        try {
          const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searched}`);
          const json = await resp.json();
          changeRecipes(json);
        } catch (e) {
          global.alert(fetchErro);
        }
      } else if (foodFilter === 'firstLetter' && searched.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (foodFilter === 'firstLetter') {
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searched}`);
        const json = await resp.json();
        changeRecipes(json);
      }
    };
    if (actualPage === 'drink') {
      drinkFetch();
    }
  }, [searched, foodFilter, actualPage]);

  const [storage, setStorage] = useState([]);
  useEffect(() => {
    setStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const [id, setId] = useState([]);
  const [heart, setHeart] = useState(false);
  useEffect(() => {
    const verify = storage && storage.some((e) => e.id === id);

    if (storage === null || !verify) {
      setHeart(false);
    } else if (storage !== null && verify) {
      setHeart(true);
    }
  }, [id, storage]);

  const contextValue = {
    userData,
    setUserData,
    cocktailsToken,
    mealsToken,
    setCocktailsToken,
    setMealsToken,
    searched,
    changeSearch,
    setFoodFilter,
    foodFilter,
    recipes,
    setActualPage,
    actualPage,
    changeRecipes,
    allButtonState,
    setAllButtonState,
    goatTrue,
    setGoatTrue,
    resetFilter,
    setResetFilter,
    filteredById,
    setFilteredById,
    recomendations,
    setRecomendations,
    setStorage,
    storage,
    setId,
    heart,
    setHeart,
  };

  return (
    <DataContext.Provider value={ contextValue }>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
