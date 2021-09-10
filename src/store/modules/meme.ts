import { IModule } from "redux-dynamic-modules";

import memeReducer from "../reducers/meme";
import { STATE_ID } from "../types/meme";

const getMemeModule = (): IModule<typeof memeReducer> => ({
        id: STATE_ID,
        reducerMap: {
            memes: memeReducer,
        },
        // Actions to fire when this module is added/removed
        // initialActions: [],
        // finalActions: []
    });

export default getMemeModule;