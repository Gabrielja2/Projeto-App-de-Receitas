import React from 'react';
import {screen} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import renderPath from './renderPath';

describe('test the profile page', () => {
    test('test if the Favorite page render is correct', async () => {
        const {history} = renderPath("/profile");
        const buttonLog = await screen.findByTestId("profile-logout-btn");
        expect(buttonLog).toBeInTheDocument()
        userEvent.click(buttonLog);

    });
})