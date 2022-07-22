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
    test.only('test if all checkboxes with checked true and the button is enabled', async () => {
      renderPath("/foods/52771/in-progress");
      const buttonShare = await screen.findByTestId("finish-recipe-btn");
      const boxes = document.querySelectorAll('.teste');
      for(let i = 0; i < boxes.length; i += 1) {
        userEvent.click(boxes[i]);
      }
      expect(buttonShare).toBeEnabled();
    });
    // test('test if you can copy the url from url button', async () => {
    //   renderPath("/foods/52771/in-progress");
    //   const buttonShare = await screen.findByTestId("share-btn");
    //   expect(buttonShare).toBeInTheDocument();
    //   userEvent.click(buttonShare);
    // });
})
