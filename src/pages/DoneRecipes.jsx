// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Header from '../components/Header';
// import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  // const {
  //   setCopied,
  //   copied,
  // } = useContext(DataContext);
  const [copied, setCopied] = useState(false);
  const arrRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const copyUrl = (link) => {
    copy(link);
    setCopied(!copied);
  };

  return (
    arrRecipes && (
      <div>
        <Header title="Done Recipes" bool={ false } />
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
        {arrRecipes.map((e, i) => (
          <div key={ i }>
            <img
              className="recomendation-card img"
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
            <button
              type="button"
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ () => copyUrl(`${window.location.origin}/${e.type}s/${e.id}`) }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="icone de perfil" />
            </button>
            {copied && <span>Link copied!</span>}
            {e.tags.map((item, index) => (
              <h3 key={ index } data-testid={ `${i}-${item}-horizontal-tag` }>
                {item}
              </h3>
            ))}
          </div>
        ))}
      </div>
    )
  );
}

export default DoneRecipes;
