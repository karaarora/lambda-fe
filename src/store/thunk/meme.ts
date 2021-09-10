import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";

import { AxiosResponse } from "axios";
import { AnyAction } from "redux";

import { serialize } from "../../utils/functions";
import request from "../../utils/request";
import { setLoader as setEditorLoader } from "../actions/editor";
import { setFilter, setLoader, setMemeData, setMemeDataLoading, setMemes,
     setSortOptions, setStatusOptions, setTotalMemes } from "../actions/meme";

export const getMemes = (filters?: any | null, callback?: () => void) => (
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
    dispatch(setFilter({...filter,...rest,page: filters?.page||1}));
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
}).then((res:AxiosResponse) => {
    const { memes: { memes } } = getState();
    dispatch(setMemes([res.data,...memes]));
    dispatch(setEditorLoader(false));
}).catch(() => {
    dispatch(setEditorLoader(false));
});