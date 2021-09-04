import React from 'react';

import { ReactComponent as Download } from '../../assets/icons/download.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as Share } from '../../assets/icons/share.svg';
import { ReactComponent as ThumbDown } from '../../assets/icons/thumbdown.svg';
import { ReactComponent as ThumbUp } from '../../assets/icons/thumbup.svg';
import Meme1 from '../../assets/meme1.jpeg';

const Detail:React.FC = ():JSX.Element => (
    <div className="flex flex-col h-screen">
        <div className="flex justify-end items-center my-4 flex-none">
            <Eye />
            <span className="text-primary-normal font-small ml-2">200 Views</span>
        </div>
        <div className="rounded-2xl h-40 w-full h-72 bg-grey flex-grow">
            <img alt="detail" className="rounded-2xl w-full h-full object-contain" src={Meme1} />
        </div>
        <div className="my-2 flex-none">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <div className="text-xs text-primary-normal text-lg truncate">Creator Name</div>
                    <div className="text-sm text-primary-bold font-medium text-xl truncate">Meme Title</div>
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
            <Pencil />
        </div>
    </div>
);

export default Detail;