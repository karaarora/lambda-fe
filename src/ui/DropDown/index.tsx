/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';

import { ReactComponent as DownIcon } from '../../assets/icons/down.svg';
 
const DropDown:React.FC<{ value: JSX.Element| string; onClick:(value: string) => void; addValueToStyle?: boolean; }> = (
    { children, value, onClick, addValueToStyle }):JSX.Element => {
    const [show, setShow] = useState(false);
    
    const handleClick = useCallback((e:any) => {
        if(show) {
            onClick(e.target.getAttribute('data-value'));
            setShow(false);
        }
    }, [show, onClick]);

    return <div className="relative w-4/12 flex-grow mr-2 transform transition-all 
    duration-150 ease-out" onBlur={() => setShow(false)} onClick={handleClick}
tabIndex={0}>
        <div className="flex items-center bg-white text-primary-bold rounded-3xl cursor-pointer w-100
            border border-solid border-4 border-gray-200"
            onClick={() => setShow(v => !v)}
        >
            <span aria-label="dropdown-value" className="w-4/5 truncate px-4 py-1 text-sm"
                style={addValueToStyle ? { fontFamily: value as string }: {}}>{value}</span>
            <span className="mr-2"><DownIcon /></span>
        </div>
        {show && <div className="absolute bg-white rounded-xl overflow-hidden 
        border border-solid border-4 border-gray-200 min-w-full max-w-xxs z-100">
            {children}
        </div>}
    </div>;
};

DropDown.defaultProps = {
    addValueToStyle: false
};

export default DropDown;