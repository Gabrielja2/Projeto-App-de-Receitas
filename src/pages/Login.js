import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

function Login({ history }) {
  const { userData, setUserData, mealsToken, cocktailsToken } = useContext(DataContext);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (value, name) => {
    setUserData({
      ...userData,
      [name]: value,
    });
    const regexValidation = /\S+@\w+\.\w+/;
    const finalValidation = regexValidation.test(userData.email);
    const minLength = 6;
    if (finalValidation && userData.password.length >= minLength) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: userData.email }));
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
    history.push('/foods');
  };

  return (
    <div className="father bk-login">
      <form>
        <input
          className="inputs-login"
          type="email"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ ({ target }) => handleChange(target.value, target.name) }
        />
        <input
          className="inputs-login"
          type="password"
          name="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={ ({ target }) => handleChange(target.value, target.name) }
        />
        <button
          className="button-form"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
