import React from "react";

const OptionsSkeleton:React.FC<{ isPill?: boolean; }> = ({ isPill }):JSX.Element => (<div 
    aria-label="options-skeleton"
    className={isPill ? "mt-5":"my-20"}>
        {!isPill && <div className="text-primary-bold text-sm font-bold w-2/3 h-6 bg-grey animate-pulse" />}
        <ol className={`text-primary-normal mt-2 ${isPill ? "flex w-full overflow-scroll no-scrollbar":""}`}>
            {[...new Array(4)].map((_,index:number) => (
                <li className={isPill ? "w-20 h-10 mr-5 rounded-3xl shadow-lg bg-primary animate-pulse": 
                    // eslint-disable-next-line react/no-array-index-key
                    "w-4/3 h-6 bg-grey mb-2 animate-pulse"} key={index} />
            ))}
        </ol>
    </div>);

OptionsSkeleton.defaultProps = {
    isPill: false
};

export default OptionsSkeleton;