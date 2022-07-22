import { screen, waitFor} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderPath from './renderPath';

describe('test the DoneRecipes page', () => {
    test('test if the Done page render is correct', async () => {
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
    test.only('test if the filter buttons are working', async () => {
        const {history} = renderPath("/foods/52771/in-progress");
        const buttonShare = await screen.findByTestId("finish-recipe-btn");
        const boxes = document.querySelectorAll('.teste');
        for(let i = 0; i < boxes.length; i += 1) {
          userEvent.click(boxes[i]);
        }
        expect(buttonShare).toBeEnabled();
        userEvent.click(buttonShare);

        const foodBtn = await screen.findByTestId("filter-by-food-btn");
        const drinkBtn = await screen.findByTestId("filter-by-drink-btn");
        const allBtn = await screen.findByTestId("filter-by-all-btn");
        const Btn = await screen.findByTestId("0-horizontal-share-btn");
        userEvent.click(Btn);
        await waitFor(() => expect(screen.findByTestId("oi")).toBeInTheDocument());
        userEvent.click(foodBtn);
        userEvent.click(drinkBtn);
        userEvent.click(allBtn);
    });
})
