import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import memeReducer, { initialState } from '../../store/reducers/meme';
import { initialState as initialUserState } from '../../store/reducers/users';
import { debounce } from '../../utils/functions';
import { testFilters, testUser } from '../../utils/test-data';
import ListingSearch from './index';

const mockStore = configureStore([thunk]);
const history = createBrowserHistory();
const setup = () => {
    const storeState = { users: {...initialUserState,userData: testUser}, memes: 
    {...initialState,filter: testFilters }};
    const store = mockStore(storeState);
    
    render(<Provider store={store}>
      <Router history={history}>
        <ListingSearch />
      </Router>
      <Toaster />
    </Provider>);

    return store;
};

test("Is Value Visible", () => {
    setup();

    expect(screen.getByDisplayValue(testFilters.query)).toBeInTheDocument();
});

test("Update filter on Search", () => {
    const store = setup();
    
    const input = screen.getByLabelText("input");
    fireEvent.change(input, {target: {value: 'testing'}});

    const state:any = store.getState();
    let memesState = state.memes || {};
    store.getActions().forEach((action) => {
        memesState = memeReducer(memesState,action);
    });

    expect((input as any).value).toEqual("testing");
    // wait for debounce to call the function
    setTimeout(() => {
        expect(memesState.filter.query).toEqual("testing");
        expect(memesState.filter.loading).toBeTruthy();
        expect(debounce).toHaveBeenCalled();
    },400);
});