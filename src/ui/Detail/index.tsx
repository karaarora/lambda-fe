/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { ReactComponent as Download } from '../../assets/icons/download.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as LeftIcon } from '../../assets/icons/leftarrow.svg';
import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as ThumbDown } from '../../assets/icons/thumbdown.svg';
import { ReactComponent as ThumbUp } from '../../assets/icons/thumbup.svg';
import ShareMeme from '../../components/ToolBar/ShareMeme';
import AuthWrapper from '../../components/Wrappers/AuthWrapper';
import { Meme } from '../../store/types/meme';
import Image from '../Image';

const Detail:React.FC<{ 
    data:Meme|null;
    handleClose: () => void; 
    handleEdit: () => void;
    isLiked: boolean;
    isDisLiked: boolean;
    handleLike: (val:"LIKE"|"DISLIKE") => void;
    handleDownload: () => void;
}> = ({ data, handleClose, handleEdit, isLiked, isDisLiked, handleLike, handleDownload }):JSX.Element => (
    <div aria-label="meme-detail" className="flex flex-col h-screen">
        <div className="flex justify-between items-center my-4 flex-none">
            <div onClick={() => handleClose()}>
                <LeftIcon className="cursor-pointer w-8 h-8 hover:scale-125 transform active:scale-100"  />
            </div>
            <div className="flex items-center">
                <Eye />
                <span className="text-primary-normal font-small ml-2">{data?.view_count} Views</span>
            </div>
        </div>
        <div className="rounded-2xl h-40 w-full h-72 bg-grey flex-grow overflow-y-scroll no-scrollbar">
            <Image alt="detail" className="rounded-2xl w-full h-full object-contain" src={data?.image_url} />
        </div>
        <div className="my-2 flex-none">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <div className="text-xs text-primary-normal text-lg truncate">{data?.user?.username}</div>
                    <div className="text-sm text-primary-bold font-medium text-xl truncate">{data?.heading}</div>
                </div>
                <AuthWrapper>
                    <div className="flex justify-between flex-none">
                        <ThumbUp 
                            aria-label="detail-like-icon"
                            className={`cursor-pointer w-6 hover:scale-125 transform active:scale-100 mr-2 
                            ${isLiked? "text-blue-400":"text-primary-bold"}`}
                            onClick={() => handleLike("LIKE")} />
                        {!!data?.likes.length && <span className="text-sm text-primary-nomral">
                            {data?.likes.length}</span>}
                        <ThumbDown 
                            aria-label="detail-dislike-icon"
                            className={`cursor-pointer w-6 hover:scale-125 transform active:scale-100 mx-2
                                ${isDisLiked? "text-red-400":"text-primary-bold"}`}
                            onClick={() => handleLike("DISLIKE")} />
                        {!!data?.dislikes.length && <span className="text-sm text-primary-nomral">
                            {data?.dislikes.length}</span>} 
                    </div>
                </AuthWrapper>
            </div>
        </div>
        <div className="flex items-center mt-2 w-24 justify-between flex-none">
            <ShareMeme link={data?.image_url||""} />
            <Download
                className="cursor-pointer w-6 hover:scale-125 transform active:scale-100"  
                onClick={() => handleDownload()}
            />
            <Pencil aria-label="detail-edit-icon" 
                className="cursor-pointer w-6 hover:scale-125 transform active:scale-100"  onClick={() => handleEdit()} />
        </div>
    </div>
);

export default Detail;