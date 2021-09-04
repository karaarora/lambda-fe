import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

type IState = {
    memes: []
}

const store:IModuleStore<IState> = createStore({
    initialState: {},
    enhancers: [], 
    extensions: [getThunkExtension()],
});

export default store;