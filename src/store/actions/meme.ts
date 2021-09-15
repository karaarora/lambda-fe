import { CLEAR_MEME_STATE, ClearMemeState, Filters, Meme, 
    Options, SET_FILTERS, SET_LOADER, SET_MEME_DATA, SET_MEME_DATA_LOADING, SET_MEMES, 
    SET_SELECTED_MEME, SET_SORT_OPTIONS, SET_STATUS_OPTIONS, SET_TOTAL_MEMES, SetFilters, SetLoader, 
    SetMemeData, 
    SetMemeDataLoading,
    SetMemes,
    SetSelectedMeme,
    SetSortOptions,
    SetStatusOptions,
    SetTotalMemes} from "../types/meme";

export const setMemes = (payload: Meme[]):SetMemes => ({
    type: SET_MEMES,
    payload
});

export const setFilter = (payload: Filters | null):SetFilters => ({
    type: SET_FILTERS,
    payload
});

export const setLoader = (payload: boolean):SetLoader => ({
    type: SET_LOADER,
    payload
});

export const setMemeData = (payload: Meme | null):SetMemeData => ({
    type: SET_MEME_DATA,
    payload
});

export const setMemeDataLoading = (payload: boolean):SetMemeDataLoading => ({
    type: SET_MEME_DATA_LOADING,
    payload
});

export const setSelectedMeme = (payload: string):SetSelectedMeme => ({
    type: SET_SELECTED_MEME,
    payload
});

export const setSortOptions = (payload: {
    title: string;
    options: Options[]
}|null):SetSortOptions => ({
    type: SET_SORT_OPTIONS,
    payload
});

export const setStatusOptions = (payload: {
    title: string;
    options: Options[]
}|null):SetStatusOptions => ({
    type: SET_STATUS_OPTIONS,
    payload
});

export const setTotalMemes = (payload: number):SetTotalMemes => ({
    type: SET_TOTAL_MEMES,
    payload
});

export const clearMemeState = ():ClearMemeState => ({
    type: CLEAR_MEME_STATE
});