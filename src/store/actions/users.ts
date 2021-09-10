import { SET_LOADER, 
    SET_USER_DATA, SetLoader, SetUserData, UserData } from "../types/users";

export const setUserData = (payload: UserData|null):SetUserData => ({
    type: SET_USER_DATA,
    payload
});

export const setLoader = (payload: boolean):SetLoader => ({
    type: SET_LOADER,
    payload
});