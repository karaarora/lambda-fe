import { CLEAR_MEME_STATE, ClearMemeState, IState, SET_FILTERS, SET_LOADER,
    SET_MEME_DATA, SET_MEME_DATA_LOADING, SET_MEMES, SET_SELECTED_MEME, SET_SORT_OPTIONS, SET_STATUS_OPTIONS, 
    SET_TOTAL_MEMES, SetFilters, SetLoader, SetMemeData, SetMemeDataLoading, SetMemes, 
    SetSelectedMeme, SetSortOptions, SetStatusOptions, SetTotalMemes } from "../types/meme";

export const initialState:IState = {
    memes: [],
    memeData: null,
    filter: null,
    memeDataLoading: false,
    selectedMeme: "",
    sortOptions: null,
    statusOptions: null,
    loading: false,
    totalMemes: 0
};

const memeReducer = (state = initialState, action: SetMemes | SetFilters | SetLoader 
    | SetMemeData | SetMemeDataLoading | SetSelectedMeme | SetSortOptions | SetStatusOptions
    | SetTotalMemes | ClearMemeState):IState => {
    switch(action.type) {
        case SET_MEMES: {
            return {
                ...state,
                memes: action.payload
            };
        }
        case SET_FILTERS: {
            return {
                ...state,
                filter: action.payload
            };
        }
        case SET_LOADER: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case SET_SELECTED_MEME: {
            return {
                ...state,
                selectedMeme: action.payload
            };
        }
        case SET_MEME_DATA: {
            return {
                ...state,
                memeData: action.payload
            };
        }
        case SET_SORT_OPTIONS: {
            return {
                ...state,
                sortOptions: action.payload
            };
        }
        case SET_STATUS_OPTIONS: {
            return {
                ...state,
                statusOptions: action.payload
            };
        }
        case SET_MEME_DATA_LOADING: {
            return {
                ...state,
                memeDataLoading: action.payload
            };
        }
        case SET_TOTAL_MEMES: {
            return {
                ...state,
                totalMemes: action.payload
            };
        }
        case CLEAR_MEME_STATE: {
            return initialState;
        }
        default: return state;
    }
};

export default memeReducer;