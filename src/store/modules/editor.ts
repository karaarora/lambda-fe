import { IModule } from "redux-dynamic-modules";

import editorReducer from "../reducers/editor";
import { STATE_ID } from "../types/editor";

const getEditorModule = (): IModule<typeof editorReducer> => ({
        id: STATE_ID,
        reducerMap: {
            editor: editorReducer,
        },
        // Actions to fire when this module is added/removed
        // initialActions: [],
        // finalActions: []
    });

export default getEditorModule;