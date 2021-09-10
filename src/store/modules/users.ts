import { IModule } from "redux-dynamic-modules";

import usersReducer from "../reducers/users";
import { STATE_ID } from "../types/users";

const getUsersModule = (): IModule<typeof usersReducer> => ({
        id: STATE_ID,
        reducerMap: {
            users: usersReducer,
        },
        // Actions to fire when this module is added/removed
        // initialActions: [],
        // finalActions: []
    });

export default getUsersModule;