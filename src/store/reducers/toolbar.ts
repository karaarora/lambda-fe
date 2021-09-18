import { IState, SET_ACTIVE_FONT, SET_FONT_SIZE, SET_FONTS, SetActiveFont, SetFonts, SetFontSize } from "../types/toolbar";

export const initialState:IState = {
    fonts: [],
    activeFont: null,
    fontSize: "11"
};

const toolBarReducer = (state = initialState, action: SetFonts | SetActiveFont | SetFontSize):IState => {
    switch(action.type) {
        case SET_FONTS: {
            return {
                ...state,
                fonts: action.payload
            };
        }
        case SET_ACTIVE_FONT: {
            return {
                ...state,
                activeFont: action.payload
            };
        }
        case SET_FONT_SIZE: {
            return {
                ...state,
                fontSize: action.payload
            };
        }
        default: return state;
    }
};

export default toolBarReducer;