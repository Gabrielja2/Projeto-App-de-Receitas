// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const {
    setFilteredById,
    filteredById,
    setFoodOrDrink,
    heart,
    favoriteRecipe,
    setId,
    favorited,
    ingredients,
    verifyChecks,
    verifyImg,
    checkImg,
    arrChecks,
  } = useContext(DataContext);
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const url = window.location.href.substr(+'22', +'6');
  const link = window.location.href;
  const refinedLink = link.slice(0, link.length - +'12');
  setFoodOrDrink(url);

  useEffect(() => {
    const progressFetch = async () => {
      if (url === 'drinks') {
        const resp = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const json = await resp.json();
        setFilteredById(json.drinks);
      } else {
        const resp = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const json = await resp.json();
        setFilteredById(json.meals);
      }
    };
    progressFetch();
    setId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyUrl = () => {
    copy(refinedLink);
    setCopied(!copied);
  };

  const storedChecks = JSON.parse(localStorage.getItem('checks'));

  return (
    filteredById.length && (
      <div>
        {verifyImg(url)}
        <img
          className="card-img"
          src={ checkImg }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{favorited.name}</h1>
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
        <h3 data-testid="recipe-category">{favorited.category}</h3>
        <ul>
          {ingredients
            .filter((item) => item !== '' && item !== null)
            .map((e, i) => (
              <div key={ i } data-testid={ `${i}-ingredient-step` }>
                <input
                  className="teste"
                  type="checkbox"
                  name={ e }
                  index={ i }
                  onChange={ ({ target: { name: nome } }) => verifyChecks(nome) }
                  checked={
                    storedChecks && storedChecks.includes(e) ? 'cut' : null
                  }
                />
                <li
                  className={
                    storedChecks && storedChecks.includes(e) ? 'cut' : null
                  }
                >
                  {e}
                </li>
              </div>
            ))}
        </ul>
        <p data-testid="instructions">{filteredById[0].strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !arrChecks }
        >
          Finish
        </button>
      </div>
    )
  );
}

export default RecipeInProgress;
