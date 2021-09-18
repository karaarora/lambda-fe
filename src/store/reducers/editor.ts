import { IState, SET_ACTIVE_OBJECT, SET_CANVAS, SET_LOADER, SetActiveObject, SetCanvas, SetLoader } from "../types/editor";

export const initialState:IState = {
    canvas: null,
    activeObject: null,
    editorLoading: false
};

const editorReducer = (state = initialState, action: SetCanvas | SetLoader | SetActiveObject):IState => {
    switch(action.type) {
        case SET_CANVAS: {
            return {
                ...state,
                canvas: action.payload
            };
        }
        case SET_LOADER: {
            return {
                ...state,
                editorLoading: action.payload
            };
        }
        case SET_ACTIVE_OBJECT: {
            return {
                ...state,
                activeObject: action.payload
            };
        }
        default: return state;
    }
};

export default editorReducer;