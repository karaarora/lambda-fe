import { CLEAR_EDITOR_STATE, ClearEditorState, SET_ACTIVE_OBJECT, SET_CANVAS, 
    SET_LOADER, SetActiveObject, SetCanvas, SetLoader } from "../types/editor";

export const setCanvas = (payload: fabric.Canvas|null):SetCanvas => ({
    type: SET_CANVAS,
    payload
});

export const setLoader = (payload: boolean):SetLoader => ({
    type: SET_LOADER,
    payload
});

export const setActiveObject = (payload: fabric.Object|null):SetActiveObject => ({
    type: SET_ACTIVE_OBJECT,
    payload
});

export const clearEditorState = ():ClearEditorState => ({
    type: CLEAR_EDITOR_STATE
});