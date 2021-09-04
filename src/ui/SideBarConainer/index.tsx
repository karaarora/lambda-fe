import React from "react";

const SideBarContainer:React.FC<{ showOnRight?: boolean }> = ({ children, showOnRight }):JSX.Element => (
    <div className={`flex-col h-screen bg-white shadow-md z-10 fixed md:sticky
        top-0 flex-none ${showOnRight ? "flex rounded-l-3xl right-0 w-full lg:w-98 p-6"
        : "hidden lg:flex rounded-r-3xl left-0 w-72 p-10"}`}>
        {children}
    </div>
);

export default SideBarContainer;