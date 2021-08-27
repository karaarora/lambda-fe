import React from "react";

const MainContainer:React.FunctionComponent = ({ children }):JSX.Element => (
    <div className="bg-transparent flex-grow p-8 flex flex-col w-full">
        {children}
    </div>
);

export default MainContainer;