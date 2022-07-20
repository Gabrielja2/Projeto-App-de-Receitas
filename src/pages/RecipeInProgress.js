// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const { setFilteredById, filteredById, setFoodOrDrink,
    heart, favoriteRecipe, setId, favorited } = useContext(DataContext);
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  //   const [copied, setCopied] = useState(false);
  //   const [favorited, setFavorited] = useState({});
  const url = window.location.href.substr(+'22', +'6');
  setFoodOrDrink(url);

  useEffect(() => {
    const doFetch = async () => {
      if (url === 'drinks') {
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const json = await resp.json();
        setFilteredById(json.drinks);
      } else {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const json = await resp.json();
        setFilteredById(json.meals);
      }
    };
    doFetch();
    setId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredients = filteredById.length && Object.entries(filteredById[0])
    .reduce((acc, e) => {
      if (e[0].includes('strIngredient')) {
        acc.push(e[1]);
      }
      return acc;
    }, []);

  const copyUrl = () => {
    copy(url);
    setCopied(!copied);
  };

  return (
    filteredById.length && (
      <div>
        <img
          className="card-img"
          src={ url === 'drinks' ? filteredById[0].strDrinkThumb
            : filteredById[0].strMealThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">
          { favorited.name }
        </h1>
        <div>
          <button type="button" data-testid="share-btn" onClick={ () => copyUrl() }>
            <img
              src={ shareIcon }
              alt="icone de perfil"
            />
          </button>
          {copied && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => favoriteRecipe() }
            src={ heart ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ heart ? blackHeartIcon : whiteHeartIcon }
              alt="icone de perfil"
            />
          </button>
        </div>
        <h3 data-testid="recipe-category">
          { favorited.category }
        </h3>
        <ul>
          {ingredients.filter((item) => item !== '' && item !== null).map((e, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-step` }>
              {e}
              <input type="checkbox" />
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{filteredById[0].strInstructions}</p>
        <button type="button" data-testid="finish-recipe-btn">
          Finish
        </button>
      </div>
    )
  );
}

export default RecipeInProgress;
