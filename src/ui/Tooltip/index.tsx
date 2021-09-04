import React from 'react';

const ToolTip:React.FC<{ position: string; value:JSX.Element|string }> = ({ position, value, children }):JSX.Element => 
    <div className='has-tooltip'>
        <span className={`tooltip rounded shadow-lg p-1 bg-gray-100 
            text-red-500 ${position}`}>{value}</span>
        {children}
    </div>;

export default ToolTip;