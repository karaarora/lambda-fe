import { Font, SET_ACTIVE_FONT, SET_FONT_SIZE, SET_FONTS, SetActiveFont, SetFonts, SetFontSize } from "../types/toolbar";

export const setFonts = (payload: Font[]):SetFonts => ({
    type: SET_FONTS,
    payload
});

export const setActiveFont = (payload: Font|null):SetActiveFont => ({
    type: SET_ACTIVE_FONT,
    payload
});

export const setFontSize = (payload: string):SetFontSize => ({
    type: SET_FONT_SIZE,
    payload
});