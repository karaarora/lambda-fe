import React, { useState } from 'react';

const ToolTip:React.FC<{ position: string; value:JSX.Element|string }> = 
    ({ position, value, children }:any):JSX.Element => {
        const [showToolTip, setShowToolTip] = useState(false);

        return <div className="relative"
        >
            <div
                className="z-10"
                onBlur={() => setShowToolTip(false)}
                onFocus={() => setShowToolTip(true)}
                onMouseOut={() => setShowToolTip(false)}
                onMouseOver={() => setShowToolTip(true)}
            >
                {children}
            </div>
            {showToolTip && <div 
                className={`absolute w-fit py-2 px-5 rounded-xl bg-white text-primary-bold ${position}
                    text-xs font-bold`}>
                {value}
            </div>}
        </div>;
    };

export default ToolTip;