/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef, useState } from "react";
import { 
    FacebookIcon, 
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';

import { ReactComponent as Share } from '../../assets/icons/share.svg';
import useOutsideClick from "../../utils/hooks/useOutSideClick";

const ShareMeme:React.FC<{ link: string; }> = ({ link }):JSX.Element => {
    const [showDropUp, setShowDropUp] = useState(false);
    const ref = useRef(null);

    useOutsideClick(ref,() => {
        setShowDropUp(false);
    });
    
    return <div className="relative" onBlur={() => setShowDropUp(false)}  ref={ref}>
            <Share className="cursor-pointer w-6 hover:scale-125 transform active:scale-100" 
                onClick={() => setShowDropUp((v) => !v)} />
            {showDropUp && <div className="w-24 rounded-lg shadow-xl bg-white absolute bottom-full
                p-3 flex flex-wrap flex-start justify-between"
            >
                <FacebookShareButton className="mb-2" tabIndex={0} url={link}>
                    <FacebookIcon round size={32} />
                </FacebookShareButton>
                <LinkedinShareButton className="mb-2" url={link}>
                    <LinkedinIcon round size={32} />
                </LinkedinShareButton>
                <TwitterShareButton url={link}>
                    <TwitterIcon round size={32} />
                </TwitterShareButton>
                <WhatsappShareButton url={link}>
                    <WhatsappIcon round size={32} />
                </WhatsappShareButton>
            </div>}
        </div>;
};

export default ShareMeme;