/* eslint-disable react/jsx-sort-props */
import React, { MouseEventHandler, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as TemplateIcon } from '../../assets/icons/template.svg';
import { setLoader } from '../../store/actions/editor';
import { createMeme } from '../../store/thunk/meme';
import { IState } from '../../store/types/editor';
import { IState as IMemeState } from '../../store/types/meme';
import { IState as IUserState } from '../../store/types/users';
import { getCanvasDetails } from '../../utils/fabric';

const Template:React.FC = () => {
    const { canvas, loading, memeData, userData } = useSelector(
        (state: { editor:IState, memes:IMemeState, users: IUserState }) => 
        ({...state.editor, ...state.memes, ...state.users}));
    const dispatch = useDispatch();

    const handleClick:MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.stopPropagation();
        if(!userData) return; 
        const { state, base64 } = getCanvasDetails(canvas as fabric.Canvas);
        // console.log(state, base64);
        dispatch(setLoader(true));
        dispatch(createMeme({
            state,
            heading: memeData?.heading||"This is my Heading",
            user_id: userData?.id||1,
            image: base64,
            type: "TEMPLATE",
        }));
    }, [canvas, dispatch, memeData?.heading, userData]);

    return <button 
        className={`rounded-3xl bg-white shadow text-primary-normal px-2 py-1 mr-2 ${loading ? "bg-gray-100 opacity-75":""}`}
        type="button"
        onClick={handleClick}
        disabled={loading}
    >
        <TemplateIcon className="h-6 w-6" />
    </button>;
};

export default Template;