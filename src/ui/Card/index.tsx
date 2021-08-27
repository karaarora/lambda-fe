import React from 'react';

import { ReactComponent as ThumbDown} from '../../assets/icons/thumbdown.svg';
import { ReactComponent as Thumbup} from '../../assets/icons/thumbup.svg';
import Meme1 from '../../assets/meme1.jpeg';
import Meme2 from '../../assets/meme2.jpeg';
import Meme3 from '../../assets/meme3.jpeg';
import Meme4 from '../../assets/meme4.jpeg';

const arr = [Meme1,Meme2,Meme3,Meme4];

const Card = ():JSX.Element => (
    <div className="inline-block bg-white rounded-lg shadow-md w-full h-auto mr-4 mb-4">
        <div className="bg-primay-normal">
            <img alt="meme1" className="rounded-t-lg object-contain w-full h-full" 
                src={arr[Math.floor(Math.random() * arr.length)]} />
        </div>
        <div className="p-2">
            <div className="text-xs text-primary-normal">Creator Name</div>
            <div className="text-sm text-primary-bold font-medium">Meme Title</div>
        </div>
        <div className="flex mx-2 mb-3 w-12 justify-between">
            <ThumbDown />
            <Thumbup />
        </div>
    </div>
);

export default Card;