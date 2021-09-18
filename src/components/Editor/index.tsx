import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fabric } from 'fabric';

import { setActiveObject, setCanvas } from '../../store/actions/editor';
import { setMemeData } from '../../store/actions/meme';
import { getMemeData } from '../../store/thunk/meme';
import { IState as IEditorState } from '../../store/types/editor';
import { IState as IMemeState } from '../../store/types/meme';
import { IState } from '../../store/types/toolbar';
import { IState as IUsersState } from '../../store/types/users';
import { addImage, createCanvas, createTextBox, defaultOptions, 
    getCanvasDetails, handleActiveObjectRemove, 
    listenEvent } from '../../utils/fabric';
import { getLocalStorage, setLocalStorage } from '../../utils/functions';

const Editor:React.FC = ():JSX.Element => {
    const { fontSize, activeFont, memeData, memeDataLoading, 
        canvas:canvasState, editorLoading } = useSelector(
        (state: { toolbar: IState, memes: IMemeState, editor: IEditorState, users: IUsersState }) => 
        ({...state.toolbar, ...state.memes, ...state.editor,...state.users }));
    const dispatch = useDispatch();
    const params:{ memeId: string; } = useParams(); 
    
    const storeUpdatedState = useCallback((c:fabric.Canvas|null) => {
        if(!c || c?.isEmpty()) return;
        const { state } = getCanvasDetails(c);
        setLocalStorage('ms_memeData',{ heading: memeData?.heading||"", state });
    }, [memeData?.heading]);

    useEffect(() => {
        const LS_MEMEDATA = getLocalStorage('ms_memeData');
        if(params && params.memeId && !LS_MEMEDATA)
        dispatch(getMemeData(params.memeId));
    }, [dispatch, params]);

    useEffect(() => {
        const canvas:fabric.Canvas = createCanvas('meme_canvas',{ containerClass: "mx-auto" });
        
        const handleDBClick = (e:any) => createTextBox(e,canvas,
            { fontSize: parseInt(fontSize,10), fontFamily: activeFont?.family || "" });
            
        const handleKeyDown = (e:KeyboardEvent) => handleActiveObjectRemove(e as any, canvas);

        window.addEventListener('beforeunload',() => storeUpdatedState(canvas));
        document.addEventListener('keydown', handleKeyDown);
        listenEvent(canvas,"mouse:dblclick",handleDBClick);
        listenEvent(canvas,"selection:created",(e) => dispatch(setActiveObject(e.target)));
        listenEvent(canvas,"selection:updated",(e) => dispatch(setActiveObject(e.target)));
        listenEvent(canvas,"selection:cleared",() => dispatch(setActiveObject(null)));
        canvas.renderAll();
        (window as any).canvas = canvas; 
        dispatch(setCanvas(canvas));
        
        const LS_MEMEDATA = getLocalStorage('ms_memeData');
        if(LS_MEMEDATA){
            dispatch(setMemeData(LS_MEMEDATA));
        }
        return () => {
            storeUpdatedState(canvas);
            window.removeEventListener('beforeunload',() => storeUpdatedState(canvas));
            document.removeEventListener('keydown', handleKeyDown);
            canvas.off("mouse:dblclick",handleDBClick);
            canvas.off("selection:created",(e:any) => dispatch(setActiveObject(e.target)));
            canvas.off("selection:updated",(e:any) => dispatch(setActiveObject(e.target)));
            canvas.off("selection:cleared",() => dispatch(setActiveObject(null)));
            canvas.removeListeners();
            
            canvas.clear();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(memeData?.state && canvasState) {
            setLocalStorage('ms_memeData',{ heading: memeData?.heading||"", state: memeData?.state });
            canvasState.clear();
            const state = JSON.parse(memeData?.state||"");
            canvasState.loadFromJSON(state,() => {
                
                if(canvasState.backgroundImage){ 
                    const { src } = canvasState.backgroundImage as any;
                    addImage(canvasState,src);
                }

                canvasState.getObjects().forEach((object:fabric.Object|fabric.Textbox|any)=>{
                    object.set({...defaultOptions,dirty: true });
                });
                if(canvasState.size() > 0){
                    canvasState.setActiveObject(canvasState.getObjects("textbox")[0]);
                }
                canvasState.renderAll();
                storeUpdatedState(canvasState);
            }); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memeData?.state]);

    return <div aria-label="canvas-container" className={`w-full h-full-minus-above bg-white rounded-3xl 
        mt-5 flex items-center overflow-hidden ${(!memeDataLoading && !editorLoading) && !memeData?.state ? "relative":""} 
        ${memeDataLoading||editorLoading? "animate-pulse bg-gray-50":""}`}>
        <canvas id="meme_canvas" />
        {(!memeDataLoading && !editorLoading) && !memeData?.state && <p aria-label="canvas-instructions"
            className={`text-base text-primary-bold
            font-bold px-20 w-full text-center left-1/2 absolute origin-center block transform -translate-x-2/4`}
        >
                <span>
                    Hey There, Just click on the upload icon 👆
                    to add a meme template background or just choose
                    a template from your right.
                </span>
                <br/> 
                Double click <span className="animate-ping">👆</span> on the Meme to add some text{" "}
                <code className="bg-grey">Ctrl + Del</code>{" "}or{" "} 
                <code className="bg-grey">Cmd + Del</code> to delete the selected Text
            </p>}
    </div>;
};

export default Editor;