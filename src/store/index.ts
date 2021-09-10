import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

import getUsersModule from "./modules/users";
import usersReducer from "./reducers/users";

const store:IModuleStore<typeof usersReducer> = createStore({
    initialState: {},
    enhancers: [], 
    extensions: [getThunkExtension()],
},getUsersModule());

export default store;