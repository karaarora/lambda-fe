import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { ReactComponent as AnnotationIcon } from '../../assets/icons/annotation.svg';
import { IState } from "../../store/types/editor";
import { IState as IMemeState } from "../../store/types/meme";
import { IState as IToolBarState } from "../../store/types/toolbar";
import { createTextBox } from "../../utils/fabric";

const TextBox:React.FC = () => {
    const { canvas,fontSize,activeFont,memeData } = useSelector((state: 
        { editor:IState, toolbar: IToolBarState, memes: IMemeState }) => 
        ({...state.editor,...state.toolbar,...state.memes }));

    const handleButtonClick = useCallback(() => {
        if(canvas) {
            createTextBox(null,canvas,
                { fontSize: parseInt(fontSize,10), fontFamily: activeFont?.family || "" });
        } else {
            toast("Some Issue Occured. Try Reloading the Page!");
        }
    }, [activeFont?.family, canvas, fontSize]);

    return <button className={`ml-2 rounded-3xl bg-white shadow text-primary-bold
         px-2 py-1 transition transform-all hover:opacity-75
         ${(!memeData?.state) ? "bg-gray-100 opacity-75 cursor-not-allowed":""}`}
        disabled={!memeData?.state}
        onClick={handleButtonClick}
        type="button"
    >
        <AnnotationIcon />
    </button>;
};

export default TextBox;