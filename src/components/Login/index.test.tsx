import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Provider } from 'react-redux';

import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState } from '../../store/reducers/users';
import { getCookie } from '../../utils/functions';
import Login from './index';

const setup = () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ users: initialState });
  
  render(<Provider store={store}>
    <Login handleClose={() => {}} />
  </Provider>);
};

test("Login button disabled or not",() => {
  setup();

  expect(screen.getByTestId("login")).toBeDisabled();
  
  userEvent.type(screen.getByLabelText("user-name"), 'test');
  userEvent.type(screen.getByLabelText("password"), 'test');
  expect(screen.getByTestId("login")).toBeEnabled();
});

test('Allows the user to login successfully', () => {
  setup();
  const fakeUserResponse = {token: 'fake_user_token',username: "test"};

  // fill out the form
  userEvent.type(screen.getByLabelText("user-name"), 'test');
  userEvent.type(screen.getByLabelText("password"), 'test');
  userEvent.click(screen.getByTestId("login"));
  
  jest.spyOn(window, 'fetch').mockImplementationOnce(():any => Promise.resolve({
    json: () => Promise.resolve(fakeUserResponse),
  }).then(() => {
    expect(getCookie('me_token')).toEqual(fakeUserResponse.token);
  }));
});

test("Sign Up Clicked extra fields added or not", () => {
  setup();
  userEvent.click(screen.getByTestId("signup-toggle"));

  expect(screen.getByLabelText("email")).toBeInTheDocument();
  expect(screen.getByLabelText("confirm-password")).toBeInTheDocument();
});

test("Signup button disabled ot not", () => {
  setup();
  userEvent.click(screen.getByTestId("signup-toggle"));
  expect(screen.getByTestId("login")).toBeDisabled();
  
  userEvent.type(screen.getByLabelText("user-name"), 'test');
  userEvent.type(screen.getByLabelText("password"), 'test');
  userEvent.type(screen.getByLabelText("email"), 'test@test.com');
  userEvent.type(screen.getByLabelText("confirm-password"), 'test');
  expect(screen.getByTestId("login")).toBeEnabled();
});

test("Allows Users to Sign Up", () => {
  setup();
  userEvent.click(screen.getByTestId("signup-toggle"));

  userEvent.type(screen.getByLabelText("user-name"), 'test');
  userEvent.type(screen.getByLabelText("password"), 'test');
  userEvent.type(screen.getByLabelText("email"), 'test@test.com');
  userEvent.type(screen.getByLabelText("confirm-password"), 'test');

  userEvent.click(screen.getByTestId("login"));
  
  jest.spyOn(window, 'fetch').mockImplementationOnce(():any => Promise.resolve({
    json: () => Promise.resolve({})
  }).then(() => {
    expect(screen.getByLabelText("email")).toBeNull();
    expect(screen.getByLabelText("confirm-password")).toBeNull();
  }));
});