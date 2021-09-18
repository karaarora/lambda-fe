import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import memeReducer, { initialState } from '../../store/reducers/meme';
import { initialState as initialUserState } from '../../store/reducers/users';
import { getTestOptions, testFilters, testUser } from '../../utils/test-data';
import Options from './index';

const mockStore = configureStore([thunk]);
const history = createBrowserHistory();
const setup = (isLoadable:boolean,props:{
    type: "sort" | "status";
    isPill?: boolean | undefined;
}) => {
    const storeState = { users: {...initialUserState,userData: testUser}, memes: 
    {...initialState,filter: testFilters,sortOptions: getTestOptions(4),statusOptions: null }};
    const loadableState = {...storeState,memes: {...storeState.memes,loading: true}};
    const store = mockStore(isLoadable? loadableState:  storeState);
    
    render(<Provider store={store}>
      <Router history={history}>
        <Options {...props} />
      </Router>
      <Toaster />
    </Provider>);

    return store;
};

test("Is Options Loadable", () => {
    setup(true,{ type: "status" });

    expect(screen.getByLabelText("options-skeleton")).toBeInTheDocument();
});

test("Is Options Visible",() => {
    setup(false, { type: "sort" });
    
    const orderedlist = screen.getByLabelText("list");
    expect(orderedlist.innerHTML.includes(getTestOptions(4).title)).toBeTruthy();
});

test("On Option select update active",() => {
    const store = setup(false, { type: "sort" });

    const option1 = screen.getByText(getTestOptions(4).options[0].displayText);
    userEvent.click(option1);

    const state:any = store.getState();
    let memesState = state.memes || {};
    store.getActions().forEach((action) => {
        memesState = memeReducer(memesState,action);
    });

    expect(memesState.sortOptions.options[0].isSelected).toBeTruthy();
});

test("On Option select location search updated",() => {
    const store = setup(false, { type: "sort" });
    store.clearActions();

    const option1 = screen.getByText(getTestOptions(4).options[0].displayText);
    userEvent.click(option1);

    expect(history.location.search.includes(getTestOptions(4).options[0].key)).toBeTruthy();
});