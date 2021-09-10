import { Dispatch } from "react";
import toast from "react-hot-toast";

import { AxiosResponse } from "axios";
import { AnyAction } from "redux";

import { serialize, setCookie } from "../../utils/functions";
import request from "../../utils/request";
import { setLoader, setUserData } from "../actions/users";
import { UserData } from "../types/users";

export const registerUser = (user: UserData & { password: string }) => (
    dispatch:Dispatch<AnyAction>
):Promise<void> => request({
    url: `/register`,
    method: "POST",
    data: user
}).then((res:AxiosResponse) => {
    if(typeof res === "string") toast(res);
    dispatch(setLoader(false));
}).catch(() =>{
    dispatch(setLoader(false));
});

export const loginUser = (user: { username:string; password: string; }) => (
    dispatch:Dispatch<AnyAction>
):Promise<void> => request({
    url: `/login?${serialize(user)}`,
    method: "POST"
}).then((res:AxiosResponse) => {
    const { token } = res as any;
    if(typeof res === "string") toast(res);
    dispatch(setLoader(false));
    dispatch(setUserData(res as any));
    setCookie("me_token",token);
}).catch(() => {
    dispatch(setLoader(false));
});

