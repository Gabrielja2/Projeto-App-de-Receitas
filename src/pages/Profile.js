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
    <div className="bk-login">
      <Header title="Profile" bool={ false } />
      <div className="profile-father">
        {string && (<h3 data-testid="profile-email">{ string.email }</h3>) }
        <div>
          <Link to="/done-recipes">
            <button
              className="button-80"
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes

            </button>
          </Link>
        </div>
        <div>
          <Link to="/favorite-recipes">
            <button
              className="button-80"
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes

            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button
              className="button-80"
              data-testid="profile-logout-btn"
              type="button"
              onClick={ handleClick }
            >
              Logout
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
