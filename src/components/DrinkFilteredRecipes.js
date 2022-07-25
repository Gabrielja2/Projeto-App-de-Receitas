import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';

function DrinkFilteredRecipes() {
  const [categories, setCategories] = useState([]);
  const { changeRecipes, allButtonState,
    setResetFilter, resetFilter } = useContext(DataContext);

  useEffect(() => {
    const categoryFetch = async () => {
      const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const json = await resp.json();
      setCategories(json.drinks.filter((_, i) => i <= +'4'));
    };
    categoryFetch();
  }, []);

  const fetchByButtons = async (param) => {
    const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`);
    const json = await resp.json();
    if (resetFilter) {
      changeRecipes(allButtonState);
      setResetFilter(false);
    } else {
      changeRecipes(json);
      setResetFilter(true);
    }
  };

  return (
    <div className="filters-father">
      {categories
      && categories.map((e, index) => (
        <div className="cards" key={ index }>
          <button
            className="button-29"
            name={ e.strCategory }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            onClick={ ({ target }) => fetchByButtons(target.name) }
          >
            {e.strCategory}
          </button>
        </div>
      ))}
      <button
        className="button-29"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => changeRecipes(allButtonState) }
      >
        All
      </button>
    </div>
  );
}

export default DrinkFilteredRecipes;
