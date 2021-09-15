import React from 'react';
import { useSelector } from 'react-redux';

const getValue = (value:string, tobe:string):boolean => {
    switch(tobe){
        case "null": return !value;
        case "notnull": return !!value;
        default: return value === tobe;
    }
};
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
    
    if(getValue(value,showFor))
    return children as JSX.Element;

    return null;
};

export default RestrictWrapper;