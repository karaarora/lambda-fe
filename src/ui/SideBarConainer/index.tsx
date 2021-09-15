import React, { forwardRef } from "react";

const SideBarContainer:React.FC<
    { showOnRight?: boolean; isExpanded?: boolean; ref?: React.ForwardedRef<any>  }
> = forwardRef((
    { children, showOnRight, isExpanded = true },
    ref
):JSX.Element => (
    <div className={`flex-col h-screen bg-white shadow-md z-10 fixed lg:sticky md:sticky
        top-0 flex-none ${showOnRight ? `flex rounded-l-3xl right-0 w-full
         ${isExpanded ? 'lg:w-35perc md:w-35perc': 'lg:w-1/4 md:w-1/4'} p-6`
        : `hidden lg:flex rounded-r-3xl left-0 w-2/12 p-10`}`} ref={ref}>
        {children}
    </div>
));

export default SideBarContainer;