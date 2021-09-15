import { Dispatch } from "react-router/node_modules/@types/react";

import axios from "axios";
import { AnyAction } from "redux";

import { GOOGLE_FONTS_API_KEY } from "../../utils/env";
import { formatFonts } from "../../utils/fonts";
import request from "../../utils/request";
import { setMemeDataLoading } from "../actions/meme";
import { setActiveFont, setFonts } from "../actions/toolbar";
import { Font } from "../types/toolbar";

export const getFonts = () => (dispatch:Dispatch<AnyAction>):Promise<void> => axios({
            url: `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`,
            method: "GET",
        }).then((res:any) => {
            const { items } = res.data as any;
            const fonts:Font[] = formatFonts(items);
            dispatch(setFonts(fonts));
            if(fonts[0]) dispatch(setActiveFont(fonts[0]));
        });

export const uploadImage = (data: { filename:string, base64:string }, callback?:(s:string) => void) => 
    (dispatch:Dispatch<AnyAction>):Promise<void> => request({
            url: "/upload",
            method: "POST",
            data
        }).then((res:any) => {
            dispatch(setMemeDataLoading(false));
            if(callback) callback(res.url);
        }).catch(() => {
            dispatch(setMemeDataLoading(false));
        });