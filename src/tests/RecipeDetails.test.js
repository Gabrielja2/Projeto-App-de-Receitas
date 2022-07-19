import React from 'react';
import {screen} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import renderPath from './renderPath';

describe('test the drinkID page', () => {
    test('test if recomendation painel is showing ', async () => {
        renderPath("/drinks/13501")
        const recomendation = screen.findByTestId("0-recomendation-title");

        expect(await recomendation).toBeInTheDocument();
    });

});
