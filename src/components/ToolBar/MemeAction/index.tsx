/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-sort-props */
import React, { MouseEventHandler, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as SaveIcon } from '../../../assets/icons/save.svg';
import { ReactComponent as TemplateIcon } from '../../../assets/icons/template.svg';
import { ReactComponent as UploadIcon } from '../../../assets/icons/upload.svg';
import { setLoader } from '../../../store/actions/editor';
import { createMeme } from '../../../store/thunk/meme';
import { IState } from '../../../store/types/editor';
import { IState as IMemeState } from '../../../store/types/meme';
import { IState as IUserState } from '../../../store/types/users';
import { getCanvasDetails } from '../../../utils/fabric';
import { triggerResizeEvent } from '../../../utils/functions';

const ActionData = {
    "create_template": {
        icon: <TemplateIcon className="h-6 w-6" aria-label="template-icon" />,
        defaultData: { type: "TEMPLATE" },
        sameUser: "create",
        differentUser: "create"
    },
    "save_meme": {
        icon: <SaveIcon aria-label="save-icon" />,
        defaultData: { status: "SAVED", type: "MEME" },
        sameUser: "update",
        differentUser: "create"
    },
    "publish_meme": {
        icon: <UploadIcon aria-label="upload-icon" />,
        defaultData: { status: "PUBLISHED", type: "MEME" },
        sameUser: "update",
        differentUser: "create"
    }
};

const MemeAction:React.FC<{ action:"create_template"|"save_meme"|"publish_meme" }> = ({ action = "save_meme" }) => {
    const { canvas, editorLoading, memeData, userData } = useSelector(
        (state: { editor:IState, memes:IMemeState, users: IUserState }) => 
        ({...state.editor, ...state.memes, ...state.users}));
    const dispatch = useDispatch();

    const handleClick:MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        if(!userData) return; 
        const { state, base64 } = getCanvasDetails(canvas as fabric.Canvas);
        dispatch(setLoader(true));
        let newMeme:any = {
            state,
            heading: memeData?.heading||"This is my Heading",
            image: base64,
            ...ActionData[action].defaultData,
        };
        
        if(userData.id === memeData?.user?._id && ActionData[action].sameUser === "update") {
            newMeme = {...newMeme,id: memeData?.id };
        }
        dispatch(createMeme(newMeme));
        triggerResizeEvent();
    }, [action, canvas, dispatch, memeData?.heading, memeData?.id, memeData?.user?._id, userData]);

    return <button 
        className={`rounded-3xl bg-white shadow text-primary-bold px-2 py-1 mr-2
            transition transform-all hover:opacity-75 
            ${(editorLoading||!memeData?.state) ? "bg-gray-100 opacity-75 cursor-not-allowed":""}`}
        type="button"
        onClick={handleClick}
        disabled={(editorLoading||!memeData?.state)}
    >
        {ActionData[action].icon}
    </button>;
};

export default MemeAction;