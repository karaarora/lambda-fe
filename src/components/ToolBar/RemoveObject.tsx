import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { IState } from "../../store/types/editor";
import { handleActiveObjectRemove } from "../../utils/fabric";

const RemoveObject:React.FC = ():JSX.Element => {
    const { canvas } = useSelector((state: { editor:IState }) => state.editor);

    const handleButtonClick = useCallback(() => {
        if(canvas){
            handleActiveObjectRemove(null, canvas);
        }
    },[canvas]);
    
    return <button className="ml-2 rounded-3xl bg-white shadow text-primary-bold
         px-2 py-1 transition transform-all hover:opacity-75" 
        onClick={handleButtonClick}
        type="button"
    >
        <DeleteIcon />
    </button>;
};

export default RemoveObject;