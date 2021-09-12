/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { ReactComponent as ThumbDown} from '../../assets/icons/thumbdown.svg';
import { ReactComponent as Thumbup} from '../../assets/icons/thumbup.svg';
import AuthWrapper from '../../components/Wrappers/AuthWrapper';
import { Meme } from '../../store/types/meme';
import Image from '../Image';

const Card:React.FC<{ 
    data: Meme; isTemplate:boolean; 
    handleClick: () => void; 
    isLiked: boolean;
    isDisLiked: boolean;
    handleLike: () => void;
    handleDisLike: () => void;
}> = ({ data, isTemplate, handleClick, isDisLiked, isLiked, handleDisLike, handleLike }):JSX.Element => (
    <div className={`inline-block bg-white rounded-lg shadow-md ${!isTemplate? 'h-auto w-full':'w-56 h-56'}
         mr-2 mb-2 transform transition-all ease-in hover:shadow-2xl`}>
        <div className={`bg-primay-normal rounded-t-lg overflow-hidden transform transition-all 
            duration-150 ease-in-out ${isTemplate ? 'h-48 bg-grey':''} cursor-pointer`} onClick={handleClick}>
            <Image alt={data?.heading} className="rounded-t-lg object-contain w-full h-full"
            src={data.thumbnail_url} />
        </div>
        <div className="p-2 cursor-default">
            {!isTemplate && <div className="text-xs text-primary-normal">{data?.user?.username}</div>}
            <div className="text-sm text-primary-bold font-medium">{data.heading}</div>
        </div>
        {!isTemplate && <AuthWrapper>
            <div className="flex mx-2 mb-3 items-center">
                <Thumbup 
                    className={`cursor-pointer w-5 hover:scale-125 transform active:scale-100 mr-2 
                    ${isLiked? "text-blue-400":"text-primary-bold"}`}
                    onClick={() => handleLike()} />
                {!!data.likes.length && <span className="text-xs text-primary-nomral">{data.likes.length}</span>}
                <ThumbDown 
                    className={`cursor-pointer w-5 hover:scale-125 transform active:scale-100 mx-2
                        ${isDisLiked? "text-red-400":"text-primary-bold"}`}
                    onClick={() => handleDisLike()} />
                {!!data.dislikes.length && <span className="text-xs text-primary-nomral">{data.dislikes.length}</span>}
            </div>
        </AuthWrapper>}
    </div>
);

export default Card;