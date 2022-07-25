import { screen, waitFor} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderPath from './renderPath';

describe('test the FavoriteRecipes page', () => {
    test('test if the Favorite page render is correct', async () => {
        const {history} = renderPath("/foods/52771/in-progress");
        const buttonFav = await screen.findByTestId("favorite-btn");
        const button = await screen.findByTestId("finish-recipe-btn");
        const boxes = document.querySelectorAll('.teste');
        for(let i = 0; i < boxes.length; i += 1) {
          userEvent.click(boxes[i]);
        }
        expect(button).toBeEnabled();
        userEvent.click(buttonFav);
        userEvent.click(button);

        const buttonProf = await screen.findByTestId("profile-top-btn");
        userEvent.click(buttonProf);

        const buttonToFav = await screen.findByTestId("profile-favorite-btn");
        userEvent.click(buttonToFav);

        expect(history.location.pathname).toBe('/favorite-recipes');

        const buttonAll = await screen.findByTestId("filter-by-all-btn");
        const buttonFoods = await screen.findByTestId("filter-by-food-btn");
        const buttonDrinks = await screen.findByTestId("filter-by-drink-btn");
        userEvent.click(buttonAll);
        userEvent.click(buttonFoods);
        userEvent.click(buttonDrinks);

    });
})
