import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import memeReducer, { initialState } from '../../../store/reducers/meme';
import { initialState as initialUserState } from '../../../store/reducers/users';
import { getTestMeme, testUser } from '../../../utils/test-data';
import Title from './index';

const mockStore = configureStore([thunk]);
const history = createBrowserHistory();

const setup = (isLoadable:boolean,contentEditable:boolean, extraState:any = {}) => {
    const storeState = { users: {...initialUserState,userData: testUser}, 
    memes: {...initialState,memes: [getTestMeme("MEME")],memeData: getTestMeme("MEME"),
        selectedMeme: getTestMeme("MEME").id } };
    const loadableState = {...storeState,memes: {...storeState.memes,loading: true}};
    const store = mockStore(isLoadable? loadableState:  {...storeState,...extraState});
    
    render(<Provider store={store}>
      <Router history={history}>
        <Title contentEditable={contentEditable}>
            Test Heading
        </Title>
      </Router>
      <Toaster />
    </Provider>);

    return store;
};

test("Is Loadable", () => {
    setup(true,false);
    const title = screen.getByLabelText("title");
    expect(title.classList.contains("animate-pulse")).toBeTruthy();
});

test("Is Editable if contentEditable", () => {
    setup(false,true);
    const title = screen.getByLabelText("title");
    userEvent.click(screen.getByLabelText("title-edit-icon"));

    expect(title.getAttribute("contentEditable")).toEqual("true");
});

test("Edit Mode On/Off", () => {
    setup(false,true);
    const title = screen.getByLabelText("title");
    userEvent.click(screen.getByLabelText("title-edit-icon"));

    expect(title.getAttribute("contentEditable")).toEqual("true");

    // on blur
    userEvent.tab();
    fireEvent.focusOut(title);

    expect(title.getAttribute("contentEditable")).toEqual("false");
});

test("Title Empty", () => {
    setup(false, true);

    const title = screen.getByLabelText("title");
    userEvent.click(screen.getByLabelText("title-edit-icon"));
    
    expect(title.getAttribute("contentEditable")).toEqual("true");
    title.textContent = "";

    // on blur
    userEvent.tab();
    fireEvent.focusOut(title);

    expect(title.textContent).toContain("This is my Heading");
});