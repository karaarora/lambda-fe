import { IModule } from "redux-dynamic-modules";

import toolBarReducer from "../reducers/toolbar";
import { STATE_ID } from "../types/toolbar";

const getToolBarModule = (): IModule<typeof toolBarReducer> => ({
        id: STATE_ID,
        reducerMap: {
            toolbar: toolBarReducer,
        },
        // Actions to fire when this module is added/removed
        // initialActions: [],
        // finalActions: []
    });

export default getToolBarModule;