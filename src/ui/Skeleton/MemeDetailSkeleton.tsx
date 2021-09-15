import React from "react";

const MemeDetailSkeleton:React.FC = ():JSX.Element => (
    <div aria-label="meme-detail-skeleton" className="flex flex-col h-screen">
        <div className="my-4 flex-none w-full h-8 bg-grey animate-pulse" />
        <div className="rounded-2xl w-full bg-grey flex-grow animate-pulse" />
        <div className="my-2 flex-none">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <div className="w-40 h-8 bg-grey animate-pulse" />
                    <div className="w-20 mt-2 h-8 bg-grey animate-pulse" />
                </div>
            </div>
        </div>
    </div>
);

export default MemeDetailSkeleton;