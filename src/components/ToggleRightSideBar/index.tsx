import React, { useCallback } from 'react';

import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';

const ToggleRightSideBar:React.FC<{ sideBarRef: React.RefObject<HTMLDivElement>}> = ({ sideBarRef }) => {
    const handleSideBarToggle = useCallback(() => {
        sideBarRef.current?.classList.toggle("-left-full");
    }, [sideBarRef]);
    
    return <div className="block md:hidden lg:hidden">
        <MenuIcon className="cursor-pointer w-6 hover:scale-125 transform active:scale-100" 
            onClick={handleSideBarToggle}
        />
    </div>;
};

export default ToggleRightSideBar;