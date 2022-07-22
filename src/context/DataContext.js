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
    if (actualPage === 'food') { foodFetch(); }
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
        } catch (e) { global.alert(fetchErro); }
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
  const [favorited, setFavorited] = useState({});
  const favoriteRecipe = () => {
    const verify = storage && storage.some((e) => e.id === id);
    if (storage === null && !verify) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorited]));
      setStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else if (storage !== null && !verify) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, favorited]));
      setStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else if (verify) {
      setHeart(false);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(storage.filter((e) => e.id !== id)));
      setStorage(storage.filter((e) => e.id !== id));
    }
  };
  const [foodOrDrink, setFoodOrDrink] = useState('');
  useEffect(() => {
    if (filteredById.length && foodOrDrink === 'drinks') {
      setFavorited({
        id: filteredById[0].idDrink,
        type: 'drink',
        category: filteredById[0].strCategory,
        alcoholicOrNot: filteredById[0].strAlcoholic,
        name: filteredById[0].strDrink,
        image: filteredById[0].strDrinkThumb,
        nationality: '' });
    } else if (filteredById.length && foodOrDrink === 'foods/') {
      setFavorited({
        id: filteredById[0].idMeal,
        type: 'food',
        category: filteredById[0].strCategory,
        alcoholicOrNot: '',
        name: filteredById[0].strMeal,
        image: filteredById[0].strMealThumb,
        nationality: filteredById[0].strArea });
    }
  }, [filteredById, foodOrDrink]);
  const saveInprogressRecipes = (param1, param2) => {
    const ingredientState = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (param1 !== '' && ingredientState) {
      const value = Object.values(param1);
      localStorage.setItem('inProgressRecipes', (
        JSON.stringify({
          cocktails: {
            ...ingredientState.cocktails,
            [id]: value },
          meals: {
            ...ingredientState.meals },
        })));
    } else if (param1 === '' && ingredientState) {
      const value = Object.values(param2);
      localStorage.setItem('inProgressRecipes', (
        JSON.stringify({
          cocktails: {
            ...ingredientState.cocktails },
          meals: {
            ...ingredientState.meals,
            [id]: value },
        })));
    }
  };
  const [checks, setChecks] = useState([]);
  const verifyChecks = (nome) => {
    const arrChecks = JSON.parse(localStorage.getItem('checks'));
    if (checks && checks.includes(nome)) {
      setChecks(checks.filter((element) => element !== nome));
      localStorage.setItem('checks',
        JSON.stringify(checks.filter((element) => element !== nome)));
    } else if (!checks.includes(nome) && !arrChecks) {
      setChecks(!checks.length ? [nome] : [...checks, nome]);
      localStorage.setItem('checks', JSON.stringify([nome]));
    } else if (arrChecks) {
      localStorage.setItem('checks', JSON.stringify([...arrChecks, nome]));
      setChecks(!checks.length ? [nome] : [...checks, nome]);
    }
  };
  const ingredients = filteredById.length
  && Object.entries(filteredById[0]).reduce((acc, e) => {
    if (e[0].includes('strIngredient')) {
      acc.push(e[1]);
    }
    return acc;
  }, []);
  const [checkImg, setCheckImg] = useState('');
  const verifyImg = (url) => {
    if (url === 'drinks') {
      setCheckImg(filteredById[0].strDrinkThumb);
    } else { setCheckImg(filteredById[0].strMealThumb); }
  };
  const boxes = document.querySelectorAll('.teste');
  const arrChecks = boxes && [...boxes].every((e) => e.checked === true);
  const finishRecipes = (param) => {
    const arrRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (arrRecipes) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...arrRecipes, param]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([param]));
    }
  };
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
    favoriteRecipe,
    setFavorited,
    favorited,
    setFoodOrDrink,
    saveInprogressRecipes,
    verifyChecks,
    checks,
    ingredients,
    verifyImg,
    arrChecks,
    finishRecipes,
    checkImg };
  return (
    <DataContext.Provider value={ contextValue }>
      {children}
    </DataContext.Provider>
  );
}
DataProvider.propTypes = { children: PropTypes.node.isRequired };
export default DataProvider;
