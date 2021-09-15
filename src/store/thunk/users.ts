import { Dispatch } from "react";
import toast from "react-hot-toast";

import { AxiosResponse } from "axios";
import { AnyAction } from "redux";

import { setCookie } from "../../utils/functions";
import request from "../../utils/request";
import { setLoader, setUserData } from "../actions/users";
import { UserData } from "../types/users";

export const registerUser = (user: UserData & { password: string }, callback?:() => void) => (
    dispatch:Dispatch<AnyAction>
):Promise<void> => request({
    url: `/register`,
    method: "POST",
    data: user
}).then((res:AxiosResponse) => {
    if(typeof res === "string") toast(res);
    dispatch(setLoader(false));
    if(callback) callback();
}).catch(() =>{
    dispatch(setLoader(false));
});

export const loginUser = (user: { username:string; password: string; },callback?:() => void) => (
    dispatch:Dispatch<AnyAction>
):Promise<void> => request({
    url: `/login`,
    method: "POST",
    data: user
}).then((res:AxiosResponse) => {
    const { token } = res as any;
    if(typeof res === "string") toast(res);
    dispatch(setLoader(false));
    if(res && token) {
        dispatch(setUserData(res as any));
        setCookie("me_token",token);
    }
    if(callback) callback();
}).catch(() => {
    dispatch(setLoader(false));
});

export const getUser = () => (
    dispatch:Dispatch<AnyAction>
):Promise<void> => request({
    url: `/getUser`,
    method: "GET"
}).then((res:AxiosResponse) => {
    dispatch(setUserData(res as any));
    dispatch(setLoader(false));
}).catch(() => {
    dispatch(setLoader(false));
});

