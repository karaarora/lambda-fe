import React from 'react';

const heigthArray = ['h-56','h-40','h-48'];
const CardSkeleton:React.FC<{ isTemplate: boolean }> = ({ isTemplate }) => {
    const randomElement = heigthArray[Math.floor(Math.random() * heigthArray.length)];
    return <div aria-label="card-skeleton" className={`inline-block bg-white rounded-lg shadow-md ${isTemplate ? "w-56":"w-full"} 
            mr-4 mb-4 cursor-pointer`}>
        <div className={`bg-primay-normal rounded-t-lg ${randomElement} bg-grey animate-pulse`} />
        <div className="p-2">
            {!isTemplate && <div className="text-xs text-primary-normal animate-pulse w-1/2 h-4 bg-grey" />}
            <div className="text-sm text-primary-bold font-medium animate-pulse" />
        </div>
        {!isTemplate && <div className="flex mx-2 mb-3 w-12 justify-between animate-pulse" />}
    </div>;
};

export default CardSkeleton;