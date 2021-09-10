/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { ReactComponent as Download } from '../../assets/icons/download.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as LeftIcon } from '../../assets/icons/leftarrow.svg';
import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as Share } from '../../assets/icons/share.svg';
import { ReactComponent as ThumbDown } from '../../assets/icons/thumbdown.svg';
import { ReactComponent as ThumbUp } from '../../assets/icons/thumbup.svg';
import { Meme } from '../../store/types/meme';
import Image from '../Image';

const Detail:React.FC<{ 
    data:Meme|null;
    handleClose: () => void; 
    handleEdit: () => void;
}> = ({ data, handleClose, handleEdit }):JSX.Element => (
    <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center my-4 flex-none">
            <div onClick={() => handleClose()}>
                <LeftIcon className="w-8 h-8 cursor-pointer" />
            </div>
            <div className="flex items-center">
                <Eye />
                <span className="text-primary-normal font-small ml-2">{data?.view_count} Views</span>
            </div>
        </div>
        <div className="rounded-2xl h-40 w-full h-72 bg-grey flex-grow">
            <Image alt="detail" className="rounded-2xl w-full h-full object-contain" src={data?.image_url} />
        </div>
        <div className="my-2 flex-none">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <div className="text-xs text-primary-normal text-lg truncate">{data?.user_id}</div>
                    <div className="text-sm text-primary-bold font-medium text-xl truncate">{data?.heading}</div>
                </div>
                <div className="flex w-14 justify-between flex-none">
                    <ThumbUp />
                    <ThumbDown />   
                </div>
            </div>
        </div>
        <div className="flex items-center mt-2 w-24 justify-between flex-none">
            <Share />
            <Download />
            <Pencil onClick={() => handleEdit()} />
        </div>
    </div>
);

export default Detail;