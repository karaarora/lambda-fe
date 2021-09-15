import { IState, SET_LOADER, SET_USER_DATA, SetLoader, SetUserData } from "../types/users";

export const initialState:IState = {
    userData: null,
    loader: false
};

const usersReducer = (state = initialState, action: SetUserData|SetLoader):IState => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userData: action.payload
            };
        }
        case SET_LOADER: {
            return {
                ...state,
                loader: action.payload
            };
        }
        default: return state;
    }
};

export default usersReducer;