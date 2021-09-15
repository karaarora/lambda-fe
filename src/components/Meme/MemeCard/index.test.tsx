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
import MemeCard from './index';

const mockStore = configureStore([thunk]);
const storeState = { users: {...initialUserState,userData: testUser}, 
memes: {...initialState,memes: [getTestMeme("MEME")],memeData: getTestMeme("MEME")} };
const store = mockStore(storeState);
const history = createBrowserHistory();
const setup = (isLoadable:boolean,type:string,customState?:any) => {

  render(<Provider store={store}>
      <Router history={history}>
        <MemeCard data={isLoadable? MemeLoadableCard : (customState || getTestMeme(type)) as any} />
      </Router>
      <Toaster />
  </Provider>);
};

test("Show Loadable Card",() => {
    setup(true,"MEME");
    expect(screen.getByLabelText("card-skeleton")).toBeInTheDocument();
});

test("Show Meme Card",() => {
    setup(false,"MEME");
    expect(screen.getByLabelText("meme-card")).toBeInTheDocument();
    expect(screen.getByText(getTestMeme("MEME").heading)).toBeInTheDocument();
});

test("Show Like/Dislike",() => {
    setup(false,"MEME");
    const isLiked = getTestMeme("MEME").likes.includes(testUser.id);
    const isDisLiked = getTestMeme("MEME").dislikes.includes(testUser.id);

    if(isLiked) {
        expect(screen.getByLabelText("like-icon").classList.contains(likeClass)).toBeTruthy();
        expect(screen.getByLabelText("dislike-icon").classList.contains(disLikeClass)).toBeFalsy();
    } 
    if(isDisLiked) {
        expect(screen.getByLabelText("like-icon").classList.contains(likeClass)).toBeFalsy();
        expect(screen.getByLabelText("dislike-icon").classList.contains(disLikeClass)).toBeTruthy();
    }
});

test("Template card dont show likes", () => {
    setup(false,"TEMPLATE");
    expect(!!document.querySelector(`[aria-label="like-icon"]`)).toBeFalsy();
    expect(!!document.querySelector(`[aria-label="dislike-icon"]`)).toBeFalsy();
});

test("Meme Clicked",() => {
    setup(false,"MEME");
    userEvent.click(screen.getByLabelText("thumbnail"));
    
    const state:any = store.getState();
    let memesState = state.memes || {};
    store.getActions().forEach((action) => {
        memesState = memeReducer(memesState,action);
    });
    expect(memesState).toEqual({...storeState.memes,memeDataLoading: true,selectedMeme: getTestMeme("MEME").id });
});

test("Template Clicked",() => {
    setup(false,"TEMPLATE");
    userEvent.click(screen.getByLabelText("thumbnail"));

    expect(history.location.pathname).toEqual(`/studio/${getTestMeme("TEMPLATE").id}`);
});

test("Data not present message",async () => {
    setup(false,"TEMPLATE",{...getTestMeme("TEMPLATE"),id: null });

    userEvent.click(screen.getByLabelText("thumbnail"));

    expect(screen.getByRole("status")).toBeInTheDocument();
});

test("Like Click",() => {
    store.clearActions();
    setup(false,"MEME");
    const isLiked = getTestMeme("MEME").likes.includes(testUser.id);
    userEvent.click(screen.getByLabelText("like-icon"));
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
    store.clearActions();
    setup(false,"MEME");

    const isDisLiked = getTestMeme("MEME").dislikes.includes(testUser.id);
    userEvent.click(screen.getByLabelText("dislike-icon"));
    if(isDisLiked) return;
    
    const state:any = store.getState();
    let memesState = state.memes || {};
    store.getActions().forEach((action) => {
        // console.log(action);
        memesState = memeReducer(memesState,action);
    });
    
    expect(memesState.memes[0].likes.includes(testUser.id)).toBeFalsy();
    expect(memesState.memes[0].dislikes.includes(testUser.id)).toBeTruthy();
    
    if(memesState.memeData)
    expect(memesState.memeData.likes.includes(testUser.id)).toBeFalsy();
    expect(memesState.memeData.dislikes.includes(testUser.id)).toBeTruthy();
});