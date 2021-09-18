import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState as editorIState } from '../../../../store/reducers/editor';
import toolBarReducer, { initialState } from '../../../../store/reducers/toolbar';
import { fontSizes } from '../../../../utils/fonts';
import { testfontsList } from '../../../../utils/test-data';
import FontSizeSelect from './index';

const mockStore = configureStore([thunk]);
const setup = () => {
    const storeState = { toolbar: {...initialState,fonts: testfontsList }, 
        editor: {...editorIState, activeObject: { type: "textbox" }}  };
    const store = mockStore(storeState);
    
    render(<Provider store={store}>
        <FontSizeSelect />
    </Provider>);

    return store;
};

test("If no font size select show default", () => {
    const store = setup();

    const state = store.getState();
    let toolbarState:any = state;
    store.getActions().forEach((action) => {
        toolbarState = toolBarReducer(toolbarState, action);
    });

    expect(toolbarState.fontSize).toEqual("11");
});

test("Select a font Size", () => {
    const store = setup();
    store.clearActions();

    userEvent.click(screen.getByLabelText("dropdown-value"));
    expect(screen.getByLabelText("dropdown-items")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("dropdown-items").children[2]);
    
    const state = store.getState();
    let toolbarState:any = state;
    store.getActions().forEach((action) => {
        toolbarState = toolBarReducer(toolbarState, action);
    });

    expect(toolbarState.fontSize).toEqual(fontSizes[2].toString());
});