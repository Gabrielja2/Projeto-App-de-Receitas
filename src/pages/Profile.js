// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import { DataContext } from '../context/DataContext';

function Profile() {
  const string = JSON.parse(localStorage.getItem('user'));
  const handleClick = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Header title="Profile" bool={ false } />
      {string && (<h3 data-testid="profile-email">{ string.email }</h3>) }
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleClick }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
