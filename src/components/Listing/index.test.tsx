import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { combineReducers } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setMemes } from '../../store/actions/meme';
import memeReducer, { initialState as initialMemeState } from '../../store/reducers/meme';
import { initialState } from '../../store/reducers/users';
import { Meme } from '../../store/types/meme';
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

const getMockReducer = (value:any) => {
    const mockReducer = jest.fn();
    mockReducer.mockReturnValue(value);
    return mockReducer;
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