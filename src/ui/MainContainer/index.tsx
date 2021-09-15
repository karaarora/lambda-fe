import React, { HTMLAttributes } from "react";

const MainContainer:React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className }):JSX.Element => (
    <div className={`bg-transparent flex-grow flex flex-col w-full h-screen overflow-y-scroll ${className}`}>
        {children}
    </div>
);

export default MainContainer;