import React from 'react';
import { useSelector } from 'react-redux';

const RestrictWrapper:React.FC<{ showFor: string; levels: string[] }> = ({ children, showFor, levels }):JSX.Element|null => {
    const state:any = useSelector((s) => s);
    let value:any = state;

    levels.forEach((level:string) => {
        if(value) {
            value = value[level];
        } else {
            value = state;
        }
    });
    
    if(showFor === "notnull" ? !!value : value === showFor)
    return children as JSX.Element;

    return null;
};

export default RestrictWrapper;