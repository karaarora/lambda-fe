import { Dispatch } from "react-router/node_modules/@types/react";

import { AnyAction } from "redux";

import { GOOGLE_FONTS_API_KEY } from "../../utils/env";
import { formatFonts, loadFonts } from "../../utils/fonts";
import request from "../../utils/request";
import { setActiveFont, setFonts } from "../actions/toolbar";
import { Font } from "../types/toolbar";

const getFonts = () => async (dispatch:Dispatch<AnyAction>):Promise<void> => {
        request({
            url: `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`,
            method: "GET"
        }).then((res:any) => {
            const { items } = res;
            const fonts:Font[] = formatFonts(items);
            dispatch(setFonts(fonts));
            if(fonts[0]) dispatch(setActiveFont(fonts[0]));
            loadFonts(fonts);
        });
    };

export default getFonts;