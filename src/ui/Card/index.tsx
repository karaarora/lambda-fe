/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { ReactComponent as ThumbDown} from '../../assets/icons/thumbdown.svg';
import { ReactComponent as Thumbup} from '../../assets/icons/thumbup.svg';
import { Meme } from '../../store/types/meme';
import Image from '../Image';

const Card:React.FC<{ data: Meme; isTemplate:boolean; handleClick: () => void; }> = 
    ({ data, isTemplate, handleClick }):JSX.Element => (
    <div className={`inline-block bg-white rounded-lg shadow-md ${!isTemplate? 'h-auto w-full':'w-56 h-56'}
         mr-2 mb-2 transform transition-all ease-in hover:shadow-2xl`}>
        <div className={`bg-primay-normal rounded-t-lg overflow-hidden transform transition-all 
            duration-150 ease-in-out ${isTemplate ? 'h-48 bg-grey':''} cursor-pointer`} onClick={handleClick}>
            <Image alt={data?.heading} className="rounded-t-lg object-contain w-full h-full"
            src={data.thumbnail_url} />
        </div>
        <div className="p-2 cursor-default">
            {!isTemplate && <div className="text-xs text-primary-normal">{data.user_id}</div>}
            <div className="text-sm text-primary-bold font-medium">{data.heading}</div>
        </div>
        {!isTemplate && <div className="flex mx-2 mb-3 w-12 justify-between cursor-pointer">
            <ThumbDown />
            <Thumbup />
        </div>}
    </div>
);

export default Card;