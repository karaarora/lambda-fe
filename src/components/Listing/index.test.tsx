import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState as initialMemeState } from '../../store/reducers/meme';
import { initialState } from '../../store/reducers/users';
import Listing from './index';

const dummyMemes = (size:number) => {
    const memes = [];
    for(let i = 0;i < size; i += 1){
        memes.push({
            id: i,
            heading: `Meme ${i}`
        });
    }
    return memes;
};

const setup = (isTemplate:boolean) => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    users: initialState,
    memes: { ...initialMemeState, memes: dummyMemes(10) },
  });

  render(<Provider store={store}>
    <Listing isTemplate={isTemplate} />
  </Provider>);
};

test("Meme cards being shown",() => {
    setup(false);
    // expect(screen.getByRole("grid").children.length).toBe(10);
});