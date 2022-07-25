import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodId() {
  const { setFilteredById, filteredById,
    setRecomendations, recomendations, setFavorited, saveInprogressRecipes,
    heart, favoriteRecipe, setId, ingredients } = useContext(DataContext);

  const { id } = useParams();
  const url = window.location.href;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const resp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const json = await resp.json();
      setFilteredById(json.meals);
    };
    doFetch();
    setId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const recomendationFetch = async () => {
      const resp = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const json = await resp.json();
      setRecomendations(json.drinks);
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
        id: filteredById[0].idMeal,
        type: 'food',
        nationality: filteredById[0].strArea,
        category: filteredById[0].strCategory,
        alcoholicOrNot: '',
        name: filteredById[0].strMeal,
        image: filteredById[0].strMealThumb,
      });
    }
  }, [filteredById, setFavorited]);

  const measures = filteredById.length && Object.entries(filteredById[0])
    .reduce((acc, e) => {
      if (e[0].includes('strMeasure')) {
        acc.push(e[1]);
      }
      return acc;
    }, []);

  return (
    filteredById.length && (
      <div className="father white">
        <img
          className="card-img border"
          src={ filteredById[0].strMealThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{filteredById[0].strMeal}</h1>
        <h3 data-testid="recipe-category">{filteredById[0].strCategory}</h3>
        <ul className="list-father">
          {ingredients.filter((item) => item !== '' && item !== null).map((e, i) => (
            <li
              className="list"
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${e} ${measures[i]}`}
            </li>
          ))}
        </ul>
        <div className="m-h">
          <button
            className="button-29 m-h"
            type="button"
            data-testid="share-btn"
            onClick={ () => copyUrl() }
          >
            <img
              src={ shareIcon }
              alt="icone de perfil"
            />
          </button>
          {copied && <span>Link copied!</span>}
          <button
            className="button-29 m-h"
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
        <div className="instructions">
          <h4 data-testid="instructions">{filteredById[0].strInstructions}</h4>
        </div>
        <iframe
          className="video"
          data-testid="video"
          src={ filteredById[0].strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="recomendations-container">
          {recomendation.length
            && recomendation.map((e, i) => (
              <div
                key={ e.strDrink }
                className="recomendation-card"
                data-testid={ `${i}-recomendation-card` }
              >
                <img src={ e.strDrinkThumb } alt="img da receita" />
                <h3 data-testid={ `${i}-recomendation-title` }>{e.strDrink}</h3>
              </div>
            ))}
        </div>
        <Link to={ `/foods/${id}/in-progress` }>
          <button
            type="button"
            className="btn-footer"
            data-testid="start-recipe-btn"
            onClick={ () => ingredients && saveInprogressRecipes('',
              ingredients.filter((item) => item !== null)) }
          >
            Continue Recipe
          </button>
        </Link>
      </div>
    )
  );
}

export default FoodId;
