import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState } from '../../store/reducers/users';
import { testUser } from '../../utils/test-data';
import User from './index';

const history = createBrowserHistory();

const mockStore = configureStore([thunk]);

const setup = (isTemplate:boolean,loading:boolean,userData:any) => {
    const storeState = { users: {...initialState,loader:loading,userData  } };
    const store = mockStore(storeState);
    
    const component = render(<Provider store={store}>
        <Router history={history}>
            <User isTemplate={isTemplate} />
        </Router>
    </Provider>);

    return { store,component };
};

test("Is Login by default", () => {
    setup(false,false,null);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toEqual("Login");
});

test("Is Loadable", () => {
    setup(false,true,null);
    expect(screen.queryByRole("button")).toBeNull();
});

test("If User Present Show Avatar",() => {
    setup(false,false,testUser);

    expect(screen.queryByLabelText("avatar")).toBeTruthy();
    expect(screen.queryByLabelText("avatar")?.textContent?.includes(testUser.username)).toBeTruthy();
});

test("If User Present and logout clicked", ()=>{
    setup(false,false,testUser);
    const {location} = window;
    delete window.location;
    
    window.location = {
        ...location,
        reload: jest.fn()
    };
    expect(screen.queryByLabelText("avatar")).toBeTruthy();
    userEvent.click(screen.getByLabelText("logout"));
    
    expect(window.location.reload).toHaveBeenCalled();

});