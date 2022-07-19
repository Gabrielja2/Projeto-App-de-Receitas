import React from 'react';
import {screen} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import renderPath from './renderPath';

describe('test the foodID page', () => {
    test('test if the recomendation painel is showing', async () => {
        renderPath("foods/52929")
        const recomendation = screen.findByTestId("0-recomendation-title");

        expect(await recomendation).toBeInTheDocument();
    });

});
