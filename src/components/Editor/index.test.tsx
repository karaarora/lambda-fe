import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { fabric } from 'fabric';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setMemeData } from '../../store/actions/meme';
import editorReducer from '../../store/reducers/editor';
import memeReducer, { initialState } from '../../store/reducers/meme';
import { initialState as initialUserState } from '../../store/reducers/users';
import { getTestMeme, testFilters, testUser } from '../../utils/test-data';
import Editor from './index';

const mockStore = configureStore([thunk]);
const history = createBrowserHistory();
const setup = (addState:any) => {
    const storeState = { users: {...initialUserState,userData: testUser}, memes: initialState,...addState};
    const store = mockStore(storeState);
    
    const component = render(<Provider store={store}>
      <Router history={history}>
        <Editor />
      </Router>
      <Toaster />
    </Provider>);

    return {store , component};
};

test("Is Editor Loadable", () => {
    setup({ memes: { ...initialState, memeDataLoading: true },editor: { editorLoading: true } });

    expect(screen.getByLabelText("canvas-container")).toBeInTheDocument();
    expect(screen.getByLabelText("canvas-container").classList.contains("animate-pulse")).toBeTruthy();
});

test("Show Message if State Empty",() => {
    
    const { component } = setup({ memes: {...initialState, memeData: getTestMeme("MEME"), 
    memeDataLoading: false },editor: { editorLoading: false } });
    
    expect(screen.getByLabelText("canvas-instructions")).toBeInTheDocument();
    component.unmount();
});

test("Is Local Storage updated", () => {
    const { component } = setup({ memes: {...initialState, memeData: getTestMeme("MEME",true), 
    memeDataLoading: false },editor: { editorLoading: false, canvas: new fabric.Canvas("meme_canvas") } });

    component.unmount();
    expect(!!localStorage.getItem("ms_memeData")).toBeTruthy();
});