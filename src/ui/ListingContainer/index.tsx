import React from 'react';

const ListingContainer:React.FC<{ isCollapsed?: boolean; isMasonry?: boolean; }> = (
    { children, isCollapsed = false, isMasonry = true }
):JSX.Element => (
    <div className={isMasonry ? `py-5 ${isCollapsed ? `sm:masonry-1-col md:masonry-2-col lg:masonry-3-col`
        : `masonry-1-col sm:masonry-2-col md:masonry-3-col lg:masonry-4-col
        xl:masonry-5-col 2xl:masonry-6-col`} 
        box-border mx-auto before:box-inherit after:box-inherit`: "flex flex-wrap overflow-y-scroll justify-center p-2 mt-4"}>
        {children}
    </div>
);

export default ListingContainer;
