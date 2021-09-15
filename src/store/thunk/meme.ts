import { Dispatch } from "react";
import toast from "react-hot-toast";
import { RootStateOrAny } from "react-redux";

import { AxiosResponse } from "axios";
import { AnyAction } from "redux";

import { serialize } from "../../utils/functions";
import request from "../../utils/request";
import { setLoader as setEditorLoader } from "../actions/editor";
import { setFilter, setLoader, setMemeData, setMemeDataLoading, setMemes,
     setSortOptions, setStatusOptions, setTotalMemes } from "../actions/meme";
import { LikePyload } from "../types/meme";

export const getMemes = (filters: any | null, callback?: () => void) => (
    dispatch:Dispatch<AnyAction>,
    getState: () => RootStateOrAny):Promise<void> => request({
        url: `/listings${filters? `?${serialize(filters)}`: ''}`,
        method: "GET"
    }).then((res:AxiosResponse) => {
        dispatch(setLoader(false));
        const {listings ,filters : { sortOptions, statusOptions ,query, ...rest }, total } = (res as any);
        const { memes: { memes, filter } } = getState();
        dispatch(setMemes(filters?.page > 1 ? [...memes,...listings]:listings));
        dispatch(setSortOptions(sortOptions));
        dispatch(setStatusOptions(statusOptions));
        dispatch(setFilter({...filter,...rest,page: filters?.page||0}));
        dispatch(setTotalMemes(total));
        if(callback) callback();
    }).catch(() => {
        dispatch(setLoader(false));
        if(callback) callback();
    });

export const getMemeData = (id: string) => (dispatch:Dispatch<AnyAction>):Promise<void> => request({
    url: `/info?id=${id}`,
    method: "GET"
}).then((res:AxiosResponse) => {
    dispatch(setMemeData(res as any));
    dispatch(setMemeDataLoading(false));
}).catch(() => {
    dispatch(setMemeDataLoading(false));
});

export const createMeme = (data: any|null) => (
    dispatch:Dispatch<AnyAction>, 
    getState: () => RootStateOrAny):Promise<void> => request({
    url: `/save`,
    method: "POST",
    data
}).then((res:any) => {
    if(data.type === "TEMPLATE") {
        const { memes: { memes } } = getState();
        dispatch(setMemes([res.data,...memes]));
    }
    dispatch(setEditorLoader(false));
    toast.success(res?.message||"done");
}).catch(() => {
    dispatch(setEditorLoader(false));
});

export const likeMeme = ({ memeId, action ,userId}:LikePyload & { userId: string; }) => (
    dispatch:Dispatch<AnyAction>, 
    getState: () => RootStateOrAny):Promise<void> => request({
    url: `/like`,
    method: "POST",
    data: { memeId, action }
}).catch(() => {
    const { memes: { memes,memeData } } = getState();
    const memeIndex:number = memes.findIndex((m:any) => m.id === memeId);
    let newMeme;
    if(typeof memeIndex === "number"){
        const likes = memes[memeIndex].likes.filter((l:any) => l !== userId);
        const dislikes = memes[memeIndex].dislikes.filter((l:any) => l !== userId);
        if(action === "LIKE"){
            newMeme = {...memes[memeIndex],likes};
        } else {
            newMeme = {...memes[memeIndex],dislikes};
        }
        memes[memeIndex] = newMeme;
        dispatch(setMemeData({...memeData,...newMeme}));
        dispatch(setMemes(memes));
    }
});