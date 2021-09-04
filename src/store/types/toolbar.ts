export const STATE_ID = "toolbar";
export const SET_FONTS = "SET_FONTS";
export const SET_ACTIVE_FONT = "SET_ACTIVE_FONT";
export const SET_FONT_SIZE = "SET_FONT_SIZE";

export type IState = {
    fonts: Array<Font>;
    activeFont: Font | null;
    fontSize: string;
};

export type Font = {
    kind: string;
    family: string;
    variant: string;
    file: string;
}

export type SetFonts = {
    type: typeof SET_FONTS;
    payload: Array<Font>;
}

export type SetActiveFont = {
    type: typeof SET_ACTIVE_FONT,
    payload: Font | null
}

export type SetFontSize = {
    type: typeof SET_FONT_SIZE,
    payload: string;
}