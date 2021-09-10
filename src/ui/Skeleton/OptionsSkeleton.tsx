import React from "react";

const OptionsSkeleton:React.FC = ():JSX.Element => (<div className="my-20">
        <div className="text-primary-bold text-sm font-bold w-2/3 h-6 bg-grey animate-pulse" />
        <ol className="text-primary-normal mt-2">
            {[...new Array(4)].map((_,index:number) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="w-4/3 h-6 bg-grey mb-2 animate-pulse" key={index} />
            ))}
        </ol>
    </div>);

export default OptionsSkeleton;