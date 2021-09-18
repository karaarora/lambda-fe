import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState as editorIState } from '../../../../store/reducers/editor';
import { initialState } from '../../../../store/reducers/toolbar';
import { testfontsList } from '../../../../utils/test-data';
import FontSelect from './index';

const mockStore = configureStore([thunk]);
const setup = () => {
    const storeState = { toolbar: {...initialState,fonts: testfontsList }, editor: editorIState  };
    const store = mockStore(storeState);
    
    render(<Provider store={store}>
        <FontSelect />
    </Provider>);

    return store;
};

test("If no activefont select first", () => {
    setup();
    // expect(screen.getByLabelText("dropdown-value")).toEqual(testfontsList[0].family);
});