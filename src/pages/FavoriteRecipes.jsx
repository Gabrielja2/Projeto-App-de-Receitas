import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [arrRecipes, setArrRecipes] = useState([]);

  useEffect(() => {
    const get = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setArrRecipes(get);
  }, []);

  const copyUrl = (link) => {
    copy(link);
    setCopied(!copied);
  };

  const filter = (param) => {
    const claudio = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setArrRecipes(claudio && claudio.filter((e) => e.type === param));
  };

  const removeFavoriteRecipe = (id) => {
    const respFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes', (
      JSON.stringify(respFavorite.filter((e) => e.id !== id))
    ));
    setArrRecipes(respFavorite.filter((e) => e.id !== id));
  };

  return (
    <div className="father white">
      <Header title="Favorite Recipes" bool={ false } />
      {arrRecipes && (
        <div className="father white">
          <div className="filter-father">
            <button
              className="button-29"
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => setArrRecipes(JSON.parse(localStorage
                .getItem('favoriteRecipes'))) }
            >
              All
            </button>
            <button
              className="button-29"
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ () => filter('food') }
            >
              Foods
            </button>
            <button
              className="button-29"
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ () => filter('drink') }
            >
              Drinks
            </button>
          </div>
          {arrRecipes.map((e, i) => (
            <div className="gap" key={ i }>
              <Link to={ `/${e.type}s/${e.id}` }>
                <img
                  className="recomendation-card img border"
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt=""
                />
                <h3 data-testid={ `${i}-horizontal-top-text` }>
                  {e.type === 'food'
                    ? `${e.nationality} - ${e.category}`
                    : `${e.alcoholicOrNot}`}
                </h3>
                <h2 data-testid={ `${i}-horizontal-name` }>{e.name}</h2>
                <h3 data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</h3>
              </Link>
              <button
                className="button-29 width-btn"
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => copyUrl(`${window.location.origin}/${e.type}s/${e.id}`) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="icone de perfil" />
              </button>
              {copied && <p data-testid="oi">Link copied!</p>}
              <button
                className="button-29 width-btn"
                type="button"
                data-testid={ `${i}-horizontal-favorite-btn` }
                onClick={ () => removeFavoriteRecipe(e.id) }
                src={ blackHeartIcon }
              >
                <img
                  src={ blackHeartIcon }
                  alt="icone de perfil"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteRecipes;
