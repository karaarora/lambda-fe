export const STATE_ID = "memes";
export const SET_MEMES = "SET_MEMES";
export const SET_FILTERS = "SET_FILTERS";
export const SET_MEME_DATA = "SET_MEME_DATA";
export const SET_MEME_DATA_LOADING = "SET_MEME_DATA_LOADING";
export const SET_SELECTED_MEME = "SET_SELECTED_MEME";
export const SET_SORT_OPTIONS = "SET_SORT_OPTIONS";
export const SET_STATUS_OPTIONS = "SET_STATUS_OPTIONS";
export const SET_LOADER = "SET_LOADER";
export const SET_TOTAL_MEMES = "SET_TOTAL_MEMES";
export const CLEAR_MEME_STATE = "CLEAR_MEME_STATE";

export type IState = {
    memes: Meme[];
    memeData: Meme | null;
    selectedMeme: string;
    filter: Filters | null;
    sortOptions: {
        title: string;
        options: Options[];
    } | null;
    statusOptions: {
        title: string;
        options: Options[];
    } | null;
    memeDataLoading: boolean;
    loading: boolean;
    totalMemes: number;
};

export type SetMemes = {
    type: typeof SET_MEMES;
    payload: Meme[]
}

export type SetFilters = {
    type: typeof SET_FILTERS;
    payload: Filters | null;
}

export type SetLoader = {
    type: typeof SET_LOADER;
    payload: boolean;
} 

export type SetMemeData = {
    type: typeof SET_MEME_DATA;
    payload: Meme | null;
}

export type SetMemeDataLoading = {
    type: typeof SET_MEME_DATA_LOADING;
    payload: boolean;
} 

export type SetSelectedMeme = {
    type: typeof SET_SELECTED_MEME;
    payload: string;
}

export type SetSortOptions = {
    type: typeof SET_SORT_OPTIONS;
    payload: { 
        title: string;
        options: Options[];
    } | null
}

export type SetStatusOptions = {
    type: typeof SET_STATUS_OPTIONS;
    payload: { 
        title: string;
        options: Options[];
    } | null
}

export type Options = {
    displayText: string; 
    key: string; 
    isSelected: boolean;
}

export type Filters = {
    sort?: string;
    status?: "SAVED"|"PUBLISHED",
    query?: string;
    page?: number;
    showAllMemes?: boolean;
    type?: "TEMPLATE"|"MEME"
}

export type Meme = {
    id: string;
    heading: string;
    likes: string[];
    dislikes: string[];
    user: {
        _id: string;
        username: string;
    }
    thumbnail_url: string;
    image_url: string;
    view_count: number;
    state?: string;
    type: string;
    status: "SAVED"|"PUBLISHED"
}

export type SetTotalMemes = {
    type: typeof SET_TOTAL_MEMES;
    payload: number;
}

export type ClearMemeState = {
    type: typeof CLEAR_MEME_STATE;
}

export type LikePyload = {
    memeId: string;
    action: "LIKE"|"DISLIKE"|"UNLIKE"|"UNDISLIKE"
}