import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import renderPath from './renderPath';

describe('test the RecipeInProgress page', () => {
    test('test if the food page render is correct', async () => {
        const {history} = renderPath("/foods/52771/in-progress");
        const buttonShare = await screen.findByTestId("finish-recipe-btn");
        const boxes = document.querySelectorAll('.teste');
        for(let i = 0; i < boxes.length; i += 1) {
          userEvent.click(boxes[i]);
        }
        expect(buttonShare).toBeEnabled();
        userEvent.click(buttonShare);

        expect(history.location.pathname).toBe('/done-recipes');
    });
})
