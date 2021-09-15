import React from 'react';

const ListingContainer:React.FC<{ isCollapsed?: boolean; ref: React.ForwardedRef<unknown> }> = 
    React.forwardRef(({ children }, ref):JSX.Element => (
    <div 
        aria-label="memes-listing" 
        className="overflow-y-scroll p-2 mt-4"
        ref={ref as React.LegacyRef<HTMLDivElement>}
    >
        {children}
    </div>
));

export default ListingContainer;
