import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [copied, setCopied] = useState(false);
  const [arrRecipes, setArrRecipes] = useState([]);

  useEffect(() => {
    const get = JSON.parse(localStorage.getItem('doneRecipes'));
    setArrRecipes(get);
  }, []);

  const copyUrl = (link) => {
    copy(link);
    setCopied(!copied);
  };

  const filter = (param) => {
    const arrDone = JSON.parse(localStorage.getItem('doneRecipes'));

    setArrRecipes(arrDone && arrDone.filter((e) => e.type === param));
  };

  return (
    <>
      <Header title="Done Recipes" bool={ false } />
      {arrRecipes && (
        <div className="father white">
          <div className="filter-father">
            <button
              className="button-29"
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => setArrRecipes(JSON.parse(localStorage
                .getItem('doneRecipes'))) }
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
              {e.tags.map((item, index) => (
                <h3 key={ index } data-testid={ `${i}-${item}-horizontal-tag` }>
                  {item}
                </h3>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DoneRecipes;
