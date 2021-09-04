import React from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../store/types/editor';

const RestrictWrapper:React.FC<{ showFor: string; }> = ({ children, showFor }):JSX.Element|null => {
    const { activeObject } = useSelector((state: { editor: IState }) => state.editor);
    
    if(activeObject?.type === showFor)
    return children as JSX.Element;

    return null;
};

export default RestrictWrapper;