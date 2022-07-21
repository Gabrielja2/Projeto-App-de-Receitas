// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinkId() {
  const {
    setFilteredById,
    filteredById,
    setRecomendations,
    recomendations,
    saveInprogressRecipes,
    heart,
    favoriteRecipe,
    setId,
    setFavorited,
  } = useContext(DataContext);

  const { id } = useParams();
  const url = window.location.href;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const resp = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const json = await resp.json();
      setFilteredById(json.drinks);
    };
    doFetch();
    setId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const recomendationFetch = async () => {
      const resp = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const json = await resp.json();
      setRecomendations(json.meals);
    };
    recomendationFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyUrl = () => {
    copy(url);
    setCopied(!copied);
  };

  const recomendation = recomendations.filter((_, index) => index <= +'5');
  useEffect(() => {
    if (filteredById.length) {
      setFavorited({
        id: filteredById[0].idDrink,
        type: 'drink',
        category: filteredById[0].strCategory,
        alcoholicOrNot: filteredById[0].strAlcoholic,
        name: filteredById[0].strDrink,
        image: filteredById[0].strDrinkThumb,
        nationality: '',
      });
    }
  }, [filteredById, setFavorited]);

  const ingredients = filteredById.length
    && Object.entries(filteredById[0]).reduce((acc, e) => {
      if (e[0].includes('strIngredient')) {
        acc.push(e[1]);
      }
      return acc;
    }, []);

  const measures = filteredById.length
    && Object.entries(filteredById[0]).reduce((acc, e) => {
      if (e[0].includes('strMeasure')) {
        acc.push(e[1]);
      }
      return acc;
    }, []);

  return (
    filteredById.length && (
      <div>
        <img
          className="card-img"
          src={ filteredById[0].strDrinkThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{filteredById[0].strDrink}</h1>
        <h3 data-testid="recipe-category">{filteredById[0].strCategory}</h3>
        <h4 data-testid="recipe-category">{filteredById[0].strAlcoholic}</h4>
        <ul>
          {ingredients
            .filter((item) => item !== '' && item !== null)
            .map((e, i) => (
              <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {`${e} ${measures[i]}`}
              </li>
            ))}
        </ul>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyUrl() }
          >
            <img src={ shareIcon } alt="icone de perfil" />
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
        <p data-testid="instructions">{filteredById[0].strInstructions}</p>
        <div className="recomendations-container">
          {recomendation.length
            && recomendation.map((e, i) => (
              <div
                key={ i }
                className="recomendation-card"
                data-testid={ `${i}-recomendation-card` }
              >
                <img src={ e.strMealThumb } alt="img da receita" />
                <h3 data-testid={ `${i}-recomendation-title` }>{e.strMeal}</h3>
              </div>
            ))}
        </div>
        <Link to={ `/drinks/${id}/in-progress` }>
          <button
            type="button"
            className="btn-footer"
            data-testid="start-recipe-btn"
            onClick={ () => saveInprogressRecipes(
              ingredients.filter((item) => item !== '' && item !== null),
            ) }
          >
            Continue Recipe
          </button>
        </Link>
      </div>
    )
  );
}

export default DrinkId;
