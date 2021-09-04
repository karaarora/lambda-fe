import React from 'react';

const ToolBarContainer:React.FC = ({ children }):JSX.Element => (
    <div className="flex items-center justify-between px-3 py-2 rounded-3xl bg-primary
     text-white max-w-3xl w-full mx-auto mt-3 h-12">
        {children}
    </div>
);

export default ToolBarContainer;