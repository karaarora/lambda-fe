import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fabric } from 'fabric';
import { IEvent } from 'fabric/fabric-impl';

import { setActiveObject, setCanvas } from '../../store/actions/editor';
import { getMemeData } from '../../store/thunk/meme';
import { IState as IMemeState } from '../../store/types/meme';
import { IState } from '../../store/types/toolbar';
import { createCanvas, createTextBox, defaultOptions, handleActiveObjectRemove, 
    handleMouseDown, listenEvent } from '../../utils/fabric';

const Editor:React.FC = ():JSX.Element => {
    const { fontSize, activeFont, memeData, memeDataLoading } = useSelector((state: { toolbar: IState, memes: IMemeState }) => 
        ({...state.toolbar, ...state.memes}));
    const dispatch = useDispatch();
    const params:{ memeId: string; } = useParams(); 
    
    useEffect(() => {
        if(params && params.memeId)
        dispatch(getMemeData(params.memeId));
    }, [dispatch, params]);

    useEffect(() => {
        const canvas:fabric.Canvas = createCanvas('meme_canvas',{ containerClass: "mx-auto" });
        
        if(memeData?.state) {
            const state = JSON.parse(memeData?.state||"");
            canvas.loadFromJSON(state,() => {
                if(canvas.backgroundImage){ 
                    const { width, height } = canvas.backgroundImage as fabric.Image;
                    canvas.setWidth(width as number);
                    canvas.setHeight(height as number);
                }
                canvas.getObjects().forEach((object:fabric.Object)=>{
                    object.set(defaultOptions);
                });
                canvas.renderAll();
            }); 
        }
        dispatch(setCanvas(canvas));
        
        const handleDBClick = (e:any) => createTextBox(e,canvas,
            { fontSize: parseInt(fontSize,10), fontFamily: activeFont?.family || "" });

        const handleSelection = (e:IEvent<Event>) => handleMouseDown(e,(value:fabric.Object|null) => 
            dispatch(setActiveObject(value)) );
            
        const handleKeyDown = (e:KeyboardEvent) => handleActiveObjectRemove(e as any, canvas);

        document.addEventListener('keydown', handleKeyDown);
        listenEvent(canvas,"mouse:dblclick",handleDBClick);
        listenEvent(canvas,"mouse:down",handleSelection);
        (window as any).canvas = canvas; 

        return () => {
            // const { state } = getCanvasDetails(canvas);
            // setLocalStorage(ESTATE_KEY,state);
            document.removeEventListener('keydown', handleKeyDown);
            canvas.off("mouse:dblclick",handleDBClick);
            canvas.off("mouse:down",handleSelection);
            canvas.removeListeners();
            canvas.clear();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memeData?.state]);

    // const handleBlur = useCallback(() => canvas.discardActiveObject(), [canvas]);

    return <div className={`w-full h-full-minus-above bg-white rounded-3xl mt-5 flex items-center overflow-hidden relative 
        ${memeDataLoading? "animate-pulse bg-gray-50":""}`}>
        <canvas className={memeData?.state ? "":"hidden" } id="meme_canvas" />
        {!memeDataLoading && !memeData?.state && <p className={`text-base text-primary-bold font-bold px-20 w-full 
            text-center left-1/2 absolute origin-center block transform -translate-x-2/4`}>
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