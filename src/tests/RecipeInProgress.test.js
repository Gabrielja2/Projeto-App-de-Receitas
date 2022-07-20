import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import renderPath from './renderPath';

describe('test the RecipeInProgress page', () => {
    test('test if the food page render is correct', async () => {
        const { history } = renderPath("/foods/52771/in-progress");
        const buttonFavorite = await screen.findByTestId("favorite-btn");
        expect(buttonFavorite).toBeInTheDocument();
        expect(history.location.pathname).toBe('/foods/52771/in-progress');
        userEvent.click(buttonFavorite);
    });
    test('test if the drink page render is correct', async () => {
      renderPath("/foods/52771/in-progress");
      const buttonShare = await screen.findByTestId("share-btn");
      expect(buttonShare).toBeInTheDocument();
      userEvent.click(buttonShare);
    });
})
