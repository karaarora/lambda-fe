export const STATE_ID = "users";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_LOADER = "SET_LOADER";
export const SET_ERROR = "SET_ERROR";

export type IState = {
    userData: UserData | null;
    loader: boolean;
}

export type UserData = {
    username: string;
    email: string;
    id: string;
}

export type RegisterUser = {
    type: typeof REGISTER_USER;
    payload: UserData & { password: string; }
}

export type LoginUser = {
    type: typeof LOGIN_USER;
    payload: {
        username: string;
        password: string;
    }
}

export type SetUserData = {
    type: typeof SET_USER_DATA;
    payload: UserData|null;
}

export type SetLoader = {
    type: typeof SET_LOADER;
    payload: boolean;
}