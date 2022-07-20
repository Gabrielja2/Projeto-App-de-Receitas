import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodId() {
  const { setFilteredById, filteredById,
    setRecomendations, recomendations, storage, setStorage,
    heart, setHeart, setId } = useContext(DataContext);

  const { id } = useParams();
  const url = window.location.href;
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState({});

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
  }, [filteredById]);

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

  return (
    filteredById.length && (
      <div>
        <img
          className="card-img"
          src={ filteredById[0].strMealThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{filteredById[0].strMeal}</h1>
        <h3 data-testid="recipe-category">{filteredById[0].strCategory}</h3>
        <ul>
          <li data-testid="0-ingredient-name-and-measure">
            {filteredById[0].strIngredient1}
            {filteredById[0].strMeasure1}
          </li>
          <li data-testid="1-ingredient-name-and-measure">
            {filteredById[0].strIngredient2}
            {filteredById[0].strMeasure2}
          </li>
          <li data-testid="2-ingredient-name-and-measure">
            {filteredById[0].strIngredient3}
            {filteredById[0].strMeasure3}
          </li>
          <li data-testid="3-ingredient-name-and-measure">
            {filteredById[0].strIngredient4}
            {filteredById[0].strMeasure4}
          </li>
          <li data-testid="4-ingredient-name-and-measure">
            {filteredById[0].strIngredient5}
            {filteredById[0].strMeasure5}
          </li>
          <li data-testid="5-ingredient-name-and-measure">
            {filteredById[0].strIngredient6}
            {filteredById[0].strMeasure6}
          </li>
          <li data-testid="6-ingredient-name-and-measure">
            {filteredById[0].strIngredient7}
            {filteredById[0].strMeasure7}
          </li>
          <li data-testid="7-ingredient-name-and-measure">
            {filteredById[0].strIngredient8}
            {filteredById[0].strMeasure8}
          </li>
          <li data-testid="8-ingredient-name-and-measure">
            {filteredById[0].strIngredient9}
            {filteredById[0].strMeasure9}
          </li>
          <li data-testid="9-ingredient-name-and-measure">
            {filteredById[0].strIngredient10}
            {filteredById[0].strMeasure10}
          </li>
          <li data-testid="10-ingredient-name-and-measure">
            {filteredById[0].strIngredient11}
            {filteredById[0].strMeasure11}
          </li>
          <li data-testid="11-ingredient-name-and-measure">
            {filteredById[0].strIngredient12}
            {filteredById[0].strMeasure12}
          </li>
          <li data-testid="12-ingredient-name-and-measure">
            {filteredById[0].strIngredient13}
            {filteredById[0].strMeasure13}
          </li>
          <li data-testid="13-ingredient-name-and-measure">
            {filteredById[0].strIngredient14}
            {filteredById[0].strMeasure14}
          </li>
          <li data-testid="14-ingredient-name-and-measure">
            {filteredById[0].strIngredient15}
            {filteredById[0].strMeasure15}
          </li>
          <li data-testid="15-ingredient-name-and-measure">
            {filteredById[0].strIngredient16}
            {filteredById[0].strMeasure16}
          </li>
          <li data-testid="16-ingredient-name-and-measure">
            {filteredById[0].strIngredient17}
            {filteredById[0].strMeasure17}
          </li>
          <li data-testid="17-ingredient-name-and-measure">
            {filteredById[0].strIngredient18}
            {filteredById[0].strMeasure18}
          </li>
          <li data-testid="18-ingredient-name-and-measure">
            {filteredById[0].strIngredient19}
            {filteredById[0].strMeasure19}
          </li>
          <li data-testid="19-ingredient-name-and-measure">
            {filteredById[0].strIngredient20}
            {filteredById[0].strMeasure20}
          </li>
        </ul>
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
        <p data-testid="instructions">{filteredById[0].strInstructions}</p>
        <iframe
          className="w-[560px] h-[315px] rounded-lg"
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
          >
            Continue Recipe
          </button>
        </Link>
      </div>
    )
  );
}

export default FoodId;
