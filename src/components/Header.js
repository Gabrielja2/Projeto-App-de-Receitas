import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { DataContext } from '../context/DataContext';
import icon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, bool, btnName }) {
  const [disableSearch, setDisableSearch] = useState(true);

  const changeSearch = () => {
    setDisableSearch(!disableSearch);
  };

  return (
    <header className="header-father">
      <div className="h-btn">
        <Link to="/profile">
          <button className="btn-h" type="button">
            <img
              src={ icon }
              data-testid="profile-top-btn"
              alt="icone de perfil"
            />
          </button>
        </Link>
        {bool && (
          <button className="btn-h" type="button" onClick={ changeSearch }>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="icone de pesquisa"
            />
          </button>)}
        {!disableSearch && (
          <SearchBar btnName={ btnName } />
        )}
      </div>
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  bool: PropTypes.bool.isRequired,
  btnName: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  btnName: '',
};

export default Header;
