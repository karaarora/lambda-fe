/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { DItem } from './types';

const DropDownItem:React.FC<{ items: DItem[]; addValueToStyle?: boolean; }> = ({ items, addValueToStyle }):JSX.Element => <div 
    aria-label="dropdown-items" className="max-h-60 overflow-y-scroll shadow w-full">
        {items.map(({ name }:DItem) => (
            <div className="truncate w-full text-primary-normal py-2 
                px-4 text-xs hover:bg-gray-200 cursor-pointer" 
                data-value={name} key={name} style={addValueToStyle ? { fontFamily: name }:{}}>
                {name}
            </div>
        ))}
    </div>;

DropDownItem.defaultProps = {
    addValueToStyle: false
};

export default DropDownItem;