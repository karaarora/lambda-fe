import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState as editorIState } from '../../../store/reducers/editor';
import { initialState as memesIState } from '../../../store/reducers/meme';
import { initialState as userIState } from '../../../store/reducers/users';
import { testUser } from '../../../utils/test-data';
import MemeAction from './index';

const mockStore = configureStore([thunk]);
const setup = (props:any, addState:any = {}) => {
    const storeState = {  editor: editorIState,memes: memesIState,users: {...userIState, userData: testUser},...addState  };
    const store = mockStore(storeState);
    
    const component = render(<Provider store={store}>
        <MemeAction {...props} />
    </Provider>);

    return { store,component };
};

test("Is showing icon according to action",()=>{
    const { component } = setup({ action: "create_template"});
    expect(screen.queryByLabelText("template-icon")).toBeInTheDocument();
    expect(screen.queryByLabelText("save-icon")).toBeNull();
    expect(screen.queryByLabelText("upload-icon")).toBeNull();
    component.unmount();
    const { component:c } = setup({ action: "create_template"});
    expect(screen.queryByLabelText("template-icon")).toBeInTheDocument();
    expect(screen.queryByLabelText("save-icon")).toBeNull();
    expect(screen.queryByLabelText("upload-icon")).toBeNull();
    c.unmount();
    const { component:cp } = setup({ action: "create_template"});
    expect(screen.queryByLabelText("template-icon")).toBeInTheDocument();
    expect(screen.queryByLabelText("save-icon")).toBeNull();
    expect(screen.queryByLabelText("upload-icon")).toBeNull();
    cp.unmount();
});

test("Action Disabled by default", () => {
    setup({ action: "create_template"});
    userEvent.click(screen.getByLabelText("template-icon"));

    expect(screen.getByRole("button").classList.contains("cursor-not-allowed")).toBeTruthy();
});