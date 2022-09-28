import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

function Recipes({ food }) {
  const history = useHistory();
  const { recipes, changeRecipes, setAllButtonState, goatTrue } = useContext(DataContext);

  const recipe = Object.values(recipes);
  useEffect(() => {
    if (recipe[0] && recipe[0].length === 1) {
      if (food && !goatTrue) {
        history.push(`/foods/${recipe[0][0].idMeal}`);
      } else if (!food && !goatTrue) {
        history.push(`/drinks/${recipe[0][0].idDrink}`);
      }
    } else if (recipes.meals === null || recipes.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes.length, history, recipes, recipe, food, goatTrue]);

  useEffect(() => {
    const doFetch = async () => {
      const resp = await fetch(
        `https://www.the${
          food ? 'meal' : 'cocktail'
        }db.com/api/json/v1/1/search.php?s=`,
      );
      const json = await resp.json();
      changeRecipes(json);
      setAllButtonState(json);
    };
    doFetch();
  }, []);

  return (
    <div>
      <div className="container">
        {recipe[0]
          && recipe[0]
            .filter((_, index) => index <= +'11')
            .map((e, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <Link
                  to={ food ? `/foods/${e.idMeal}` : `/drinks/${e.idDrink}` }
                >
                  <div className="cards">
                    <button className="btn-cards" type="button">
                      <img
                        className="card-img"
                        data-testid={ `${index}-card-img` }
                        src={ food ? e.strMealThumb : e.strDrinkThumb }
                        alt="img da receita"
                      />
                      <h3 data-testid={ `${index}-card-name` }>
                        {food ? e.strMeal : e.strDrink}
                      </h3>
                    </button>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  food: PropTypes.bool,
};

Recipes.defaultProps = {
  food: false,
};

export default Recipes;
