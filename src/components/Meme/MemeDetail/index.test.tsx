import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import memeReducer, { initialState } from '../../../store/reducers/meme';
import { initialState as initialUserState } from '../../../store/reducers/users';
import { disLikeClass, getTestMeme, likeClass, MemeLoadableCard, testUser } from '../../../utils/test-data';
import MemeDetail from './index';

const mockStore = configureStore([thunk]);
const history = createBrowserHistory();
const setup = (isLoadable:boolean) => {
    const storeState = { users: {...initialUserState,userData: testUser}, 
    memes: {...initialState,memes: [getTestMeme("MEME")],memeData: getTestMeme("MEME"),
        selectedMeme: getTestMeme("MEME").id } };
    const loadableState = {...storeState,memes: {...storeState.memes,memeDataLoading: true}};
    const store = mockStore(isLoadable? loadableState:  storeState);
  render(<Provider store={store}>
      <Router history={history}>
        <MemeDetail />
      </Router>
      <Toaster />
  </Provider>);
  return store;
};

test("Show Loadable Meme Detail",() => {
    setup(true);
    expect(screen.getByLabelText("meme-detail-skeleton")).toBeInTheDocument();
});

test("Show Meme Card",() => {
    setup(false);
    expect(screen.getByLabelText("meme-detail")).toBeInTheDocument();
    expect(screen.getByText(getTestMeme("MEME").heading)).toBeInTheDocument();
});

test("Show Like/Dislike",() => {
    setup(false);
    const isLiked = getTestMeme("MEME").likes.includes(testUser.id);
    const isDisLiked = getTestMeme("MEME").dislikes.includes(testUser.id);

    if(isLiked) {
        expect(screen.getByLabelText("detail-like-icon").classList.contains(likeClass)).toBeTruthy();
        expect(screen.getByLabelText("detail-dislike-icon").classList.contains(disLikeClass)).toBeFalsy();
    } 
    if(isDisLiked) {
        expect(screen.getByLabelText("detail-like-icon").classList.contains(likeClass)).toBeFalsy();
        expect(screen.getByLabelText("detail-dislike-icon").classList.contains(disLikeClass)).toBeTruthy();
    }
});

test("Like Click",() => {
    const store = setup(false);
    store.clearActions();
    const isLiked = getTestMeme("MEME").likes.includes(testUser.id);
    userEvent.click(screen.getByLabelText("detail-like-icon"));
    if(isLiked) return;

    const state:any = store.getState();
    let memesState = state.memes || {};
    store.getActions().forEach((action) => {
        memesState = memeReducer(memesState,action);
    });
    
    expect(memesState.memes[0].likes.includes(testUser.id)).toBeTruthy();
    expect(memesState.memes[0].dislikes.includes(testUser.id)).toBeFalsy();
    
    if(memesState.memeData)
    expect(memesState.memeData.likes.includes(testUser.id)).toBeTruthy();
    expect(memesState.memeData.dislikes.includes(testUser.id)).toBeFalsy();
});

test("DisLike Click",async () => {
    const store = setup(false);
    store.clearActions();

    const isDisLiked = getTestMeme("MEME").dislikes.includes(testUser.id);
    userEvent.click(screen.getByLabelText("detail-dislike-icon"));
    if(isDisLiked) return;
    
    const state:any = store.getState();
    let memesState = state.memes || {};
    
    store.getActions().forEach((action) => {
        memesState = memeReducer(memesState,action);
    });
    
    expect(memesState.memes[0].likes.includes(testUser.id)).toBeFalsy();
    expect(memesState.memes[0].dislikes.includes(testUser.id)).toBeTruthy();
    
    if(memesState.memeData)
    expect(memesState.memeData.likes.includes(testUser.id)).toBeFalsy();
    expect(memesState.memeData.dislikes.includes(testUser.id)).toBeTruthy();
});

test("Edit Click",() => {
    const store = setup(false);
    store.clearActions();

    userEvent.click(screen.getByLabelText("detail-edit-icon"));

    expect(history.location.pathname).toEqual(`/studio/${getTestMeme("MEME").id}`);
});