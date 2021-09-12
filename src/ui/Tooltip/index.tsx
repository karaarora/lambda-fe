import React, { useState } from 'react';

const ToolTip:React.FC<{ position: string; value:JSX.Element|string }> = 
    ({ position, value, children }:any):JSX.Element => {
        const [showToolTip, setShowToolTip] = useState(false);

        return <div className="relative"
            onMouseEnter={() => setShowToolTip(true)}
            onMouseLeave={() => setShowToolTip(false)}
        >
            {children}
            {showToolTip && <div 
                className={`absolute w-fit py-2 px-5 rounded-xl bg-white text-primary-bold ${position}
                    text-xs font-bold`}>
                {value}
            </div>}
        </div>;
    };

export default ToolTip;