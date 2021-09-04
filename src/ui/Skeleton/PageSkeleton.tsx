import React from 'react';

const PageSkeleton:React.FC = () => (
    <div className="flex w-screen h-screen">
        <div className={`flex-col h-screen bg-white shadow-md z-10 fixed md:sticky
            top-0 flex-none hidden lg:flex rounded-r-3xl left-0 w-72 p-10 bg-grey-200 animate-pulse"`} />
        <div className="bg-transparent flex-grow p-8 flex flex-col w-full h-screen">
            <div className="w-96 h-12 bg-white rounded-3xl bg-grey-200 animate-pulse" />
            <div className="w-full h-screen bg-white rounded-3xl mt-5 bg-grey-200 animate-pulse" />
        </div>
    </div>
);

export default PageSkeleton;